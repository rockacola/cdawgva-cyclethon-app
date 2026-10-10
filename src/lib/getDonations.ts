import { FETCH_CACHE_REVALIDATE } from '@/lib/constants';
import type { DonationsData } from '@/lib/types';

export async function getDonations(url: string): Promise<DonationsData> {
  const res = await fetch(url, { next: { revalidate: FETCH_CACHE_REVALIDATE } });
  return res.json();
}
