'use client';

import { Box, Container, Heading, Span, Table, Text } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { CountryWarTable } from '@/components/CountryWarTable';
import { DonationTime } from '@/components/DonationTime';
import { DonorName } from '@/components/DonorName';
import { useDonations } from '@/contexts/DonationsContext';
import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { useDonationsPolling } from '@/hooks/useDonationsPolling';
import { DONATION_REFETCH_INTERVAL } from '@/lib/constants';
import { countryCodeToName, detectCountryFromComment } from '@/lib/countryPatterns';
import { formatAmountParts } from '@/lib/donationUtils';
import { formatDonationTime } from '@/lib/timeUtils';
import { useTimezoneContext } from '@/providers/TimezoneProvider';

export default function DonationsCountryPage() {
  return (
    <Suspense>
      <DonationsCountryContent />
    </Suspense>
  );
}

function DonationsCountryContent() {
  const { donations } = useDonations();
  useDonationsPolling(DONATION_REFETCH_INTERVAL);
  const currencyPrefix = useCurrencyPrefix();
  const { timezoneMode } = useTimezoneContext();
  const searchParams = useSearchParams();

  const startTimestamp = Number(searchParams.get('start')) || 0;
  const endTimestamp = Number(searchParams.get('end')) || Infinity;

  const filteredDonations = donations.filter(
    (d) => d.completed_at >= startTimestamp && d.completed_at <= endTimestamp
  );

  const noCountryDonations = filteredDonations.filter(
    (d) => d.donor_comment && !detectCountryFromComment(d.donor_comment)
  );

  const totalDonationsInCents = filteredDonations.reduce((sum, d) => sum + d.amount_cent, 0);

  return (
    <Box py={{ base: 6, md: 20 }}>
      <Container maxW="4xl" px={{ base: 3, md: 8 }}>
        <Heading as="h1" mb={2} size={{ base: 'xl', md: '2xl' }}>
          Donations: {formatDonationTime(startTimestamp, timezoneMode)} –{' '}
          {formatDonationTime(endTimestamp, timezoneMode)} {timezoneMode}
        </Heading>
        <Text color="fg.muted" fontSize="sm" mb={6}>
          {filteredDonations.length} donations — Total: {currencyPrefix}
          {(totalDonationsInCents / 100).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>

        <Box mb={10}>
          <Heading as="h2" mb={3} size="md">
            By Country
          </Heading>
          <CountryWarTable donations={filteredDonations} />
        </Box>

        {noCountryDonations.length > 0 && (
          <Box mb={10}>
            <Heading as="h2" mb={1} size="md">
              No Country Match
            </Heading>
            <Text color="fg.muted" fontSize="sm" mb={3}>
              {noCountryDonations.length} donations
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
                {noCountryDonations.map((d) => (
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
              {filteredDonations.length} donations with detected country from comment
            </Text>
            <Table.Root size="sm" variant="outline">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader minW="100px">Time</Table.ColumnHeader>
                  <Table.ColumnHeader minW="120px">Donor</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="right">Amount</Table.ColumnHeader>
                  <Table.ColumnHeader>Country</Table.ColumnHeader>
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
                        const c = detectCountryFromComment(d.donor_comment);
                        return c ? countryCodeToName(c) : '—';
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
