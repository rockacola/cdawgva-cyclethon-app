import type { DonationsData } from '@/lib/types';

export async function getDonations(url: string): Promise<DonationsData> {
  const res = await fetch(url, { next: { revalidate: false } });
  return res.json();
}
