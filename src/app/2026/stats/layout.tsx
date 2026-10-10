import { DonationsProvider } from '@/contexts/DonationsContext';
import { getArchivedDonationsFullUrl } from '@/lib/constants';
import { getEdition } from '@/lib/editions';
import { getDonationsFull } from '@/lib/getDonationsFull';

export const revalidate = 3600;

const archivedFullUrl = getArchivedDonationsFullUrl(getEdition(2026)!.eventKey);

export default async function StatsLayout2026({ children }: { children: React.ReactNode }) {
  const { donations } = await getDonationsFull(archivedFullUrl);

  return (
    <DonationsProvider initialDonations={donations} sourceUrl={archivedFullUrl}>
      {children}
    </DonationsProvider>
  );
}
