'use client';

import { Box, Text } from '@chakra-ui/react';

import { useTranslations } from '@/hooks/useTranslations';
import type { TimezoneMode } from '@/lib/constants';
import type { DonationWarEntry } from '@/lib/journey';
import { formatDonationTime } from '@/lib/timeUtils';
import type { Donation } from '@/lib/types';
import { useLocaleContext } from '@/providers/LocaleProvider';
import { useTimezoneContext } from '@/providers/TimezoneProvider';

import { DonationWarTable } from '../DonationWarTable';

const TOP_N = 10;

interface Props {
  donations: Donation[];
  wars: DonationWarEntry[];
}

export function DayDonationWar({ donations, wars }: Props) {
  const t = useTranslations('dayPage');
  const { timezoneMode } = useTimezoneContext();

  return (
    <>
      {wars.map((war) => (
        <DonationWarCard
          key={`${war.startTimestamp}-${war.type}`}
          timezoneMode={timezoneMode}
          war={war}
        >
          <DonationWarTable
            donations={donations.filter(
              (d) => d.completed_at >= war.startTimestamp && d.completed_at <= war.endTimestamp
            )}
            maxCount={TOP_N}
            type={war.type}
          />
        </DonationWarCard>
      ))}
      <Text color="fg.muted" fontSize="xs" mt={2}>
        {t('disclaimer')}
      </Text>
    </>
  );
}

function DonationWarCard({
  children,
  timezoneMode,
  war,
}: {
  children: React.ReactNode;
  timezoneMode: TimezoneMode;
  war: DonationWarEntry;
}) {
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
