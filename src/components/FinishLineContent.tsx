'use client';

import { Box, Flex, Link, SimpleGrid, Text } from '@chakra-ui/react';
import { Calendar, Clock, ExternalLink, MapPin, Pizza } from 'lucide-react';

import { FlatCard } from '@/components/FlatCard';
import { DayMapEmbed } from '@/components/journey/DayMapEmbed';
import { LedgerSection } from '@/components/LedgerSection';
import { PageHeader } from '@/components/PageHeader';
import { SectionLabel } from '@/components/SectionLabel';
import { useTranslations } from '@/hooks/useTranslations';

import type { InfoItem, ReservationRow, SpecialPizza } from './FinishLineContent.types';

const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9156.188012206798!2d135.48075231822898!3d34.684893165526084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e7002c96e865%3A0xb9ffe2a4dbdcdfec!2zSFVHSEVTIFBJWlpBIFBBUktTSURFICjjg5Ljg6Xjg7zjgrog44OU44K2IOODkeODvOOCr-OCteOCpOODiSk!5e0!3m2!1sen!2sau!4v1776454315274!5m2!1sen!2sau';
const MAP_LINK_URL = 'https://maps.app.goo.gl/Y1NQZjUcfXLHpVFE9';

const EVENT_INFO: InfoItem[] = [
  { detailKey: 'date', icon: <Calendar size={14} />, labelKey: 'dateLabel' },
  { detailKey: 'time', icon: <Clock size={14} />, labelKey: 'timeLabel' },
  { detailKey: 'venue', icon: <MapPin size={14} />, labelKey: 'venueLabel' },
];

const RESERVATION_ROWS: ReservationRow[] = [
  { labelKey: 'walkinsLabel', timeKey: 'walkinsTime' },
  { labelKey: 'reservationsLabel', timeKey: 'reservationsTime' },
];

const RESERVATION_NOTE_KEYS: string[] = [
  'reservationNote1',
  'reservationNote2',
  'reservationNote3',
];

const SPECIAL_PIZZAS: SpecialPizza[] = [
  { nameKey: 'pizzaMonkeName', toppingsKey: 'pizzaMonkeToppings' },
  { nameKey: 'pizzaVanGangName', toppingsKey: 'pizzaVanGangToppings' },
];

export function FinishLineContent() {
  const t = useTranslations('finishLine');

  return (
    <Box>
      {/* Page header */}
      <PageHeader>
        <SectionLabel>{t('eventLabel')}</SectionLabel>
        <Text
          as="h1"
          fontFamily="heading"
          fontSize={{ base: '4xl', md: '6xl' }}
          fontWeight={400}
          letterSpacing="-0.03em"
          lineHeight="0.95"
        >
          {t('title')}
        </Text>
        <Text
          color="fg.muted"
          fontSize={{ base: 'md', md: 'lg' }}
          lineHeight={1.6}
          maxW="2xl"
          mt={5}
        >
          {t('blurb1')}
        </Text>
        <Text
          color="fg.muted"
          fontSize={{ base: 'md', md: 'lg' }}
          lineHeight={1.6}
          maxW="2xl"
          mt={3}
        >
          {t('blurb2')}
        </Text>
      </PageHeader>

      {/* Event info */}
      <LedgerSection index="01" title={t('eventSectionLabel')}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={2}>
          {EVENT_INFO.map(({ detailKey, icon, labelKey }) => (
            <FlatCard body={t(detailKey)} icon={icon} key={labelKey} title={t(labelKey)} />
          ))}
        </SimpleGrid>
      </LedgerSection>

      {/* Location */}
      <LedgerSection index="02" title={t('locationSectionLabel')}>
        <DayMapEmbed embedUrl={MAP_EMBED_URL} title={t('venue')} />
        <Link
          _hover={{ color: 'fg' }}
          alignItems="center"
          color="fg.subtle"
          display="inline-flex"
          fontFamily="mono"
          fontSize="xs"
          gap={1.5}
          href={MAP_LINK_URL}
          letterSpacing="wide"
          mt={4}
          rel="noopener noreferrer"
          target="_blank"
        >
          {t('viewOnGoogleMaps')} <ExternalLink size={10} />
        </Link>
      </LedgerSection>

      {/* Reservations */}
      <LedgerSection index="03" title={t('reservationsSectionLabel')}>
        <Box borderColor="border" borderWidth="1px" p={5}>
          {RESERVATION_ROWS.map(({ labelKey, timeKey }) => (
            <Flex justify="space-between" key={labelKey} mb={3}>
              <Text fontSize="sm" fontWeight="semibold">
                {t(labelKey)}
              </Text>
              <Text color="fg.muted" fontSize="sm">
                {t(timeKey)}
              </Text>
            </Flex>
          ))}
          <Box borderTopWidth="1px" pt={4}>
            {RESERVATION_NOTE_KEYS.map((key) => (
              <Text color="fg.muted" fontSize="sm" key={key} lineHeight={1.6} mb={1}>
                {t(key)}
              </Text>
            ))}
          </Box>
        </Box>
      </LedgerSection>

      {/* Special pizzas */}
      <LedgerSection borderBottom={false} index="04" title={t('pizzasSectionLabel')}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={2}>
          {SPECIAL_PIZZAS.map(({ nameKey, toppingsKey }) => (
            <FlatCard
              body={t(toppingsKey)}
              icon={<Pizza size={14} />}
              key={nameKey}
              title={t(nameKey)}
            />
          ))}
        </SimpleGrid>
      </LedgerSection>
    </Box>
  );
}
