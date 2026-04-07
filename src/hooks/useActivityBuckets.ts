'use client';

import { useEffect, useMemo, useState } from 'react';

import { DONATIONS_FULL_URL, DONATION_REFETCH_INTERVAL } from '@/lib/constants';
import type { TimezoneMode } from '@/lib/constants';
import type { DonationsData } from '@/lib/types';
import { useTimezoneContext } from '@/providers/TimezoneProvider';

export interface ActivityBucket {
  amountCent: number; // sum of all donation amounts in this window
  count: number;
  label: string; // "h:mma" start of this window, in the user's preferred timezone
  timestamp: number; // unix epoch seconds — the key used for bucket lookup
}

// Each bucket spans 15 minutes (900 seconds).
// BUCKET_COUNT = 300 means we index 300 windows = 75 hours of history.
// The chart slices the last 30 of these to show 7.5 hours on screen.
const BUCKET_SECONDS = 15 * 60; // 900
const BUCKET_COUNT = 300;

// Maps the app's TimezoneMode to an IANA timezone string for Intl.DateTimeFormat.
// "Local" returns undefined, which tells Intl to use the browser's local timezone.
function timezoneToIANA(mode: TimezoneMode): string | undefined {
  if (mode === 'JST') {
    return 'Asia/Tokyo';
  }
  if (mode === 'UTC') {
    return 'UTC';
  }
  return undefined; // Local — browser default
}

// Format a unix epoch (seconds) as "h:mma" (e.g. "2:15pm") in the given timezone.
function formatBucketLabel(epochSeconds: number, timezoneMode: TimezoneMode): string {
  const timeZone = timezoneToIANA(timezoneMode);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true,
    minute: '2-digit',
    timeZone,
  })
    .format(new Date(epochSeconds * 1000))
    .replace(' ', '') // "2:15 PM" → "2:15PM"
    .toLowerCase(); // "2:15PM"  → "2:15pm"
}

// ─── How bucketing works ────────────────────────────────────────────────────
//
//  A "bucket key" is the unix epoch second of the *start* of a 15-min window,
//  computed by flooring a timestamp to the nearest 900-second boundary:
//
//    bucketKey = floor(epochSeconds / 900) * 900
//
//  Example:
//    donation completed_at = 14:37:22  →  floor(52642 / 900) * 900 = 52200  →  14:30:00
//    donation completed_at = 14:44:59  →  floor(52699 / 900) * 900 = 52200  →  14:30:00
//    donation completed_at = 14:45:00  →  floor(52700 / 900) * 900 = 53100  →  14:45:00
//
//  Every donation in the [14:30, 14:45) window gets the same key 52200.
//  We count how many donations share each key, then build an ordered array of
//  BUCKET_COUNT slots covering [currentBucket - 299*900 … currentBucket].
// ────────────────────────────────────────────────────────────────────────────

function snapToCurrentBucket(): number {
  return Math.floor(Math.floor(Date.now() / 1000) / BUCKET_SECONDS) * BUCKET_SECONDS;
}

function buildBuckets(
  donations: { amount_cent: number; completed_at: number }[],
  timezoneMode: TimezoneMode,
  // currentBucket is passed in (not computed here) so it can be a real useMemo dependency,
  // allowing the window to slide forward every 15 min without a phantom tick counter.
  currentBucket: number
): ActivityBucket[] {
  // Accumulate count and total amount per bucket key (epoch of window start).
  const bucketCounts = new Map<number, number>();
  const bucketAmounts = new Map<number, number>();
  for (const d of donations) {
    // Floor each donation's timestamp to its 15-min window start.
    const key = Math.floor(d.completed_at / BUCKET_SECONDS) * BUCKET_SECONDS;
    bucketCounts.set(key, (bucketCounts.get(key) ?? 0) + 1);
    bucketAmounts.set(key, (bucketAmounts.get(key) ?? 0) + d.amount_cent);
  }

  // Build an array of BUCKET_COUNT slots ordered oldest → newest.
  //   i = 0       → currentBucket - 299*900  (oldest)
  //   i = 299     → currentBucket            (current open window)
  return Array.from({ length: BUCKET_COUNT }, (_, i) => {
    const timestamp = currentBucket - (BUCKET_COUNT - 1 - i) * BUCKET_SECONDS;
    return {
      amountCent: bucketAmounts.get(timestamp) ?? 0,
      // If no donations fell in this window, default to 0.
      count: bucketCounts.get(timestamp) ?? 0,
      // Label reflects the user's chosen timezone (JST / UTC / Local).
      label: formatBucketLabel(timestamp, timezoneMode),
      timestamp,
    };
  });
}

export function useActivityBuckets(): ActivityBucket[] {
  const { timezoneMode } = useTimezoneContext();
  const [donations, setDonations] = useState<{ amount_cent: number; completed_at: number }[]>([]);
  // currentBucket advances every 15 min so the window slides forward even with no new donations
  const [currentBucket, setCurrentBucket] = useState(snapToCurrentBucket);

  useEffect(function pollFullDonations() {
    // Fetch the full donations dataset (not just latest-100) so we have enough
    // history to fill all 300 buckets. Re-fetches every DONATION_REFETCH_INTERVAL (30s).
    async function fetchData() {
      try {
        const res = await fetch(DONATIONS_FULL_URL, { cache: 'no-store' });
        const data: DonationsData = await res.json();
        setDonations(data.donations);
      } catch (err) {
        console.error('[useActivityBuckets] fetch failed:', err);
      }
    }

    fetchData();
    const id = setInterval(fetchData, DONATION_REFETCH_INTERVAL);
    return () => clearInterval(id);
  }, []);

  useEffect(function advanceWindow() {
    // Snap currentBucket to the new 15-min boundary each time the window slides forward.
    const id = setInterval(() => setCurrentBucket(snapToCurrentBucket()), BUCKET_SECONDS * 1000);
    return () => clearInterval(id);
  }, []);

  // Recompute whenever donations refresh, the window slides (currentBucket), or timezone changes.
  return useMemo(
    () => buildBuckets(donations, timezoneMode, currentBucket),
    [currentBucket, donations, timezoneMode]
  );
}
