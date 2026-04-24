import type { Metadata } from 'next';

import { AboutContent } from '@/components/AboutContent';
import { PageContainer } from '@/components/PageContainer';

export const metadata: Metadata = {
  title: 'About | Cyclethon Tracker',
};

export default function AboutPage() {
  return (
    <PageContainer>
      <AboutContent />
    </PageContainer>
  );
}
