import { FETCH_CACHE_REVALIDATE } from '@/lib/constants';
import type { CampaignFact, DonationsStats } from '@/lib/types';

export async function getCampaignFact(url: string): Promise<CampaignFact | null> {
  try {
    const res = await fetch(url, { next: { revalidate: FETCH_CACHE_REVALIDATE } });
    const data: DonationsStats = await res.json();
    const c = data.campaign;
    if (!c) {
      return null;
    }
    return {
      currency: c.amount_raised_currency,
      goal_cent: c.goal_cent,
      total_amount_raised_cent: c.amount_raised_cent,
    };
  } catch {
    return null;
  }
}
