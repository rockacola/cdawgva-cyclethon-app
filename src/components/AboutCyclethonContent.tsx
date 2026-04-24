'use client';

import { Box, Flex, Grid, Text } from '@chakra-ui/react';

import { CyclethonGrowthChart } from '@/components/CyclethonGrowthChart';
import { DonateLinkButton } from '@/components/DonateLinkButton';
import type { Edition } from '@/components/EditionsByRaiseChart';
import { EditionsByRaiseChart } from '@/components/EditionsByRaiseChart';
import { PageHeader } from '@/components/PageHeader';
import { SectionLabel } from '@/components/SectionLabel';
import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { useTranslations } from '@/hooks/useTranslations';
import { cyclethonHistory } from '@/lib/cyclethonHistory';

const EDITION_META = [
  { distanceKm: 750, edition: '1', route: 'Wakkanai → Hakodate', routeJa: '稚内 → 函館' },
  { distanceKm: 850, edition: '2', route: 'Fukuoka → Kitakyushu', routeJa: '福岡 → 北九州' },
  { distanceKm: 1200, edition: '3', route: 'Shimonoseki → Tokyo', routeJa: '下関 → 東京' },
  { distanceKm: 1300, edition: '4', route: 'Cape Nosappu → Tokyo', routeJa: '納沙布岬 → 東京' },
  { distanceKm: 1200, edition: '5', route: 'Cape Oma → Osaka', routeJa: '大間 → 大阪' },
];

const EDITIONS: Edition[] = cyclethonHistory.map((series, i) => {
  const nonNull = series.dailyTotals.filter((v): v is number => v !== null);
  return {
    days: nonNull.length,
    edition: EDITION_META[i].edition,
    raised: nonNull[nonNull.length - 1] ?? 0,
    route: EDITION_META[i].route,
    routeJa: EDITION_META[i].routeJa,
    year: series.year,
  };
});

const LIFETIME = EDITIONS.reduce((sum, e) => sum + e.raised, 0);

function fmtShort(n: number, currencyPrefix: string): string {
  if (n >= 1_000_000) {
    return `${currencyPrefix}${(n / 1_000_000).toFixed(1)}M`;
  }
  if (n >= 1_000) {
    return `${currencyPrefix}${Math.round(n / 1_000)}k`;
  }
  return `${currencyPrefix}${n}`;
}

export function AboutCyclethonContent() {
  const t = useTranslations('aboutCyclethon');
  const currencyPrefix = useCurrencyPrefix();

  return (
    <>
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
          fontSize={{ base: '5xl', md: '7xl' }}
          fontWeight={400}
          letterSpacing="-0.03em"
          lineHeight="0.95"
        >
          {t('headline')}{' '}
          <Box as="em" color="accent" fontStyle="italic">
            {t('headlineAccent')}
          </Box>
          {t('headlineSuffix')}
        </Text>

        <Text
          color="fg.muted"
          fontSize={{ base: 'md', md: 'lg' }}
          lineHeight={1.55}
          maxW="2xl"
          mt={5}
        >
          {t('headerDescription')}
        </Text>

        <Flex flexWrap="wrap" gap={{ base: 4, md: 8 }} mt={6}>
          {[
            t('metaFounded'),
            t('metaPartner'),
            t('metaLifetime', { amount: fmtShort(LIFETIME, currencyPrefix) }),
          ].map((item) => (
            <Text color="fg.subtle" fontFamily="mono" fontSize="xs" key={item} letterSpacing="wide">
              {item}
            </Text>
          ))}
        </Flex>
      </PageHeader>

      {/* ── Story block ───────────────────────────── */}
      <Box borderBottomWidth="1px" borderColor="border" py={{ base: 8, md: 12 }}>
        <Grid gap={{ base: 8, md: 16 }} templateColumns={{ base: '1fr', md: '1fr 1fr' }}>
          {/* Quote */}
          <Box>
            <Text
              color="fg"
              fontFamily="heading"
              fontSize={{ base: 'xl', md: '2xl' }}
              fontStyle="italic"
              letterSpacing="-0.02em"
              lineHeight={1.3}
            >
              {t('quote')}
            </Text>
          </Box>

          {/* Prose */}
          <Box color="fg.muted" fontSize="sm" lineHeight={1.7}>
            <Text mt={0}>{t('intro')}</Text>
            <Text mt={4}>{t('cause')}</Text>
            <Text mt={4}>{t('recognition')}</Text>
          </Box>
        </Grid>
      </Box>

      {/* ── Editions · by raise ───────────────────── */}
      <Box borderBottomWidth="1px" borderColor="border" py={{ base: 8, md: 10 }}>
        <SectionLabel>{t('sectionEditions')}</SectionLabel>
        <EditionsByRaiseChart currencyPrefix={currencyPrefix} editions={EDITIONS} />
      </Box>

      {/* ── Growth chart ─────────────────────────── */}
      <Box py={{ base: 8, md: 10 }}>
        <SectionLabel>{t('sectionCumulative')}</SectionLabel>
        <CyclethonGrowthChart />
      </Box>

      {/* ── The charity ───────────────────────────── */}
      <Box
        bg="bg.subtle"
        borderColor="border"
        borderTopWidth="1px"
        mx={{ base: -4, md: -8 }}
        px={{ base: 4, md: 8 }}
        py={{ base: 8, md: 12 }}
      >
        <Grid gap={{ base: 8, md: 16 }} templateColumns={{ base: '1fr', md: '1fr 1.3fr' }}>
          <Box>
            <SectionLabel>{t('sectionCharity')}</SectionLabel>
            <Text
              as="h2"
              fontFamily="heading"
              fontSize={{ base: '3xl', md: '4xl' }}
              fontWeight={400}
              letterSpacing="-0.02em"
              lineHeight={1}
            >
              {t('charityName')}
            </Text>
            <Text
              color="fg.subtle"
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="wide"
              mt={3}
              textTransform="uppercase"
            >
              {t('charityUrl')}
            </Text>
          </Box>

          <Box color="fg.muted" fontSize="sm" lineHeight={1.7}>
            <Text>{t('charityBody1')}</Text>
            <Text mt={4}>{t('charityBody2')}</Text>
            <DonateLinkButton mt={5} />
          </Box>
        </Grid>
      </Box>
    </>
  );
}
