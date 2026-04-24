import type { Metadata } from 'next';

import { AboutCyclethonContent } from '@/components/AboutCyclethonContent';
import { PageContainer } from '@/components/PageContainer';

export const metadata: Metadata = {
  title: 'About Cyclethon | Cyclethon Tracker',
};

export default function AboutCyclethonPage() {
  return (
    <PageContainer>
      <AboutCyclethonContent />
    </PageContainer>
  );
}
