import { notFound } from 'next/navigation';

import { DayPageContent } from '@/components/journey/DayPageContent';
import { PageContainer } from '@/components/PageContainer';
import { getJourneyDay } from '@/lib/journey';
import { journeyData } from '@/lib/journey-data';

interface Props {
  params: Promise<{ day: string }>;
}

export default async function DayPage({ params }: Props) {
  const { day: slug } = await params;
  const day = getJourneyDay(slug);
  if (!day) {
    notFound();
  }

  const content = journeyData.find((d) => d.dayKey === slug);

  return (
    <PageContainer>
      <DayPageContent content={content} day={day} />
    </PageContainer>
  );
}
