import type { Metadata } from 'next';

import { JourneyPageContent } from '@/components/journey/JourneyPageContent';
import { getCampaignFact } from '@/lib/getCampaignFact';
import { getStats } from '@/lib/getStats';
import type { GuestCyclist } from '@/lib/journey-data';
import { journeyData } from '@/lib/journey-data';

export const metadata: Metadata = {
  title: 'Journey | Cyclethon Tracker',
};

export default async function JourneyPage() {
  const [stats, initialCampaignFact] = await Promise.all([getStats(), getCampaignFact()]);

  const completedDays = journeyData.filter((d) => d.distanceKm !== undefined);
  const totalDistanceKm = completedDays.reduce((sum, d) => sum + (d.distanceKm ?? 0), 0);
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
      initialCampaignFact={initialCampaignFact}
      totalCaloriesBurnt={totalCaloriesBurnt}
      totalDistanceKm={totalDistanceKm}
      totalTimeCycling={totalTimeCycling}
      utcOffset={stats._meta.utc_offset}
    />
  );
}
