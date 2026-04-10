'use client';

import { Box, Table, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

import { DonorName } from '@/components/DonorName';
import { PlaceCard } from '@/components/PlaceCard';
import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { TOP_DONORS_CARDS, TOP_DONORS_TABLE_END } from '@/lib/constants';
import { formatAmount, topByTransaction } from '@/lib/donationUtils';
import { getEventDayLabel } from '@/lib/journey';
import type { Donation } from '@/lib/types';

interface Props {
  donations: Donation[];
}

export function TransactionLeaderboard({ donations }: Props) {
  const currencyPrefix = useCurrencyPrefix();
  const ranked = useMemo(() => topByTransaction(donations), [donations]);
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
        {cards.map((d, i) => (
          <PlaceCard
            amount={formatAmount(d.amount_cent, currencyPrefix)}
            key={d.id}
            name={d.donor_name}
            place={i + 1}
            subLabel={getEventDayLabel(d.completed_at)}
          />
        ))}
      </Box>

      {tableRows.length > 0 && (
        <Table.Root size="sm" variant="outline">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader w={10}>#</Table.ColumnHeader>
              <Table.ColumnHeader>Donor</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="right">Amount</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tableRows.map((d, i) => (
              <Table.Row key={d.id}>
                <Table.Cell color="fg.subtle">{TOP_DONORS_CARDS + i + 1}</Table.Cell>
                <Table.Cell>
                  <DonorName name={d.donor_name} />{' '}
                  <Text as="span" color="fg.subtle" fontSize="xs">
                    ({getEventDayLabel(d.completed_at)})
                  </Text>
                </Table.Cell>
                <Table.Cell textAlign="right">
                  {formatAmount(d.amount_cent, currencyPrefix)}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </Box>
  );
}
