'use client';

import { DailyDonationsChart } from '@/components/DailyDonationsChart';
import { HomeCause } from '@/components/HomeCause';
import { LatestDonations } from '@/components/LatestDonations';
import { LedgerSection } from '@/components/LedgerSection';
import { WhoComing } from '@/components/WhoComing';
import { useTranslations } from '@/hooks/useTranslations';
import type { Donation } from '@/lib/types';

interface HomeBodyProps {
  donations: Donation[];
}

export function HomeBody({ donations }: HomeBodyProps) {
  const t = useTranslations('home');

  return (
    <>
      <LedgerSection index={t('sectionJourneyIndex')} title={t('sectionJourneyTitle')}>
        <DailyDonationsChart />
      </LedgerSection>

      <LedgerSection index={t('sectionCauseIndex')} title={t('sectionCauseTitle')}>
        <HomeCause />
      </LedgerSection>

      <LedgerSection index={t('sectionCastIndex')} title={t('sectionCastTitle')}>
        <WhoComing />
      </LedgerSection>

      <LedgerSection
        borderBottom={false}
        index={t('sectionDonationsIndex')}
        title={t('sectionDonationsTitle')}
      >
        <LatestDonations donations={donations} />
      </LedgerSection>
    </>
  );
}
