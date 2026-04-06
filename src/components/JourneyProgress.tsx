'use client';

import { Box, HStack } from '@chakra-ui/react';
import NextLink from 'next/link';

import { todayInOffset } from '@/lib/dateUtils';
import { flags } from '@/lib/flags';
import { getJourneyDays } from '@/lib/journey';

// Date strings in the same timezone as the stats payload
const EVENT_START_DATE = '2026-04-05'; // Day 1
const EVENT_END_DATE = '2026-04-19'; // Day 15

const DOT_SIZE = { base: '14px', md: '18px' };

interface JourneyProgressProps {
  utcOffset: string;
}

export function JourneyProgress({ utcOffset }: JourneyProgressProps) {
  const days = getJourneyDays();
  const todayStr = todayInOffset(utcOffset);

  const isPrePast = todayStr >= EVENT_START_DATE;
  const isPostPast = todayStr > EVENT_END_DATE;

  const preDot = (
    <Box
      bgColor={isPrePast ? 'teal.500' : 'bg.muted'}
      borderColor={isPrePast ? 'teal.500' : 'border'}
      borderRadius="full"
      borderWidth="2px"
      cursor="default"
      flexShrink={0}
      h={DOT_SIZE}
      title="Pre-event donations"
      w={DOT_SIZE}
    />
  );

  const postDot = (
    <Box
      bgColor={isPostPast ? 'teal.500' : 'bg.muted'}
      borderColor={isPostPast ? 'teal.500' : 'border'}
      borderRadius="full"
      borderWidth="2px"
      cursor="default"
      flexShrink={0}
      h={DOT_SIZE}
      title="Post-event donations"
      w={DOT_SIZE}
    />
  );

  return (
    <Box mt={4} position="relative" px={{ base: '5px', md: '14px', lg: '20px' }}>
      {/* Connecting line */}
      <Box
        bgColor="border"
        h="2px"
        left={0}
        position="absolute"
        right={0}
        top={{ base: '7px', md: '9px' }}
        zIndex={0}
      />

      <HStack align="flex-start" justify="space-between" position="relative" zIndex={1}>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          key="pre"
          overflow="visible"
          w={DOT_SIZE}
        >
          {preDot}
          <Box color="fg.subtle" fontSize="xs" mt={1} whiteSpace="nowrap">
            Pre
          </Box>
        </Box>
        {days.map(({ slug, label, date, day }) => {
          const dayStr = date.toISOString().slice(0, 10);
          const isPast = dayStr < todayStr;
          const isCurrent = dayStr === todayStr;
          const isClickable = flags.showJourneyDotLinks && (isPast || isCurrent);
          const showLabel = day === 1 || day === 15 || isCurrent;

          const tooltip = `${label} · ${date.toLocaleDateString('en-AU', {
            month: 'short',
            day: 'numeric',
            timeZone: 'UTC',
          })}`;

          // #fca67d is a mute orange color, compliments the #7dd3fc blue in bar chart
          const dot = (
            <Box
              _hover={isClickable ? { transform: 'scale(1.3)' } : undefined}
              aria-label={tooltip}
              bgColor={isCurrent ? '#fca67d' : isPast ? 'teal.500' : 'bg.muted'}
              borderColor={isCurrent ? '#fca67d' : isPast ? 'teal.500' : 'border'}
              borderRadius="full"
              borderWidth="2px"
              cursor={isClickable ? 'pointer' : 'default'}
              flexShrink={0}
              h={DOT_SIZE}
              title={tooltip}
              transition="transform 0.15s"
              w={DOT_SIZE}
            />
          );

          const dotEl = isClickable ? (
            <NextLink aria-label={label} href={`/journey/${slug}`} key={slug}>
              {dot}
            </NextLink>
          ) : (
            dot
          );

          return (
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              key={slug}
              overflow="visible"
              w={DOT_SIZE}
            >
              {dotEl}
              {showLabel ? (
                <Box color="fg.subtle" fontSize="xs" mt={1} whiteSpace="nowrap">
                  <Box display={{ base: 'block', md: 'none' }}>{day}</Box>
                  <Box display={{ base: 'none', md: 'block' }}>{label}</Box>
                </Box>
              ) : null}
            </Box>
          );
        })}
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          key="post"
          overflow="visible"
          w={DOT_SIZE}
        >
          {postDot}
          <Box color="fg.subtle" fontSize="xs" mt={1} whiteSpace="nowrap">
            Post
          </Box>
        </Box>
      </HStack>
    </Box>
  );
}
