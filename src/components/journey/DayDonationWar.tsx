'use client';

import { Box, Text } from '@chakra-ui/react';

import { AnimeWarTable } from '@/components/AnimeWarTable';
import { CountryWarTable } from '@/components/CountryWarTable';
import { useDonations } from '@/contexts/DonationsContext';
import type { TimezoneMode } from '@/lib/constants';
import type { DonationWarEntry } from '@/lib/journey-data';
import { formatDonationTime } from '@/lib/timeUtils';
import { useTimezoneContext } from '@/providers/TimezoneProvider';

const TOP_N = 10;

interface Props {
  wars: DonationWarEntry[];
}

export function DayDonationWar({ wars }: Props) {
  const { donations } = useDonations();
  const { timezoneMode } = useTimezoneContext();

  return (
    <>
      {wars.map((war) => (
        <DonationWarCard
          key={`${war.startTimestamp}-${war.type}`}
          timezoneMode={timezoneMode}
          war={war}
        >
          {war.type === 'country' ? (
            <CountryWarTable
              donations={donations.filter(
                (d) => d.completed_at >= war.startTimestamp && d.completed_at <= war.endTimestamp
              )}
              maxCount={TOP_N}
            />
          ) : war.type === 'anime' ? (
            <AnimeWarTable
              donations={donations.filter(
                (d) => d.completed_at >= war.startTimestamp && d.completed_at <= war.endTimestamp
              )}
              maxCount={TOP_N}
            />
          ) : null}
        </DonationWarCard>
      ))}
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
  return (
    <Box>
      <Text color="fg.muted" fontSize="sm" fontWeight="semibold" mb={1}>
        {war.title}
      </Text>
      <Text color="fg.muted" fontSize="xs">
        {formatDonationTime(war.startTimestamp, timezoneMode)} –{' '}
        {formatDonationTime(war.endTimestamp, timezoneMode)} {timezoneMode}
      </Text>
      <Text color="fg.muted" fontSize="xs" mb={3}>
        The amount shown here is a running estimate and may not exactly match the figure shown on
        the stream.
      </Text>
      {children}
    </Box>
  );
}
