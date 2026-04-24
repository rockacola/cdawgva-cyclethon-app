'use client';

import { Box, Text } from '@chakra-ui/react';

import type { TimezoneMode } from '@/lib/constants';
import type { DonationWarEntry } from '@/lib/journey';
import { formatDonationTime } from '@/lib/timeUtils';
import { useLocaleContext } from '@/providers/LocaleProvider';

interface Props {
  children: React.ReactNode;
  timezoneMode: TimezoneMode;
  war: DonationWarEntry;
}

export function DonationWarCard({ children, timezoneMode, war }: Props) {
  const { resolvedLocale } = useLocaleContext();
  const displayTitle = resolvedLocale === 'JP' ? (war.titleJa ?? war.title) : war.title;

  return (
    <Box my={4}>
      <Text color="fg.muted" fontSize="sm" fontWeight="semibold" mb={1}>
        {displayTitle}
      </Text>
      <Text color="fg.muted" fontSize="xs" mb={3}>
        {formatDonationTime(war.startTimestamp, timezoneMode, resolvedLocale)} –{' '}
        {formatDonationTime(war.endTimestamp, timezoneMode, resolvedLocale)} {timezoneMode}
      </Text>
      {children}
    </Box>
  );
}
