import { Box, Button, Link, Stack } from '@chakra-ui/react';
import { PlayCircle, Tv2 } from 'lucide-react';
import Image from 'next/image';

import { getYouTubeVideoId } from '@/lib/youtube';

const TWITCH_COLOR = '#9146FF';
const YOUTUBE_COLOR = '#FF0000';

interface Props {
  twitchUrl?: string;
  youtubeUrl: string;
}

export function DayYouTubeEmbed({ twitchUrl, youtubeUrl }: Props) {
  const id = getYouTubeVideoId(youtubeUrl);
  if (!id) {
    return null;
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  return (
    <Stack gap={2}>
      <Box borderRadius="xl" overflow="hidden" position="relative" style={{ aspectRatio: '16/9' }}>
        <Image
          alt="YouTube thumbnail"
          fill
          sizes="(max-width: 1024px) 100vw, 280px"
          src={thumbnailUrl}
          style={{ objectFit: 'cover' }}
        />
      </Box>

      <Button
        asChild
        size="sm"
        style={{ borderColor: YOUTUBE_COLOR, color: YOUTUBE_COLOR }}
        variant="ghost"
        width="full"
      >
        <Link
          _hover={{ textDecoration: 'none' }}
          href={youtubeUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <PlayCircle size={15} />
          Watch on YouTube
        </Link>
      </Button>

      {twitchUrl ? (
        <Button
          asChild
          size="sm"
          style={{ borderColor: TWITCH_COLOR, color: TWITCH_COLOR }}
          variant="ghost"
          width="full"
        >
          <Link
            _hover={{ textDecoration: 'none' }}
            href={twitchUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Tv2 size={15} />
            Watch on Twitch
          </Link>
        </Button>
      ) : null}
    </Stack>
  );
}
