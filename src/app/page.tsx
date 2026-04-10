import { Box, Container, HStack, Link, SimpleGrid, Text } from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import NextLink from 'next/link';

import { DonationFeed } from '@/components/DonationFeed';
import { HomeCause } from '@/components/HomeCause';
import { HomeHero } from '@/components/HomeHero';
import { JourneySection } from '@/components/JourneySection';
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

  // MOCK: inject daily totals for chart visualisation — remove this block when real data flows
  const USE_MOCK_DATA = false;
  if (USE_MOCK_DATA) {
    const mockDayAmounts = [
      11900000, 9750000, 12200000, 8830000, 13570000, 10420000, 9180000, 12850000, 11300000,
      8640000, 9970000, 11830000, 10760000, 13240000, 24700000,
    ];
    const dayOneMs = Date.UTC(2026, 3, 5);
    const mockEntry = (date: string, amount_cent: number) => ({
      date,
      by_currency: { USD: { amount_cent, count: Math.ceil(amount_cent / 5000) } },
    });
    stats.stats.daily_totals = [
      mockEntry('2026-04-04', 1785000), // pre-event (~15% of Day 1)
      ...mockDayAmounts.map((amount_cent, i) =>
        mockEntry(new Date(dayOneMs + i * 86_400_000).toISOString().slice(0, 10), amount_cent)
      ),
      mockEntry('2026-04-20', 1428000), // post-event (~12% of Day 1)
    ];
  }
  // END MOCK

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

        {/* Latest Donations */}
        <Box py={{ base: 10, md: 16 }}>
          <Text
            color="fg.muted"
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="wide"
            mb={6}
            textTransform="uppercase"
          >
            Latest Donations
          </Text>
          <DonationFeed donations={donations.slice(0, 10)} />
          <HStack justify="flex-end" mt={4}>
            <Link _hover={{ textDecoration: 'none' }} asChild fontSize="sm">
              <NextLink href="/donations">
                <HStack gap={1}>
                  <Text>View all donations</Text>
                  <ArrowRight size={14} />
                </HStack>
              </NextLink>
            </Link>
          </HStack>
        </Box>
      </Container>
    </>
  );
}
