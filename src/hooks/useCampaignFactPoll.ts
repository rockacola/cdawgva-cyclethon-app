import { useEffect, useState } from 'react';

import { getArchivedDonationsStatsUrl } from '@/lib/constants';
import { getEdition } from '@/lib/editions';
import type { CampaignFact, DonationsStats } from '@/lib/types';
import { useEditionContext } from '@/providers/EditionProvider';

export function useCampaignFactPoll(
  initial: CampaignFact | null,
  intervalMs: number
): CampaignFact | null {
  const year = useEditionContext();
  const url = getArchivedDonationsStatsUrl(getEdition(year)!.eventKey);
  const [fact, setFact] = useState<CampaignFact | null>(initial);

  useEffect(
    function pollCampaignFact() {
      const fetchFact = async () => {
        try {
          const res = await fetch(url, { cache: 'no-store' });
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
    [intervalMs, url]
  );

  return fact;
}
