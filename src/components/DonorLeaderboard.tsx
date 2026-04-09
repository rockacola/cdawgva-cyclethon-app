'use client';

import { Box, Span, Table, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

import { DonorName } from '@/components/DonorName';
import { PlaceCard } from '@/components/PlaceCard';
import { TOP_DONORS_CARDS, TOP_DONORS_TABLE_END } from '@/lib/constants';
import { aggregateByDonor, formatAmount } from '@/lib/donationUtils';
import type { Donation } from '@/lib/types';

interface Props {
  donations: Donation[];
}

export function DonorLeaderboard({ donations }: Props) {
  const ranked = useMemo(() => aggregateByDonor(donations), [donations]);
  const cards = ranked.slice(0, TOP_DONORS_CARDS);
  const tableRows = ranked.slice(TOP_DONORS_CARDS, TOP_DONORS_TABLE_END);

  if (ranked.length === 0) {
    return <Text color="fg.muted">No data yet.</Text>;
  }

  return (
    <Box>
      <Box
        display="grid"
        gap={3}
        gridTemplateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
        mb={6}
      >
        {cards.map((donor, i) => (
          <PlaceCard
            amount={formatAmount({
              amount_cent: donor.amount_cent,
              amount_currency: donor.amount_currency,
            })}
            key={donor.donor_name}
            name={donor.donor_name}
            place={i + 1}
            subLabel={`${donor.count.toLocaleString()} ${donor.count === 1 ? 'donation' : 'donations'}`}
          />
        ))}
      </Box>

      {tableRows.length > 0 && (
        <Table.Root size="sm" variant="outline">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader w={10}>#</Table.ColumnHeader>
              <Table.ColumnHeader>Donor</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="right">Total</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tableRows.map((donor, i) => (
              <Table.Row key={donor.donor_name}>
                <Table.Cell color="fg.subtle">{TOP_DONORS_CARDS + i + 1}</Table.Cell>
                <Table.Cell>
                  <DonorName name={donor.donor_name} />
                  <Span color="fg.subtle" fontSize="xs" ml={1.5}>
                    ({donor.count.toLocaleString()} {donor.count === 1 ? 'donation' : 'donations'})
                  </Span>
                </Table.Cell>
                <Table.Cell textAlign="right">
                  {formatAmount({
                    amount_cent: donor.amount_cent,
                    amount_currency: donor.amount_currency,
                  })}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </Box>
  );
}
