import { Container } from '@chakra-ui/react';
import type { Metadata } from 'next';

import { DonationLiveFeed } from '@/components/DonationLiveFeed';
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
    <Container maxW="960px" px={0}>
      <DonationLiveFeed initialCampaignFact={initialCampaignFact} initialDonations={donations} />
    </Container>
  );
}
