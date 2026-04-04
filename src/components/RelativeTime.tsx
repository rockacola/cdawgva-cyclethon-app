'use client';

import { useEffect, useState } from 'react';

import { formatRelative, formatUTC } from '@/lib/dateUtils';

interface Props {
  timestamp: number; // unix epoch seconds
  showUTC?: boolean;
}

export function RelativeTime({ timestamp, showUTC = false }: Props) {
  const date = new Date(timestamp * 1000);
  const utc = formatUTC(date);
  const [relative, setRelative] = useState<string>(formatRelative(date));

  useEffect(
    function syncRelativeTime() {
      const d = new Date(timestamp * 1000);
      setRelative(formatRelative(d));
      const interval = setInterval(
        () => setRelative(formatRelative(new Date(timestamp * 1000))),
        60_000
      );
      return () => clearInterval(interval);
    },
    [timestamp]
  );

  if (showUTC) {
    return (
      <span suppressHydrationWarning>
        {relative} ({utc})
      </span>
    );
  }

  return (
    <span suppressHydrationWarning title={utc}>
      {relative}
    </span>
  );
}
