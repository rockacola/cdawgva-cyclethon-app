import type { Metadata } from 'next';

import { HomeBody } from '@/components/HomeBody';
import { HomeHero } from '@/components/HomeHero';
import { PageContainer } from '@/components/PageContainer';
import { getDonations } from '@/lib/getDonations';
import { getStats } from '@/lib/getStats';

export const metadata: Metadata = {
  title: 'Cyclethon Tracker',
};

export default async function HomePage() {
  const [{ donations }, stats] = await Promise.all([getDonations(), getStats()]);

  return (
    <>
      <PageContainer>
        <HomeHero stats={stats} />
        <HomeBody donations={donations.slice(0, 50)} />
      </PageContainer>{' '}
    </>
  );
}
