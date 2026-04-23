import { Container } from '@chakra-ui/react';
import type { Metadata } from 'next';

import { TopDonors } from '@/components/TopDonors';

export const metadata: Metadata = {
  title: 'Top Donors | Cyclethon Tracker',
};

export default function TopDonorsPage() {
  return (
    <Container maxW="960px" px={0}>
      <TopDonors />
    </Container>
  );
}
