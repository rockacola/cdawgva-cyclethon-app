import { Box, HStack, Heading, Stack, Text } from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DayClips } from '@/components/journey/DayClips';
import { DayMapEmbed } from '@/components/journey/DayMapEmbed';
import { DayMapLocations } from '@/components/journey/DayMapLocations';
import { DaySource } from '@/components/journey/DaySource';
import { DayStatsGrid } from '@/components/journey/DayStatsGrid';
import { DayVods } from '@/components/journey/DayVods';
import { getJourneyDay, getJourneyDays } from '@/lib/journey';
import { journeyData } from '@/lib/journey-data';

interface Props {
  params: Promise<{ day: string }>;
}

export function generateStaticParams() {
  return getJourneyDays().map(({ slug }) => ({ day: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { day: slug } = await params;
  const day = getJourneyDay(slug);
  if (!day) {
    return {};
  }
  return { title: `${day.label} | Cyclethon Tracker` };
}

export default async function DayPage({ params }: Props) {
  const { day: slug } = await params;
  const day = getJourneyDay(slug);
  if (!day) {
    notFound();
  }

  const content = journeyData[slug];

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
      {/* Header */}
      <Box>
        <Heading as="h1" mb={1} size={{ base: 'xl', md: '2xl' }}>
          {day.label}
        </Heading>
        <Text color="fg.muted" fontSize="sm" mb={hasRoute ? 3 : 0}>
          {dateLabel}
        </Text>
        {hasRoute ? (
          <HStack color="fg.muted" flexWrap="wrap" fontSize="sm" gap={2}>
            <Text fontWeight="medium">{content?.startPoint}</Text>
            <ArrowRight size={14} />
            <Text fontWeight="medium">{content?.destination}</Text>
          </HStack>
        ) : null}
      </Box>

      {!content ? (
        <Text color="fg.subtle" fontSize="sm">
          No content yet for this day.
        </Text>
      ) : (
        <>
          {/* Stats */}
          {content.stats ? (
            <Box>
              <Text
                color="fg.muted"
                fontSize="xs"
                fontWeight="semibold"
                letterSpacing="wide"
                mb={3}
                textTransform="uppercase"
              >
                Day Stats
              </Text>
              <DayStatsGrid stats={content.stats} />
            </Box>
          ) : null}

          {/* Map */}
          {content.mapEmbedUrl ? (
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
          {content.mapLocations?.length ? (
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

          {/* Videos */}
          <DayVods videoLinks={content.videoLinks} />

          {/* Highlights */}
          <DayClips clips={content.twitchClips} />

          {/* Source attribution */}
          <DaySource author={content.redditAuthor} links={content.redditLinks} />
        </>
      )}
    </Stack>
  );
}
