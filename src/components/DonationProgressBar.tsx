'use client';

import { Box, HStack, Text } from '@chakra-ui/react';

import { useAnimatedValue } from '@/hooks/useAnimatedValue';
import { formatCurrency } from '@/lib/donationUtils';
import type { CampaignFact } from '@/lib/types';

interface Props {
  fact: CampaignFact | null;
}

export function DonationProgressBar({ fact }: Props) {
  const raisedCent = useAnimatedValue(fact?.total_amount_raised_cent ?? 0);
  const goalCent = useAnimatedValue(fact?.goal_cent ?? 0);
  const currency = fact?.currency ?? 'USD';

  const pct = goalCent > 0 ? Math.min((raisedCent / goalCent) * 100, 100) : 0;

  return (
    <Box mb={6} mt={2}>
      <HStack fontSize="sm" justify="space-between" mb={1}>
        {fact ? (
          <>
            <Text fontWeight="semibold">{formatCurrency(raisedCent, currency)} raised</Text>
            <Text color="fg.muted">Goal: {formatCurrency(goalCent, currency)}</Text>
          </>
        ) : (
          <Text color="fg.subtle">Funds raised…</Text>
        )}
      </HStack>
      <Box bg={{ base: 'gray.300', _dark: 'gray.700' }} borderRadius="full" h={4} overflow="hidden">
        <Box
          bg={{ base: 'gray.600', _dark: 'gray.300' }}
          borderRadius="full"
          h="100%"
          style={{
            width: `${pct}%`,
            transition: 'width 1s ease-out',
          }}
        />
      </Box>
    </Box>
  );
}
