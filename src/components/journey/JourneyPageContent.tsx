'use client';

import { Box, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { Flame, Route, Timer } from 'lucide-react';

import { JourneySection } from '@/components/JourneySection';
import { useTranslations } from '@/hooks/useTranslations';
import type { GuestCyclist } from '@/lib/journey-data';
import type { CampaignFact } from '@/lib/types';
import { KCAL_TO_KJ, KM_TO_MI, formatMinutesToCyclingTime } from '@/lib/unitConversions';

import { DayMapEmbed } from './DayMapEmbed';
import { DonationWarsSummary } from './DonationWarsSummary';
import { JourneyGuestsGrid } from './JourneyGuestsGrid';
import { StatCard } from './StatCard';

const OVERVIEW_MAP_EMBED_URL =
  'https://www.google.com/maps/d/embed?mid=1yhO-VfPdYFitzpPWUrikoz_GpB5Z710';

interface Props {
  guests: GuestCyclist[];
  initialCampaignFact: CampaignFact | null;
  totalCaloriesBurnt: number;
  totalDistanceKm: number;
  totalTimeCycling: number;
  utcOffset: string;
}

export function JourneyPageContent({
  guests,
  initialCampaignFact,
  totalCaloriesBurnt,
  totalDistanceKm,
  totalTimeCycling,
  utcOffset,
}: Props) {
  const t = useTranslations('journey');

  return (
    <Stack gap={10}>
      <Box>
        <Heading as="h1" mb={3} size={{ base: 'xl', md: '2xl' }}>
          {t('title')}
        </Heading>
        <Text color="fg.muted">{t('description')}</Text>
      </Box>

      <SimpleGrid columns={{ base: 2, md: 3 }} gap={4}>
        <StatCard
          color="#3b82f6"
          conversion={`≈ ${(totalDistanceKm * KM_TO_MI).toFixed(1)} mi`}
          icon={<Route size={16} />}
          label={t('totalDistance')}
          value={`${totalDistanceKm.toFixed(1)} km`}
        />
        <StatCard
          color="#8b5cf6"
          icon={<Timer size={16} />}
          label={t('totalCyclingTime')}
          value={formatMinutesToCyclingTime(totalTimeCycling)}
        />
        <StatCard
          color="#ef4444"
          conversion={`≈ ${Math.round(totalCaloriesBurnt * KCAL_TO_KJ).toLocaleString()} kJ`}
          icon={<Flame size={16} />}
          label={t('totalCaloriesBurnt')}
          value={`${totalCaloriesBurnt.toLocaleString()} kcal`}
        />
      </SimpleGrid>

      {guests.length ? (
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
          <JourneyGuestsGrid guests={guests} />
        </Box>
      ) : null}

      <Box>
        <Text
          color="fg.muted"
          fontSize="xs"
          fontWeight="semibold"
          letterSpacing="wide"
          mb={3}
          textTransform="uppercase"
        >
          {t('overviewMap')}
        </Text>
        <DayMapEmbed embedUrl={OVERVIEW_MAP_EMBED_URL} title={t('overviewMapTitle')} />
      </Box>

      <JourneySection
        borderBottom={false}
        description={null}
        initialCampaignFact={initialCampaignFact}
        label={t('donationsSectionLabel')}
        utcOffset={utcOffset}
      />

      <DonationWarsSummary />
    </Stack>
  );
}
