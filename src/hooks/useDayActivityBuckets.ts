'use client';

import { useMemo } from 'react';

import type { ActivityBucket } from '@/hooks/useActivityBuckets';
import { formatTime, getJSTDayBounds, timezoneToIANA } from '@/lib/timezoneUtils';
import { useTimezoneContext } from '@/providers/TimezoneProvider';

const BUCKET_SECONDS = 15 * 60; // 900s
const BUCKETS_PER_DAY = 96; // 24h × 4 per hour

export function useDayActivityBuckets(
  dateStr: string,
  donations: { amount_cent: number; completed_at: number }[]
): ActivityBucket[] {
  const { timezoneMode } = useTimezoneContext();

  return useMemo(
    function buildDayBuckets() {
      const { end: dayEnd, start: dayStart } = getJSTDayBounds(dateStr);

      const bucketCounts = new Map<number, number>();
      const bucketAmounts = new Map<number, number>();

      for (const d of donations) {
        if (d.completed_at < dayStart || d.completed_at >= dayEnd) {
          continue;
        }
        const key = Math.floor(d.completed_at / BUCKET_SECONDS) * BUCKET_SECONDS;
        bucketCounts.set(key, (bucketCounts.get(key) ?? 0) + 1);
        bucketAmounts.set(key, (bucketAmounts.get(key) ?? 0) + d.amount_cent);
      }

      return Array.from({ length: BUCKETS_PER_DAY }, (_, i) => {
        const timestamp = dayStart + i * BUCKET_SECONDS;
        return {
          amountCent: bucketAmounts.get(timestamp) ?? 0,
          count: bucketCounts.get(timestamp) ?? 0,
          label: formatTime(timestamp, timezoneToIANA(timezoneMode)),
          timestamp,
        };
      });
    },
    [dateStr, donations, timezoneMode]
  );
}
