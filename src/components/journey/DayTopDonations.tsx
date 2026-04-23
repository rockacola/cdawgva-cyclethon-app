'use client';

import { Box, Grid, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

import { DonorName } from '@/components/DonorName';
import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { useTranslations } from '@/hooks/useTranslations';
import { formatAmountParts, getTopDonationsForDay } from '@/lib/donationUtils';
import { getJSTDayBounds } from '@/lib/timezoneUtils';
import type { Donation } from '@/lib/types';

interface Props {
  dateStr: string;
  donations: Donation[];
}

const COL = '160px 1fr 90px';

export function DayTopDonations({ dateStr, donations }: Props) {
  const currencyPrefix = useCurrencyPrefix();
  const t = useTranslations('dayPage');

  const topDonations = useMemo(
    function computeTopDonations() {
      const { end, start } = getJSTDayBounds(dateStr);
      return getTopDonationsForDay(donations, start, end);
    },
    [donations, dateStr]
  );

  if (topDonations.length === 0) {
    return null;
  }

  return (
    <Box borderColor="border" borderWidth="1px" overflow="hidden">
      {/* Column headers */}
      <Grid
        bg="bg.subtle"
        borderBottomWidth="1px"
        borderColor="border"
        gap={6}
        gridTemplateColumns={COL}
        px={5}
        py={3}
      >
        {[t('donor'), t('total'), t('amount')].map((col, i) => (
          <Text
            color="fg.subtle"
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

      {topDonations.map((d, i) => {
        const { whole, cents } = formatAmountParts(d.amount_cent, currencyPrefix);
        return (
          <Grid
            alignItems="baseline"
            borderBottomWidth={i < topDonations.length - 1 ? '1px' : undefined}
            borderColor="border"
            gap={6}
            gridTemplateColumns={COL}
            key={d.id}
            px={5}
            py={3.5}
          >
            <Text fontSize="sm" fontWeight={500}>
              <DonorName name={d.donor_name} />
            </Text>
            {d.donor_comment ? (
              <Text color="fg.muted" fontSize="sm" fontStyle="italic" lineHeight={1.4}>
                {d.donor_comment}
              </Text>
            ) : (
              <Text color="fg.subtle" fontFamily="mono" fontSize="xs" fontStyle="italic">
                —
              </Text>
            )}
            <Text color="accent" fontFamily="mono" fontSize="sm" textAlign="right">
              {whole}
              <Text as="span" color="fg.subtle" fontSize="xs">
                {cents}
              </Text>
            </Text>
          </Grid>
        );
      })}
    </Box>
  );
}
