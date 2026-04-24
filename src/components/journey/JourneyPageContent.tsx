'use client';

import { Box, Flex, Grid, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

import { DailyDonationsChart } from '@/components/DailyDonationsChart';
import { PageHeader } from '@/components/PageHeader';
import { useTranslations } from '@/hooks/useTranslations';
import type { GuestCyclist } from '@/lib/journey';
import { KCAL_TO_KJ, KM_TO_MI, formatMinutesToCyclingTime } from '@/lib/unitConversions';

import { SectionLabel } from '../SectionLabel';

import { DayMapEmbed } from './DayMapEmbed';
import { DonationWarsSummary } from './DonationWarsSummary';
import { JourneyGuestsGrid } from './JourneyGuestsGrid';

const OVERVIEW_MAP_EMBED_URL =
  'https://www.google.com/maps/d/embed?mid=1yhO-VfPdYFitzpPWUrikoz_GpB5Z710';

interface Props {
  guests: GuestCyclist[];
  totalCaloriesBurnt: number;
  totalDistanceKm: number;
  totalTimeCycling: number;
}

interface StatCellProps {
  borderLeft?: boolean;
  label: string;
  sub?: string;
  value: string;
}

function StatCell({ borderLeft, label, sub, value }: StatCellProps) {
  return (
    <Box borderColor="border" borderLeftWidth={borderLeft ? '1px' : undefined} p={5}>
      <Text
        color="fg.subtle"
        fontFamily="mono"
        fontSize="xs"
        letterSpacing="widest"
        textTransform="uppercase"
      >
        {label}
      </Text>
      <Text
        fontFamily="heading"
        fontSize="3xl"
        fontVariantNumeric="tabular-nums"
        letterSpacing="-0.03em"
        lineHeight={1}
        mt={1}
      >
        {value}
      </Text>
      {sub ? (
        <Text color="fg.subtle" fontFamily="mono" fontSize="xs" mt={1}>
          {sub}
        </Text>
      ) : null}
    </Box>
  );
}

export function JourneyPageContent({
  guests,
  totalCaloriesBurnt,
  totalDistanceKm,
  totalTimeCycling,
}: Props) {
  const t = useTranslations('journey');
  const tHeader = useTranslations('header');

  const distanceMi = (totalDistanceKm * KM_TO_MI).toFixed(0);
  const kJ = Math.round(totalCaloriesBurnt * KCAL_TO_KJ).toLocaleString();

  return (
    <Box>
      {/* ── Page header ───────────────────────────── */}
      <PageHeader>
        <Flex align="center" gap={3} mb={4}>
          <Box bg="accent" flexShrink={0} h="1px" w={5} />
          <Text
            color="accent"
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="widest"
            textTransform="uppercase"
          >
            {t('sectionLabel')}
          </Text>
        </Flex>

        <Text
          as="h1"
          fontFamily="heading"
          fontSize={{ base: '4xl', md: '7xl' }}
          fontWeight={400}
          letterSpacing="-0.03em"
          lineHeight="0.95"
        >
          {t('headline')}
          <br />
          <Box as="em" color="accent" fontStyle="italic">
            {totalDistanceKm.toFixed(0)} km
          </Box>
          {t('headlineKmSuffix')}
        </Text>

        <Text
          color="fg.muted"
          fontSize={{ base: 'md', md: 'lg' }}
          lineHeight={1.55}
          maxW="2xl"
          mt={5}
        >
          {t('description')}
        </Text>

        <Link
          _hover={{ bg: 'accent', textDecoration: 'none' }}
          asChild
          bg="fg"
          borderRadius="2px"
          color="bg"
          display="inline-flex"
          fontSize="xs"
          fontWeight="semibold"
          letterSpacing="wide"
          mt={6}
          px={3}
          py={1.5}
          textTransform="uppercase"
          transition="background 0.15s"
        >
          <NextLink href="/finish-line">{tHeader('finishLine')}</NextLink>
        </Link>
      </PageHeader>

      {/* ── 01 / Ride totals ──────────────────────── */}
      <Box borderBottomWidth="1px" borderColor="border" py={8}>
        <SectionLabel>{t('sectionRideTotals')}</SectionLabel>
        <Grid
          borderColor="border"
          borderWidth="1px"
          gridTemplateColumns={{ base: '1fr 1fr', md: 'repeat(3, 1fr)' }}
        >
          <StatCell
            label={t('totalDistance')}
            sub={`≈ ${distanceMi} mi`}
            value={`${totalDistanceKm.toFixed(0)} km`}
          />
          <StatCell
            borderLeft
            label={t('totalCyclingTime')}
            value={formatMinutesToCyclingTime(totalTimeCycling)}
          />
          <StatCell
            borderLeft
            label={t('totalCaloriesBurnt')}
            sub={`≈ ${kJ} kJ`}
            value={`${totalCaloriesBurnt.toLocaleString()} kcal`}
          />
        </Grid>
      </Box>

      {/* ── 02 / Guest cyclists ───────────────────── */}
      {guests.length > 0 && (
        <Box borderBottomWidth="1px" borderColor="border" py={8}>
          <SectionLabel>{t('sectionGuestCyclists')}</SectionLabel>
          <JourneyGuestsGrid guests={guests} />
        </Box>
      )}

      {/* ── 03 / Overview map ─────────────────────── */}
      <Box borderBottomWidth="1px" borderColor="border" py={8}>
        <SectionLabel>{t('sectionOverviewMap')}</SectionLabel>
        <DayMapEmbed embedUrl={OVERVIEW_MAP_EMBED_URL} title={t('overviewMapTitle')} />
      </Box>

      {/* ── 04 / Donation curve ───────────────────── */}
      <Box borderBottomWidth="1px" borderColor="border" py={8}>
        <SectionLabel>{t('sectionDonationCurve')}</SectionLabel>
        <DailyDonationsChart />
      </Box>

      {/* ── 05 / Donation wars ────────────────────── */}
      <Box py={8}>
        <SectionLabel>{t('sectionDonationWars')}</SectionLabel>
        <Text color="fg.muted" fontSize="sm" lineHeight={1.6} maxW="lg" mb={5}>
          {t('donationWarsDescription')}
        </Text>
        <DonationWarsSummary />
      </Box>
    </Box>
  );
}
