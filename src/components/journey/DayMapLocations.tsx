'use client';

import { Box, HStack, Link, Stack, Text } from '@chakra-ui/react';
import {
  Camera,
  Coffee,
  ExternalLink,
  Flag,
  Globe,
  Landmark,
  MapPin,
  Store,
  Wrench,
} from 'lucide-react';

import { useTranslations } from '@/hooks/useTranslations';
import type { MapLocation, MapLocationCategory } from '@/lib/journey-data';
import { useLocaleContext } from '@/providers/LocaleProvider';

const CATEGORY_TRANSLATION_KEYS: Record<MapLocationCategory, string> = {
  Dining: 'categoryDining',
  Event: 'categoryEvent',
  Landmark: 'categoryLandmark',
  'Rest Stop': 'categoryRestStop',
  Terminal: 'categoryTerminal',
  Tour: 'categoryTour',
};

function getCategoryIcon(category: MapLocationCategory) {
  switch (category) {
    case 'Dining':
      return Coffee;
    case 'Event':
      return Wrench;
    case 'Landmark':
      return Landmark;
    case 'Rest Stop':
      return Store;
    case 'Terminal':
      return Flag;
    case 'Tour':
      return Camera;
  }
}

function getCategoryColor(category: MapLocationCategory) {
  switch (category) {
    case 'Dining':
      return 'teal.500';
    case 'Event':
      return 'orange.500';
    case 'Landmark':
      return 'blue.500';
    case 'Rest Stop':
      return 'green.500';
    case 'Terminal':
      return 'red.500';
    case 'Tour':
      return 'purple.500';
  }
}

function TimelineItem({
  categoryLabel,
  displayTitle,
  googleMapsLabel,
  index,
  isLast,
  location,
  websiteLabel,
}: {
  categoryLabel: string;
  displayTitle: string;
  googleMapsLabel: string;
  index: number;
  isLast: boolean;
  location: MapLocation;
  websiteLabel: string;
}) {
  const Icon = getCategoryIcon(location.category);
  const color = getCategoryColor(location.category);

  return (
    <HStack align="stretch" gap={0}>
      {/* Timeline rail */}
      <Stack align="center" flexShrink={0} gap={0} w="40px">
        <Box
          alignItems="center"
          bg={color}
          borderRadius="full"
          color="white"
          display="flex"
          flexShrink={0}
          h="32px"
          justifyContent="center"
          w="32px"
        >
          <Icon size={16} />
        </Box>
        {!isLast ? <Box bg="border.emphasized" flex={1} minH="24px" w="2px" /> : null}
      </Stack>

      {/* Content */}
      <Box pb={isLast ? 0 : 5} pt="4px">
        <HStack gap={2} mb={0.5}>
          <Text color="fg.subtle" fontSize="xs" fontWeight="semibold">
            #{index + 1}
          </Text>
          <Text
            bg={`${color}/10`}
            borderRadius="full"
            color={color}
            fontSize="2xs"
            fontWeight="semibold"
            px={2}
            py={0.5}
            textTransform="uppercase"
          >
            {categoryLabel}
          </Text>
        </HStack>
        <Text fontWeight="bold" mb={1}>
          {displayTitle}
        </Text>
        <HStack flexWrap="wrap" gap={3}>
          {location.googleMapsUrl ? (
            <HStack gap={1.5}>
              <MapPin size={12} />
              <Link
                fontSize="xs"
                href={location.googleMapsUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {googleMapsLabel}{' '}
                <ExternalLink size={10} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </Link>
            </HStack>
          ) : null}
          {location.websiteUrl ? (
            <HStack gap={1.5}>
              <Globe size={12} />
              <Link
                fontSize="xs"
                href={location.websiteUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {websiteLabel}{' '}
                <ExternalLink size={10} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </Link>
            </HStack>
          ) : null}
          {location.socials?.map((social) => (
            <HStack gap={1.5} key={social.url}>
              <Globe size={12} />
              <Link fontSize="xs" href={social.url} rel="noopener noreferrer" target="_blank">
                {social.platform}{' '}
                <ExternalLink size={10} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </Link>
            </HStack>
          ))}
        </HStack>
      </Box>
    </HStack>
  );
}

interface Props {
  locations: MapLocation[];
}

export function DayMapLocations({ locations }: Props) {
  const { resolvedLocale } = useLocaleContext();
  const t = useTranslations('dayPage');

  return (
    <Stack gap={0}>
      {locations.map((loc, i) => (
        <TimelineItem
          categoryLabel={t(CATEGORY_TRANSLATION_KEYS[loc.category])}
          displayTitle={resolvedLocale === 'JP' ? (loc.titleJa ?? loc.title) : loc.title}
          googleMapsLabel={t('googleMaps')}
          index={i}
          isLast={i === locations.length - 1}
          key={loc.id}
          location={loc}
          websiteLabel={t('website')}
        />
      ))}
    </Stack>
  );
}
