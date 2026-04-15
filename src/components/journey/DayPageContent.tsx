'use client';

import { Box, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';

import { useDayDonations } from '@/hooks/useDayDonations';
import { useTranslations } from '@/hooks/useTranslations';
import { flags } from '@/lib/flags';
import type { JourneyDay } from '@/lib/journey';
import type { DayEntry } from '@/lib/journey-data';
import { useLocaleContext } from '@/providers/LocaleProvider';

import { DayClips } from './DayClips';
import { DayDonationChart } from './DayDonationChart';
import { DayDonationWar } from './DayDonationWar';
import { DayGuests } from './DayGuests';
import { DayMapEmbed } from './DayMapEmbed';
import { DayMapLocations } from './DayMapLocations';
import { DaySource } from './DaySource';
import { DayStatsGrid } from './DayStatsGrid';
import { DayTopDonations } from './DayTopDonations';
import { DayYouTubeEmbed } from './DayYouTubeEmbed';
import { FundraiseCard } from './FundraiseCard';

interface Props {
  content: DayEntry | undefined;
  day: JourneyDay;
}

export function DayPageContent({ content, day }: Props) {
  const t = useTranslations('dayPage');
  const tNav = useTranslations('dayNav');
  const { resolvedLocale } = useLocaleContext();
  const dateLocale = resolvedLocale === 'JP' ? 'ja-JP' : 'en-US';

  const dateStr = day.date.toISOString().slice(0, 10);
  const dayDonations = useDayDonations(dateStr);

  const dateLabel = day.date.toLocaleDateString(dateLocale, {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
    weekday: 'long',
    year: 'numeric',
  });

  const dayLabel = tNav('dayLabel', { day: day.day });
  const startPoint =
    resolvedLocale === 'JP' ? (content?.startPointJp ?? content?.startPoint) : content?.startPoint;
  const destination =
    resolvedLocale === 'JP'
      ? (content?.destinationJp ?? content?.destination)
      : content?.destination;
  const hasRoute = startPoint || destination;

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
              {dayLabel}
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
                <Text>{startPoint}</Text>
                <ArrowRight size={20} />
                <Text>{destination}</Text>
              </Stack>
            ) : null}
          </Box>

          {/* Amount raised */}
          {content?.amountRaised !== undefined ? (
            <SimpleGrid columns={2} gap={3}>
              <FundraiseCard
                amount={content.amountRaised}
                currency={content.amountRaisedCurrency}
                label={t('dayRaised')}
              />
              {content.totalAmountRaised !== undefined ? (
                <FundraiseCard
                  amount={content.totalAmountRaised}
                  currency={content.amountRaisedCurrency}
                  label={t('totalRaised')}
                />
              ) : null}
            </SimpleGrid>
          ) : null}

          {/* Guest cyclists */}
          {content?.guests?.length ? (
            <Box>
              <Text
                color="fg.muted"
                fontSize="xs"
                fontWeight="semibold"
                letterSpacing="wide"
                mb={3}
                textTransform="uppercase"
              >
                {t('guestCyclists')}
              </Text>
              <DayGuests guests={content.guests} />
            </Box>
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
            {t('routeMap')}
          </Text>
          <DayMapEmbed embedUrl={content.mapEmbedUrl} title={t('routeMap')} />
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
            {t('locations')}
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
            {t('donationActivity')}
          </Text>
          <Box bg="bg.subtle" borderRadius="md" p={3}>
            <DayDonationChart dateStr={dateStr} donations={dayDonations} />
          </Box>
          <Box mt={4}>
            <DayTopDonations dateStr={dateStr} donations={dayDonations} />
          </Box>
          {content?.donationWars?.length ? (
            <Box mt={4}>
              <DayDonationWar donations={dayDonations} wars={content.donationWars} />
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
