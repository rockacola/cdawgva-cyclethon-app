export interface Donation {
  id: string;
  completed_at: number; // unix epoch seconds
  amount_cent: number;
  amount_currency: string;
  donor_name: string;
  donor_comment: string | null;
}

export interface DonationsData {
  generated_at: string;
  donations: Donation[];
}

export interface CampaignFact {
  total_amount_raised_cent: number;
  goal_cent: number;
  currency: string;
}
