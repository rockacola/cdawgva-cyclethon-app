'use client';

import { Box, Link, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import { useTranslations } from '@/hooks/useTranslations';
import type { JourneyDay } from '@/lib/journey';
import { useLocaleContext } from '@/providers/LocaleProvider';

interface Props {
  availableDaySlugs: Set<string>;
  days: JourneyDay[];
}

export function DayNav({ availableDaySlugs, days }: Props) {
  const pathname = usePathname();
  const t = useTranslations('dayNav');
  const { resolvedLocale } = useLocaleContext();
  const dateLocale = resolvedLocale === 'JA' ? 'ja-JP' : 'en-US';

  return (
    <Box
      as="nav"
      overflowX={{ base: 'auto', md: 'visible' }}
      position={{ md: 'sticky' }}
      top={{ md: 4 }}
      w={{ base: 'full', md: '44' }}
    >
      {/* Mobile: horizontal scroll */}
      <Stack direction={{ base: 'row', md: 'column' }} gap={1} pb={{ base: 2, md: 0 }}>
        {days.map(({ date, day, slug }) => {
          const href = `/journey/${slug}`;
          const isActive = pathname === href;
          const hasData = availableDaySlugs.has(slug);

          const dayLabel = t('dayLabel', { day });
          const dateLabel = date.toLocaleDateString(dateLocale, {
            day: 'numeric',
            month: 'short',
            timeZone: 'UTC',
          });

          if (!hasData) {
            return (
              <Box
                borderRadius="sm"
                cursor="default"
                key={slug}
                opacity={0.35}
                px={3}
                py={1.5}
                whiteSpace="nowrap"
              >
                <Text color="fg.muted" fontSize="sm">
                  {dayLabel}
                </Text>
                <Text color="fg.subtle" fontSize="xs">
                  {dateLabel}
                </Text>
              </Box>
            );
          }

          return (
            <Link
              _hover={{ bg: 'bg.subtle', color: 'fg', textDecoration: 'none' }}
              asChild
              bgColor={isActive ? 'bg.subtle' : undefined}
              borderRadius="sm"
              color={isActive ? 'fg' : 'fg.muted'}
              display="block"
              fontWeight={isActive ? 'semibold' : 'normal'}
              key={slug}
              px={3}
              py={1.5}
              whiteSpace="nowrap"
            >
              <NextLink href={href}>
                <Text fontSize="sm">{dayLabel}</Text>
                <Text color="fg.subtle" fontSize="xs">
                  {dateLabel}
                </Text>
              </NextLink>
            </Link>
          );
        })}
      </Stack>
    </Box>
  );
}
