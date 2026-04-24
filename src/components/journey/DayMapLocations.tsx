'use client';

import { Box, Flex, Grid, Link, Text } from '@chakra-ui/react';
import { ExternalLink } from 'lucide-react';

import { useTranslations } from '@/hooks/useTranslations';
import type { MapLocation, MapLocationCategory } from '@/lib/journey';
import { useLocaleContext } from '@/providers/LocaleProvider';

const CATEGORY_TRANSLATION_KEYS: Record<MapLocationCategory, string> = {
  Dining: 'categoryDining',
  Event: 'categoryEvent',
  Landmark: 'categoryLandmark',
  'Rest Stop': 'categoryRestStop',
  Terminal: 'categoryTerminal',
  Tour: 'categoryTour',
};

interface Props {
  locations: MapLocation[];
}

export function DayMapLocations({ locations }: Props) {
  const { resolvedLocale } = useLocaleContext();
  const t = useTranslations('dayPage');

  return (
    <Box borderTopColor="fg" borderTopWidth="1px">
      {locations.map((loc) => {
        const displayTitle = resolvedLocale === 'JA' ? (loc.titleJa ?? loc.title) : loc.title;
        const categoryLabel = t(CATEGORY_TRANSLATION_KEYS[loc.category]);
        const isTerminal = loc.category === 'Terminal';

        return (
          <Grid
            alignItems="baseline"
            borderBottomColor="border"
            borderBottomWidth="1px"
            gap={6}
            gridTemplateColumns="90px 1fr"
            key={loc.id}
            py={4}
          >
            {/* Category chip */}
            <Box
              borderColor={isTerminal ? 'accent' : 'border'}
              borderWidth="1px"
              color={isTerminal ? 'accent' : 'fg.subtle'}
              display="inline-block"
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="wide"
              px={2}
              py={0.5}
              textAlign="center"
              textTransform="uppercase"
            >
              {categoryLabel}
            </Box>

            {/* Name + links */}
            <Box>
              <Text fontSize="sm" fontWeight={500}>
                {displayTitle}
              </Text>
              {loc.googleMapsUrl || loc.websiteUrl || loc.socials?.length ? (
                <Flex flexWrap="wrap" gap={3} mt={1}>
                  {loc.googleMapsUrl ? (
                    <Link
                      color="fg.subtle"
                      fontFamily="mono"
                      fontSize="xs"
                      href={loc.googleMapsUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {t('googleMaps')}{' '}
                      <ExternalLink
                        size={9}
                        style={{ display: 'inline', verticalAlign: 'middle' }}
                      />
                    </Link>
                  ) : null}
                  {loc.websiteUrl ? (
                    <Link
                      color="fg.subtle"
                      fontFamily="mono"
                      fontSize="xs"
                      href={loc.websiteUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {t('website')}{' '}
                      <ExternalLink
                        size={9}
                        style={{ display: 'inline', verticalAlign: 'middle' }}
                      />
                    </Link>
                  ) : null}
                  {loc.socials?.map((social) => (
                    <Link
                      color="fg.subtle"
                      fontFamily="mono"
                      fontSize="xs"
                      href={social.url}
                      key={social.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {social.platform}{' '}
                      <ExternalLink
                        size={9}
                        style={{ display: 'inline', verticalAlign: 'middle' }}
                      />
                    </Link>
                  ))}
                </Flex>
              ) : null}
            </Box>
          </Grid>
        );
      })}
    </Box>
  );
}
