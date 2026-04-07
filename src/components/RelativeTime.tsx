'use client';

import { Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { formatRelative } from '@/lib/dateUtils';
import { formatAbsoluteTime } from '@/lib/timeUtils';
import { useTimezoneContext } from '@/providers/TimezoneProvider';

interface Props {
  timestamp: number; // unix epoch seconds
  showAbsoluteTime?: boolean;
}

export function RelativeTime({ timestamp, showAbsoluteTime = false }: Props) {
  const { timezoneMode } = useTimezoneContext();
  const [relative, setRelative] = useState<string>(formatRelative(new Date(timestamp * 1000)));

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

  if (showAbsoluteTime) {
    const absolute = formatAbsoluteTime(timestamp, timezoneMode);
    return (
      <Text display={{ base: 'inline-block', md: 'block' }} suppressHydrationWarning>
        {relative} ({absolute})
      </Text>
    );
  }

  return (
    <Text
      display={{ base: 'inline-block', md: 'block' }}
      suppressHydrationWarning
      title={formatAbsoluteTime(timestamp, timezoneMode)}
    >
      {relative}
    </Text>
  );
}
