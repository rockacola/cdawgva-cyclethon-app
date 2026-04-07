import { Box, Container } from '@chakra-ui/react';
import type { Metadata } from 'next';

import { TopDonors } from '@/components/TopDonors';
import { getDonationsFull } from '@/lib/getDonationsFull';

export const metadata: Metadata = {
  title: 'Top Donors | Cyclethon Tracker',
};

export default async function TopDonorsPage() {
  const { donations } = await getDonationsFull();

  return (
    <Box py={{ base: 6, md: 20 }}>
      <Container maxW="4xl" px={{ base: 3, md: 8 }}>
        <TopDonors initialDonations={donations} />
      </Container>
    </Box>
  );
}
