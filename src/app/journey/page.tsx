import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { journeyData } from '@/lib/journey-data';

export const metadata: Metadata = {
  title: 'Journey | Cyclethon Tracker',
};

export default function JourneyPage() {
  // Assume journey data is sorted by days in ascending order
  const latest = [...journeyData].reverse().find((d) => d.destination || d.startPoint);
  redirect(`/journey/${latest?.dayKey ?? 'day-1'}`);
}
