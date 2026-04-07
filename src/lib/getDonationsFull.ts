import { DONATIONS_FULL_URL, FETCH_CACHE_REVALIDATE } from '@/lib/constants';
import type { DonationsData } from '@/lib/types';

export async function getDonationsFull(): Promise<DonationsData> {
  const res = await fetch(DONATIONS_FULL_URL, { next: { revalidate: FETCH_CACHE_REVALIDATE } });
  return res.json();
}
