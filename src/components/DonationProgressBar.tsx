'use client';

import { Box, HStack, Text } from '@chakra-ui/react';

import { useAnimatedValue } from '@/hooks/useAnimatedValue';
import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { useTranslations } from '@/hooks/useTranslations';
import { formatAmountParts } from '@/lib/donationUtils';
import type { CampaignFact } from '@/lib/types';

interface Props {
  fact: CampaignFact | null;
}

export function DonationProgressBar({ fact }: Props) {
  const t = useTranslations('donationProgress');
  const currencyPrefix = useCurrencyPrefix();
  const raisedCent = useAnimatedValue(fact?.total_amount_raised_cent ?? 0);
  const goalCent = useAnimatedValue(fact?.goal_cent ?? 0);
  const { whole: raisedWhole } = formatAmountParts(raisedCent, currencyPrefix);
  const { whole: goalWhole } = formatAmountParts(goalCent, currencyPrefix);

  const percentage = goalCent > 0 ? Math.min((raisedCent / goalCent) * 100, 100) : 0;

  return (
    <Box mt={2}>
      <HStack fontSize="xs" justify="space-between" mb={1}>
        {fact ? (
          <>
            <Text fontWeight="semibold">{t('raised', { amount: raisedWhole })}</Text>
            <Text color="fg.muted" textAlign="right">
              {t('currentGoal', { goal: goalWhole })}
            </Text>
          </>
        ) : (
          <Text color="fg.subtle">{t('fundsRaised')}</Text>
        )}
      </HStack>
      <Box
        bgColor="bg.subtle"
        borderColor="border"
        borderRadius="2px"
        borderWidth="1px"
        h={2}
        overflow="hidden"
      >
        <Box bgColor="accent" h="100%" transition="width 1s ease-out" w={`${percentage}%`} />
      </Box>
    </Box>
  );
}
