'use client';

import { Box, Container, Heading, Span, Table, Text } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { AnimeWarTable } from '@/components/AnimeWarTable';
import { DonationTime } from '@/components/DonationTime';
import { DonorName } from '@/components/DonorName';
import { LastChecked } from '@/components/LastChecked';
import { useDonations } from '@/contexts/DonationsContext';
import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { useDonationsPolling } from '@/hooks/useDonationsPolling';
import { animeIdToName, detectAnimeFromComment } from '@/lib/animePatterns';
import { DONATION_REFETCH_INTERVAL } from '@/lib/constants';
import { formatAmountParts } from '@/lib/donationUtils';
import { formatDonationTime } from '@/lib/timeUtils';
import { useTimezoneContext } from '@/providers/TimezoneProvider';

export default function DonationsAnimePage() {
  return (
    <Suspense>
      <DonationsAnimeContent />
    </Suspense>
  );
}

function DonationsAnimeContent() {
  const { donations, isRefreshing, lastCheckedAt } = useDonations();
  useDonationsPolling(DONATION_REFETCH_INTERVAL);
  const { timezoneMode } = useTimezoneContext();
  const searchParams = useSearchParams();
  const currencyPrefix = useCurrencyPrefix();

  const startTimestamp = Number(searchParams.get('start')) || 0;
  const endTimestamp = Number(searchParams.get('end')) || Infinity;

  const filteredDonations = donations.filter(
    (d) => d.completed_at >= startTimestamp && d.completed_at <= endTimestamp
  );

  const noAnimeDonations = filteredDonations
    .filter((d) => d.donor_comment && !detectAnimeFromComment(d.donor_comment))
    .sort((a, b) => b.amount_cent - a.amount_cent);

  const totalDonationsInCents = filteredDonations.reduce((sum, d) => sum + d.amount_cent, 0);

  return (
    <Box py={{ base: 6, md: 20 }}>
      <Container maxW="4xl" px={{ base: 3, md: 8 }}>
        <Heading as="h1" mb={2} size={{ base: 'xl', md: '2xl' }}>
          Donations: {formatDonationTime(startTimestamp, timezoneMode)} –{' '}
          {formatDonationTime(endTimestamp, timezoneMode)} {timezoneMode}
        </Heading>
        <Text color="fg.muted" fontSize="sm" mb={1}>
          {filteredDonations.length} donations — Total: {currencyPrefix}
          {(totalDonationsInCents / 100).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
        <Box mb={6}>
          <LastChecked isRefreshing={isRefreshing} timestamp={lastCheckedAt} />
        </Box>

        <Box mb={10}>
          <Heading as="h2" mb={3} size="md">
            By Anime
          </Heading>
          <AnimeWarTable donations={filteredDonations} />
        </Box>

        {noAnimeDonations.length > 0 && (
          <Box mb={10}>
            <Heading as="h2" mb={1} size="md">
              No Anime Match
            </Heading>
            <Text color="fg.muted" fontSize="sm" mb={3}>
              {noAnimeDonations.length} donations
            </Text>
            <Table.Root size="sm" variant="outline">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader minW="100px">Time</Table.ColumnHeader>
                  <Table.ColumnHeader minW="120px">Donor</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="right">Amount</Table.ColumnHeader>
                  <Table.ColumnHeader>Comment</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {noAnimeDonations.map((d) => (
                  <Table.Row _hover={{ bg: { base: 'bg.muted', _dark: 'gray.800' } }} key={d.id}>
                    <Table.Cell color="fg.muted" fontSize="sm">
                      <DonationTime timestamp={d.completed_at} />
                    </Table.Cell>
                    <Table.Cell overflowWrap="break-word" wordBreak="break-word">
                      <DonorName name={d.donor_name} />
                    </Table.Cell>
                    <Table.Cell textAlign="right" whiteSpace="nowrap">
                      {(() => {
                        const { whole, cents } = formatAmountParts(d.amount_cent, currencyPrefix);
                        return (
                          <>
                            {whole}
                            <Span color="fg.subtle">{cents}</Span>
                          </>
                        );
                      })()}
                    </Table.Cell>
                    <Table.Cell fontSize="sm" overflowWrap="break-word" wordBreak="break-word">
                      {d.donor_comment || '—'}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        )}

        {filteredDonations.length === 0 ? (
          <Text color="fg.muted">No donations in this time window.</Text>
        ) : (
          <Box mb={10}>
            <Heading as="h2" mb={1} size="md">
              All Matched Donations
            </Heading>
            <Text color="fg.muted" fontSize="sm" mb={3}>
              {filteredDonations.length} donations with detected anime from comment
            </Text>
            <Table.Root size="sm" variant="outline">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader minW="100px">Time</Table.ColumnHeader>
                  <Table.ColumnHeader minW="120px">Donor</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="right">Amount</Table.ColumnHeader>
                  <Table.ColumnHeader>Anime</Table.ColumnHeader>
                  <Table.ColumnHeader>Comment</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredDonations.map((d) => (
                  <Table.Row _hover={{ bg: { base: 'bg.muted', _dark: 'gray.800' } }} key={d.id}>
                    <Table.Cell color="fg.muted" fontSize="sm">
                      <DonationTime timestamp={d.completed_at} />
                    </Table.Cell>
                    <Table.Cell overflowWrap="break-word" wordBreak="break-word">
                      <DonorName name={d.donor_name} />
                    </Table.Cell>
                    <Table.Cell textAlign="right" whiteSpace="nowrap">
                      {(() => {
                        const { whole, cents } = formatAmountParts(d.amount_cent, currencyPrefix);
                        return (
                          <>
                            {whole}
                            <Span color="fg.subtle">{cents}</Span>
                          </>
                        );
                      })()}
                    </Table.Cell>
                    <Table.Cell fontSize="sm">
                      {(() => {
                        const anime = detectAnimeFromComment(d.donor_comment);
                        return anime ? animeIdToName(anime) : '—';
                      })()}
                    </Table.Cell>
                    <Table.Cell fontSize="sm" overflowWrap="break-word" wordBreak="break-word">
                      {d.donor_comment || '—'}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        )}
      </Container>
    </Box>
  );
}
