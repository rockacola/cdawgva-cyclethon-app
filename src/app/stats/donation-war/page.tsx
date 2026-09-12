import { redirect } from 'next/navigation';

import { CURRENT_EDITION } from '@/lib/editions';

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function DonationWarPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string') {
      query.set(key, value);
    }
  }
  const queryString = query.toString();
  redirect(`/${CURRENT_EDITION.year}/stats/donation-war${queryString ? `?${queryString}` : ''}`);
}
