'use client';

import { Box, HStack, Link, Stack, Text } from '@chakra-ui/react';
import { CirclePlay, TvMinimalPlay } from 'lucide-react';
import Image from 'next/image';
import type { ReactNode } from 'react';

import { useTranslations } from '@/hooks/useTranslations';

const ICON_SIZE = 18;
const YOUTUBE = { icon: <CirclePlay size={ICON_SIZE} />, color: '#FF0000', label: 'YouTube' };
const TWITCH = { icon: <TvMinimalPlay size={ICON_SIZE} />, color: '#9146FF', label: 'Twitch' };

interface SocialLink {
  icon: ReactNode;
  label: string;
  href: string;
  color?: string;
}

interface Guest {
  nameKey: string;
  roleKey: string;
  socials?: SocialLink[];
}

const guests: Guest[] = [
  {
    nameKey: 'connorName',
    roleKey: 'connorRole',
    socials: [
      { ...YOUTUBE, href: 'https://www.youtube.com/@CDawgVA' },
      { ...TWITCH, href: 'https://www.twitch.tv/cdawg' },
    ],
  },
  {
    nameKey: 'chrisName',
    roleKey: 'chrisRole',
    socials: [{ ...YOUTUBE, href: 'https://www.youtube.com/@AbroadinJapan' }],
  },
  {
    nameKey: 'ironmouseName',
    roleKey: 'ironmouseRole',
    socials: [
      { ...YOUTUBE, href: 'https://www.youtube.com/@IronMouseParty' },
      { ...TWITCH, href: 'https://www.twitch.tv/ironmouse' },
    ],
  },
  {
    nameKey: 'supportGuests',
    roleKey: 'supportGuestsRole',
  },
];

export function WhoComing() {
  const t = useTranslations('home');

  return (
    <Stack gap={4}>
      <Text
        color="fg.muted"
        fontSize="xs"
        fontWeight="semibold"
        letterSpacing="wide"
        textTransform="uppercase"
      >
        {t('whoComingLabel')}
      </Text>
      <Box
        aspectRatio={16 / 7}
        borderRadius="2xl"
        borderWidth="1px"
        overflow="hidden"
        position="relative"
      >
        <Image
          alt="Who's Coming"
          fill
          src="/images/cyclethon-4-2.jpg"
          style={{
            objectFit: 'cover',
            objectPosition: 'center 20%',
            filter: 'sepia(0.2) opacity(0.75)',
          }}
        />
      </Box>
      <Stack gap={3} mt={1}>
        {guests.map(({ nameKey, roleKey, socials }) => (
          <Box _last={{ borderBottomWidth: 0, pb: 0 }} borderBottomWidth="1px" key={nameKey} pb={3}>
            <HStack align="center" justify="space-between">
              <Text fontSize="sm" fontWeight="semibold">
                {t(nameKey)}
              </Text>
              {socials ? (
                <HStack gap={2}>
                  {socials.map(({ icon, label, href, color }) => (
                    <Link
                      _hover={{ opacity: 1 }}
                      aria-label={label}
                      color={color ?? 'fg.subtle'}
                      href={href}
                      key={label}
                      opacity={0.75}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {icon}
                    </Link>
                  ))}
                </HStack>
              ) : null}
            </HStack>
            <Text color="fg.muted" fontSize="xs">
              {t(roleKey)}
            </Text>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
