import type { Metadata } from 'next';

import { JourneyPageContent } from '@/components/journey/JourneyPageContent';
import type { GuestCyclist } from '@/lib/journey';
import { getCompletedDays, getTotalDistanceKm } from '@/lib/journey';
import { journeyData } from '@/lib/journey-data';

export const metadata: Metadata = {
  title: 'Journey | Cyclethon Tracker',
};

export default async function JourneyPage() {
  const completedDays = getCompletedDays();
  const totalDistanceKm = getTotalDistanceKm();
  const totalCaloriesBurnt = completedDays.reduce((sum, d) => sum + (d.caloriesBurnt ?? 0), 0);
  const totalTimeCycling = completedDays.reduce((sum, d) => sum + (d.timeCycling ?? 0), 0);

  const guestsByHandler = new Map<string, GuestCyclist>();
  for (const day of journeyData) {
    for (const guest of day.guests ?? []) {
      if (!guestsByHandler.has(guest.handler)) {
        guestsByHandler.set(guest.handler, guest);
      }
    }
  }
  const guests = [...guestsByHandler.values()];

  return (
    <JourneyPageContent
      guests={guests}
      totalCaloriesBurnt={totalCaloriesBurnt}
      totalDistanceKm={totalDistanceKm}
      totalTimeCycling={totalTimeCycling}
    />
  );
}
