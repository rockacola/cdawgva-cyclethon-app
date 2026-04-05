import { Badge, Box, HStack, Link, Stack, Text } from '@chakra-ui/react';
import { ExternalLink, PlayCircle, Tv2 } from 'lucide-react';

import type { VideoLink } from '@/lib/journey-data';

function VodItem({ video }: { video: VideoLink }) {
  const isTwitch = video.platform === 'Twitch';
  const color = isTwitch ? '#9146ff' : '#ff0000';
  const defaultLabel = isTwitch ? 'Watch on Twitch' : 'Watch on YouTube';

  return (
    <Box borderRadius="lg" borderWidth="1px" p={4}>
      <HStack gap={3}>
        <Box style={{ color }}>{isTwitch ? <Tv2 size={18} /> : <PlayCircle size={18} />}</Box>
        <Stack gap={1}>
          <Badge colorPalette={isTwitch ? 'purple' : 'red'} size="sm" width="fit-content">
            {video.platform}
          </Badge>
          <Link
            fontSize="sm"
            fontWeight="medium"
            href={video.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {video.label ?? defaultLabel}{' '}
            <ExternalLink size={11} style={{ display: 'inline', verticalAlign: 'middle' }} />
          </Link>
        </Stack>
      </HStack>
    </Box>
  );
}

function VodPlaceholder({ platform }: { platform: 'Twitch' | 'YouTube' }) {
  const isTwitch = platform === 'Twitch';
  return (
    <Box bg="bg.subtle" borderRadius="lg" p={4}>
      <HStack gap={3}>
        <Box color="fg.subtle">{isTwitch ? <Tv2 size={18} /> : <PlayCircle size={18} />}</Box>
        <Text color="fg.subtle" fontSize="sm">
          {isTwitch ? 'Twitch VOD' : 'YouTube VOD'} — coming soon
        </Text>
      </HStack>
    </Box>
  );
}

interface Props {
  videoLinks?: VideoLink[];
}

export function DayVods({ videoLinks }: Props) {
  const twitchVods = videoLinks?.filter((v) => v.platform === 'Twitch') ?? [];
  const youtubeVods = videoLinks?.filter((v) => v.platform === 'YouTube') ?? [];
  const hasVods = twitchVods.length > 0 || youtubeVods.length > 0;

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
        Videos
      </Text>
      <Stack gap={3}>
        {twitchVods.map((v) => (
          <VodItem key={v.url} video={v} />
        ))}
        {youtubeVods.map((v) => (
          <VodItem key={v.url} video={v} />
        ))}
        {!hasVods && (
          <>
            <VodPlaceholder platform="Twitch" />
            <VodPlaceholder platform="YouTube" />
          </>
        )}
      </Stack>
    </Box>
  );
}
