import { Box, Container, Heading, Text } from '@chakra-ui/react';
import type { Metadata } from 'next';

import { DonationFeed } from '@/components/DonationFeed';
import { RelativeTime } from '@/components/RelativeTime';
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

        {!!generated_at && (
          <Text color="fg.muted" fontSize={{ base: 'xs', md: 'sm' }} mb={8}>
            Last checked: <RelativeTime iso={generated_at} showUTC />
          </Text>
        )}

        <DonationFeed donations={donations} />
      </Container>
    </Box>
  );
}
