'use client';

import { Box, Grid, Link, Text } from '@chakra-ui/react';
import { Globe } from 'lucide-react';
import type { ReactNode } from 'react';
import { SiTwitch, SiYoutube } from 'react-icons/si';

import { AvatarImage } from '@/components/AvatarImage';
import { useTranslations } from '@/hooks/useTranslations';
import { useLocaleContext } from '@/providers/LocaleProvider';

const ICON_SIZE = 14;

type RoleKey = 'roleCohost' | 'roleGuestCyclist' | 'roleHost' | 'roleVanGang' | 'roleVirtualCohost';

interface CastMember {
  days: number;
  handle: string;
  image: string;
  name: string;
  nameJa: string;
  role: RoleKey;
  socials?: { color: string; href: string; icon: ReactNode; label: string }[];
}

const CAST: CastMember[] = [
  {
    days: 15,
    handle: 'CDawgVA',
    image: '/images/avatar-connor.jpg',
    name: 'Connor',
    nameJa: 'コナー',
    role: 'roleHost',
    socials: [
      {
        color: '#9146FF',
        href: 'https://www.twitch.tv/cdawg',
        icon: <SiTwitch size={ICON_SIZE} />,
        label: 'Twitch',
      },
      {
        color: '#FF0000',
        href: 'https://www.youtube.com/@CDawgVA',
        icon: <SiYoutube size={ICON_SIZE} />,
        label: 'YouTube',
      },
    ],
  },
  {
    days: 15,
    handle: 'Abroad in Japan',
    image: '/images/avatar-chris.jpg',
    name: 'Chris',
    nameJa: 'クリス',
    role: 'roleCohost',
    socials: [
      {
        color: '#FF0000',
        href: 'https://www.youtube.com/@AbroadinJapan',
        icon: <SiYoutube size={ICON_SIZE} />,
        label: 'YouTube',
      },
    ],
  },
  {
    days: 2,
    handle: 'JSchlatt',
    image: '/images/avatar-jschlatt.jpg',
    name: 'Schlatt',
    nameJa: 'シュラット',
    role: 'roleGuestCyclist',
    socials: [
      {
        color: '#9146FF',
        href: 'https://www.twitch.tv/schlatt',
        icon: <SiTwitch size={ICON_SIZE} />,
        label: 'Twitch',
      },
      {
        color: '#FF0000',
        href: 'https://www.youtube.com/@jshlatt',
        icon: <SiYoutube size={ICON_SIZE} />,
        label: 'YouTube',
      },
    ],
  },
  {
    days: 2,
    handle: 'GiggukAZ',
    image: '/images/avatar-gigguk.jpg',
    name: 'Garnt',
    nameJa: 'ガーント',
    role: 'roleGuestCyclist',
    socials: [
      {
        color: '#9146FF',
        href: 'https://www.twitch.tv/gigguk',
        icon: <SiTwitch size={ICON_SIZE} />,
        label: 'Twitch',
      },
      {
        color: '#FF0000',
        href: 'https://www.youtube.com/@gigguk',
        icon: <SiYoutube size={ICON_SIZE} />,
        label: 'YouTube',
      },
    ],
  },
  {
    days: 3,
    handle: 'RobCDee',
    image: '/images/avatar-robcdee.jpg',
    name: 'Rob',
    nameJa: 'ロブ',
    role: 'roleGuestCyclist',
    socials: [
      {
        color: '#9146FF',
        href: 'https://www.twitch.tv/robcdee',
        icon: <SiTwitch size={ICON_SIZE} />,
        label: 'Twitch',
      },
      {
        color: '#FF0000',
        href: 'https://www.youtube.com/@Robcdee',
        icon: <SiYoutube size={ICON_SIZE} />,
        label: 'YouTube',
      },
    ],
  },
  {
    days: 1,
    handle: 'PewDiePie',
    image: '/images/avatar-pewdiepie.jpg',
    name: 'Felix',
    nameJa: 'フェリックス',
    role: 'roleGuestCyclist',
    socials: [
      {
        color: '#9146FF',
        href: 'https://www.twitch.tv/pewdiepie',
        icon: <SiTwitch size={ICON_SIZE} />,
        label: 'Twitch',
      },
      {
        color: '#FF0000',
        href: 'https://www.youtube.com/@PewDiePie',
        icon: <SiYoutube size={ICON_SIZE} />,
        label: 'YouTube',
      },
    ],
  },
  {
    days: 2,
    handle: 'ironmouse',
    image: '/images/avatar-ironmouse.png',
    name: 'Ironmouse',
    nameJa: 'アイアンマウス',
    role: 'roleVirtualCohost',
    socials: [
      {
        color: '#9146FF',
        href: 'https://www.twitch.tv/ironmouse',
        icon: <SiTwitch size={ICON_SIZE} />,
        label: 'Twitch',
      },
      {
        color: '#FF0000',
        href: 'https://www.youtube.com/ironmouseparty',
        icon: <SiYoutube size={ICON_SIZE} />,
        label: 'YouTube',
      },
    ],
  },
  {
    days: 1,
    handle: 'PremierTwo',
    image: '/images/avatar-premiertwo.jpg',
    name: 'Peter',
    nameJa: 'ピーター',
    role: 'roleVanGang',
    socials: [
      {
        color: '#9146FF',
        href: 'https://www.twitch.tv/premiertwo',
        icon: <SiTwitch size={ICON_SIZE} />,
        label: 'Twitch',
      },
    ],
  },
  {
    days: 15,
    handle: 'Paul Ballard',
    image: '/images/avatar-paul.jpg',
    name: 'Paul',
    nameJa: 'ポール',
    role: 'roleVanGang',
    socials: [
      {
        color: '#FF0000',
        href: 'https://www.youtube.com/@PaulBallard',
        icon: <SiYoutube size={ICON_SIZE} />,
        label: 'YouTube',
      },
    ],
  },
  {
    days: 15,
    handle: 'Ian',
    image: '/images/avatar-ian.jpg',
    name: 'Ian',
    nameJa: 'イアン',
    role: 'roleVanGang',
    socials: [
      {
        color: '#888888',
        href: 'https://artedly.com/en/',
        icon: <Globe size={ICON_SIZE} />,
        label: 'Website',
      },
    ],
  },
  {
    days: 15,
    handle: 'nabiruplays',
    image: '/images/avatar-nabi.jpg',
    name: 'Nabi',
    nameJa: 'ナビ',
    role: 'roleVanGang',
    socials: [
      {
        color: '#9146FF',
        href: 'https://www.twitch.tv/nabiruplays',
        icon: <SiTwitch size={ICON_SIZE} />,
        label: 'Twitch',
      },
    ],
  },
];

