'use client';

import { Box, Link, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import type { JourneyDay } from '@/lib/journey';

interface Props {
  days: JourneyDay[];
}

export function DayNav({ days }: Props) {
  const pathname = usePathname();

  return (
    <Box as="nav" overflowX={{ base: 'auto', md: 'visible' }} w={{ base: 'full', md: '44' }}>
      {/* Mobile: horizontal scroll */}
      <Stack direction={{ base: 'row', md: 'column' }} gap={1} pb={{ base: 2, md: 0 }}>
        {days.map(({ slug, label, date }) => {
          const href = `/journey/${slug}`;
          const isActive = pathname === href;
          return (
            <Link
              _hover={{ bg: 'bg.subtle', color: 'fg', textDecoration: 'none' }}
              asChild
              bgColor={isActive ? 'bg.subtle' : undefined}
              borderRadius="md"
              color={isActive ? 'fg' : 'fg.muted'}
              display="block"
              fontWeight={isActive ? 'semibold' : 'normal'}
              key={slug}
              px={3}
              py={1.5}
              whiteSpace="nowrap"
            >
              <NextLink href={href}>
                <Text fontSize="sm">{label}</Text>
                <Text color="fg.subtle" fontSize="xs">
                  {date.toLocaleDateString('en-AU', {
                    month: 'short',
                    day: 'numeric',
                    timeZone: 'UTC',
                  })}
                </Text>
              </NextLink>
            </Link>
          );
        })}
      </Stack>
    </Box>
  );
}
