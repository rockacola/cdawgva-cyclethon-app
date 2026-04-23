'use client';

import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

import { DonorLeaderboard } from '@/components/DonorLeaderboard';
import { TransactionLeaderboard } from '@/components/TransactionLeaderboard';
import { useDonations } from '@/contexts/DonationsContext';
import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { useDonationsPolling } from '@/hooks/useDonationsPolling';
import { useFormatDayLabel } from '@/hooks/useFormatDayLabel';
import { useTranslations } from '@/hooks/useTranslations';
import { DONATION_REFETCH_INTERVAL } from '@/lib/constants';
import { aggregateByDonor, formatAmountParts, topByTransaction } from '@/lib/donationUtils';
import type { Donation } from '@/lib/types';

function computeStats(donations: Donation[]) {
  if (donations.length === 0) {
    return null;
  }

  const byDonor = aggregateByDonor(donations);
  const byTransaction = topByTransaction(donations);

  const sorted = donations.map((d) => d.amount_cent).sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const medianCent =
    sorted.length % 2 === 0 ? Math.round((sorted[mid - 1] + sorted[mid]) / 2) : sorted[mid];

  const under25Count = donations.filter((d) => d.amount_cent < 2500).length;
  const under25Pct = Math.round((under25Count / donations.length) * 100);

  return {
    medianCent,
    topDonor: byDonor[0],
    topTransaction: byTransaction[0],
    under25Count,
    under25Pct,
  };
}

