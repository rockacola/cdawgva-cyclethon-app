import { useEffect, useState } from 'react';

import { filterAndWarnCurrency } from '@/lib/donationUtils';
import type { Donation, DonationsData } from '@/lib/types';

const R2_BASE_URL = process.env.NEXT_PUBLIC_R2_BASE_URL;

export function useDayDonations(dateStr: string): Donation[] {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(
    function fetchDaySnapshot() {
      let cancelled = false;
      fetch(`${R2_BASE_URL}/donations-${dateStr}.json`, { cache: 'force-cache' })
        .then((res) => res.json())
        .then((data: DonationsData) => {
          if (!cancelled) {
            setDonations(filterAndWarnCurrency(data.donations));
          }
        })
        .catch(() => {
          // silently ignore fetch failures for snapshots
        });
      return () => {
        cancelled = true;
      };
    },
    [dateStr]
  );

  return donations;
}
