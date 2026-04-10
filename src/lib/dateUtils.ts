/**
 * Returns today's date string (YYYY-MM-DD) in the given UTC offset (e.g. "+09:00").
 */
export function todayInOffset(utcOffset: string): string {
  const sign = utcOffset[0] === '-' ? -1 : 1;
  const [hours, minutes] = utcOffset.slice(1).split(':').map(Number);
  const offsetMs = sign * (hours * 60 + minutes) * 60 * 1000;
  return new Date(Date.now() + offsetMs).toISOString().slice(0, 10);
}

export function formatRelative(date: Date, locale: string = 'en'): string {
  const diffMs = date.getTime() - Date.now();
  const diffMin = Math.round(diffMs / 60_000);
  const diffHr = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHr / 24);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (Math.abs(diffDay) >= 1) {
    return rtf.format(diffDay, 'day');
  }
  if (Math.abs(diffHr) >= 1) {
    return rtf.format(diffHr, 'hour');
  }
  if (Math.abs(diffMin) >= 1) {
    return rtf.format(diffMin, 'minute');
  }
  return locale === 'ja' ? 'たった今' : 'just now';
}

export function formatUTC(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}` +
    ` ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())} UTC`
  );
}
