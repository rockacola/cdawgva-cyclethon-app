'use client';

import { DonationProgressBar } from '@/components/DonationProgressBar';
import { useCampaignFactPoll } from '@/hooks/useCampaignFactPoll';
import { DONATION_REFETCH_INTERVAL } from '@/lib/constants';
import type { CampaignFact } from '@/lib/types';

interface Props {
  initialCampaignFact: CampaignFact | null;
}

export function HomeDonationProgress({ initialCampaignFact }: Props) {
  const fact = useCampaignFactPoll(initialCampaignFact, DONATION_REFETCH_INTERVAL);
  return <DonationProgressBar fact={fact} />;
}
