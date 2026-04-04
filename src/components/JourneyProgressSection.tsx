import { Box, HStack, Link, Text } from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';
import NextLink from 'next/link';

import { JourneyProgress } from '@/components/JourneyProgress';
import { flags } from '@/lib/flags';

export function JourneyProgressSection() {
  return (
    <Box borderBottomWidth="1px" py={{ base: 10, md: 16 }}>
      <HStack align="baseline" justify="space-between" mb={2}>
        <Text
          color="fg.muted"
          fontSize="xs"
          fontWeight="semibold"
          letterSpacing="wide"
          textTransform="uppercase"
        >
          The Journey
        </Text>
        {flags.showJourneyAllDaysLink ? (
          <Link
            _hover={{ color: 'fg', textDecoration: 'none' }}
            asChild
            color="fg.muted"
            fontSize="xs"
          >
            <NextLink href="/journey">
              <HStack gap={1}>
                <Text>All days</Text>
                <ArrowRight size={12} />
              </HStack>
            </NextLink>
          </Link>
        ) : null}
      </HStack>
      <Text color="fg.muted" fontSize="sm" mb={6}>
        15 days of cycling across Japan, one day at a time. The road ahead is long and everything
        ahead is still unwritten.
      </Text>
      <JourneyProgress />
    </Box>
  );
}
