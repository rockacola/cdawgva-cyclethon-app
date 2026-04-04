'use client';

import { Flex, HStack, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { DonationFeed } from '@/components/DonationFeed';
import { RelativeTime } from '@/components/RelativeTime';
import {
  DONATIONS_URL,
  DONATION_PAGE_SIZES,
  DONATION_PAGE_SIZE_DEFAULT,
  DONATION_REFETCH_INTERVAL,
} from '@/lib/constants';
import { STORAGE_KEYS, storage } from '@/lib/storage';
import type { Donation, DonationsData } from '@/lib/types';

interface Props {
  initialDonations: Donation[];
  initialGeneratedAt: string;
}

export function DonationFeedRefresher({ initialDonations, initialGeneratedAt }: Props) {
  const [donations, setDonations] = useState(initialDonations);
  const [generatedAt, setGeneratedAt] = useState(initialGeneratedAt);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pageSize, setPageSize] = useState(() =>
    storage.get(STORAGE_KEYS.DONATION_PAGE_SIZE, DONATION_PAGE_SIZE_DEFAULT)
  );

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

  function handlePageSizeChange(value: number) {
    setPageSize(value);
    storage.set(STORAGE_KEYS.DONATION_PAGE_SIZE, value);
  }

  const visibleDonations = donations.slice(0, pageSize);

  return (
    <>
      {!!generatedAt && (
        <Flex align="center" flexWrap="wrap" gap={2} mb={8}>
          <Text color="fg.muted" fontSize={{ base: 'xs', md: 'sm' }}>
            Last checked:{' '}
            <RelativeTime showUTC timestamp={Math.floor(new Date(generatedAt).getTime() / 1000)} />
            {isRefreshing ? <Spinner color="blue.300" ml={2} size="sm" /> : null}
          </Text>
          <HStack color="fg.muted" fontSize="xs" gap={1.5} ml="auto" whiteSpace="nowrap">
            {DONATION_PAGE_SIZES.map((n, i) => (
              <HStack gap={1.5} key={n}>
                {i > 0 && <Text>|</Text>}
                {n === pageSize ? (
                  <Text fontWeight="bold">{n}</Text>
                ) : (
                  <Text
                    _hover={{ color: 'fg' }}
                    cursor="pointer"
                    onClick={() => handlePageSizeChange(n)}
                  >
                    {n}
                  </Text>
                )}
              </HStack>
            ))}
            <Text>results</Text>
          </HStack>
        </Flex>
      )}
      <DonationFeed donations={visibleDonations} />
    </>
  );
}
