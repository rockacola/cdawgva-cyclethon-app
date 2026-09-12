import { redirect } from 'next/navigation';

import { CURRENT_EDITION } from '@/lib/editions';

interface Props {
  params: Promise<{ day: string }>;
}

export default async function DayPage({ params }: Props) {
  const { day } = await params;
  redirect(`/${CURRENT_EDITION.year}/journey/${day}`);
}
