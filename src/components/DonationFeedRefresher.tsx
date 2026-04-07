'use client';

import { Flex, HStack, Input, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';

import { DonationFeed } from '@/components/DonationFeed';
import { RelativeTime } from '@/components/RelativeTime';
import {
  DONATIONS_FULL_URL,
  DONATIONS_URL,
  DONATION_PAGE_SIZES,
  DONATION_PAGE_SIZE_DEFAULT,
  DONATION_REFETCH_INTERVAL,
  STORAGE_KEYS,
} from '@/lib/constants';
import { flags } from '@/lib/flags';
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

  const [commentFilter, setCommentFilter] = useState('');
  const [fullDonations, setFullDonations] = useState<Donation[] | null>(null);
  const [isLoadingFull, setIsLoadingFull] = useState(false);
  const hasFetchedFull = useRef(false);

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

  async function handleCommentFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setCommentFilter(value);

    if (value && !hasFetchedFull.current) {
      hasFetchedFull.current = true;
      setIsLoadingFull(true);
      try {
        const res = await fetch(DONATIONS_FULL_URL, { cache: 'no-store' });
        const data: DonationsData = await res.json();
        setFullDonations(data.donations);
      } finally {
        setIsLoadingFull(false);
      }
    }
  }

  function handlePageSizeChange(value: number) {
    setPageSize(value);
  }

  const isFiltering = flags.donationFilter && commentFilter.trim().length > 0;
  const sourceData = isFiltering && fullDonations ? fullDonations : donations;
  const filteredDonations = isFiltering
    ? sourceData.filter((d) => d.donor_comment?.toLowerCase().includes(commentFilter.toLowerCase()))
    : sourceData;
  const visibleDonations = isFiltering ? filteredDonations : filteredDonations.slice(0, pageSize);

  return (
    <>
      {!!generatedAt && (
        <Flex align="center" flexWrap="wrap" gap={2} mb={4}>
          <HStack color="fg.muted" fontSize={{ base: 'xs', md: 'sm' }} gap={1}>
            <Text fontWeight="medium"> Last checked:</Text>
            <HStack gap={1}>
              <RelativeTime
                showAbsoluteTime
                timestamp={Math.floor(new Date(generatedAt).getTime() / 1000)}
              />
              {isRefreshing ? <Spinner color="blue.300" ml={2} size="sm" /> : null}
            </HStack>
          </HStack>

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

      {flags.donationFilter ? (
        <>
          <Flex align="center" gap={2} mb={6} position="relative">
            <Input
              onChange={handleCommentFilterChange}
              placeholder="Filter by comment…"
              size="sm"
              value={commentFilter}
            />
            {isLoadingFull ? <Spinner position="absolute" right={3} size="xs" /> : null}
          </Flex>

          {isFiltering ? (
            <Text color="fg.muted" fontSize="xs" mb={4}>
              {filteredDonations.length} match{filteredDonations.length !== 1 ? 'es' : ''}
              {isLoadingFull ? ' (loading full dataset…)' : ''}
            </Text>
          ) : null}
        </>
      ) : null}

      <DonationFeed donations={visibleDonations} />
    </>
  );
}
