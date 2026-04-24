'use client';

import { Box, Span, Table, Text } from '@chakra-ui/react';
import { Crown } from 'lucide-react';
import { useMemo } from 'react';

import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { useTranslations } from '@/hooks/useTranslations';
import { formatAmountParts } from '@/lib/donationUtils';
import { detectItemIdFromComment, itemIdToName } from '@/lib/donationWarUtils';
import type { Donation, DonationWarType } from '@/lib/types';
import { useLocaleContext } from '@/providers/LocaleProvider';

interface Props {
  type: DonationWarType;
  donations: Donation[];
  maxCount?: number;
}

export function DonationWarTable({ type, donations, maxCount }: Props) {
  const t = useTranslations('dayPage');
  const { resolvedLocale } = useLocaleContext();
  const currencyPrefix = useCurrencyPrefix();
  const typeLabel = useMemo(() => t(type), [t, type]);

  const stats = useMemo(
    function aggregate() {
      const map = new Map<string, { count: number; sumCent: number }>();
      for (const d of donations) {
        const item = detectItemIdFromComment(type, d.donor_comment);
        if (!item) {
          continue;
        }
        const entry = map.get(item);
        if (entry) {
          entry.count += 1;
          entry.sumCent += d.amount_cent;
        } else {
          map.set(item, { count: 1, sumCent: d.amount_cent });
        }
      }
      const sorted = Array.from(map.entries())
        .map(([item, { count, sumCent }]) => ({ item, count, sumCent }))
        .sort((a, b) => b.sumCent - a.sumCent);
      return maxCount ? sorted.slice(0, maxCount) : sorted;
    },
    [donations, maxCount, type]
  );

  if (stats.length === 0) {
    return (
      <Text color="fg.muted" fontSize="sm">
        No donations found.
      </Text>
    );
  }

  return (
    <Table.Root borderRadius="0" size="sm" variant="outline">
      <Table.Header bg="bg.subtle">
        <Table.Row>
          <Table.ColumnHeader
            color="fg.subtle"
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="widest"
            textAlign="center"
            textTransform="uppercase"
            w={10}
          />
          <Table.ColumnHeader
            color="fg.subtle"
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="widest"
            textTransform="uppercase"
          >
            {typeLabel}
          </Table.ColumnHeader>
          <Table.ColumnHeader
            color="fg.subtle"
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="widest"
            textAlign="right"
            textTransform="uppercase"
            width="80px"
          >
            {t('count')}
          </Table.ColumnHeader>
          <Table.ColumnHeader
            color="fg.subtle"
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="widest"
            textAlign="right"
            textTransform="uppercase"
            width="120px"
          >
            {t('total')}
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {stats.map((row, i) => {
          const { whole, cents } = formatAmountParts(row.sumCent, currencyPrefix);
          const isFirst = i === 0;

          return (
            <Table.Row _hover={{ bg: { base: 'bg.muted', _dark: 'gray.800' } }} key={row.item}>
              <Table.Cell>
                <Box display="flex" justifyContent="center">
                  {isFirst ? <Crown color="var(--chakra-colors-yellow-400)" size={16} /> : i + 1}
                </Box>
              </Table.Cell>
              <Table.Cell>{itemIdToName(type, row.item, resolvedLocale)}</Table.Cell>
              <Table.Cell textAlign="right">{row.count}</Table.Cell>
              <Table.Cell textAlign="right" whiteSpace="nowrap">
                {whole}
                <Span color="fg.subtle">{cents}</Span>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
}
