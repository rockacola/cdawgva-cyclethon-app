import { Box, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';

import { DayClips } from '@/components/journey/DayClips';
import { DayDonationChart } from '@/components/journey/DayDonationChart';
import { DayDonationWar } from '@/components/journey/DayDonationWar';
import { DayMapEmbed } from '@/components/journey/DayMapEmbed';
import { DayMapLocations } from '@/components/journey/DayMapLocations';
import { DaySource } from '@/components/journey/DaySource';
import { DayStatsGrid } from '@/components/journey/DayStatsGrid';
import { DayTopDonations } from '@/components/journey/DayTopDonations';
import { DayYouTubeEmbed } from '@/components/journey/DayYouTubeEmbed';
import { FundraiseCard } from '@/components/journey/FundraiseCard';
import { flags } from '@/lib/flags';
import { getJourneyDay } from '@/lib/journey';
import { journeyData } from '@/lib/journey-data';

interface Props {
  params: Promise<{ day: string }>;
}

export default async function DayPage({ params }: Props) {
  const { day: slug } = await params;
  const day = getJourneyDay(slug);
  if (!day) {
    notFound();
  }

  const content = journeyData.find((d) => d.dayKey === slug);

  const dateLabel = day.date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
    weekday: 'long',
    year: 'numeric',
  });

  const hasRoute = content?.startPoint || content?.destination;

  return (
    <Stack gap={10}>
      <Stack align="flex-start" direction={{ base: 'column', lg: 'row' }} gap={6}>
        {/* Left: header + amounts */}
        <Stack flex={1} gap={5} minW={0} width="100%">
          {/* Header */}
          <Box>
            <Text color="fg.muted" fontSize="sm" mb={1}>
              {dateLabel}
            </Text>
            <Heading as="h1" mb={hasRoute ? 3 : 0} size={{ base: 'xl', md: '2xl' }}>
              {day.label}
            </Heading>
            {hasRoute ? (
              <Stack
                alignItems="center"
                direction="row"
                flexWrap="wrap"
                fontSize={{ base: 'xl', md: '2xl' }}
                fontWeight="bold"
                gap={2}
              >
                <Text>{content?.startPoint}</Text>
                <ArrowRight size={20} />
                <Text>{content?.destination}</Text>
              </Stack>
            ) : null}
          </Box>

          {/* Amount raised */}
          {content?.amountRaised !== undefined ? (
            <SimpleGrid columns={2} gap={3}>
              <FundraiseCard
                amount={content.amountRaised}
                currency={content.amountRaisedCurrency}
                label="Day Raised"
              />
              {content.totalAmountRaised !== undefined ? (
                <FundraiseCard
                  amount={content.totalAmountRaised}
                  currency={content.amountRaisedCurrency}
                  label="Total Raised"
                />
              ) : null}
            </SimpleGrid>
          ) : null}
        </Stack>

        {/* Right: YouTube thumbnail */}
        {content?.youtubeUrl ? (
          <Box flexShrink={0} w={{ base: '100%', lg: '280px' }}>
            <DayYouTubeEmbed twitchUrl={content.twitchUrl} youtubeUrl={content.youtubeUrl} />
          </Box>
        ) : null}
      </Stack>

      {/* Stats */}
      {content?.distanceKm !== undefined ? (
        <DayStatsGrid
          avgTempCelsius={content.avgTempCelsius!}
          caloriesBurnt={content.caloriesBurnt!}
          distanceKm={content.distanceKm}
          timeCycling={content.timeCycling!}
          windSpeedMs={content.windSpeedMs}
        />
      ) : null}

      {/* Map */}
      {content?.mapEmbedUrl ? (
        <Box>
          <Text
            color="fg.muted"
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="wide"
            mb={3}
            textTransform="uppercase"
          >
            Route Map
          </Text>
          <DayMapEmbed embedUrl={content.mapEmbedUrl} />
        </Box>
      ) : null}

      {/* Locations */}
      {content?.mapLocations?.length ? (
        <Box>
          <Text
            color="fg.muted"
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="wide"
            mb={3}
            textTransform="uppercase"
          >
            Locations
          </Text>
          <DayMapLocations locations={content.mapLocations} />
        </Box>
      ) : null}

      {/* Donation activity + top donations */}
      {content?.distanceKm !== undefined ? (
        <Box>
          <Text
            color="fg.muted"
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="wide"
            mb={3}
            textTransform="uppercase"
          >
            Donation Activity
          </Text>
          <Box bg="bg.subtle" borderRadius="md" p={3}>
            <DayDonationChart dateStr={day.date.toISOString().slice(0, 10)} />
          </Box>
          <Box mt={4}>
            <DayTopDonations dateStr={day.date.toISOString().slice(0, 10)} />
          </Box>
          {content?.donationWars?.length ? (
            <Box mt={4}>
              <DayDonationWar wars={content.donationWars} />
            </Box>
          ) : null}
        </Box>
      ) : null}

      {/* Highlights */}
      {flags.showJourneyHighlightVods ? <DayClips clips={content?.twitchClips} /> : null}

      {/* Source attribution */}
      <DaySource
        redditAuthor={content?.redditAuthor}
        redditLabel={content?.redditLabel}
        redditUrl={content?.redditUrl}
      />
    </Stack>
  );
}
