import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Journey | Cyclethon Tracker',
};

export default function JourneyPage() {
  redirect('/journey/day-1');
}
