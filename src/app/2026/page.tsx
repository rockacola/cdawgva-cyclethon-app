import type { Metadata } from 'next';

import { HomeBody } from '@/components/HomeBody';
import { HomeHero } from '@/components/HomeHero';
import { PageContainer } from '@/components/PageContainer';
import { getArchivedDonationsStatsUrl, getArchivedDonationsUrl } from '@/lib/constants';
import { getEdition } from '@/lib/editions';
import { getDonations } from '@/lib/getDonations';
import { getStats } from '@/lib/getStats';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Cyclethon Tracker',
};

const eventKey = getEdition(2026)!.eventKey;

export default async function HomePage2026() {
  const [{ donations }, stats] = await Promise.all([
    getDonations(getArchivedDonationsUrl(eventKey)),
    getStats(getArchivedDonationsStatsUrl(eventKey)),
  ]);

  return (
    <PageContainer>
      <HomeHero stats={stats} />
      <HomeBody donations={donations.slice(0, 50)} />
    </PageContainer>
  );
}
