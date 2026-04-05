import { DONATIONS_STATS_URL, FETCH_CACHE_REVALIDATE } from '@/lib/constants';
import type { DonationsStats } from '@/lib/types';

export async function getStats(): Promise<DonationsStats> {
  const res = await fetch(DONATIONS_STATS_URL, { next: { revalidate: FETCH_CACHE_REVALIDATE } });
  return res.json();
}
