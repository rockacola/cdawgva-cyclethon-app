import { Box, Container } from '@chakra-ui/react';
import type { Metadata } from 'next';

import { DonationSearcher } from '@/components/DonationSearcher';
import { getDonationsFull } from '@/lib/getDonationsFull';

export const metadata: Metadata = {
  title: 'Search Donations | Cyclethon Tracker',
};

export default async function DonationSearchPage() {
  const { donations } = await getDonationsFull();

  return (
    <Box py={{ base: 6, md: 20 }}>
      <Container maxW="4xl" px={{ base: 3, md: 8 }}>
        <DonationSearcher initialDonations={donations} />
      </Container>
    </Box>
  );
}
