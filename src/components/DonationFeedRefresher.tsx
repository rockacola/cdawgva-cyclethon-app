'use client';

import { Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { DonationFeed } from '@/components/DonationFeed';
import { RelativeTime } from '@/components/RelativeTime';
import { DONATIONS_URL, DONATION_REFETCH_INTERVAL } from '@/lib/constants';
import type { Donation, DonationsData } from '@/lib/types';

interface Props {
  initialDonations: Donation[];
  initialGeneratedAt: string;
}

export function DonationFeedRefresher({ initialDonations, initialGeneratedAt }: Props) {
  const [donations, setDonations] = useState(initialDonations);
  const [generatedAt, setGeneratedAt] = useState(initialGeneratedAt);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(function startPolling() {
    const fetchData = async () => {
      setIsRefreshing(true);
      try {
        const res = await fetch(DONATIONS_URL, { cache: 'no-store' });
        const data: DonationsData = await res.json();
        setDonations(data.donations);
        setGeneratedAt(data.generated_at);
      } finally {
        setIsRefreshing(false);
      }
    };

    const id = setInterval(fetchData, DONATION_REFETCH_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {!!generatedAt && (
        <Text color="fg.muted" fontSize={{ base: 'xs', md: 'sm' }} mb={8}>
          Last checked: <RelativeTime iso={generatedAt} showUTC />
          {isRefreshing ? <Spinner color="blue.300" ml={2} size="sm" /> : null}
        </Text>
      )}
      <DonationFeed donations={donations} />
    </>
  );
}
