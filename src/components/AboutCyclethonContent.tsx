'use client';

import {
  Box,
  Card,
  Container,
  HStack,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  Bike,
  Calendar,
  Heart,
  MapPin,
  Radio,
  Route,
  Ruler,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import type { ReactNode } from 'react';

import { useTranslations } from '@/hooks/useTranslations';
import { flags } from '@/lib/flags';

interface WhatItem {
  icon: ReactNode;
  textKey: string;
}

const whatItems: WhatItem[] = [
  { icon: <Bike size={16} />, textKey: 'whatCycling' },
  { icon: <Radio size={16} />, textKey: 'whatLivestream' },
  { icon: <Heart size={16} />, textKey: 'whatDonations' },
  { icon: <Users size={16} />, textKey: 'whatGuests' },
  { icon: <Trophy size={16} />, textKey: 'whatIronmouse' },
];

interface TrackItem {
  href: string;
  icon: ReactNode;
  textKey: string;
}

const trackItems: TrackItem[] = [
  { href: '/journey', icon: <MapPin size={16} />, textKey: 'trackRoute' },
  { href: '/journey', icon: <Bike size={16} />, textKey: 'trackDistance' },
  { href: '/donations/live', icon: <TrendingUp size={16} />, textKey: 'trackDonations' },
];

interface GrowthYear {
  detailKey: string;
  raised: number;
  yearKey: string;
}

const growthYears: GrowthYear[] = [
  { detailKey: 'year2022Detail', raised: 45.6, yearKey: 'year2022' },
  { detailKey: 'year2023Detail', raised: 79, yearKey: 'year2023' },
  { detailKey: 'year2024Detail', raised: 130, yearKey: 'year2024' },
  { detailKey: 'year2025Detail', raised: 150, yearKey: 'year2025' },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <Text
      color="fg.muted"
      fontSize="xs"
      fontWeight="semibold"
      letterSpacing="wide"
      textTransform="uppercase"
    >
      {children}
    </Text>
  );
}

function GrowthBarChart({ t }: { t: (key: string) => string }) {
  const maxRaised = Math.max(...growthYears.map((y) => y.raised));

  return (
    <Stack gap={3}>
      {growthYears.map(({ detailKey, raised, yearKey }) => (
        <Box key={yearKey}>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            fontSize="sm"
            gap={{ base: 0, md: 2 }}
            justify="space-between"
            mb={1}
          >
            <Text fontWeight="semibold">{t(yearKey)}</Text>
            <Text color="fg.muted">{t(detailKey)}</Text>
          </Stack>
          <Box bg="bg.subtle" borderRadius="sm" h={3} overflow="hidden" w="100%">
            <Box
              bgColor={{ base: 'orange.500', _dark: 'orange.400' }}
              borderRadius="sm"
              h="100%"
              transition="width 0.6s ease-out"
              w={`${(raised / maxRaised) * 100}%`}
            />
          </Box>
        </Box>
      ))}
    </Stack>
  );
}

function GrowthChartPlaceholder() {
  return (
    <Box
      alignItems="center"
      bg="bg.subtle"
      borderRadius="md"
      display="flex"
      h={48}
      justifyContent="center"
      w="100%"
    >
      <Text color="fg.subtle" fontSize="sm">
        Chart coming soon
      </Text>
    </Box>
  );
}

