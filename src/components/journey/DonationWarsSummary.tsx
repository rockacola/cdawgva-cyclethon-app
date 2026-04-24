'use client';

import { Box, Grid, Text } from '@chakra-ui/react';

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

      const title = locale === 'JA' ? (war.titleJa ?? war.title) : war.title;
      rows.push({ amountCent, dayLabel, title });
    }
  }

  return rows;
}

const COL_MOBILE = '72px 1fr 90px';
const COL_DESKTOP = '72px 1fr 90px 80px';

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

  const totalCent = rows.reduce((sum, r) => sum + r.amountCent, 0);

  return (
    <Box borderColor="border" borderWidth="1px">
      {/* Column headers */}
      <Grid
        bg="bg.subtle"
        borderBottomWidth="1px"
        borderColor="border"
        gap={6}
        gridTemplateColumns={{ base: COL_MOBILE, sm: COL_DESKTOP }}
        px={5}
        py={3}
      >
        {[
          t('donationWarsDay'),
          t('donationWarsName'),
          t('donationWarsRaised'),
          t('donationWarsShare'),
        ].map((col, i) => (
          <Text
            color="fg.subtle"
            display={i === 3 ? { base: 'none', sm: 'block' } : undefined}
            fontFamily="mono"
            fontSize="xs"
            key={col}
            letterSpacing="widest"
            textAlign={i === 2 ? 'right' : 'left'}
            textTransform="uppercase"
          >
            {col}
          </Text>
        ))}
      </Grid>

      {rows.map((row, i) => {
        const share = totalCent > 0 ? (row.amountCent / totalCent) * 100 : 0;
        const barWidth = Math.min(share * 4, 100);
        const formatted =
          row.amountCent > 0
            ? `${currencyPrefix}${(row.amountCent / 100).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            : '—';

        return (
          <Grid
            alignItems="center"
            borderBottomWidth={i < rows.length - 1 ? '1px' : undefined}
            borderColor="border"
            gap={6}
            gridTemplateColumns={{ base: COL_MOBILE, sm: COL_DESKTOP }}
            key={i}
            px={5}
            py={3.5}
          >
            <Text color="accent" fontFamily="mono" fontSize="xs" letterSpacing="wide">
              {row.dayLabel}
            </Text>
            <Text fontSize="sm">{row.title}</Text>
            <Text fontFamily="mono" fontSize="xs" textAlign="right">
              {formatted}
            </Text>
            <Box
              bg="bg.subtle"
              display={{ base: 'none', sm: 'block' }}
              h="6px"
              overflow="hidden"
              position="relative"
            >
              <Box
                bg="accent"
                bottom={0}
                left={0}
                opacity={0.85}
                position="absolute"
                top={0}
                w={`${barWidth}%`}
              />
            </Box>
          </Grid>
        );
      })}
    </Box>
  );
}
