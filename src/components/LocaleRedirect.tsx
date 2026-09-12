'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import type { LocaleMode } from '@/lib/constants';
import { useLocaleContext } from '@/providers/LocaleProvider';

interface Props {
  locale: LocaleMode;
  redirectTo?: string;
}

export function LocaleRedirect({ locale, redirectTo = '/' }: Props) {
  const { setLocaleMode } = useLocaleContext();
  const router = useRouter();

  useEffect(
    function switchAndRedirect() {
      setLocaleMode(locale);
      router.replace(redirectTo);
    },
    [locale, redirectTo, router, setLocaleMode]
  );

  return null;
}
