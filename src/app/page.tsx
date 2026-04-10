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
