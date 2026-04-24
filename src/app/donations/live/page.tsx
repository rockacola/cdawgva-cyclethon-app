import type { Metadata } from 'next';

import { DonationLiveFeed } from '@/components/DonationLiveFeed';
import { PageContainer } from '@/components/PageContainer';
import { getCampaignFact } from '@/lib/getCampaignFact';
import { getDonations } from '@/lib/getDonations';

export const metadata: Metadata = {
  title: 'Live Donations | Cyclethon Tracker',
};

export default async function DonationsLivePage() {
  const [{ donations }, initialCampaignFact] = await Promise.all([
    getDonations(),
    getCampaignFact(),
  ]);

  return (
    <PageContainer>
      <DonationLiveFeed initialCampaignFact={initialCampaignFact} initialDonations={donations} />
    </PageContainer>
  );
}
