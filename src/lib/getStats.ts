import type { DonationsStats } from '@/lib/types';

export async function getStats(url: string): Promise<DonationsStats> {
  const res = await fetch(url, { next: { revalidate: false } });
  return res.json();
}
