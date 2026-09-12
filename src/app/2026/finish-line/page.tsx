import type { Metadata } from 'next';

import { FinishLineContent } from '@/components/FinishLineContent';
import { PageContainer } from '@/components/PageContainer';

export const metadata: Metadata = {
  title: 'Finish Line | Cyclethon Tracker',
};

export default function FinishLinePage2026() {
  return (
    <PageContainer>
      <FinishLineContent />
    </PageContainer>
  );
}
