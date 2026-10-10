import { useEffect, useState } from 'react';

import { getArchivedDonationsDayUrl } from '@/lib/constants';
import { filterAndWarnCurrency } from '@/lib/donationUtils';
import { getEdition } from '@/lib/editions';
import type { Donation, DonationsData } from '@/lib/types';
import { useEditionContext } from '@/providers/EditionProvider';

export function useDayDonations(dateStr: string): Donation[] {
  const year = useEditionContext();
  const url = getArchivedDonationsDayUrl(getEdition(year)!.eventKey, dateStr);
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(
    function fetchDaySnapshot() {
      let cancelled = false;
      fetch(url, { cache: 'force-cache' })
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
    [url]
  );

  return donations;
}
