'use client';

import { Box, Grid, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

import { DonorName } from '@/components/DonorName';
import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { useTranslations } from '@/hooks/useTranslations';
import { TOP_DONORS_TABLE_END } from '@/lib/constants';
import { aggregateByDonor, formatAmountParts } from '@/lib/donationUtils';
import type { Donation } from '@/lib/types';

interface Props {
  donations: Donation[];
}

export function DonorLeaderboard({ donations }: Props) {
  const t = useTranslations('topDonors');
  const tc = useTranslations('common');
  const currencyPrefix = useCurrencyPrefix();
  const ranked = useMemo(
    () => aggregateByDonor(donations).slice(0, TOP_DONORS_TABLE_END),
    [donations]
  );

  if (ranked.length === 0) {
    return <Text color="fg.muted">{tc('noDataYet')}</Text>;
  }

  return (
    <Box>
      <Grid
        borderBottomWidth="1px"
        borderColor="fg"
        gap={5}
        gridTemplateColumns="36px 1fr auto"
        pb={2.5}
      >
        <Text
          color="fg.subtle"
          fontFamily="mono"
          fontSize="xs"
          letterSpacing="widest"
          textTransform="uppercase"
        >
          #
        </Text>
        <Text
          color="fg.subtle"
          fontFamily="mono"
          fontSize="xs"
          letterSpacing="widest"
          textTransform="uppercase"
        >
          {t('donor')}
        </Text>
        <Text
          color="fg.subtle"
          fontFamily="mono"
          fontSize="xs"
          letterSpacing="widest"
          textAlign="right"
          textTransform="uppercase"
        >
          {t('total')}
        </Text>
      </Grid>

      {ranked.map((donor, i) => {
        const rank = i + 1;
        const isTop = rank <= 3;
        const { whole, cents } = formatAmountParts(donor.amount_cent, currencyPrefix);
        const giftsLabel =
          donor.count === 1
            ? t('donation', { count: donor.count.toLocaleString() })
            : t('donationPlural', { count: donor.count.toLocaleString() });

        return (
          <Grid
            alignItems="baseline"
            borderBottomWidth="1px"
            borderColor="border"
            gap={5}
            gridTemplateColumns="36px 1fr auto"
            key={donor.donor_name}
            py={4}
          >
            <Text
              color={isTop ? 'accent' : 'fg.subtle'}
              fontFamily="heading"
              fontSize="xl"
              fontVariantNumeric="tabular-nums"
              letterSpacing="-0.02em"
            >
              {rank.toString().padStart(2, '0')}
            </Text>

            <Box>
              <Text fontSize="sm" fontWeight={500}>
                <DonorName name={donor.donor_name} />
              </Text>
              <Text color="fg.subtle" fontFamily="mono" fontSize="xs" mt={0.5}>
                {giftsLabel}
              </Text>
            </Box>

            <Box textAlign="right">
              <Text
                fontFamily="heading"
                fontSize="lg"
                fontVariantNumeric="tabular-nums"
                letterSpacing="-0.02em"
              >
                {whole}
                <Text as="span" color="fg.subtle" fontSize="xs">
                  {cents}
                </Text>
              </Text>
            </Box>
          </Grid>
        );
      })}
    </Box>
  );
}
