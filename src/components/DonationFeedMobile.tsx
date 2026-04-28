'use client';

import { Box, Stack, Text } from '@chakra-ui/react';

import { DonationTime } from '@/components/DonationTime';
import { DonorName } from '@/components/DonorName';
import { RelativeTime } from '@/components/RelativeTime';
import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { formatAmount } from '@/lib/donationUtils';
import type { Donation } from '@/lib/types';

interface Props {
  donations: Donation[];
}

const GLOW_DURATION_MS = 30_000;

export function DonationFeedMobile({ donations }: Props) {
  const currencyPrefix = useCurrencyPrefix();
  const renderNow = Date.now();

  return (
    <Stack borderRadius="sm" borderWidth="1px" gap={0} overflow="hidden">
      {donations.map((d) => {
        const ageMs = renderNow - d.completed_at * 1000;
        const glowStyle =
          ageMs < GLOW_DURATION_MS
            ? {
                animation: `donation-glow ${GLOW_DURATION_MS}ms linear`,
                animationDelay: `-${ageMs}ms`,
              }
            : undefined;
        return (
          <Box
            _hover={{ bg: 'bg.muted' }}
            _last={{ borderBottomWidth: 0 }}
            borderBottomWidth="1px"
            key={d.id}
            px={2}
            py={1.5}
            style={glowStyle}
          >
            <Box alignItems="baseline" display="flex" justifyContent="space-between">
              <Text fontSize="xs" fontWeight="semibold">
                <DonorName name={d.donor_name} />
              </Text>
              <Text fontSize="xs" fontWeight="semibold">
                {formatAmount(d.amount_cent, currencyPrefix)}
              </Text>
            </Box>
            {d.donor_comment ? (
              <Text color="fg.muted" fontSize="xs">
                {d.donor_comment}{' '}
              </Text>
            ) : null}
            <Text color="fg.subtle" fontSize="xs">
              <RelativeTime timestamp={d.completed_at} />
              {' · '}
              <DonationTime timestamp={d.completed_at} />
            </Text>
          </Box>
        );
      })}
    </Stack>
  );
}
