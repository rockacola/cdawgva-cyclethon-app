'use client';

import { useCallback } from 'react';

import en from '@/messages/en.json';
import ja from '@/messages/ja.json';
import { useLocaleContext } from '@/providers/LocaleProvider';

const messages: Record<string, Record<string, Record<string, string>>> = {
  EN: en,
  JP: ja,
};

/**
 * Returns a scoped translation function for the given namespace.
 *
 * Usage:
 *   const t = useTranslations('settings');
 *   t('title') // => "Settings" or "設定"
 */
export function useTranslations(namespace: string) {
  const { resolvedLocale } = useLocaleContext();

  const t = useCallback(
    (key: string): string => {
      const section = messages[resolvedLocale]?.[namespace];
      if (section && key in section) {
        return section[key];
      }
      // Fallback to EN
      const fallback = messages.EN?.[namespace];
      if (fallback && key in fallback) {
        return fallback[key];
      }
      return key;
    },
    [resolvedLocale, namespace]
  );

  return t;
}
