'use client';

import { Box, Grid, Span, Text } from '@chakra-ui/react';

import { DonationTime } from '@/components/DonationTime';
import { DonorName } from '@/components/DonorName';
import { RelativeTime } from '@/components/RelativeTime';
import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { useNow } from '@/hooks/useNow';
import { formatAmountParts, getDonationBoxShadow } from '@/lib/donationUtils';
import type { Donation } from '@/lib/types';

export type SortDir = 'asc' | 'desc';
export type SortKey = 'amount' | 'comment' | 'name' | 'time';

interface Props {
  donations: Donation[];
}

const LARGE_AMOUNT_CENT = 10_000; // $100

export function DonationFeedDesktop({ donations }: Props) {
  const currencyPrefix = useCurrencyPrefix();
  const now = useNow(1000);

  return (
    <Box borderColor="border" borderTopWidth="1px">
      {donations.map((d) => {
        const { whole, cents } = formatAmountParts(d.amount_cent, currencyPrefix);
        const isLarge = d.amount_cent >= LARGE_AMOUNT_CENT;
        return (
          <Grid
            _hover={{ bg: 'bg.subtle' }}
            alignItems="baseline"
            borderBottomWidth="1px"
            borderColor="border"
            boxShadow={getDonationBoxShadow(d.completed_at, now, 3)}
            gap={5}
            gridTemplateColumns="140px 1fr 120px"
            key={d.id}
            position="relative"
            py={5}
            transition="box-shadow 0.3s ease"
          >
            {/* Amount */}
            <Text
              color={isLarge ? 'accent' : 'fg'}
              fontFamily="heading"
              fontSize={isLarge ? '2xl' : 'lg'}
              fontVariantNumeric="tabular-nums"
              letterSpacing="-0.01em"
            >
              {whole}
              <Span color="fg.subtle" fontFamily="heading" fontSize="sm">
                {cents}
              </Span>
            </Text>

            {/* Donor + comment */}
            <Box>
              <Text fontSize="sm" fontWeight={500}>
                <DonorName name={d.donor_name} />
              </Text>
              {d.donor_comment ? (
                <Text color="fg.muted" fontSize="sm" fontStyle="italic" lineHeight={1.45} mt={1}>
                  &ldquo;{d.donor_comment}&rdquo;
                </Text>
              ) : null}
            </Box>

            {/* Time */}
            <Text
              color="fg.subtle"
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="wide"
              textAlign="right"
            >
              <RelativeTime timestamp={d.completed_at} />
              <br />
              <DonationTime timestamp={d.completed_at} />
            </Text>
          </Grid>
        );
      })}
    </Box>
  );
}
