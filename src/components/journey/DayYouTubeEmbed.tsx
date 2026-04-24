'use client';

import { Box, Button, Link, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { SiTwitch, SiYoutube } from 'react-icons/si';

import { useTranslations } from '@/hooks/useTranslations';
import { getYouTubeVideoId } from '@/lib/youtube';

const TWITCH_COLOR = '#9146FF';
const YOUTUBE_COLOR = '#FF0000';

interface Props {
  twitchUrl?: string;
  youtubeUrl?: string;
}

export function DayYouTubeEmbed({ twitchUrl, youtubeUrl }: Props) {
  const t = useTranslations('dayPage');
  const id = youtubeUrl ? getYouTubeVideoId(youtubeUrl) : null;
  const thumbnailUrl = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;

  return (
    <Stack gap={2}>
      {thumbnailUrl ? (
        <Box
          borderRadius="sm"
          overflow="hidden"
          position="relative"
          style={{ aspectRatio: '16/9' }}
        >
          <Image
            alt="YouTube thumbnail"
            fill
            sizes="(max-width: 1024px) 100vw, 280px"
            src={thumbnailUrl}
            style={{ objectFit: 'cover' }}
          />
        </Box>
      ) : null}

      {youtubeUrl ? (
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
            <SiYoutube size={15} />
            {t('watchOnYouTube')}
          </Link>
        </Button>
      ) : null}

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
            <SiTwitch size={15} />
            {t('watchOnTwitch')}
          </Link>
        </Button>
      ) : null}
    </Stack>
  );
}
