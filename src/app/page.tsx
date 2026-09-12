import { redirect } from 'next/navigation';

import { CURRENT_EDITION } from '@/lib/editions';

export default function HomePage() {
  redirect(`/${CURRENT_EDITION.year}`);
}
