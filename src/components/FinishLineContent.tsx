'use client';

import {
  Box,
  Button,
  Card,
  Container,
  HStack,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Calendar, Clock, ExternalLink, MapPin, Pizza } from 'lucide-react';
import NextLink from 'next/link';
import type { ReactNode } from 'react';

import { DayMapEmbed } from '@/components/journey/DayMapEmbed';
import { useTranslations } from '@/hooks/useTranslations';

const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9156.188012206798!2d135.48075231822898!3d34.684893165526084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e7002c96e865%3A0xb9ffe2a4dbdcdfec!2zSFVHSEVTIFBJWlpBIFBBUktTSURFICjjg5Ljg6Xjg7zjgrog44OU44K2IOODkeODvOOCr-OCteOCpOODiSk!5e0!3m2!1sen!2sau!4v1776454315274!5m2!1sen!2sau';
const MAP_LINK_URL = 'https://maps.app.goo.gl/Y1NQZjUcfXLHpVFE9';

interface InfoItem {
  detailKey: string;
  icon: ReactNode;
  labelKey: string;
}

const eventInfo: InfoItem[] = [
  { detailKey: 'date', icon: <Calendar size={16} />, labelKey: 'dateLabel' },
  { detailKey: 'time', icon: <Clock size={16} />, labelKey: 'timeLabel' },
  { detailKey: 'venue', icon: <MapPin size={16} />, labelKey: 'venueLabel' },
];

interface ReservationRow {
  labelKey: string;
  timeKey: string;
}

const reservationRows: ReservationRow[] = [
  { labelKey: 'walkinsLabel', timeKey: 'walkinsTime' },
  { labelKey: 'reservationsLabel', timeKey: 'reservationsTime' },
];

const reservationNoteKeys: string[] = ['reservationNote1', 'reservationNote2', 'reservationNote3'];

interface SpecialPizza {
  nameKey: string;
  toppingsKey: string;
}

const specialPizzas: SpecialPizza[] = [
  { nameKey: 'pizzaMonkeName', toppingsKey: 'pizzaMonkeToppings' },
  { nameKey: 'pizzaVanGangName', toppingsKey: 'pizzaVanGangToppings' },
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

export function FinishLineContent() {
  const t = useTranslations('finishLine');

  return (
    <Box py={{ base: 6, md: 20 }}>
      <Container maxW="4xl" px={{ base: 3, md: 8 }}>
        <Stack gap={16}>
          {/* Hero */}
          <Stack gap={4}>
            <Text
              color="fg.muted"
              fontSize="xs"
              fontWeight="semibold"
              letterSpacing="wide"
              textTransform="uppercase"
            >
              {t('eventLabel')}
            </Text>
            <Heading as="h1" size={{ base: 'xl', md: '2xl' }}>
              {t('title')}
            </Heading>
            <Text color="fg.muted" maxW="2xl">
              {t('blurb1')}
            </Text>
            <Text color="fg.muted" maxW="2xl">
              {t('blurb2')}
            </Text>
          </Stack>

          {/* Event info */}
          <Stack gap={4}>
            <SectionLabel>{t('eventSectionLabel')}</SectionLabel>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={3}>
              {eventInfo.map(({ detailKey, icon, labelKey }) => (
                <Card.Root key={labelKey} variant="outline">
                  <Card.Body gap={2} p={4}>
                    <HStack color="fg.subtle" gap={2}>
                      <Box color="fg.subtle" flexShrink={0}>
                        {icon}
                      </Box>
                      <Text color="fg.muted" fontSize="xs" fontWeight="semibold">
                        {t(labelKey)}
                      </Text>
                    </HStack>
                    <Text fontSize="sm" fontWeight="medium">
                      {t(detailKey)}
                    </Text>
                  </Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>
          </Stack>

          {/* Map */}
          <Stack gap={4}>
            <SectionLabel>{t('locationSectionLabel')}</SectionLabel>
            <DayMapEmbed embedUrl={MAP_EMBED_URL} title={t('venue')} />
            <Link
              _hover={{ textDecoration: 'none' }}
              alignSelf="flex-start"
              asChild
              href={MAP_LINK_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <NextLink href={MAP_LINK_URL}>
                <Button size="sm" variant="outline">
                  <HStack gap={1.5}>
                    <Text fontSize="sm">{t('viewOnGoogleMaps')}</Text>
                    <ExternalLink size={12} />
                  </HStack>
                </Button>
              </NextLink>
            </Link>
          </Stack>

          {/* Reservations */}
          <Stack gap={4}>
            <SectionLabel>{t('reservationsSectionLabel')}</SectionLabel>
            <Card.Root variant="outline">
              <Card.Body gap={4} p={5}>
                <Stack gap={2}>
                  {reservationRows.map(({ labelKey, timeKey }) => (
                    <HStack gap={3} justify="space-between" key={labelKey}>
                      <Text fontSize="md" fontWeight="semibold">
                        {t(labelKey)}
                      </Text>
                      <Text color="fg.muted" fontSize="md">
                        {t(timeKey)}
                      </Text>
                    </HStack>
                  ))}
                </Stack>
                <Box borderTopWidth="1px" pt={4}>
                  <Stack as="ul" gap={2} listStyleType="disc" pl={4}>
                    {reservationNoteKeys.map((key) => (
                      <Text as="li" color="fg.muted" fontSize="sm" key={key}>
                        {t(key)}
                      </Text>
                    ))}
                  </Stack>
                </Box>
              </Card.Body>
            </Card.Root>
          </Stack>

          {/* Special pizzas */}
          <Stack gap={4}>
            <SectionLabel>{t('pizzasSectionLabel')}</SectionLabel>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
              {specialPizzas.map(({ nameKey, toppingsKey }) => (
                <Card.Root key={nameKey} variant="outline">
                  <Card.Body gap={2} p={4}>
                    <HStack color="fg.subtle" gap={2}>
                      <Pizza size={18} />
                      <Text color="fg" fontSize="md" fontWeight="semibold">
                        {t(nameKey)}
                      </Text>
                    </HStack>
                    <Text color="fg.muted" fontSize="sm">
                      {t(toppingsKey)}
                    </Text>
                  </Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
