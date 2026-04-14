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

export interface DonorTotal {
  amount_cent: number;
  amount_currency: string;
  count: number;
  donor_name: string;
}

export interface CampaignFact {
  total_amount_raised_cent: number;
  goal_cent: number;
  currency: string;
}

export interface CurrencyTotal {
  amount_cent: number;
  count: number;
}

export interface DailyTotal {
  by_currency: Record<string, CurrencyTotal>;
  date: string;
}

export interface DonationsStats {
  _meta: {
    generated_at: string;
    timezone: string;
    utc_offset: string;
  };
  campaign?: {
    amount_raised_cent: number;
    amount_raised_currency: string;
    fetched_at: string;
    goal_cent: number;
    goal_currency: string;
  };
  stats: {
    daily_totals: DailyTotal[];
  };
}

export interface DataPattern {
  id: string;
  name: string;
  nameJa: string;
  pattern: RegExp;
  url?: string;
}

export type DonationWarType =
  | 'anime'
  | 'country'
  | 'gacha'
  | 'game'
  | 'ironmouse'
  | 'pizza'
  | 'pokemon'
  | 'sanrio';
