'use client';

import { Box, Grid, Span, Text } from '@chakra-ui/react';

import { DonationTime } from '@/components/DonationTime';
import { DonorName } from '@/components/DonorName';
import { RelativeTime } from '@/components/RelativeTime';
import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { useTranslations } from '@/hooks/useTranslations';
import { LARGE_DONATION_CENT } from '@/lib/constants';
import { formatAmountParts } from '@/lib/donationUtils';
import type { Donation } from '@/lib/types';

interface Props {
  donation: Donation;
}

export function SearchResultRow({ donation }: Props) {
  const t = useTranslations('donationSearch');
  const currencyPrefix = useCurrencyPrefix();
  const { whole, cents } = formatAmountParts(donation.amount_cent, currencyPrefix);
  const isLarge = donation.amount_cent >= LARGE_DONATION_CENT;

  return (
    <Grid
      _hover={{ bg: 'bg.subtle' }}
      alignItems="baseline"
      borderBottomWidth="1px"
      borderColor="border"
      gap={6}
      gridTemplateColumns="100px 180px 160px 1fr"
      py={4}
    >
      <Text
        color={isLarge ? 'accent' : 'fg'}
        fontFamily="heading"
        fontSize={isLarge ? '2xl' : 'lg'}
        fontVariantNumeric="tabular-nums"
        letterSpacing="-0.01em"
        textAlign="right"
      >
        {whole}
        <Span color="fg.subtle" fontFamily="heading" fontSize="sm">
          {cents}
        </Span>
      </Text>

      <Text fontSize="sm" fontWeight={500}>
        <DonorName name={donation.donor_name} />
      </Text>

      <Box>
        <Text fontFamily="mono" fontSize="xs" letterSpacing="wide">
          <RelativeTime timestamp={donation.completed_at} />
        </Text>
        <Text color="fg.subtle" fontFamily="mono" fontSize="xs" mt={0.5}>
          <DonationTime timestamp={donation.completed_at} />
        </Text>
      </Box>

      <Text
        color={donation.donor_comment ? 'fg.muted' : 'fg.subtle'}
        fontSize="sm"
        fontStyle={donation.donor_comment ? 'italic' : 'italic'}
        lineHeight={1.5}
      >
        {donation.donor_comment || t('noComment')}
      </Text>
    </Grid>
  );
}
