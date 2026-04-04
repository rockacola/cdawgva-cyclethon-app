import { Box, Container, Heading, Link, Text } from '@chakra-ui/react';
import { ExternalLink } from 'lucide-react';
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
          Supporters
        </Heading>
        <Text color="fg.muted" fontSize="sm" mb={6}>
          A live feed of generosity powering the cyclethon. Want to see your name here? Make your
          donation on{' '}
          <Link href="https://tiltify.com/@cdawgva/cyclethon-5" target="_blank">
            Tiltify <ExternalLink size={10} />
          </Link>
          .
        </Text>

        <DonationFeedRefresher initialDonations={donations} initialGeneratedAt={generated_at} />
      </Container>
    </Box>
  );
}
