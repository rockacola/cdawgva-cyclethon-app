'use client';

import { useMemo } from 'react';

import { DonationFeed } from '@/components/DonationFeed';
import { getTopDonationsForDay } from '@/lib/donationUtils';
import { getJSTDayBounds } from '@/lib/timezoneUtils';
import type { Donation } from '@/lib/types';

interface Props {
  dateStr: string;
  donations: Donation[];
}

export function DayTopDonations({ dateStr, donations }: Props) {
  const topDonations = useMemo(
    function computeTopDonations() {
      const { end, start } = getJSTDayBounds(dateStr);
      return getTopDonationsForDay(donations, start, end);
    },
    [donations, dateStr]
  );

  if (topDonations.length === 0) {
    return null;
  }

  return <DonationFeed donations={topDonations} />;
}
