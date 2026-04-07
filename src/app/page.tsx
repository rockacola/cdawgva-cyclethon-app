import {
  Badge,
  Box,
  Container,
  HStack,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import NextLink from 'next/link';

import { DonationFeed } from '@/components/DonationFeed';
import { JourneySection } from '@/components/JourneySection';
import { TrackRecord } from '@/components/TrackRecord';
import { WhoComing } from '@/components/WhoComing';
import { flags } from '@/lib/flags';
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
      <Box bgColor="bg.subtle" borderBottomWidth="1px" py={{ base: 12, md: 20 }}>
        <Container maxW="5xl" px={{ base: 3, md: 8 }}>
          <SimpleGrid alignItems="center" columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 14 }}>
            <Stack gap={5}>
              <HStack flexWrap="wrap" gap={2}>
                <Badge bgColor="indigo.100" color="gray.600" size="sm" variant="subtle">
                  15 Days
                </Badge>
                <Badge bgColor="indigo.100" color="gray.600" size="sm" variant="subtle">
                  Japan · 2026
                </Badge>
              </HStack>
              <Heading as="h1" lineHeight="1.1" size={{ base: '3xl', md: '4xl' }}>
                They're back
                <br />
                On the road
                <br />
                Again.
              </Heading>
              <Text color="fg.muted" fontSize={{ base: 'md', md: 'lg' }}>
                Riders, van gang, guest cyclists, support crew and a whole community behind them.
                Everyone is here raising money for the Immune Deficiency Foundation. It keeps
                getting bigger every year. We keep watching.
              </Text>
            </Stack>
            <Box
              aspectRatio={4 / 3}
              borderRadius="2xl"
              borderWidth="1px"
              overflow="hidden"
              position="relative"
            >
              <Image
                alt="Cyclethon 4"
                fill
                src="/images/cyclethon-4-1.jpg"
                style={{ objectFit: 'cover', filter: 'sepia(0.2) opacity(0.75)' }}
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      <Container maxW="5xl" px={{ base: 3, md: 8 }}>
        {flags.showJourneyProgress ? (
          <JourneySection
            initialCampaignFact={initialCampaignFact}
            utcOffset={stats._meta.utc_offset}
          />
        ) : null}

        {flags.showTrackRecord ? <TrackRecord /> : null}

        {/* Charity + Guests */}
        <SimpleGrid
          borderBottomWidth="1px"
          columns={{ base: 1, md: 2 }}
          gap={10}
          py={{ base: 10, md: 16 }}
        >
          {/* Charity */}
          <Stack gap={4}>
            <Text
              color="fg.muted"
              fontSize="xs"
              fontWeight="semibold"
              letterSpacing="wide"
              textTransform="uppercase"
            >
              The Cause
            </Text>
            <Box
              aspectRatio={16 / 7}
              borderRadius="2xl"
              borderWidth="1px"
              overflow="hidden"
              position="relative"
            >
              <Image
                alt="The Cause"
                fill
                src="/images/cyclethon-4-4.jpg"
                style={{ objectFit: 'cover', filter: 'sepia(0.2) opacity(0.75)' }}
              />
            </Box>
            <Heading as="h2" size="lg">
              Immune Deficiency Foundation
            </Heading>
            <Text color="fg.muted" fontSize="sm">
              The Immune Deficiency Foundation supports people living with primary immunodeficiency,
              with over 450 types of rare, chronic conditions affecting an estimated 500,000
              Americans. On average it takes 9 to 15 years to get a diagnosis. 70 to 90% of those
              with a PI don't even know they have one.
            </Text>
            <Text color="fg.muted" fontSize="sm">
              Every dollar raised goes toward connecting, engaging, and empowering families to live
              longer, stronger, and healthier lives.{' '}
              <Link
                fontSize="sm"
                href="https://primaryimmune.org/get-involved/raise-awareness-and-funds-idf/diy-gaming"
                rel="noopener noreferrer"
                target="_blank"
              >
                Learn how to get involved.
              </Link>
            </Text>
          </Stack>

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
