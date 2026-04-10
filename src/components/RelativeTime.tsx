'use client';

import { Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { formatRelative } from '@/lib/dateUtils';
import { formatAbsoluteTime } from '@/lib/timeUtils';
import { useLocaleContext } from '@/providers/LocaleProvider';
import { useTimezoneContext } from '@/providers/TimezoneProvider';

interface Props {
  timestamp: number; // unix epoch seconds
  showAbsoluteTime?: boolean;
}

export function RelativeTime({ timestamp, showAbsoluteTime = false }: Props) {
  const { timezoneMode } = useTimezoneContext();
  const { resolvedLocale } = useLocaleContext();
  const intlLocale = resolvedLocale === 'JP' ? 'ja' : 'en';
  const [relative, setRelative] = useState<string>(
    formatRelative(new Date(timestamp * 1000), intlLocale)
  );

  useEffect(
    function syncRelativeTime() {
      const d = new Date(timestamp * 1000);
      setRelative(formatRelative(d, intlLocale));
      const interval = setInterval(
        () => setRelative(formatRelative(new Date(timestamp * 1000), intlLocale)),
        60_000
      );
      return () => clearInterval(interval);
    },
    [timestamp, intlLocale]
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
