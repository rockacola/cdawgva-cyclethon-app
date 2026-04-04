import { DONATIONS_URL } from '@/lib/constants';
import type { DonationsData } from '@/lib/types';

export async function getDonations(): Promise<DonationsData> {
  const res = await fetch(DONATIONS_URL, { next: { revalidate: 60 } });
  return res.json();
}
