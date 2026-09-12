import { redirect } from 'next/navigation';

import { CURRENT_EDITION } from '@/lib/editions';

export default function FinishLinePage() {
  redirect(`/${CURRENT_EDITION.year}/finish-line`);
}
