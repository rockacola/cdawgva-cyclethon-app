'use client';

import { Text } from '@chakra-ui/react';

import { formatDonationTime } from '@/lib/timeUtils';
import { useLocaleContext } from '@/providers/LocaleProvider';
import { useTimezoneContext } from '@/providers/TimezoneProvider';

interface Props {
  timestamp: number;
}

export function DonationTime({ timestamp }: Props) {
  const { timezoneMode } = useTimezoneContext();
  const { resolvedLocale } = useLocaleContext();

  return (
    <Text color="fg.subtle" display={{ base: 'inline-block', md: 'block' }} fontSize="xs">
      {formatDonationTime(timestamp, timezoneMode, resolvedLocale)}
    </Text>
  );
}
