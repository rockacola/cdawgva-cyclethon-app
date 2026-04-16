'use client';

import { Box, HStack, Text } from '@chakra-ui/react';

import { DailyDonationsChart } from '@/components/DailyDonationsChart';
import { JourneyProgress } from '@/components/JourneyProgress';
import { useTranslations } from '@/hooks/useTranslations';
import type { CampaignFact } from '@/lib/types';

import { HomeDonationProgress } from './HomeDonationProgress';

interface JourneySectionProps {
  borderBottom?: boolean;
  description?: string | null;
  initialCampaignFact: CampaignFact | null;
  label?: string;
  utcOffset: string;
}

export function JourneySection({
  borderBottom = true,
  description,
  initialCampaignFact,
  label,
  utcOffset,
}: JourneySectionProps) {
  const t = useTranslations('home');

  return (
    <Box
      borderBottomWidth={borderBottom ? '1px' : 0}
      pb={{ base: 10, md: 16 }}
      pt={{ base: 10, md: 16 }}
    >
      <HStack align="baseline" justify="space-between" mb={2}>
        <Text
          color="fg.muted"
          fontSize="xs"
          fontWeight="semibold"
          letterSpacing="wide"
          textTransform="uppercase"
        >
          {label ?? t('journeySectionLabel')}
        </Text>
      </HStack>
      {description !== null && (
        <Text color="fg.muted" fontSize="sm" mb={6}>
          {description ?? t('journeyDescription')}
        </Text>
      )}
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
