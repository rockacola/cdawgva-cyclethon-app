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
    (key: string, params?: Record<string, string | number>): string => {
      const section = messages[resolvedLocale]?.[namespace];
      let template: string | undefined;
      if (section && key in section) {
        template = section[key];
      } else {
        const fallback = messages.EN?.[namespace];
        if (fallback && key in fallback) {
          template = fallback[key];
        }
      }
      if (!template) {
        return key;
      }
      if (params) {
        return template.replace(/\{(\w+)\}/g, (_, k: string) =>
          k in params ? String(params[k]) : `{${k}}`
        );
      }
      return template;
    },
    [resolvedLocale, namespace]
  );

  return t;
}
