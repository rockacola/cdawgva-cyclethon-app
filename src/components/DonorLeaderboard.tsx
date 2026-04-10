'use client';

import { Box, Span, Table, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

import { DonorName } from '@/components/DonorName';
import { PlaceCard } from '@/components/PlaceCard';
import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { useTranslations } from '@/hooks/useTranslations';
import { TOP_DONORS_CARDS, TOP_DONORS_TABLE_END } from '@/lib/constants';
import { aggregateByDonor, formatAmountParts } from '@/lib/donationUtils';
import type { Donation } from '@/lib/types';

interface Props {
  donations: Donation[];
}

export function DonorLeaderboard({ donations }: Props) {
  const t = useTranslations('topDonors');
  const tc = useTranslations('common');
  const currencyPrefix = useCurrencyPrefix();
  const ranked = useMemo(() => aggregateByDonor(donations), [donations]);
  const cards = ranked.slice(0, TOP_DONORS_CARDS);
  const tableRows = ranked.slice(TOP_DONORS_CARDS, TOP_DONORS_TABLE_END);

  if (ranked.length === 0) {
    return <Text color="fg.muted">{tc('noDataYet')}</Text>;
  }

  return (
    <Box>
      <Box
        display="grid"
        gap={3}
        gridTemplateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
        mb={6}
      >
        {cards.map((donor, i) => {
          const { whole, cents } = formatAmountParts(donor.amount_cent, currencyPrefix);
          return (
            <PlaceCard
              cents={cents}
              key={donor.donor_name}
              name={donor.donor_name}
              place={i + 1}
              subLabel={
                donor.count === 1
                  ? t('donation', { count: donor.count.toLocaleString() })
                  : t('donationPlural', { count: donor.count.toLocaleString() })
              }
              whole={whole}
            />
          );
        })}
      </Box>

      {tableRows.length > 0 && (
        <Table.Root size="sm" variant="outline">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader w={10}>#</Table.ColumnHeader>
              <Table.ColumnHeader>{t('donor')}</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="right">{t('total')}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tableRows.map((donor, i) => {
              const { whole, cents } = formatAmountParts(donor.amount_cent, currencyPrefix);
              return (
                <Table.Row key={donor.donor_name}>
                  <Table.Cell color="fg.subtle">{TOP_DONORS_CARDS + i + 1}</Table.Cell>
                  <Table.Cell>
                    <DonorName name={donor.donor_name} />
                    <Span color="fg.subtle" fontSize="xs" ml={1.5}>
                      (
                      {donor.count === 1
                        ? t('donation', { count: donor.count.toLocaleString() })
                        : t('donationPlural', { count: donor.count.toLocaleString() })}
                      )
                    </Span>
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {whole}
                    <Span color="fg.subtle">{cents}</Span>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      )}
    </Box>
  );
}
