import { DonationsProvider } from '@/contexts/DonationsContext';
import { getDonationsFull } from '@/lib/getDonationsFull';

export default async function StatsLayout({ children }: { children: React.ReactNode }) {
  const { donations } = await getDonationsFull();

  return <DonationsProvider initialDonations={donations}>{children}</DonationsProvider>;
}
