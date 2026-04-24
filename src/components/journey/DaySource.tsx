'use client';

import { Box, HStack, Link, Stack, Text } from '@chakra-ui/react';
import { ExternalLink, MessageSquare } from 'lucide-react';

import { useTranslations } from '@/hooks/useTranslations';

interface Props {
  redditAuthor?: string;
  redditLabel?: string;
  redditUrl?: string;
}

export function DaySource({ redditAuthor, redditLabel, redditUrl }: Props) {
  const t = useTranslations('dayPage');

  if (!redditAuthor && !redditUrl) {
    return null;
  }

  return (
    <Box bg="bg.subtle" borderRadius="sm" mb={6} p={8}>
      <HStack gap={2} mb={2}>
        <MessageSquare size={15} />
        <Text fontSize="sm" fontWeight="semibold">
          {t('dataSource')}
        </Text>
      </HStack>
      <Stack gap={1.5}>
        {redditAuthor ? (
          <Text color="fg.muted" fontSize="sm">
            {t('infographicsBy')}{' '}
            <Link
              href={`https://old.reddit.com/user/${redditAuthor}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              u/{redditAuthor}
            </Link>
          </Text>
        ) : null}
        {redditUrl ? (
          <HStack fontSize="sm" gap={2}>
            <Link href={redditUrl} rel="noopener noreferrer" target="_blank">
              {redditLabel ?? t('redditPost')}{' '}
              <ExternalLink size={11} style={{ display: 'inline', verticalAlign: 'middle' }} />
            </Link>
          </HStack>
        ) : null}
      </Stack>
    </Box>
  );
}
