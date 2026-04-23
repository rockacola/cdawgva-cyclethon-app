import { Container } from '@chakra-ui/react';
import type { Metadata } from 'next';

import { AboutCyclethonContent } from '@/components/AboutCyclethonContent';

export const metadata: Metadata = {
  title: 'About Cyclethon | Cyclethon Tracker',
};

export default function AboutCyclethonPage() {
  return (
    <Container maxW="960px" px={0}>
      <AboutCyclethonContent />
    </Container>
  );
}
