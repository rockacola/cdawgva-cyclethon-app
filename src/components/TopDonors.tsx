'use client';

import { Heading, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { DonorLeaderboard } from '@/components/DonorLeaderboard';
import { LastChecked } from '@/components/LastChecked';
import { TransactionLeaderboard } from '@/components/TransactionLeaderboard';
import { DONATIONS_FULL_URL, DONATION_REFETCH_INTERVAL } from '@/lib/constants';
import { filterAndWarnCurrency } from '@/lib/donationUtils';
import type { Donation, DonationsData } from '@/lib/types';

interface Props {
  initialDonations: Donation[];
}

export function TopDonors({ initialDonations }: Props) {
  const [donations, setDonations] = useState<Donation[]>(() =>
    filterAndWarnCurrency(initialDonations)
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastCheckedAt, setLastCheckedAt] = useState<number>(() => Math.floor(Date.now() / 1000));

  useEffect(function startPolling() {
    const poll = async () => {
      setIsRefreshing(true);
      try {
        const res = await fetch(DONATIONS_FULL_URL, { cache: 'no-store' });
        const data: DonationsData = await res.json();
        setDonations(filterAndWarnCurrency(data.donations));
        setLastCheckedAt(Math.floor(Date.now() / 1000));
      } catch {
        // silently ignore poll failures
      } finally {
        setIsRefreshing(false);
      }
    };

    const id = setInterval(poll, DONATION_REFETCH_INTERVAL);
    return () => clearInterval(id);
  }, []);

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
