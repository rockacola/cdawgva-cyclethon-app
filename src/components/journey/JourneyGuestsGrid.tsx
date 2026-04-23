'use client';

import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

import { AvatarImage } from '@/components/AvatarImage';
import { useTranslations } from '@/hooks/useTranslations';
import type { GuestCyclist } from '@/lib/journey';
import { journeyData } from '@/lib/journey-data';
import { useLocaleContext } from '@/providers/LocaleProvider';

const PLACEHOLDER_IMAGE = '/images/placeholder-avatar.svg';

interface Props {
  guests: GuestCyclist[];
}

function computeGuestDays(): Map<string, number> {
  const map = new Map<string, number>();
  for (const day of journeyData) {
    for (const guest of day.guests ?? []) {
      map.set(guest.handler, (map.get(guest.handler) ?? 0) + 1);
    }
  }
  return map;
}

export function JourneyGuestsGrid({ guests }: Props) {
  const t = useTranslations('journey');
  const { resolvedLocale } = useLocaleContext();
  const guestDays = useMemo(computeGuestDays, []);

  return (
    <SimpleGrid columns={{ base: 2, md: 3 }} gap={1}>
      {guests.map((guest) => {
        const displayName = resolvedLocale === 'JP' ? (guest.nameJa ?? guest.name) : guest.name;
        const days = guestDays.get(guest.handler) ?? 1;

        return (
          <Box bg="bg.subtle" key={guest.handler} p={5}>
            <Box mb={3}>
              <AvatarImage alt={displayName} src={guest.imageUrl ?? PLACEHOLDER_IMAGE} />
            </Box>

            <Text fontFamily="heading" fontSize="lg" letterSpacing="-0.02em" lineHeight={1.1}>
              {displayName}
            </Text>
            <Text color="fg.subtle" fontFamily="mono" fontSize="xs" letterSpacing="wide" mt={0.5}>
              @{guest.handler}
            </Text>

            <Box mt={2}>
              <Box
                borderColor="border"
                borderWidth="1px"
                display="inline-block"
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="wide"
                px={2}
                py={0.5}
              >
                {days === 1
                  ? t('guestDayLabel', { count: days })
                  : t('guestDaysLabel', { count: days })}
              </Box>
            </Box>
          </Box>
        );
      })}
    </SimpleGrid>
  );
}
