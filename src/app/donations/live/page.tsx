import { Box, Container } from '@chakra-ui/react';
import type { Metadata } from 'next';

import { DonationLiveFeed } from '@/components/DonationLiveFeed';
import { getDonations } from '@/lib/getDonations';

export const metadata: Metadata = {
  title: 'Live Donations | Cyclethon Tracker',
};

export default async function DonationsLivePage() {
  const { donations } = await getDonations();

  return (
    <Box py={{ base: 6, md: 20 }}>
      <Container maxW="4xl" px={{ base: 3, md: 8 }}>
        <DonationLiveFeed initialDonations={donations} />
      </Container>
    </Box>
  );
}
