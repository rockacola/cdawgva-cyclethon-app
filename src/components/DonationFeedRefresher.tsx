'use client';

import { Flex, HStack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';

import { DonationFeed } from '@/components/DonationFeed';
import { LastChecked } from '@/components/LastChecked';
import {
  DONATIONS_URL,
  DONATION_PAGE_SIZES,
  DONATION_PAGE_SIZE_DEFAULT,
  DONATION_REFETCH_INTERVAL,
  STORAGE_KEYS,
} from '@/lib/constants';
import type { Donation, DonationsData } from '@/lib/types';

interface Props {
  initialDonations: Donation[];
  initialGeneratedAt: string;
}

export function DonationFeedRefresher({ initialDonations, initialGeneratedAt }: Props) {
  const [donations, setDonations] = useState(initialDonations);
  const [generatedAt, setGeneratedAt] = useState(initialGeneratedAt);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pageSize, setPageSize] = useLocalStorageState(STORAGE_KEYS.DONATION_PAGE_SIZE, {
    defaultValue: DONATION_PAGE_SIZE_DEFAULT,
  });

  useEffect(function startPolling() {
    const fetchLatest = async () => {
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

    const id = setInterval(fetchLatest, DONATION_REFETCH_INTERVAL);
    return () => clearInterval(id);
  }, []);

  function handlePageSizeChange(value: number) {
    setPageSize(value);
  }

  const sourceData = donations;
  const filteredDonations = sourceData;
  const visibleDonations = filteredDonations.slice(0, pageSize);

  return (
    <>
      {!!generatedAt && (
        <Flex align="center" flexWrap="wrap" gap={2} mb={4}>
          <LastChecked
            isRefreshing={isRefreshing}
            timestamp={Math.floor(new Date(generatedAt).getTime() / 1000)}
          />

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
