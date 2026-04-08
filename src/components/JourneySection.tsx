import { Box, HStack, Text } from '@chakra-ui/react';

import { DailyDonationsChart } from '@/components/DailyDonationsChart';
import { JourneyProgress } from '@/components/JourneyProgress';
import type { CampaignFact } from '@/lib/types';

import { HomeDonationProgress } from './HomeDonationProgress';

interface JourneySectionProps {
  initialCampaignFact: CampaignFact | null;
  utcOffset: string;
}

export function JourneySection({ initialCampaignFact, utcOffset }: JourneySectionProps) {
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
      </HStack>
      <Text color="fg.muted" fontSize="sm" mb={6}>
        The route is mapped. The rest is up to all of us. Fifteen days of ground to cover,
        milestones to hit, and targets to shatter. One day at a time.
      </Text>
      <Box minH="60px" position="relative">
        <DailyDonationsChart />
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
