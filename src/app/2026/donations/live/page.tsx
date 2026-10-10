import type { Metadata } from 'next';

import { DonationLiveFeed } from '@/components/DonationLiveFeed';
import { PageContainer } from '@/components/PageContainer';
import { getArchivedDonationsStatsUrl, getArchivedDonationsUrl } from '@/lib/constants';
import { getEdition } from '@/lib/editions';
import { getCampaignFact } from '@/lib/getCampaignFact';
import { getDonations } from '@/lib/getDonations';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Live Donations | Cyclethon Tracker',
};

const eventKey = getEdition(2026)!.eventKey;
const archivedUrl = getArchivedDonationsUrl(eventKey);
const archivedStatsUrl = getArchivedDonationsStatsUrl(eventKey);

export default async function DonationsLivePage2026() {
  const [{ donations }, initialCampaignFact] = await Promise.all([
    getDonations(archivedUrl),
    getCampaignFact(archivedStatsUrl),
  ]);

  return (
    <PageContainer>
      <DonationLiveFeed
        initialCampaignFact={initialCampaignFact}
        initialDonations={donations}
        sourceUrl={archivedUrl}
      />
    </PageContainer>
  );
}
