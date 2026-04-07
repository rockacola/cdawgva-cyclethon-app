'use client';

import { Heading, Stack, Text } from '@chakra-ui/react';

import { DonorLeaderboard } from '@/components/DonorLeaderboard';
import { LastChecked } from '@/components/LastChecked';
import { TransactionLeaderboard } from '@/components/TransactionLeaderboard';
import { useDonations } from '@/contexts/DonationsContext';
import { useDonationsPolling } from '@/hooks/useDonationsPolling';
import { DONATION_REFETCH_INTERVAL } from '@/lib/constants';

export function TopDonors() {
  const { donations, isRefreshing, lastCheckedAt } = useDonations();
  useDonationsPolling(DONATION_REFETCH_INTERVAL);

  return (
    <Stack gap={12}>
      <Stack gap={3}>
        <Heading as="h1" size={{ base: 'xl', md: '2xl' }}>
          Top Donors
        </Heading>
        <Text color="fg.muted" fontSize="sm">
          Every donation, big or small, is part of what makes this possible. Together, this
          community is what turns a cycling stream into something that genuinely changes lives.
        </Text>
        <LastChecked isRefreshing={isRefreshing} timestamp={lastCheckedAt} />
      </Stack>

      <Stack gap={4}>
        <Heading as="h2" size="md">
          By Donor
        </Heading>
        <DonorLeaderboard donations={donations} />
      </Stack>

      <Stack gap={4}>
        <Heading as="h2" size="md">
          Biggest Single Donation
        </Heading>
        <TransactionLeaderboard donations={donations} />
      </Stack>
    </Stack>
  );
}
