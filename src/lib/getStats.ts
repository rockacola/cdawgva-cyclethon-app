import { DONATIONS_STATS_URL, FETCH_CACHE_REVALIDATE } from '@/lib/constants';
import type { DonationsStats } from '@/lib/types';

export async function getStats(url: string = DONATIONS_STATS_URL): Promise<DonationsStats> {
  const res = await fetch(url, { next: { revalidate: FETCH_CACHE_REVALIDATE } });
  return res.json();
}
