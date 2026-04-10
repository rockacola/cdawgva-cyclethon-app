'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import type { LocaleMode } from '@/lib/constants';
import { useLocaleContext } from '@/providers/LocaleProvider';

interface Props {
  locale: LocaleMode;
}

export function LocaleRedirect({ locale }: Props) {
  const { setLocaleMode } = useLocaleContext();
  const router = useRouter();

  useEffect(
    function switchAndRedirect() {
      setLocaleMode(locale);
      router.replace('/');
    },
    [locale, router, setLocaleMode]
  );

  return null;
}
