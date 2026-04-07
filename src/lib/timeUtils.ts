import type { TimezoneMode } from '@/lib/constants';

function getTimezoneId(mode: TimezoneMode): string | undefined {
  if (mode === 'JST') {
    return 'Asia/Tokyo';
  }
  if (mode === 'UTC') {
    return 'UTC';
  }
  return undefined; // Local — browser default
}

function isSameDay(a: Date, b: Date, timeZone: string | undefined): boolean {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    day: '2-digit',
    month: '2-digit',
    timeZone,
    year: 'numeric',
  });
  return fmt.format(a) === fmt.format(b);
}

export function formatAbsoluteTime(timestamp: number, mode: TimezoneMode): string {
  const date = new Date(timestamp * 1000);
  const timeZone = getTimezoneId(mode);
  const label = mode === 'Local' ? 'Local' : mode;

  const parts = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    month: '2-digit',
    timeZone,
    year: 'numeric',
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return `${get('year')}-${get('month')}-${get('day')} ${get('hour')}:${get('minute')} ${label}`;
}

export function formatDonationTime(timestamp: number, mode: TimezoneMode): string {
  const date = new Date(timestamp * 1000);
  const timeZone = getTimezoneId(mode);

  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true,
    minute: '2-digit',
    timeZone,
  }).format(date);

  if (isSameDay(date, new Date(), timeZone)) {
    return time;
  }

  const day = new Intl.DateTimeFormat('en-US', { day: 'numeric', timeZone }).format(date);
  const month = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone }).format(date);
  return `${day} ${month}, ${time}`;
}
