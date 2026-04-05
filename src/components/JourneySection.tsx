import { Box, HStack, Link, Text } from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';
import NextLink from 'next/link';

import { DailyDonationsChart } from '@/components/DailyDonationsChart';
import { JourneyProgress } from '@/components/JourneyProgress';
import { flags } from '@/lib/flags';
import type { DailyTotal } from '@/lib/types';

interface JourneySectionProps {
  dailyTotals: DailyTotal[];
  utcOffset: string;
}

export function JourneySection({ dailyTotals, utcOffset }: JourneySectionProps) {
  return (
    <Box borderBottomWidth="1px" pb={{ base: 10, md: 16 }} pt={{ base: 10, md: 16 }}>
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
      <Box minH="60px" position="relative">
        {/* Show chart from Day 3 (2026-04-07) onward. Month is 0-indexed: 3 = April */}
        {Date.now() >= Date.UTC(2026, 3, 7) && <DailyDonationsChart dailyTotals={dailyTotals} />}
        <Box left={0} position="absolute" top={0} w="100%">
          <JourneyProgress utcOffset={utcOffset} />
        </Box>
      </Box>
    </Box>
  );
}
