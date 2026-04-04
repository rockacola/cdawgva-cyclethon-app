import { Box, Container, Heading } from '@chakra-ui/react';
import type { Metadata } from 'next';

import { DonationFeedRefresher } from '@/components/DonationFeedRefresher';
import { getDonations } from '@/lib/getDonations';

export const metadata: Metadata = {
  title: 'Donations | Cyclethon Tracker',
};

export default async function DonationsPage() {
  const { generated_at, donations } = await getDonations();

  return (
    <Box py={{ base: 6, md: 20 }}>
      <Container maxW="4xl" px={{ base: 3, md: 8 }}>
        <Heading as="h1" mb={2} size={{ base: 'xl', md: '2xl' }}>
          Donations
        </Heading>

        <DonationFeedRefresher initialDonations={donations} initialGeneratedAt={generated_at} />
      </Container>
    </Box>
  );
}
