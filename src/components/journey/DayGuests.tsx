import { Box, HStack, Link, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { SiTwitch, SiYoutube } from 'react-icons/si';

import type { GuestCyclist } from '@/lib/journey';
import { useLocaleContext } from '@/providers/LocaleProvider';

const ICON_SIZE = 18;
const PLACEHOLDER_IMAGE = '/images/placeholder-avatar.svg';

interface Props {
  guests: GuestCyclist[];
}

export function DayGuests({ guests }: Props) {
  const { resolvedLocale } = useLocaleContext();

  return (
    <Stack direction={{ base: 'column', md: 'row' }} gap={4}>
      {guests.map((guest) => {
        const displayName = resolvedLocale === 'JP' ? (guest.nameJa ?? guest.name) : guest.name;

        return (
          <HStack gap={3} key={guest.handler}>
            <Box
              borderRadius="full"
              borderWidth="2px"
              flexShrink={0}
              h="56px"
              overflow="hidden"
              position="relative"
              w="56px"
            >
              <Image
                alt={displayName}
                fill
                src={guest.imageUrl ?? PLACEHOLDER_IMAGE}
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <Stack gap={0}>
              <Text fontSize="sm" fontWeight="semibold">
                {displayName}
              </Text>
              <Text color="fg.muted" fontSize="xs">
                @{guest.handler}
              </Text>
              <HStack gap={2} mt={1}>
                {guest.youtubeUrl ? (
                  <Link
                    _hover={{ opacity: 1 }}
                    aria-label="YouTube"
                    color="#FF0000"
                    href={guest.youtubeUrl}
                    opacity={0.75}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <SiYoutube size={ICON_SIZE} />
                  </Link>
                ) : null}
                {guest.twitchUrl ? (
                  <Link
                    _hover={{ opacity: 1 }}
                    aria-label="Twitch"
                    color="#9146FF"
                    href={guest.twitchUrl}
                    opacity={0.75}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <SiTwitch size={ICON_SIZE} />
                  </Link>
                ) : null}
              </HStack>
            </Stack>
          </HStack>
        );
      })}
    </Stack>
  );
}
