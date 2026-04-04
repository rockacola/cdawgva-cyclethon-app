'use client';

import { useEffect, useMemo, useState } from 'react';

import { formatRelative, formatUTC } from '@/lib/dateUtils';

interface Props {
  timestamp: number; // unix epoch seconds
  showUTC?: boolean;
}

export function RelativeTime({ timestamp, showUTC = false }: Props) {
  const date = useMemo(() => new Date(timestamp * 1000), [timestamp]);
  const utc = formatUTC(date);
  const [relative, setRelative] = useState<string>('');

  useEffect(function syncRelativeTime() {
    setRelative(formatRelative(date));
    const interval = setInterval(() => setRelative(formatRelative(date)), 60_000);
    return () => clearInterval(interval);
  }, [date]);

  if (!relative) {
    // Pre-hydration: show UTC to avoid layout shift
    return <span suppressHydrationWarning>{utc}</span>;
  }

  if (showUTC) {
    return (
      <span>
        {relative} ({utc})
      </span>
    );
  }

  return <span title={utc}>{relative}</span>;
}
