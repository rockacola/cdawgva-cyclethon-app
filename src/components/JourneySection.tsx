import { Box, HStack, Link, Text } from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';
import NextLink from 'next/link';

import { DailyDonationsChart } from '@/components/DailyDonationsChart';
import { JourneyProgress } from '@/components/JourneyProgress';
import { flags } from '@/lib/flags';
import type { CampaignFact, DailyTotal } from '@/lib/types';

import { HomeDonationProgress } from './HomeDonationProgress';

interface JourneySectionProps {
  dailyTotals: DailyTotal[];
  initialCampaignFact: CampaignFact | null;
  utcOffset: string;
}

export function JourneySection({
  dailyTotals,
  initialCampaignFact,
  utcOffset,
}: JourneySectionProps) {
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
        <DailyDonationsChart dailyTotals={dailyTotals} />
        <Box left={0} position="absolute" top={0} w="100%">
          <JourneyProgress utcOffset={utcOffset} />
        </Box>
      </Box>
      <Box pt={{ base: 4, md: 6 }}>
        <HomeDonationProgress initialCampaignFact={initialCampaignFact} />
      </Box>
    </Box>
  );
}
