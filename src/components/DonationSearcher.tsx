'use client';

import { Box, Flex, Grid, HStack, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { DonationFeed } from '@/components/DonationFeed';
import type { SortDir, SortKey } from '@/components/DonationFeedDesktop';
import { LastChecked } from '@/components/LastChecked';
import { DONATIONS_FULL_URL, DONATION_REFETCH_INTERVAL } from '@/lib/constants';
import { filterAndWarnCurrency } from '@/lib/donationUtils';
import type { Donation, DonationsData } from '@/lib/types';

const SEARCH_PAGE_SIZES = [10, 30, 60, 100] as const;
const SEARCH_PAGE_SIZE_DEFAULT = 10;

const SORT_LABELS: Record<SortKey, string> = {
  amount: 'Amount',
  comment: 'Comment',
  name: 'Donor',
  time: 'Time',
};

interface Props {
  initialDonations: Donation[];
}

export function DonationSearcher({ initialDonations }: Props) {
  const [donations, setDonations] = useState<Donation[]>(() =>
    filterAndWarnCurrency(initialDonations)
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastCheckedAt, setLastCheckedAt] = useState<number>(() => Math.floor(Date.now() / 1000));
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(SEARCH_PAGE_SIZE_DEFAULT);
  const [filterAmountMax, setFilterAmountMax] = useState('');
  const [filterAmountMin, setFilterAmountMin] = useState('');
  const [filterText, setFilterText] = useState('');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [sortKey, setSortKey] = useState<SortKey | null>(null);

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

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir(key === 'amount' || key === 'time' ? 'desc' : 'asc');
    }
    setPage(1);
  }

  function handleAmountMaxChange(value: string) {
    setFilterAmountMax(value);
    setPage(1);
  }

  function handleAmountMinChange(value: string) {
    setFilterAmountMin(value);
    setPage(1);
  }

  function handleFilterChange(value: string) {
    setFilterText(value);
    setPage(1);
  }

  function handlePageSizeChange(size: number) {
    setPageSize(size);
    setPage(1);
  }

  const needle = filterText.length > 1 ? filterText.toLowerCase() : '';
  const minCent = filterAmountMin !== '' ? parseFloat(filterAmountMin) * 100 : null;
  const maxCent = filterAmountMax !== '' ? parseFloat(filterAmountMax) * 100 : null;

  const filtered = donations.filter((d) => {
    if (needle) {
      const matchesText =
        d.donor_name.toLowerCase().includes(needle) ||
        (d.donor_comment ?? '').toLowerCase().includes(needle);
      if (!matchesText) {
        return false;
      }
    }
    if (minCent !== null && d.amount_cent < minCent) {
      return false;
    }
    if (maxCent !== null && d.amount_cent > maxCent) {
      return false;
    }
    return true;
  });

  const sorted =
    sortKey === null
      ? [...filtered]
      : [...filtered].sort((a, b) => {
          let cmp: number;
          if (sortKey === 'name') {
            cmp = a.donor_name.localeCompare(b.donor_name);
          } else if (sortKey === 'amount') {
            cmp = a.amount_cent - b.amount_cent;
          } else if (sortKey === 'comment') {
            cmp = (a.donor_comment ?? '').localeCompare(b.donor_comment ?? '');
          } else {
            cmp = a.completed_at - b.completed_at;
          }
          return sortDir === 'asc' ? cmp : -cmp;
        });

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const sortControls = (
    <HStack color="fg.muted" fontSize="xs" gap={2}>
      <Text fontWeight="medium">Sort:</Text>
      {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
        <Text
          _hover={{ color: 'fg' }}
          color={sortKey === key ? 'fg' : undefined}
          cursor="pointer"
          fontWeight={sortKey === key ? 'bold' : undefined}
          key={key}
          onClick={() => handleSort(key)}
        >
          {SORT_LABELS[key]}
          {sortKey === key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
        </Text>
      ))}
    </HStack>
  );

  const pageSizeControl = (
    <HStack color="fg.muted" fontSize="xs" gap={1.5} justifyContent="flex-end" whiteSpace="nowrap">
      {SEARCH_PAGE_SIZES.map((n, i) => (
        <HStack gap={1.5} key={n}>
          {i > 0 && <Text>|</Text>}
          {n === pageSize ? (
            <Text fontWeight="bold">{n}</Text>
          ) : (
            <Text _hover={{ color: 'fg' }} cursor="pointer" onClick={() => handlePageSizeChange(n)}>
              {n}
            </Text>
          )}
        </HStack>
      ))}
      <Text>results</Text>
    </HStack>
  );

  const paginationNav =
    totalPages > 1 ? (
      <HStack color="fg.muted" fontSize="xs" gap={3}>
        <Text
          _hover={page > 1 ? { color: 'fg' } : undefined}
          color={page <= 1 ? 'fg.subtle' : undefined}
          cursor={page > 1 ? 'pointer' : 'default'}
          onClick={() => {
            if (page > 1) {
              setPage((p) => p - 1);
            }
          }}
        >
          ← Prev
        </Text>
        <Text>
          Page {page} of {totalPages}
        </Text>
        <Text
          _hover={page < totalPages ? { color: 'fg' } : undefined}
          color={page >= totalPages ? 'fg.subtle' : undefined}
          cursor={page < totalPages ? 'pointer' : 'default'}
          onClick={() => {
            if (page < totalPages) {
              setPage((p) => p + 1);
            }
          }}
        >
          Next →
        </Text>
      </HStack>
    ) : null;

  const isFiltered = needle || minCent !== null || maxCent !== null;
  const resultCount = isFiltered ? (
    <Text color="fg.muted" fontSize="xs">
      {sorted.length} found
    </Text>
  ) : null;

  const desktopBar = (
    <Grid
      alignItems="center"
      display={{ base: 'none', md: 'grid' }}
      gridTemplateColumns="1fr auto 1fr"
    >
      {resultCount ?? <Box />}
      {paginationNav ?? <Box />}
      {pageSizeControl}
    </Grid>
  );

  // Top bar includes sort (mobile only) + pagination + page size
  const topBar = (
    <>
      <Stack display={{ base: 'flex', md: 'none' }} gap={2}>
        {resultCount ? <Flex justifyContent="center">{resultCount}</Flex> : null}
        <Flex justifyContent="center">{sortControls}</Flex>
        {paginationNav ? <Flex justifyContent="center">{paginationNav}</Flex> : null}
        <Flex justifyContent="center">{pageSizeControl}</Flex>
      </Stack>
      {desktopBar}
    </>
  );

  // Bottom bar is pagination + page size only
  const bottomBar = (
    <>
      <Stack display={{ base: 'flex', md: 'none' }} gap={2}>
        {paginationNav ? <Flex justifyContent="center">{paginationNav}</Flex> : null}
        <Flex justifyContent="center">{pageSizeControl}</Flex>
      </Stack>
      {desktopBar}
    </>
  );

  return (
    <Stack gap={6}>
      <Stack gap={3}>
        <Heading as="h1" size={{ base: 'xl', md: '2xl' }}>
          Donation Search
        </Heading>
        <Text color="fg.muted" fontSize="sm">
          Every dollar counts, dig through the full donation history and bask in the glory of an
          incredible community coming together for a great cause!
        </Text>
        <LastChecked isRefreshing={isRefreshing} timestamp={lastCheckedAt} />
      </Stack>

      <Box borderRadius="lg" borderWidth="1px" px={4} py={3}>
        <Stack gap={3}>
          <Text fontSize="xs" fontWeight="semibold" letterSpacing="wide" textTransform="uppercase">
            Filter
          </Text>
          <Input
            _dark={{ bg: 'gray.800' }}
            bg="bg.muted"
            onChange={(e) => handleFilterChange(e.target.value)}
            placeholder="Search by donor name or comment..."
            size="sm"
            value={filterText}
            variant="subtle"
          />
          <HStack gap={3}>
            <Input
              _dark={{ bg: 'gray.800' }}
              bg="bg.muted"
              min={0}
              onChange={(e) => handleAmountMinChange(e.target.value)}
              placeholder="Min amount ($)"
              size="sm"
              type="number"
              value={filterAmountMin}
              variant="subtle"
            />
            <Input
              _dark={{ bg: 'gray.800' }}
              bg="bg.muted"
              min={0}
              onChange={(e) => handleAmountMaxChange(e.target.value)}
              placeholder="Max amount ($)"
              size="sm"
              type="number"
              value={filterAmountMax}
              variant="subtle"
            />
          </HStack>
        </Stack>
      </Box>

      {topBar}

      <DonationFeed
        donations={paginated}
        onSort={handleSort}
        sortDir={sortDir}
        sortKey={sortKey ?? undefined}
      />

      {bottomBar}
    </Stack>
  );
}
