'use client';

import { Heading, Stack, Text } from '@chakra-ui/react';

import { DonorLeaderboard } from '@/components/DonorLeaderboard';
import { LastChecked } from '@/components/LastChecked';
import { TransactionLeaderboard } from '@/components/TransactionLeaderboard';
import { useDonations } from '@/contexts/DonationsContext';
import { useDonationsPolling } from '@/hooks/useDonationsPolling';
import { useTranslations } from '@/hooks/useTranslations';
import { DONATION_REFETCH_INTERVAL } from '@/lib/constants';

export function TopDonors() {
  const t = useTranslations('topDonors');
  const { donations, isRefreshing, lastCheckedAt } = useDonations();
  useDonationsPolling(DONATION_REFETCH_INTERVAL);

  return (
    <Stack gap={12}>
      <Stack gap={3}>
        <Heading as="h1" size={{ base: 'xl', md: '2xl' }}>
          {t('title')}
        </Heading>
        <Text color="fg.muted" fontSize="sm">
          {t('description')}
        </Text>
        <LastChecked isRefreshing={isRefreshing} timestamp={lastCheckedAt} />
      </Stack>

      <Stack gap={4}>
        <Heading as="h2" size="md">
          {t('byDonor')}
        </Heading>
        <DonorLeaderboard donations={donations} />
      </Stack>

      <Stack gap={4}>
        <Heading as="h2" size="md">
          {t('biggestSingle')}
        </Heading>
        <TransactionLeaderboard donations={donations} />
      </Stack>
    </Stack>
  );
}
