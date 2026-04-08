'use client';

import { Box, Container, Heading, Table, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

import { DonationTime } from '@/components/DonationTime';
import { DonorName } from '@/components/DonorName';
import { useDonations } from '@/contexts/DonationsContext';
import { countryCodeToName, detectCountryFromComment, formatAmount } from '@/lib/donationUtils';
import { formatDonationTime } from '@/lib/timeUtils';
import type { Donation } from '@/lib/types';
import { useTimezoneContext } from '@/providers/TimezoneProvider';

const START_TIMESTAMP = 1775626440; // 2026-04-08 2:34pm JST
const END_TIMESTAMP = 1775628180; // 2026-04-08 3:03pm JST

export default function Day4Page() {
  const { donations } = useDonations();
  const { timezoneMode } = useTimezoneContext();

  const filtered = donations.filter(
    (d) => d.completed_at >= START_TIMESTAMP && d.completed_at <= END_TIMESTAMP
  );

  const noCountry = filtered.filter(
    (d) => d.donor_comment && !detectCountryFromComment(d.donor_comment)
  );

  const totalCents = filtered.reduce((sum, d) => sum + d.amount_cent, 0);

  const countryStats = useMemo(
    function aggregateByCountry() {
      const map = new Map<string, { count: number; sumCent: number }>();
      for (const d of filtered) {
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
        .sort((a, b) => b.sumCent - a.sumCent);
    },
    [filtered]
  );

  return (
    <Box py={{ base: 6, md: 20 }}>
      <Container maxW="4xl" px={{ base: 3, md: 8 }}>
        <Heading as="h1" mb={2} size={{ base: 'xl', md: '2xl' }}>
          Donations: {formatDonationTime(START_TIMESTAMP, timezoneMode)} –{' '}
          {formatDonationTime(END_TIMESTAMP, timezoneMode)} {timezoneMode}
        </Heading>
        <Text color="fg.muted" fontSize="sm" mb={6}>
          {filtered.length} donations — Total: $
          {(totalCents / 100).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>

        {countryStats.length > 0 && (
          <Box mb={10}>
            <Heading as="h2" mb={3} size="md">
              By Country
            </Heading>
            <Table.Root size="sm" variant="outline">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader w={10}>#</Table.ColumnHeader>
                  <Table.ColumnHeader>Country</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="right">Count</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="right">Total</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {countryStats.map((row, i) => (
                  <Table.Row key={row.country}>
                    <Table.Cell>{i === 0 ? '\u{1F451}' : i + 1}</Table.Cell>
                    <Table.Cell>{countryCodeToName(row.country)}</Table.Cell>
                    <Table.Cell textAlign="right">{row.count}</Table.Cell>
                    <Table.Cell textAlign="right">
                      {formatAmount({
                        amount_cent: row.sumCent,
                        amount_currency: 'USD',
                      } as Donation)}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        )}

        {noCountry.length > 0 && (
          <Box mb={10}>
            <Heading as="h2" mb={3} size="md">
              No Country Match ({noCountry.length})
            </Heading>
            <Table.Root size="sm" variant="outline">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader minW="80px">Time</Table.ColumnHeader>
                  <Table.ColumnHeader maxW="160px">Donor</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="right">Amount</Table.ColumnHeader>
                  <Table.ColumnHeader>Comment</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {noCountry.map((d) => (
                  <Table.Row key={d.id}>
                    <Table.Cell color="fg.muted" fontSize="sm">
                      <DonationTime timestamp={d.completed_at} />
                    </Table.Cell>
                    <Table.Cell maxW="160px" overflowWrap="break-word" wordBreak="break-word">
                      <DonorName name={d.donor_name} />
                    </Table.Cell>
                    <Table.Cell textAlign="right">{formatAmount(d)}</Table.Cell>
                    <Table.Cell fontSize="sm">{d.donor_comment || '—'}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        )}

        {filtered.length === 0 ? (
          <Text color="fg.muted">No donations in this time window.</Text>
        ) : (
          <Table.Root size="sm" variant="outline">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader minW="80px">Time</Table.ColumnHeader>
                <Table.ColumnHeader maxW="160px">Donor</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="right">Amount</Table.ColumnHeader>
                <Table.ColumnHeader>Country</Table.ColumnHeader>
                <Table.ColumnHeader>Comment</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filtered.map((d) => (
                <Table.Row key={d.id}>
                  <Table.Cell color="fg.muted" fontSize="sm">
                    <DonationTime timestamp={d.completed_at} />
                  </Table.Cell>
                  <Table.Cell maxW="160px" overflowWrap="break-word" wordBreak="break-word">
                    <DonorName name={d.donor_name} />
                  </Table.Cell>
                  <Table.Cell textAlign="right">{formatAmount(d)}</Table.Cell>
                  <Table.Cell fontSize="sm">
                    {(() => {
                      const c = detectCountryFromComment(d.donor_comment);
                      return c ? countryCodeToName(c) : '—';
                    })()}
                  </Table.Cell>
                  <Table.Cell fontSize="sm">{d.donor_comment || '—'}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </Container>
    </Box>
  );
}
