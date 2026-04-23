import { Container } from '@chakra-ui/react';
import type { Metadata } from 'next';

import { DonationSearcher } from '@/components/DonationSearcher';

export const metadata: Metadata = {
  title: 'Search Donations | Cyclethon Tracker',
};

export default function DonationSearchPage() {
  return (
    <Container maxW="960px" px={0}>
      <DonationSearcher />
    </Container>
  );
}
