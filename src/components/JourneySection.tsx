'use client';

import { Box, HStack, Text } from '@chakra-ui/react';

import { DailyDonationsChart } from '@/components/DailyDonationsChart';
import { JourneyProgress } from '@/components/JourneyProgress';
import { useTranslations } from '@/hooks/useTranslations';
import type { CampaignFact } from '@/lib/types';

import { HomeDonationProgress } from './HomeDonationProgress';

interface JourneySectionProps {
  initialCampaignFact: CampaignFact | null;
  utcOffset: string;
}

export function JourneySection({ initialCampaignFact, utcOffset }: JourneySectionProps) {
  const t = useTranslations('home');

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
          {t('journeySectionLabel')}
        </Text>
      </HStack>
      <Text color="fg.muted" fontSize="sm" mb={6}>
        {t('journeyDescription')}
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
