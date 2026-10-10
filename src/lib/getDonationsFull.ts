import { DONATIONS_FULL_URL, FETCH_CACHE_REVALIDATE } from '@/lib/constants';
import type { DonationsData } from '@/lib/types';

export async function getDonationsFull(url: string = DONATIONS_FULL_URL): Promise<DonationsData> {
  const res = await fetch(url, { next: { revalidate: FETCH_CACHE_REVALIDATE } });
  return res.json();
}
