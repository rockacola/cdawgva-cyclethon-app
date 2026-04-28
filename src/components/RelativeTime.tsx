'use client';

import { Text } from '@chakra-ui/react';

import { useNow } from '@/hooks/useNow';
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
  const intlLocale = resolvedLocale === 'JA' ? 'ja' : 'en';
  const now = useNow(60_000);
  const relative = formatRelative(new Date(timestamp * 1000), intlLocale, now);

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
