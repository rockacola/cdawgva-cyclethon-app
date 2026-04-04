export interface Donation {
  id: string;
  completed_at: string;
  amount: { value: string; currency: string };
  donor_name: string;
  donor_comment: string | null;
}

export interface DonationsData {
  generated_at: string;
  donations: Donation[];
}
