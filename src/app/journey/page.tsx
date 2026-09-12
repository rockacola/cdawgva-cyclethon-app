import { redirect } from 'next/navigation';

import { CURRENT_EDITION } from '@/lib/editions';

export default function JourneyPage() {
  redirect(`/${CURRENT_EDITION.year}/journey`);
}
