'use client';

import { Box, HStack } from '@chakra-ui/react';
import NextLink from 'next/link';

import { flags } from '@/lib/flags';
import { getJourneyDays } from '@/lib/journey';

export function JourneyProgress() {
  const days = getJourneyDays();

  // Determine today's date in JST (UTC+9)
  const nowUtc = new Date();
  const jstNow = new Date(nowUtc.getTime() + 9 * 60 * 60 * 1000);
  const today = new Date(
    Date.UTC(jstNow.getUTCFullYear(), jstNow.getUTCMonth(), jstNow.getUTCDate())
  );

  return (
    <Box position="relative" px={1}>
      {/* Connecting line */}
      <Box
        bg="border"
        height="2px"
        left={0}
        position="absolute"
        right={0}
        top={{ base: '7px', md: '9px' }}
        zIndex={0}
      />

      <HStack justify="space-between" position="relative" zIndex={1}>
        {days.map(({ slug, label, date }) => {
          const dayDate = new Date(
            Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
          );
          const isPast = dayDate < today;
          const isCurrent = dayDate.getTime() === today.getTime();
          const isClickable = flags.showJourneyDotLinks && (isPast || isCurrent);

          const tooltip = `${label} · ${date.toLocaleDateString('en-AU', {
            month: 'short',
            day: 'numeric',
            timeZone: 'UTC',
          })}`;

          const dot = (
            <Box
              _hover={isClickable ? { transform: 'scale(1.3)' } : undefined}
              aria-label={tooltip}
              bg={isCurrent ? 'orange.400' : isPast ? 'teal.500' : 'bg.muted'}
              borderColor={isCurrent ? 'orange.400' : isPast ? 'teal.500' : 'border'}
              borderRadius="full"
              borderWidth="2px"
              cursor={isClickable ? 'pointer' : 'default'}
              flexShrink={0}
              h={{ base: '14px', md: '18px' }}
              title={tooltip}
              transition="transform 0.15s"
              w={{ base: '14px', md: '18px' }}
            />
          );

          if (isClickable) {
            return (
              <NextLink aria-label={label} href={`/journey/${slug}`} key={slug}>
                {dot}
              </NextLink>
            );
          }

          return <Box key={slug}>{dot}</Box>;
        })}
      </HStack>

      {/* Day labels at each end */}
      <HStack justify="space-between" mt={2}>
        <Box color="fg.subtle" fontSize="xs">
          Day 1
        </Box>
        <Box color="fg.subtle" fontSize="xs">
          Day 15
        </Box>
      </HStack>
    </Box>
  );
}
