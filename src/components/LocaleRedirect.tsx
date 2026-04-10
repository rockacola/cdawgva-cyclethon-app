'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useLocaleContext } from '@/providers/LocaleProvider';
import type { LocaleMode } from '@/lib/constants';

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
