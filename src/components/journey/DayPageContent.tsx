'use client';

import { Box, Grid, Text } from '@chakra-ui/react';

import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { useDayDonations } from '@/hooks/useDayDonations';
import { useTranslations } from '@/hooks/useTranslations';
import type { DayEntry, JourneyDay } from '@/lib/journey';
import { useLocaleContext } from '@/providers/LocaleProvider';

import { SectionLabel } from '../SectionLabel';

import { DayDonationChart } from './DayDonationChart';
import { DayDonationWar } from './DayDonationWar';
import { DayGuests } from './DayGuests';
import { DayMapEmbed } from './DayMapEmbed';
import { DayMapLocations } from './DayMapLocations';
import { DaySource } from './DaySource';
import { DayStatsGrid } from './DayStatsGrid';
import { DayTopDonations } from './DayTopDonations';
import { DayYouTubeEmbed } from './DayYouTubeEmbed';

interface Props {
  content: DayEntry | undefined;
  day: JourneyDay;
}

export function DayPageContent({ content, day }: Props) {
  const t = useTranslations('dayPage');
  const tNav = useTranslations('dayNav');
  const { resolvedLocale } = useLocaleContext();
  const dateLocale = resolvedLocale === 'JP' ? 'ja-JP' : 'en-US';
  const currencyPrefix = useCurrencyPrefix();

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
    resolvedLocale === 'JP' ? (content?.startPointJa ?? content?.startPoint) : content?.startPoint;
  const destination =
    resolvedLocale === 'JP'
      ? (content?.destinationJa ?? content?.destination)
      : content?.destination;

  const hasRoute = startPoint && destination;
  const hasVideo = content?.youtubeUrl || content?.twitchUrl;
  const hasTelemetry = content?.distanceKm !== undefined;
  const sectionIndex = { map: 1, locations: 0, donations: 0 };
  let counter = 1;
  if (hasTelemetry) {
    counter++;
  }
  if (content?.mapEmbedUrl) {
    sectionIndex.map = counter++;
  }
  if (content?.mapLocations?.length) {
    sectionIndex.locations = counter++;
  }
  sectionIndex.donations = counter;

  return (
    <Box>
      {/* ── Day header ────────────────────────────── */}
      <Box borderBottomWidth="1px" borderColor="border" py={{ base: 8, md: 12 }}>
        <Grid
          alignItems="start"
          gap={{ base: 8, md: 12 }}
          templateColumns={{ base: '1fr', md: '1.3fr 1fr' }}
        >
          {/* Left: info */}
          <Box>
            <Text
              color="fg.subtle"
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="widest"
              mb={3}
              textTransform="uppercase"
            >
              {dateLabel}
            </Text>

            <Text
              color="fg.subtle"
              fontFamily="heading"
              fontSize="xl"
              fontStyle="italic"
              letterSpacing="-0.01em"
              mb={1}
            >
              {dayLabel}
            </Text>

            {hasRoute ? (
              <Text
                as="h1"
                fontFamily="heading"
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight={400}
                letterSpacing="-0.03em"
                lineHeight="0.9"
              >
                {startPoint}{' '}
                <Box as="em" color="accent" fontStyle="italic">
                  →
                </Box>
                <br />
                {destination}
              </Text>
            ) : (
              <Text
                as="h1"
                fontFamily="heading"
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight={400}
                letterSpacing="-0.03em"
                lineHeight="0.9"
              >
                {dayLabel}
              </Text>
            )}

            {/* Fundraise stats */}
            {content?.amountRaised !== undefined && (
              <Grid borderColor="border" borderWidth="1px" gridTemplateColumns="1fr 1fr" mt={7}>
                <Box p={4}>
                  <Text
                    color="fg.subtle"
                    fontFamily="mono"
                    fontSize="xs"
                    letterSpacing="widest"
                    textTransform="uppercase"
                  >
                    {t('dayRaised')}
                  </Text>
                  <Text
                    fontFamily="heading"
                    fontSize="2xl"
                    fontVariantNumeric="tabular-nums"
                    letterSpacing="-0.02em"
                    lineHeight={1}
                    mt={1}
                  >
                    {currencyPrefix}
                    {content.amountRaised.toLocaleString()}
                  </Text>
                </Box>
                {content.totalAmountRaised !== undefined && (
                  <Box bg="bg.subtle" borderColor="border" borderLeftWidth="1px" p={4}>
                    <Text
                      color="fg.subtle"
                      fontFamily="mono"
                      fontSize="xs"
                      letterSpacing="widest"
                      textTransform="uppercase"
                    >
                      {t('totalRaised')}
                    </Text>
                    <Text
                      fontFamily="heading"
                      fontSize="2xl"
                      fontVariantNumeric="tabular-nums"
                      letterSpacing="-0.02em"
                      lineHeight={1}
                      mt={1}
                    >
                      {currencyPrefix}
                      {content.totalAmountRaised.toLocaleString()}
                    </Text>
                  </Box>
                )}
              </Grid>
            )}

            {/* Guest cyclists */}
            {content?.guests?.length ? (
              <Box mt={5}>
                <Text
                  color="fg.subtle"
                  fontFamily="mono"
                  fontSize="xs"
                  letterSpacing="widest"
                  mb={3}
                  textTransform="uppercase"
                >
                  {t('guestCyclists')}
                </Text>
                <DayGuests guests={content.guests} />
              </Box>
            ) : null}
          </Box>

          {/* Right: video */}
          {hasVideo ? (
            <Box>
              <DayYouTubeEmbed twitchUrl={content?.twitchUrl} youtubeUrl={content?.youtubeUrl} />
            </Box>
          ) : null}
        </Grid>
      </Box>

      {/* ── 01 / Ride telemetry ───────────────────── */}
      {hasTelemetry ? (
        <Box borderBottomWidth="1px" borderColor="border" py={8}>
          <SectionLabel>01 / Ride telemetry</SectionLabel>
          <DayStatsGrid
            avgTempCelsius={content!.avgTempCelsius}
            caloriesBurnt={content!.caloriesBurnt}
            distanceKm={content!.distanceKm}
            timeCycling={content!.timeCycling}
            windSpeedMs={content!.windSpeedMs}
          />
        </Box>
      ) : null}

      {/* ── 02 / Route map ────────────────────────── */}
      {content?.mapEmbedUrl ? (
        <Box borderBottomWidth="1px" borderColor="border" py={8}>
          <SectionLabel>{`0${sectionIndex.map} / Route map`}</SectionLabel>
          <DayMapEmbed embedUrl={content.mapEmbedUrl} title={t('routeMap')} />
        </Box>
      ) : null}

      {/* ── 03 / Locations log ────────────────────── */}
      {content?.mapLocations?.length ? (
        <Box borderBottomWidth="1px" borderColor="border" py={8}>
          <SectionLabel>{`0${sectionIndex.locations} / Locations log`}</SectionLabel>
          <DayMapLocations locations={content.mapLocations} />
        </Box>
      ) : null}

      {/* ── 04 / Donations that day ───────────────── */}
      {hasTelemetry ? (
        <Box py={8}>
          <SectionLabel>{`0${sectionIndex.donations} / Donations that day`}</SectionLabel>
          <Box borderColor="border" borderWidth="1px" mb={5}>
            <DayDonationChart dateStr={dateStr} donations={dayDonations} />
          </Box>
          <DayTopDonations dateStr={dateStr} donations={dayDonations} />
          {content!.donationWars?.length ? (
            <Box mt={6}>
              <DayDonationWar donations={dayDonations} wars={content!.donationWars} />
            </Box>
          ) : null}
        </Box>
      ) : null}

      {/* ── Source ────────────────────────────────── */}
      <DaySource
        redditAuthor={content?.redditAuthor}
        redditLabel={content?.redditLabel}
        redditUrl={content?.redditUrl}
      />
    </Box>
  );
}
