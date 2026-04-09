'use client';

import { Box, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { Clapperboard } from 'lucide-react';

import { useTranslations } from '@/hooks/useTranslations';
import type { TwitchClip } from '@/lib/journey-data';

const DEFAULT_PLACEHOLDER_COUNT = 4;

function ClipCard({ clip, clipComingSoon }: { clip: TwitchClip; clipComingSoon: string }) {
  if (clip.embedUrl) {
    return (
      <Box borderRadius="xl" borderWidth="1px" overflow="hidden" style={{ aspectRatio: '16/9' }}>
        <iframe
          allowFullScreen
          height="100%"
          src={clip.embedUrl}
          style={{ border: 0, display: 'block' }}
          title={clip.title ?? 'Twitch clip'}
          width="100%"
        />
      </Box>
    );
  }

  if (clip.thumbnailUrl) {
    return (
      <Box borderRadius="xl" borderWidth="1px" overflow="hidden" style={{ aspectRatio: '16/9' }}>
        <Image
          alt={clip.title ?? 'Twitch clip'}
          h="100%"
          objectFit="cover"
          src={clip.thumbnailUrl}
          w="100%"
        />
      </Box>
    );
  }

  return (
    <Box
      alignItems="center"
      bg="bg.subtle"
      borderRadius="xl"
      display="flex"
      flexDirection="column"
      gap={2}
      justifyContent="center"
      style={{ aspectRatio: '16/9' }}
    >
      <Box color="fg.subtle">
        <Clapperboard size={22} />
      </Box>
      <Text color="fg.subtle" fontSize="xs" textAlign="center">
        {clip.title ?? clipComingSoon}
      </Text>
    </Box>
  );
}

const defaultClips: TwitchClip[] = Array.from({ length: DEFAULT_PLACEHOLDER_COUNT }, (_, i) => ({
  id: `placeholder-${i + 1}`,
}));

interface Props {
  clips?: TwitchClip[];
}

export function DayClips({ clips }: Props) {
  const t = useTranslations('dayPage');
  const displayClips = clips?.length ? clips : defaultClips;

  return (
    <Box>
      <Text
        color="fg.muted"
        fontSize="xs"
        fontWeight="semibold"
        letterSpacing="wide"
        mb={3}
        textTransform="uppercase"
      >
        {t('highlights')}
      </Text>
      <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
        {displayClips.map((clip) => (
          <ClipCard clip={clip} clipComingSoon={t('clipComingSoon')} key={clip.id} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
