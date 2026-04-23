'use client';

import { Box, Flex, Grid, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { DonationFeedMobile } from '@/components/DonationFeedMobile';
import { SearchResultRow } from '@/components/SearchResultRow';
import { useDonations } from '@/contexts/DonationsContext';
import { useDonationsPolling } from '@/hooks/useDonationsPolling';
import { useTranslations } from '@/hooks/useTranslations';
import {
  DONATION_REFETCH_INTERVAL,
  SEARCH_PAGE_SIZES,
  SEARCH_PAGE_SIZE_DEFAULT,
} from '@/lib/constants';
import { SORT_OPTIONS, sortDonations } from '@/lib/donationUtils';
import type { SortOption } from '@/lib/donationUtils';

export function DonationSearcher() {
  const t = useTranslations('donationSearch');
  const { donations } = useDonations();
  useDonationsPolling(DONATION_REFETCH_INTERVAL);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(SEARCH_PAGE_SIZE_DEFAULT);
  const [filterAmountMax, setFilterAmountMax] = useState('');
  const [filterAmountMin, setFilterAmountMin] = useState('');
  const [filterText, setFilterText] = useState('');
  const [sort, setSort] = useState<SortOption>('newest');

  function handleFilterChange(value: string) {
    setFilterText(value);
    setPage(1);
  }

  function handleAmountMinChange(value: string) {
    setFilterAmountMin(value);
    setPage(1);
  }

  function handleAmountMaxChange(value: string) {
    setFilterAmountMax(value);
    setPage(1);
  }

  function handleSortChange(value: SortOption) {
    setSort(value);
    setPage(1);
  }

  function handlePageSizeChange(size: number) {
    setPageSize(size);
    setPage(1);
  }

  function clearFilters() {
    setFilterText('');
    setFilterAmountMin('');
    setFilterAmountMax('');
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

  const sorted = sortDonations(filtered, sort);
  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const isFiltered = needle || minCent !== null || maxCent !== null;

  const activeChips = [
    needle && {
      label: `"${filterText}"`,
      onRemove: () => {
        setFilterText('');
        setPage(1);
      },
    },
    minCent !== null && {
      label: `≥ $${filterAmountMin}`,
      onRemove: () => {
        setFilterAmountMin('');
        setPage(1);
      },
    },
    maxCent !== null && {
      label: `≤ $${filterAmountMax}`,
      onRemove: () => {
        setFilterAmountMax('');
        setPage(1);
      },
    },
  ].filter(Boolean) as { label: string; onRemove: () => void }[];

  return (
    <Box>
      {/* ── Page header ───────────────────────────── */}
      <Box borderBottomWidth="1px" borderColor="border" py={{ base: 8, md: 12 }}>
        <Flex align="center" gap={3} mb={4}>
          <Box bg="accent" flexShrink={0} h="1px" w={5} />
          <Text
            color="accent"
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="widest"
            textTransform="uppercase"
          >
            {t('sectionLabel')}
          </Text>
        </Flex>

        <Text
          as="h1"
          fontFamily="heading"
          fontSize={{ base: '5xl', md: '7xl' }}
          fontWeight={400}
          letterSpacing="-0.03em"
          lineHeight="0.95"
        >
          {t('headline')}{' '}
          <Box as="em" color="accent" fontStyle="italic">
            {t('headlineAccent')}
          </Box>
        </Text>

        <Text
          color="fg.muted"
          fontSize={{ base: 'md', md: 'lg' }}
          lineHeight={1.55}
          maxW="2xl"
          mt={5}
        >
          {t('description')}
        </Text>
      </Box>

      {/* ── Filter bar ────────────────────────────── */}
      <Box
        bg="bg.subtle"
        borderBottomWidth="1px"
        borderColor="border"
        px={{ base: 4, md: 8 }}
        py={{ base: 5, md: 7 }}
      >
        <Grid gap={3} gridTemplateColumns={{ base: '1fr', md: '2fr 1fr 1fr' }}>
          <Box>
            <Text
              color="fg.subtle"
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="widest"
              mb={1.5}
              textTransform="uppercase"
            >
              {t('keywordLabel')}
            </Text>
            <Input
              bg="bg"
              borderColor="border"
              borderRadius={0}
              onChange={(e) => handleFilterChange(e.target.value)}
              placeholder={t('searchPlaceholder')}
              size="sm"
              value={filterText}
            />
          </Box>
          <Box>
            <Text
              color="fg.subtle"
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="widest"
              mb={1.5}
              textTransform="uppercase"
            >
              {t('minLabel')}
            </Text>
            <Input
              bg="bg"
              borderColor="border"
              borderRadius={0}
              min={0}
              onChange={(e) => handleAmountMinChange(e.target.value)}
              placeholder={t('minAmount')}
              size="sm"
              type="number"
              value={filterAmountMin}
            />
          </Box>
          <Box>
            <Text
              color="fg.subtle"
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="widest"
              mb={1.5}
              textTransform="uppercase"
            >
              {t('maxLabel')}
            </Text>
            <Input
              bg="bg"
              borderColor="border"
              borderRadius={0}
              min={0}
              onChange={(e) => handleAmountMaxChange(e.target.value)}
              placeholder={t('maxAmount')}
              size="sm"
              type="number"
              value={filterAmountMax}
            />
          </Box>
        </Grid>

        {activeChips.length > 0 && (
          <Flex align="center" flexWrap="wrap" gap={2} mt={4}>
            <Text
              color="fg.subtle"
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="widest"
              textTransform="uppercase"
            >
              {t('activeFiltersLabel')}
            </Text>
            {activeChips.map(({ label, onRemove }) => (
              <Box
                _hover={{ bg: 'bg.muted' }}
                bg="bg"
                borderColor="border.emphasized"
                borderRadius={999}
                borderWidth="1px"
                cursor="pointer"
                fontFamily="mono"
                fontSize="xs"
                key={label}
                letterSpacing="wide"
                onClick={onRemove}
                px={3}
                py={1}
              >
                {label} ✕
              </Box>
            ))}
            <Box flex={1} />
            <Text
              _hover={{ color: 'fg' }}
              color="accent"
              cursor="pointer"
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="widest"
              onClick={clearFilters}
              textTransform="uppercase"
            >
              {t('clearAll')}
            </Text>
          </Flex>
        )}
      </Box>

      {/* ── Results summary + sort ─────────────────── */}
      <Box borderBottomWidth="1px" borderColor="border" py={5}>
        <Flex align="baseline" flexWrap="wrap" gap={4} justify="space-between">
          <Box>
            <Text as="span" fontFamily="heading" fontSize="2xl" letterSpacing="-0.02em">
              {isFiltered
                ? t('resultMatches', { count: sorted.length.toLocaleString() })
                : t('resultDonations', { count: sorted.length.toLocaleString() })}
            </Text>
          </Box>

          <Flex align="center" gap={1}>
            <Text
              color="fg.subtle"
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="widest"
              mr={2}
              textTransform="uppercase"
            >
              {t('sortLabel')}
            </Text>
            {SORT_OPTIONS.map((opt) => (
              <Box
                _hover={{ bg: sort === opt.value ? 'fg' : 'bg.muted' }}
                bg={sort === opt.value ? 'fg' : 'transparent'}
                borderColor={sort === opt.value ? 'fg' : 'border'}
                borderWidth="1px"
                color={sort === opt.value ? 'bg' : 'fg.muted'}
                cursor="pointer"
                fontFamily="mono"
                fontSize="xs"
                key={opt.value}
                letterSpacing="wide"
                onClick={() => handleSortChange(opt.value)}
                px={3}
                py={1.5}
              >
                {t(opt.labelKey)}
              </Box>
            ))}
          </Flex>
        </Flex>
      </Box>

      {/* ── Results ───────────────────────────────── */}
      <Box px={{ base: 4, md: 0 }} py={{ base: 6, md: 8 }}>
        {/* Desktop table */}
        <Box display={{ base: 'none', md: 'block' }}>
          {/* Column headers */}
          <Grid
            borderBottomColor="fg"
            borderBottomWidth="1px"
            gap={6}
            gridTemplateColumns="100px 180px 160px 1fr"
            pb={3}
          >
            {[t('colAmount'), t('colDonor'), t('colWhen'), t('colComment')].map((col, i) => (
              <Text
                color="fg.subtle"
                fontFamily="mono"
                fontSize="xs"
                key={col}
                letterSpacing="widest"
                textAlign={i === 0 ? 'right' : 'left'}
                textTransform="uppercase"
              >
                {col}
              </Text>
            ))}
          </Grid>

          {paginated.map((d) => (
            <SearchResultRow donation={d} key={d.id} />
          ))}

          {paginated.length === 0 && (
            <Text color="fg.subtle" fontFamily="mono" fontSize="sm" mt={6}>
              {t('noResults')}
            </Text>
          )}
        </Box>

        {/* Mobile list */}
        <Box display={{ base: 'block', md: 'none' }}>
          <DonationFeedMobile donations={paginated} />
        </Box>
      </Box>

      {/* ── Pagination ────────────────────────────── */}
      {totalPages > 1 && (
        <Box borderColor="border" borderTopWidth="1px" py={6}>
          <Flex align="center" flexWrap="wrap" gap={4} justify="space-between">
            <Text color="fg.subtle" fontFamily="mono" fontSize="xs" letterSpacing="wide">
              {t('pageOf', { page, total: totalPages })} ·{' '}
              {t('showing', {
                from: (page - 1) * pageSize + 1,
                to: Math.min(page * pageSize, sorted.length),
              })}
            </Text>

            <Flex align="center" gap={1}>
              <Box
                _hover={page > 1 ? { bg: 'bg.muted' } : undefined}
                borderColor="border"
                borderWidth="1px"
                color={page <= 1 ? 'fg.subtle' : 'fg.muted'}
                cursor={page > 1 ? 'pointer' : 'default'}
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="wide"
                onClick={() => {
                  if (page > 1) {
                    setPage((p) => p - 1);
                  }
                }}
                px={3}
                py={1.5}
              >
                {t('prev')}
              </Box>
              <Box
                _hover={page < totalPages ? { bg: 'bg.muted' } : undefined}
                borderColor="border"
                borderWidth="1px"
                color={page >= totalPages ? 'fg.subtle' : 'fg.muted'}
                cursor={page < totalPages ? 'pointer' : 'default'}
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="wide"
                onClick={() => {
                  if (page < totalPages) {
                    setPage((p) => p + 1);
                  }
                }}
                px={3}
                py={1.5}
              >
                {t('next')}
              </Box>
            </Flex>

            <Flex align="center" color="fg.subtle" fontFamily="mono" fontSize="xs" gap={1.5}>
              {SEARCH_PAGE_SIZES.map((n, i) => (
                <Flex align="center" gap={1.5} key={n}>
                  {i > 0 && <Text>|</Text>}
                  <Text
                    _hover={n !== pageSize ? { color: 'fg' } : undefined}
                    color={n === pageSize ? 'fg' : undefined}
                    cursor={n !== pageSize ? 'pointer' : 'default'}
                    fontWeight={n === pageSize ? 'bold' : undefined}
                    onClick={() => handlePageSizeChange(n)}
                  >
                    {n}
                  </Text>
                </Flex>
              ))}
              <Text ml={1}>{t('results')}</Text>
            </Flex>
          </Flex>
        </Box>
      )}
    </Box>
  );
}
