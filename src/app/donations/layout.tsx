import { DonationsProvider } from '@/contexts/DonationsContext';
import { getDonationsFull } from '@/lib/getDonationsFull';

export const revalidate = 3600;

export default async function DonationsLayout({ children }: { children: React.ReactNode }) {
  const { donations } = await getDonationsFull();

  return <DonationsProvider initialDonations={donations}>{children}</DonationsProvider>;
}
