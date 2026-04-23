import { Container } from '@chakra-ui/react';
import type { Metadata } from 'next';

import { HomeBody } from '@/components/HomeBody';
import { HomeHero } from '@/components/HomeHero';
import { getDonations } from '@/lib/getDonations';
import { getStats } from '@/lib/getStats';

export const metadata: Metadata = {
  title: 'Cyclethon Tracker',
};

export default async function HomePage() {
  const [{ donations }, stats] = await Promise.all([getDonations(), getStats()]);

  return (
    <>
      <HomeHero stats={stats} />

      <Container maxW="5xl" px={{ base: 3, md: 8 }}>
        <HomeBody donations={donations.slice(0, 50)} />
      </Container>
    </>
  );
}
