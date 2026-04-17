import type { Metadata } from 'next';

import { FinishLineContent } from '@/components/FinishLineContent';

export const metadata: Metadata = {
  title: 'Finish Line | Cyclethon Tracker',
};

export default function FinishLinePage() {
  return <FinishLineContent />;
}
