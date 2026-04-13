import type { Metadata } from 'next';

import { AboutCyclethonContent } from '@/components/AboutCyclethonContent';

export const metadata: Metadata = {
  title: 'About Cyclethon | Cyclethon Tracker',
};

export default function AboutCyclethonPage() {
  return <AboutCyclethonContent />;
}
