import { redirect } from 'next/navigation';

import { CURRENT_EDITION } from '@/lib/editions';

export default function DonationsPage() {
  redirect(`/${CURRENT_EDITION.year}/donations/search`);
}
