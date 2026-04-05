import { Box, HStack, Link, Stack, Text } from '@chakra-ui/react';
import { ExternalLink, MessageSquare } from 'lucide-react';

import type { RedditLink } from '@/lib/journey-data';

interface Props {
  author?: string;
  links?: RedditLink[];
}

export function DaySource({ author, links }: Props) {
  if (!author && !links?.length) {
    return null;
  }

  return (
    <Box bg="bg.subtle" borderRadius="xl" p={4}>
      <HStack gap={2} mb={2}>
        <MessageSquare size={15} />
        <Text fontSize="sm" fontWeight="semibold">
          Data Source
        </Text>
      </HStack>
      <Stack gap={1.5}>
        {author ? (
          <Text color="fg.muted" fontSize="sm">
            Infographics by{' '}
            <Link
              href={`https://old.reddit.com/user/${author}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              u/{author}
            </Link>
          </Text>
        ) : null}
        {links?.map((link) => (
          <HStack fontSize="sm" gap={2} key={link.url}>
            <Link href={link.url} rel="noopener noreferrer" target="_blank">
              {link.label ?? 'Reddit post'}{' '}
              <ExternalLink size={11} style={{ display: 'inline', verticalAlign: 'middle' }} />
            </Link>
          </HStack>
        ))}
      </Stack>
    </Box>
  );
}
