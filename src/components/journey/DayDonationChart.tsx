'use client';

import { DonationBarChart } from '@/components/DonationBarChart';
import { useDayActivityBuckets } from '@/hooks/useDayActivityBuckets';
import type { Donation } from '@/lib/types';

interface Props {
  dateStr: string; // "YYYY-MM-DD" JST calendar date for the day
  donations: Donation[];
}

export function DayDonationChart({ dateStr, donations }: Props) {
  const buckets = useDayActivityBuckets(dateStr, donations);

  return <DonationBarChart buckets={buckets} />;
}
