import { redirect } from 'next/navigation';

import { CURRENT_EDITION } from '@/lib/editions';

export default function JaPage() {
  redirect(`/${CURRENT_EDITION.year}/ja`);
}
