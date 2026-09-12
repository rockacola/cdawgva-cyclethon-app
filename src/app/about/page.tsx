import { redirect } from 'next/navigation';

import { CURRENT_EDITION } from '@/lib/editions';

export default function AboutPage() {
  redirect(`/${CURRENT_EDITION.year}/about`);
}
