'use client';

import { Box, Text } from '@chakra-ui/react';

import { DonationFeedDesktop } from '@/components/DonationFeedDesktop';
import { DonationFeedMobile } from '@/components/DonationFeedMobile';
import { useTranslations } from '@/hooks/useTranslations';
import type { Donation } from '@/lib/types';

interface Props {
  donations: Donation[];
}

export function DonationFeed({ donations }: Props) {
  const t = useTranslations('donationFeed');

  if (donations.length === 0) {
    return (
      <Text color="gray.500" mt={4}>
        {t('noDonationsYet')}
      </Text>
    );
  }

  return (
    <>
      <Box display={{ base: 'block', md: 'none' }}>
        <DonationFeedMobile donations={donations} />
      </Box>
      <Box display={{ base: 'none', md: 'block' }}>
        <DonationFeedDesktop donations={donations} />
      </Box>
    </>
  );
}