export function TopDonors() {
  const t = useTranslations('topDonors');
  const formatDayLabel = useFormatDayLabel();
  const { donations } = useDonations();
  const currencyPrefix = useCurrencyPrefix();
  useDonationsPolling(DONATION_REFETCH_INTERVAL);

  const stats = useMemo(() => computeStats(donations), [donations]);

  const topDonorAmount = stats
    ? formatAmountParts(stats.topDonor.amount_cent, currencyPrefix)
    : null;
  const topTxAmount = stats
    ? formatAmountParts(stats.topTransaction.amount_cent, currencyPrefix)
    : null;
  const medianAmount = stats ? formatAmountParts(stats.medianCent, currencyPrefix) : null;

  const topTxDayLabel = stats ? formatDayLabel(stats.topTransaction.completed_at) : null;

  return (
    <Box>
      {/* ── Page header ───────────────────────────── */}
      <Box borderBottomWidth="1px" borderColor="border" py={{ base: 8, md: 12 }}>
        <Flex align="center" gap={3} mb={4}>
          <Box bg="accent" flexShrink={0} h="1px" w={5} />
          <Text
            color="accent"
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="widest"
            textTransform="uppercase"
          >
            {t('sectionLabel')}
          </Text>
        </Flex>

        <Text
          as="h1"
          fontFamily="heading"
          fontSize={{ base: '5xl', md: '7xl' }}
          fontWeight={400}
          letterSpacing="-0.03em"
          lineHeight="0.95"
        >
          {t('headline')}{' '}
          <Box as="em" color="accent" fontStyle="italic">
            {t('headlineAccent')}
          </Box>
        </Text>

        <Text
          color="fg.muted"
          fontSize={{ base: 'md', md: 'lg' }}
          lineHeight={1.55}
          maxW="2xl"
          mt={5}
        >
          {t('description')}
        </Text>
      </Box>

      {/* ── Top-line stats ────────────────────────── */}
      {stats && topDonorAmount && topTxAmount && medianAmount ? (
        <Box borderBottomWidth="1px" borderColor="border" py={8}>
          <Grid
            borderColor="border"
            borderWidth="1px"
            gridTemplateColumns={{ base: '1fr 1fr', md: 'repeat(4, 1fr)' }}
          >
            <Box p={5}>
              <Text
                color="fg.subtle"
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="widest"
                textTransform="uppercase"
              >
                {t('topDonorTotal')}
              </Text>
              <Text
                fontFamily="heading"
                fontSize="3xl"
                fontVariantNumeric="tabular-nums"
                letterSpacing="-0.03em"
                lineHeight={1}
                mt={1}
              >
                {topDonorAmount.whole}
                <Text as="span" color="fg.subtle" fontFamily="heading" fontSize="sm">
                  {topDonorAmount.cents}
                </Text>
              </Text>
              <Text color="fg.subtle" fontFamily="mono" fontSize="xs" mt={1}>
                {stats.topDonor.donor_name} ·{' '}
                {stats.topDonor.count === 1
                  ? t('donation', { count: stats.topDonor.count.toLocaleString() })
                  : t('donationPlural', { count: stats.topDonor.count.toLocaleString() })}
              </Text>
            </Box>

            <Box borderColor="border" borderLeftWidth="1px" p={5}>
              <Text
                color="fg.subtle"
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="widest"
                textTransform="uppercase"
              >
                {t('biggestSingleGift')}
              </Text>
              <Text
                fontFamily="heading"
                fontSize="3xl"
                fontVariantNumeric="tabular-nums"
                letterSpacing="-0.03em"
                lineHeight={1}
                mt={1}
              >
                {topTxAmount.whole}
                <Text as="span" color="fg.subtle" fontFamily="heading" fontSize="sm">
                  {topTxAmount.cents}
                </Text>
              </Text>
              <Text color="fg.subtle" fontFamily="mono" fontSize="xs" mt={1}>
                {stats.topTransaction.donor_name} · {topTxDayLabel}
              </Text>
            </Box>

            <Box borderColor="border" borderLeftWidth="1px" p={5}>
              <Text
                color="fg.subtle"
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="widest"
                textTransform="uppercase"
              >
                {t('medianGift')}
              </Text>
              <Text
                fontFamily="heading"
                fontSize="3xl"
                fontVariantNumeric="tabular-nums"
                letterSpacing="-0.03em"
                lineHeight={1}
                mt={1}
              >
                {medianAmount.whole}
                <Text as="span" color="fg.subtle" fontFamily="heading" fontSize="sm">
                  {medianAmount.cents}
                </Text>
              </Text>
            </Box>

            <Box bg="bg.subtle" borderColor="border" borderLeftWidth="1px" p={5}>
              <Text
                color="fg.subtle"
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="widest"
                textTransform="uppercase"
              >
                {t('under25Gifts')}
              </Text>
              <Text
                fontFamily="heading"
                fontSize="3xl"
                fontVariantNumeric="tabular-nums"
                letterSpacing="-0.03em"
                lineHeight={1}
                mt={1}
              >
                {stats.under25Pct}
                <Text as="span" color="fg.subtle" fontFamily="heading" fontSize="lg">
                  %
                </Text>
              </Text>
              <Text color="fg.subtle" fontFamily="mono" fontSize="xs" mt={1}>
                {t('donationPlural', { count: stats.under25Count.toLocaleString() })}
              </Text>
            </Box>
          </Grid>
        </Box>
      ) : null}

      {/* ── Two-column leaderboards ────────────────── */}
      <Grid
        gap={{ base: 10, md: 16 }}
        py={{ base: 8, md: 10 }}
        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
      >
        <Box>
          <Flex align="center" gap={3} mb={5}>
            <Box bg="accent" flexShrink={0} h="1px" w={5} />
            <Text
              color="accent"
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="widest"
              textTransform="uppercase"
            >
              {t('leaderboardByDonor')}
            </Text>
          </Flex>
          <DonorLeaderboard donations={donations} />
        </Box>

        <Box>
          <Flex align="center" gap={3} mb={5}>
            <Box bg="accent" flexShrink={0} h="1px" w={5} />
            <Text
              color="accent"
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="widest"
              textTransform="uppercase"
            >
              {t('leaderboardSingleBiggest')}
            </Text>
          </Flex>
          <TransactionLeaderboard donations={donations} />
        </Box>
      </Grid>
    </Box>
  );
}
