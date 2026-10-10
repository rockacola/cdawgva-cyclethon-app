import { useEffect, useState } from 'react';

import { getArchivedDonationsStatsUrl } from '@/lib/constants';
import { getEdition } from '@/lib/editions';
import type { DailyTotal, DonationsStats } from '@/lib/types';
import { useEditionContext } from '@/providers/EditionProvider';

export function useDailyTotals(): { dailyTotals: DailyTotal[]; isLoading: boolean } {
  const year = useEditionContext();
  const url = getArchivedDonationsStatsUrl(getEdition(year)!.eventKey);
  const [dailyTotals, setDailyTotals] = useState<DailyTotal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function fetchDailyTotals() {
      let cancelled = false;

      fetch(url, { cache: 'no-store' })
        .then((res) => res.json() as Promise<DonationsStats>)
        .then((data) => {
          if (!cancelled) {
            setDailyTotals(data.stats.daily_totals);
            setIsLoading(false);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setIsLoading(false);
          }
        });

      return () => {
        cancelled = true;
      };
    },
    [url]
  );

  return { dailyTotals, isLoading };
}
