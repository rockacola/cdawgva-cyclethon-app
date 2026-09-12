import { redirect } from 'next/navigation';

import { CURRENT_EDITION } from '@/lib/editions';

export default function EnPage() {
  redirect(`/${CURRENT_EDITION.year}/en`);
}
