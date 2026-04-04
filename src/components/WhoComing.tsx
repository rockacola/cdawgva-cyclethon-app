import { Box, HStack, Link, Stack, Text } from '@chakra-ui/react';
import { CirclePlay, TvMinimalPlay } from 'lucide-react';
import Image from 'next/image';
import type { ReactNode } from 'react';

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
  name: string;
  role: string;
  socials?: SocialLink[];
}

const guests: Guest[] = [
  {
    name: 'Connor (CDawgVA)',
    role: 'The man on the bike',
    socials: [
      { ...YOUTUBE, href: 'https://www.youtube.com/@CDawgVA' },
      { ...TWITCH, href: 'https://www.twitch.tv/cdawg' },
    ],
  },
  {
    name: 'Chris (Abroad in Japan)',
    role: 'Co-lead & fellow sufferer',
    socials: [{ ...YOUTUBE, href: 'https://www.youtube.com/@AbroadinJapan' }],
  },
  {
    name: 'Ironmouse',
    role: 'Chief cheerleader',
    socials: [
      { ...YOUTUBE, href: 'https://www.youtube.com/@IronMouseParty' },
      { ...TWITCH, href: 'https://www.twitch.tv/ironmouse' },
    ],
  },
  {
    name: 'Support guests',
    role: 'A rotating cast of friends and supporters joining to keep the energy up along the route.',
  },
];

export function WhoComing() {
  return (
    <Stack gap={4}>
      <Text
        color="fg.muted"
        fontSize="xs"
        fontWeight="semibold"
        letterSpacing="wide"
        textTransform="uppercase"
      >
        Who's Coming
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
        {guests.map(({ name, role, socials }) => (
          <Box _last={{ borderBottomWidth: 0, pb: 0 }} borderBottomWidth="1px" key={name} pb={3}>
            <HStack align="center" justify="space-between">
              <Text fontSize="sm" fontWeight="semibold">
                {name}
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
              {role}
            </Text>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