export function WhoComing() {
  const t = useTranslations('home');
  const { resolvedLocale } = useLocaleContext();

  return (
    <Grid
      background="border"
      border="1px solid"
      borderColor="border"
      gap="1px"
      templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
    >
      {CAST.map((p, i) => (
        <Box background="bg" key={p.handle} padding={6}>
          {/* Card header: number + days */}
          <Box alignItems="baseline" display="flex" justifyContent="space-between" mb={4}>
            <Text
              color="accent"
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="widest"
              textTransform="uppercase"
            >
              № {(i + 1).toString().padStart(2, '0')}
            </Text>
          </Box>

          {/* Portrait */}
          <AvatarImage alt={p.name} src={p.image} />

          {/* Info */}
          <Box mt={4}>
            <Box alignItems="center" display="flex" justifyContent="space-between">
              <Text fontFamily="heading" fontSize="xl" fontWeight={400} letterSpacing="-0.02em">
                {resolvedLocale === 'JA' ? p.nameJa : p.name}
              </Text>
              {p.socials ? (
                <Box display="flex" gap={2}>
                  {p.socials.map(({ icon, label, href, color }) => (
                    <Link
                      _hover={{ opacity: 1 }}
                      aria-label={label}
                      color={color}
                      href={href}
                      key={label}
                      opacity={0.55}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {icon}
                    </Link>
                  ))}
                </Box>
              ) : null}
            </Box>
            <Text color="fg.subtle" fontFamily="mono" fontSize="xs" letterSpacing="wide" mt={1}>
              {p.handle} · {t(p.role)}
            </Text>
          </Box>
        </Box>
      ))}
    </Grid>
  );
}
