'use client';

import { Box, Span, Table, Text } from '@chakra-ui/react';
import { Crown } from 'lucide-react';
import { useMemo } from 'react';

import { useDonations } from '@/contexts/DonationsContext';
import type { TimezoneMode } from '@/lib/constants';
import {
  countryCodeToName,
  detectCountryFromComment,
  formatAmountParts,
} from '@/lib/donationUtils';
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
          {war.type === 'country' ? <CountryWarTable donations={donations} war={war} /> : null}
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
      <Text color="fg.muted" fontSize="xs" mb={3}>
        {formatDonationTime(war.startTimestamp, timezoneMode)} –{' '}
        {formatDonationTime(war.endTimestamp, timezoneMode)} {timezoneMode}
      </Text>
      {children}
    </Box>
  );
}

function CountryWarTable({
  donations,
  war,
}: {
  donations: ReturnType<typeof useDonations>['donations'];
  war: DonationWarEntry;
}) {
  const countryStats = useMemo(
    function aggregateByCountry() {
      const map = new Map<string, { count: number; sumCent: number }>();
      for (const d of donations) {
        if (d.completed_at < war.startTimestamp || d.completed_at > war.endTimestamp) {
          continue;
        }
        const country = detectCountryFromComment(d.donor_comment);
        if (!country) {
          continue;
        }
        const entry = map.get(country);
        if (entry) {
          entry.count += 1;
          entry.sumCent += d.amount_cent;
        } else {
          map.set(country, { count: 1, sumCent: d.amount_cent });
        }
      }
      return Array.from(map.entries())
        .map(([country, { count, sumCent }]) => ({ country, count, sumCent }))
        .sort((a, b) => b.sumCent - a.sumCent)
        .slice(0, TOP_N);
    },
    [donations, war.startTimestamp, war.endTimestamp]
  );

  if (countryStats.length === 0) {
    return (
      <Text color="fg.muted" fontSize="sm">
        No country donations found.
      </Text>
    );
  }

  return (
    <Table.Root size="sm" variant="outline">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader textAlign="center" w={10} />
          <Table.ColumnHeader>Country</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="right">Count</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="right">Total</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {countryStats.map((row, i) => (
          <Table.Row key={row.country}>
            <Table.Cell>
              <Box display="flex" justifyContent="center">
                {i === 0 ? <Crown color="var(--chakra-colors-yellow-400)" size={16} /> : i + 1}
              </Box>
            </Table.Cell>
            <Table.Cell>{countryCodeToName(row.country)}</Table.Cell>
            <Table.Cell textAlign="right">{row.count}</Table.Cell>
            <Table.Cell textAlign="right" whiteSpace="nowrap">
              {(() => {
                const { whole, cents } = formatAmountParts({
                  amount_cent: row.sumCent,
                  amount_currency: 'USD',
                });
                return (
                  <>
                    {whole}
                    <Span color="fg.subtle">{cents}</Span>
                  </>
                );
              })()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
