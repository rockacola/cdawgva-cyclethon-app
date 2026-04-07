'use client';

import { HStack, Heading, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { DonorLeaderboard } from '@/components/DonorLeaderboard';
import { RelativeTime } from '@/components/RelativeTime';
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
  const [lastCheckedAt, setLastCheckedAt] = useState<number>(() => Math.floor(Date.now() / 1000));

  useEffect(function startPolling() {
    const poll = async () => {
      try {
        const res = await fetch(DONATIONS_FULL_URL, { cache: 'no-store' });
        const data: DonationsData = await res.json();
        setDonations(filterAndWarnCurrency(data.donations));
        setLastCheckedAt(Math.floor(Date.now() / 1000));
      } catch {
        // silently ignore poll failures
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
        <HStack color="fg.muted" fontSize={{ base: 'xs', md: 'sm' }} gap={1}>
          <Text fontWeight="medium"> Last checked:</Text>
          <Text>
            <RelativeTime showAbsoluteTime timestamp={lastCheckedAt} />
          </Text>
        </HStack>
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
