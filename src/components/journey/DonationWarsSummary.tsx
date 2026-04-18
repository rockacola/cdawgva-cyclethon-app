'use client';

import { Box, Table, Text } from '@chakra-ui/react';

import { useDonations } from '@/contexts/DonationsContext';
import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { useTranslations } from '@/hooks/useTranslations';
import { journeyData } from '@/lib/journey-data';
import { useLocaleContext } from '@/providers/LocaleProvider';

interface WarSummaryRow {
  amountCent: number;
  dayLabel: string;
  title: string;
}

function buildWarRows(
  donations: ReturnType<typeof useDonations>['donations'],
  locale: string,
  tDay: (key: string, params?: Record<string, string | number>) => string
): WarSummaryRow[] {
  const rows: WarSummaryRow[] = [];

  for (const day of journeyData) {
    if (!day.donationWars?.length) {
      continue;
    }
    const dayNumber = parseInt(day.dayKey.replace('day-', ''), 10);
    const dayLabel = tDay('dayLabel', { day: dayNumber });

    for (const war of day.donationWars) {
      const amountCent = donations
        .filter((d) => d.completed_at >= war.startTimestamp && d.completed_at <= war.endTimestamp)
        .reduce((sum, d) => sum + d.amount_cent, 0);

      const title = locale === 'JP' ? (war.titleJa ?? war.title) : war.title;
      rows.push({ amountCent, dayLabel, title });
    }
  }

  return rows;
}

export function DonationWarsSummary() {
  const { donations } = useDonations();
  const { resolvedLocale } = useLocaleContext();
  const currencyPrefix = useCurrencyPrefix();
  const t = useTranslations('journey');
  const tDay = useTranslations('dayNav');

  const rows = buildWarRows(donations, resolvedLocale, tDay);

  if (!rows.length) {
    return null;
  }

  return (
    <Box>
      <Text
        color="fg.muted"
        fontSize="xs"
        fontWeight="semibold"
        letterSpacing="wide"
        mb={3}
        textTransform="uppercase"
      >
        {t('donationWarsSectionLabel')}
      </Text>
      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>{t('donationWarsDay')}</Table.ColumnHeader>
            <Table.ColumnHeader>{t('donationWarsName')}</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="right">{t('donationWarsRaised')}</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row, i) => (
            <Table.Row key={i}>
              <Table.Cell color="fg.muted" whiteSpace="nowrap">
                {row.dayLabel}
              </Table.Cell>
              <Table.Cell>{row.title}</Table.Cell>
              <Table.Cell textAlign="right" whiteSpace="nowrap">
                {row.amountCent > 0
                  ? `${currencyPrefix}${(row.amountCent / 100).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
                  : '—'}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
