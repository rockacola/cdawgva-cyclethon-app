'use client';

import { Box, HStack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useState } from 'react';

import { DonationFeed } from '@/components/DonationFeed';
import { useTranslations } from '@/hooks/useTranslations';
import type { Donation } from '@/lib/types';

type FilterKey = 'all' | 'commented' | 'over100' | 'over500' | 'anonymous';

function applyFilter(donations: Donation[], filter: FilterKey): Donation[] {
  switch (filter) {
    case 'commented':
      return donations.filter((d) => d.donor_comment !== null && d.donor_comment !== '');
    case 'over100':
      return donations.filter((d) => d.amount_cent >= 10000);
    case 'anonymous':
      return donations.filter((d) => !d.donor_name || d.donor_name.toLowerCase() === 'anonymous');
    default:
      return donations;
  }
}

interface Props {
  donations: Donation[];
}

export function LatestDonations({ donations }: Props) {
  const t = useTranslations('donationFeed');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filters: { key: FilterKey; label: string }[] = [
    { key: 'all', label: t('filterAll') },
    { key: 'commented', label: t('filterCommented') },
    { key: 'over100', label: t('filterOver100') },
    { key: 'anonymous', label: t('filterAnonymous') },
  ];

  const filtered = applyFilter(donations, activeFilter);

  return (
    <Box>
      {/* Filter chips */}
      <HStack flexWrap="wrap" gap={2} mb={6}>
        {filters.map(({ key, label }) => {
          const isActive = activeFilter === key;
          return (
            <Box
              _hover={{ borderColor: 'accent', color: 'fg' }}
              as="button"
              bg={isActive ? 'accent' : 'transparent'}
              borderColor={isActive ? 'accent' : 'border'}
              borderRadius="full"
              borderWidth="1px"
              color={isActive ? 'bg' : 'fg.muted'}
              cursor="pointer"
              fontFamily="mono"
              fontSize="xs"
              key={key}
              letterSpacing="widest"
              onClick={() => setActiveFilter(key)}
              px={3}
              py={1}
              textTransform="uppercase"
              transition="all 0.12s"
            >
              {label}
            </Box>
          );
        })}
      </HStack>

      <DonationFeed donations={filtered.slice(0, 20)} />

      <HStack justify="flex-end" mt={4}>
        <Link
          asChild
          borderBottomColor="accent"
          borderBottomWidth="1px"
          color="fg"
          fontFamily="mono"
          fontSize="xs"
          pb={0.5}
          textDecoration="none"
        >
          <NextLink href="/donations/search">{t('viewAll')} →</NextLink>
        </Link>
      </HStack>
    </Box>
  );
}
