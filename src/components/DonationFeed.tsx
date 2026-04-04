import { Box, Text } from '@chakra-ui/react';

import { DonationFeedDesktop } from '@/components/DonationFeedDesktop';
import { DonationFeedMobile } from '@/components/DonationFeedMobile';
import type { Donation } from '@/lib/types';

interface Props {
  donations: Donation[];
}

export function DonationFeed({ donations }: Props) {
  if (donations.length === 0) {
    return (
      <Text color="gray.500" mt={4}>
        No donation data available yet.
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
