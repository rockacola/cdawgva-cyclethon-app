'use client';

import { Box, Span, Table, Text } from '@chakra-ui/react';
import { Crown } from 'lucide-react';
import { useMemo } from 'react';

import { useTranslations } from '@/hooks/useTranslations';
import { animeIdToName, detectAnimeFromComment } from '@/lib/animePatterns';
import { formatAmountParts } from '@/lib/donationUtils';
import type { Donation } from '@/lib/types';

interface Props {
  donations: Donation[];
  maxCount?: number;
}

export function AnimeWarTable({ donations, maxCount }: Props) {
  const t = useTranslations('dayPage');
  const animeStats = useMemo(
    function aggregateByAnime() {
      const map = new Map<string, { count: number; sumCent: number }>();
      for (const d of donations) {
        const anime = detectAnimeFromComment(d.donor_comment);
        if (!anime) {
          continue;
        }
        const entry = map.get(anime);
        if (entry) {
          entry.count += 1;
          entry.sumCent += d.amount_cent;
        } else {
          map.set(anime, { count: 1, sumCent: d.amount_cent });
        }
      }
      const sorted = Array.from(map.entries())
        .map(([anime, { count, sumCent }]) => ({ anime, count, sumCent }))
        .sort((a, b) => b.sumCent - a.sumCent);
      return maxCount ? sorted.slice(0, maxCount) : sorted;
    },
    [donations, maxCount]
  );

  if (animeStats.length === 0) {
    return (
      <Text color="fg.muted" fontSize="sm">
        No anime donations found.
      </Text>
    );
  }

  return (
    <Table.Root size="sm" variant="outline">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader textAlign="center" w={10} />
          <Table.ColumnHeader>{t('anime')}</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="right">{t('count')}</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="right">{t('total')}</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {animeStats.map((row, i) => (
          <Table.Row _hover={{ bg: { base: 'bg.muted', _dark: 'gray.800' } }} key={row.anime}>
            <Table.Cell>
              <Box display="flex" justifyContent="center">
                {i === 0 ? <Crown color="var(--chakra-colors-yellow-400)" size={16} /> : i + 1}
              </Box>
            </Table.Cell>
            <Table.Cell>{animeIdToName(row.anime)}</Table.Cell>
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
