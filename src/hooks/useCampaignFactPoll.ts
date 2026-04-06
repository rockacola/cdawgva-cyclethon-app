import { useEffect, useState } from 'react';

import { DONATIONS_STATS_URL } from '@/lib/constants';
import type { CampaignFact, DonationsStats } from '@/lib/types';

export function useCampaignFactPoll(
  initial: CampaignFact | null,
  intervalMs: number
): CampaignFact | null {
  const [fact, setFact] = useState<CampaignFact | null>(initial);

  useEffect(
    function pollCampaignFact() {
      const fetchFact = async () => {
        try {
          const res = await fetch(DONATIONS_STATS_URL, { cache: 'no-store' });
          const data: DonationsStats = await res.json();
          const c = data.campaign;
          if (!c) {
            return;
          }
          setFact({
            currency: c.amount_raised_currency,
            goal_cent: c.goal_cent,
            total_amount_raised_cent: c.amount_raised_cent,
          });
        } catch {
          // silently ignore poll failures
        }
      };

      fetchFact();
      const id = setInterval(fetchFact, intervalMs);
      return () => clearInterval(id);
    },
    [intervalMs]
  );

  return fact;
}
