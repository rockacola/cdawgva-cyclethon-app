import { useEffect, useState } from 'react';

import { DONATIONS_STATS_URL } from '@/lib/constants';
import type { DailyTotal, DonationsStats } from '@/lib/types';

export function useDailyTotals(): { dailyTotals: DailyTotal[]; isLoading: boolean } {
  const [dailyTotals, setDailyTotals] = useState<DailyTotal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function fetchDailyTotals() {
    let cancelled = false;

    fetch(DONATIONS_STATS_URL, { cache: 'no-store' })
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
  }, []);

  return { dailyTotals, isLoading };
}
