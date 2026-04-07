import type { TimezoneMode } from '@/lib/constants';

const BUCKET_SECONDS = 15 * 60;
const BUCKETS_PER_DAY = 96;

export function getJSTDayBounds(dateStr: string): { end: number; start: number } {
  const start = Date.parse(dateStr + 'T00:00:00+09:00') / 1000;
  return { end: start + BUCKETS_PER_DAY * BUCKET_SECONDS, start };
}

export function timezoneToIANA(mode: TimezoneMode): string | undefined {
  if (mode === 'JST') {
    return 'Asia/Tokyo';
  }
  if (mode === 'UTC') {
    return 'UTC';
  }
  return undefined;
}

export function formatTime(epochSeconds: number, timeZone: string | undefined): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true,
    minute: '2-digit',
    timeZone,
  })
    .format(new Date(epochSeconds * 1000))
    .replace(' ', '')
    .toLowerCase();
}
