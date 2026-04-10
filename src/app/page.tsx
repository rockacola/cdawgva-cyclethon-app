import { Container, SimpleGrid } from '@chakra-ui/react';
import type { Metadata } from 'next';

import { HomeCause } from '@/components/HomeCause';
import { HomeHero } from '@/components/HomeHero';
import { JourneySection } from '@/components/JourneySection';
import { LatestDonations } from '@/components/LatestDonations';
import { WhoComing } from '@/components/WhoComing';
import { getCampaignFact } from '@/lib/getCampaignFact';
import { getDonations } from '@/lib/getDonations';
import { getStats } from '@/lib/getStats';

export const metadata: Metadata = {
  title: 'Cyclethon Tracker',
};

export default async function HomePage() {
  const [{ donations }, stats, initialCampaignFact] = await Promise.all([
    getDonations(),
    getStats(),
    getCampaignFact(),
  ]);

  return (
    <>
      {/* Hero */}
      <HomeHero />

      <Container maxW="5xl" px={{ base: 3, md: 8 }}>
        <JourneySection
          initialCampaignFact={initialCampaignFact}
          utcOffset={stats._meta.utc_offset}
        />

        {/* Charity + Guests */}
        <SimpleGrid
          borderBottomWidth="1px"
          columns={{ base: 1, md: 2 }}
          gap={10}
          py={{ base: 10, md: 16 }}
        >
          <HomeCause />
          <WhoComing />
        </SimpleGrid>

        <LatestDonations donations={donations.slice(0, 10)} />
      </Container>
    </>
  );
}
