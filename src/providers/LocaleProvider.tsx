'use client';

import { createContext, useContext, useEffect, useMemo } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import useLocalStorageState from 'use-local-storage-state';

import { LOCALE_MODE_DEFAULT, STORAGE_KEYS } from '@/lib/constants';
import type { LocaleMode } from '@/lib/constants';

type ResolvedLocale = 'EN' | 'JP';

interface LocaleContextValue {
  localeMode: LocaleMode;
  resolvedLocale: ResolvedLocale;
  setLocaleMode: Dispatch<SetStateAction<LocaleMode>>;
}

const LocaleContext = createContext<LocaleContextValue>({
  localeMode: LOCALE_MODE_DEFAULT,
  resolvedLocale: 'EN',
  setLocaleMode: () => {},
} as LocaleContextValue);

function detectBrowserLocale(): ResolvedLocale {
  if (typeof navigator === 'undefined') {
    return 'EN';
  }
  const lang = navigator.language || '';
  if (lang.startsWith('ja')) {
    return 'JP';
  }
  return 'EN';
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [localeMode, setLocaleMode] = useLocalStorageState<LocaleMode>(STORAGE_KEYS.LOCALE, {
    defaultValue: LOCALE_MODE_DEFAULT,
  });

  const resolvedLocale: ResolvedLocale = useMemo(() => {
    if (localeMode === 'System') {
      return detectBrowserLocale();
    }
    return localeMode;
  }, [localeMode]);

  // Sync html lang attribute
  useEffect(
    function syncHtmlLang() {
      const lang = resolvedLocale === 'JP' ? 'ja' : 'en';
      document.documentElement.lang = lang;
    },
    [resolvedLocale]
  );

  return (
    <LocaleContext.Provider value={{ localeMode, resolvedLocale, setLocaleMode }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext(): LocaleContextValue {
  return useContext(LocaleContext);
}
