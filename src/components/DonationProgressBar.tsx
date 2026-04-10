'use client';

import { Box, HStack, Text } from '@chakra-ui/react';

import { useAnimatedValue } from '@/hooks/useAnimatedValue';
import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { formatAmountParts } from '@/lib/donationUtils';
import type { CampaignFact } from '@/lib/types';

interface Props {
  fact: CampaignFact | null;
  mb?: number;
}

export function DonationProgressBar({ fact, mb = 6 }: Props) {
  const currencyPrefix = useCurrencyPrefix();
  const raisedCent = useAnimatedValue(fact?.total_amount_raised_cent ?? 0);
  const goalCent = useAnimatedValue(fact?.goal_cent ?? 0);
  const { whole: raisedWhole } = formatAmountParts(raisedCent, currencyPrefix);
  const { whole: goalWhole } = formatAmountParts(goalCent, currencyPrefix);

  const percentage = goalCent > 0 ? Math.min((raisedCent / goalCent) * 100, 100) : 0;

  return (
    <Box mb={mb} mt={2}>
      <HStack fontSize="sm" justify="space-between" mb={1}>
        {fact ? (
          <>
            <Text fontWeight="semibold">{raisedWhole} raised</Text>
            <Text color="fg.muted">Current goal: {goalWhole}</Text>
          </>
        ) : (
          <Text color="fg.subtle">Funds raised…</Text>
        )}
      </HStack>
      <Box
        bgColor={{ base: 'gray.200', _dark: 'gray.700' }}
        borderRadius="full"
        h={4}
        overflow="hidden"
      >
        <Box
          bgColor={{ base: 'orange.500', _dark: 'orange.400' }}
          borderRadius="full"
          h="100%"
          transition="width 1s ease-out"
          w={`${percentage}%`}
        />
      </Box>
    </Box>
  );
}
