'use client';

import { Text } from '@chakra-ui/react';

import { useTranslations } from '@/hooks/useTranslations';
import type { DonationWarEntry } from '@/lib/journey';
import type { Donation } from '@/lib/types';
import { useTimezoneContext } from '@/providers/TimezoneProvider';

import { DonationWarTable } from '../DonationWarTable';

import { DonationWarCard } from './DonationWarCard';

const MAX_ROW_COUNT = 10;

interface Props {
  donations: Donation[];
  wars: DonationWarEntry[];
}

export function DayDonationWar({ donations, wars }: Props) {
  const t = useTranslations('dayPage');
  const { timezoneMode } = useTimezoneContext();

  return (
    <>
      {wars.map((war) => (
        <DonationWarCard
          key={`${war.startTimestamp}-${war.type}`}
          timezoneMode={timezoneMode}
          war={war}
        >
          <DonationWarTable
            donations={donations.filter(
              (d) => d.completed_at >= war.startTimestamp && d.completed_at <= war.endTimestamp
            )}
            maxCount={MAX_ROW_COUNT}
            type={war.type}
          />
        </DonationWarCard>
      ))}
      <Text color="fg.muted" fontSize="xs" mt={2}>
        {t('disclaimer')}
      </Text>
    </>
  );
}
