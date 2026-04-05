'use client';

import { Box, HStack, Text } from '@chakra-ui/react';

import type { CampaignFact } from '@/lib/types';

interface Props {
  fact: CampaignFact | null;
}

function formatCurrency(cents: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function DonationProgressBar({ fact }: Props) {
  const pct =
    fact && fact.goal_cent > 0
      ? Math.min((fact.total_amount_raised_cent / fact.goal_cent) * 100, 100)
      : 0;

  return (
    <Box mb={6} mt={2}>
      <HStack fontSize="sm" justify="space-between" mb={1}>
        {fact ? (
          <>
            <Text fontWeight="semibold">
              {formatCurrency(fact.total_amount_raised_cent, fact.currency)} raised
            </Text>
            <Text color="fg.muted">Goal: {formatCurrency(fact.goal_cent, fact.currency)}</Text>
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