export function AboutCyclethonContent() {
  const t = useTranslations('aboutCyclethon');

  return (
    <Box py={{ base: 6, md: 20 }}>
      <Container maxW="4xl" px={{ base: 3, md: 8 }}>
        <Stack gap={16}>
          {/* Hero + Cyclethon 5 card side by side */}
          <Stack direction={{ base: 'column', lg: 'row' }} gap={8}>
            {/* Intro text */}
            <Stack flex={1} gap={4} minW={0}>
              <Heading as="h1" size={{ base: 'xl', md: '2xl' }}>
                {t('title')}
              </Heading>
              <Text color="fg.muted">{t('intro')}</Text>
              <Text color="fg.muted">{t('cause')}</Text>
              <Text color="fg.muted">{t('recognition')}</Text>

              {/* Hero image */}
              <Box borderRadius="md" mt={2} overflow="hidden" position="relative" w="100%">
                <Image
                  alt="Cyclethon"
                  height={600}
                  src="/images/cyclethon-4-3.jpg"
                  style={{
                    filter: 'sepia(0.2) opacity(0.75)',
                    height: 'auto',
                    width: '100%',
                  }}
                  width={900}
                />
              </Box>
            </Stack>

            {/* Cyclethon 5 highlight card */}
            <Box flexShrink={0} w={{ base: '100%', lg: '280px' }}>
              <Card.Root h="fit-content" variant="outline">
                <Card.Body gap={4} p={5}>
                  <HStack color="fg.subtle" gap={2}>
                    <Bike size={18} />
                    <Text color="fg" fontSize="md" fontWeight="bold">
                      {t('currentLabel')}
                    </Text>
                  </HStack>
                  <Stack gap={3}>
                    <Box>
                      <Text color="fg.muted" fontSize="xs" fontWeight="semibold">
                        {t('currentDatesLabel')}
                      </Text>
                      <HStack gap={1.5}>
                        <Calendar size={14} />
                        <Text fontSize="sm">{t('currentDates')}</Text>
                      </HStack>
                    </Box>
                    <Box>
                      <Text color="fg.muted" fontSize="xs" fontWeight="semibold">
                        {t('currentRouteLabel')}
                      </Text>
                      <HStack gap={1.5}>
                        <Route size={14} />
                        <Text fontSize="sm">{t('currentRoute')}</Text>
                      </HStack>
                    </Box>
                    <Box>
                      <Text color="fg.muted" fontSize="xs" fontWeight="semibold">
                        {t('currentDistanceLabel')}
                      </Text>
                      <HStack gap={1.5}>
                        <Ruler size={14} />
                        <Text fontSize="sm">{t('currentDistance')}</Text>
                      </HStack>
                    </Box>
                  </Stack>
                </Card.Body>
              </Card.Root>
            </Box>
          </Stack>

          {/* What happens */}
          <Stack gap={4}>
            <SectionLabel>{t('whatHappensLabel')}</SectionLabel>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
              {whatItems.map(({ icon, textKey }) => (
                <Card.Root key={textKey} variant="outline">
                  <Card.Body p={4}>
                    <HStack gap={2}>
                      <Box color="fg.subtle" flexShrink={0}>
                        {icon}
                      </Box>
                      <Text fontSize="sm">{t(textKey)}</Text>
                    </HStack>
                  </Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>
          </Stack>

          {/* What this site tracks */}
          <Stack gap={4}>
            <SectionLabel>{t('trackLabel')}</SectionLabel>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={3}>
              {trackItems.map(({ href, icon, textKey }) => (
                <Link _hover={{ textDecoration: 'none' }} href={href} key={textKey}>
                  <Card.Root
                    _hover={{ borderColor: 'border.emphasized' }}
                    transition="border-color 0.15s"
                    variant="outline"
                    width="100%"
                  >
                    <Card.Body p={4}>
                      <HStack gap={2}>
                        <Box color="fg.subtle" flexShrink={0}>
                          {icon}
                        </Box>
                        <Text fontSize="sm" fontWeight="semibold">
                          {t(textKey)}
                        </Text>
                      </HStack>
                    </Card.Body>
                  </Card.Root>
                </Link>
              ))}
            </SimpleGrid>
          </Stack>

          {/* Growth */}
          <Stack gap={4}>
            <SectionLabel>{t('growthLabel')}</SectionLabel>
            {flags.showAboutCyclethonGrowthChart ? (
              <GrowthChartPlaceholder />
            ) : (
              <GrowthBarChart t={t} />
            )}
          </Stack>

          {/* Closing */}
          <Text color="fg.muted" maxW="2xl">
            {t('closing')}
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
