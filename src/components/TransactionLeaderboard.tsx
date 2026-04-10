'use client';

import { Box, Span, Table, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

import { DonorName } from '@/components/DonorName';
import { PlaceCard } from '@/components/PlaceCard';
import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { useTranslations } from '@/hooks/useTranslations';
import { TOP_DONORS_CARDS, TOP_DONORS_TABLE_END } from '@/lib/constants';
import { formatAmountParts, topByTransaction } from '@/lib/donationUtils';
import type { EventDayInfo } from '@/lib/journey';
import { getEventDayInfo } from '@/lib/journey';
import type { Donation } from '@/lib/types';

interface Props {
  donations: Donation[];
}

export function TransactionLeaderboard({ donations }: Props) {
  const t = useTranslations('topDonors');
  const tc = useTranslations('common');
  const td = useTranslations('dayNav');
  const currencyPrefix = useCurrencyPrefix();

  function formatDayLabel(info: EventDayInfo): string {
    if (info.type === 'pre') {
      return td('pre');
    }
    if (info.type === 'post') {
      return td('post');
    }
    return td('dayLabel', { day: info.day });
  }
  const ranked = useMemo(() => topByTransaction(donations), [donations]);
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
        {cards.map((d, i) => {
          const { whole, cents } = formatAmountParts(d.amount_cent, currencyPrefix);
          return (
            <PlaceCard
              cents={cents}
              key={d.id}
              name={d.donor_name}
              place={i + 1}
              subLabel={formatDayLabel(getEventDayInfo(d.completed_at))}
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
              <Table.ColumnHeader textAlign="right">{t('amount')}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tableRows.map((d, i) => {
              const { whole, cents } = formatAmountParts(d.amount_cent, currencyPrefix);
              return (
                <Table.Row key={d.id}>
                  <Table.Cell color="fg.subtle">{TOP_DONORS_CARDS + i + 1}</Table.Cell>
                  <Table.Cell>
                    <DonorName name={d.donor_name} />{' '}
                    <Text as="span" color="fg.subtle" fontSize="xs">
                      ({formatDayLabel(getEventDayInfo(d.completed_at))})
                    </Text>
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
