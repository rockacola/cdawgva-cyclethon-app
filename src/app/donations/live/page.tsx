import { redirect } from 'next/navigation';

import { CURRENT_EDITION } from '@/lib/editions';

export default function DonationsLivePage() {
  redirect(`/${CURRENT_EDITION.year}/donations/live`);
}
