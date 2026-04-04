'use client';

import { useEffect, useState } from 'react';

import { formatRelative, formatUTC } from '@/lib/dateUtils';

interface Props {
  iso: string;
  showUTC?: boolean;
}

export function RelativeTime({ iso, showUTC = false }: Props) {
  const utc = formatUTC(new Date(iso));
  const [relative, setRelative] = useState<string>('');

  useEffect(() => {
    const date = new Date(iso);
    setRelative(formatRelative(date));
    const interval = setInterval(() => setRelative(formatRelative(date)), 60_000);
    return () => clearInterval(interval);
  }, [iso]);

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
