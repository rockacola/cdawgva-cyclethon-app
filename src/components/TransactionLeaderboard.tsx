'use client';

import { Box, Grid, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

import { DonorName } from '@/components/DonorName';
import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { useFormatDayLabel } from '@/hooks/useFormatDayLabel';
import { useTranslations } from '@/hooks/useTranslations';
import { TOP_DONORS_TABLE_END } from '@/lib/constants';
import { formatAmountParts, topByTransaction } from '@/lib/donationUtils';
import type { Donation } from '@/lib/types';

interface Props {
  donations: Donation[];
}

export function TransactionLeaderboard({ donations }: Props) {
  const t = useTranslations('topDonors');
  const tc = useTranslations('common');
  const formatDayLabel = useFormatDayLabel();
  const currencyPrefix = useCurrencyPrefix();
  const ranked = useMemo(
    () => topByTransaction(donations).slice(0, TOP_DONORS_TABLE_END),
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
          {t('donor')} · {t('comment')}
        </Text>
        <Text
          color="fg.subtle"
          fontFamily="mono"
          fontSize="xs"
          letterSpacing="widest"
          textAlign="right"
          textTransform="uppercase"
        >
          {t('amount')} · {t('when')}
        </Text>
      </Grid>

      {ranked.map((d, i) => {
        const rank = i + 1;
        const isTop = rank <= 3;
        const { whole, cents } = formatAmountParts(d.amount_cent, currencyPrefix);
        const dayLabel = formatDayLabel(d.completed_at);

        return (
          <Grid
            alignItems="start"
            borderBottomWidth="1px"
            borderColor="border"
            gap={5}
            gridTemplateColumns="36px 1fr auto"
            key={d.id}
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
                <DonorName name={d.donor_name} />
              </Text>
              {d.donor_comment ? (
                <Text color="fg.muted" fontSize="sm" fontStyle="italic" lineHeight={1.45} mt={1}>
                  &ldquo;{d.donor_comment}&rdquo;
                </Text>
              ) : (
                <Text color="fg.subtle" fontFamily="mono" fontSize="xs" fontStyle="italic" mt={0.5}>
                  {t('noComment')}
                </Text>
              )}
            </Box>

            <Box textAlign="right">
              <Text
                color="accent"
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
              <Text color="fg.subtle" fontFamily="mono" fontSize="xs" mt={0.5}>
                {dayLabel}
              </Text>
            </Box>
          </Grid>
        );
      })}
    </Box>
  );
}
