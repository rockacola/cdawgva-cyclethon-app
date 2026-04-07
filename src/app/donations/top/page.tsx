import { Box, Container } from '@chakra-ui/react';
import type { Metadata } from 'next';

import { TopDonors } from '@/components/TopDonors';

export const metadata: Metadata = {
  title: 'Top Donors | Cyclethon Tracker',
};

export default function TopDonorsPage() {
  return (
    <Box py={{ base: 6, md: 20 }}>
      <Container maxW="4xl" px={{ base: 3, md: 8 }}>
        <TopDonors />
      </Container>
    </Box>
  );
}
