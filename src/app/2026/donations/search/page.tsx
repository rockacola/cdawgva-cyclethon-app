import type { Metadata } from 'next';

import { DonationSearcher } from '@/components/DonationSearcher';
import { PageContainer } from '@/components/PageContainer';

export const metadata: Metadata = {
  title: 'Search Donations | Cyclethon Tracker',
};

export default function DonationSearchPage2026() {
  return (
    <PageContainer>
      <DonationSearcher />
    </PageContainer>
  );
}
