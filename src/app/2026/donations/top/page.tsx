import type { Metadata } from 'next';

import { PageContainer } from '@/components/PageContainer';
import { TopDonors } from '@/components/TopDonors';

export const metadata: Metadata = {
  title: 'Top Donors | Cyclethon Tracker',
};

export default function TopDonorsPage2026() {
  return (
    <PageContainer>
      <TopDonors />
    </PageContainer>
  );
}
