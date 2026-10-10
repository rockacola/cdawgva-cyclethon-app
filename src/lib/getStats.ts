import { FETCH_CACHE_REVALIDATE } from '@/lib/constants';
import type { DonationsStats } from '@/lib/types';

export async function getStats(url: string): Promise<DonationsStats> {
  const res = await fetch(url, { next: { revalidate: FETCH_CACHE_REVALIDATE } });
  return res.json();
}
