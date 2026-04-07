'use client';

import { DonationBarChart } from '@/components/DonationBarChart';
import { useDonations } from '@/contexts/DonationsContext';
import { useDayActivityBuckets } from '@/hooks/useDayActivityBuckets';

interface Props {
  dateStr: string; // "YYYY-MM-DD" JST calendar date for the day
}

export function DayDonationChart({ dateStr }: Props) {
  const { donations } = useDonations();
  const buckets = useDayActivityBuckets(dateStr, donations);

  return <DonationBarChart buckets={buckets} height={160} />;
}
