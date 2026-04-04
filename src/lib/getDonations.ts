import { DONATIONS_URL, FETCH_CACHE_REVALIDATE } from '@/lib/constants';
import type { DonationsData } from '@/lib/types';

export async function getDonations(): Promise<DonationsData> {
  const res = await fetch(DONATIONS_URL, { next: { revalidate: FETCH_CACHE_REVALIDATE } });
  return res.json();
}
