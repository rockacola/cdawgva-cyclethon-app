import { useLocaleContext } from '@/providers/LocaleProvider';

export function useCurrencyPrefix(): string {
  const { resolvedLocale } = useLocaleContext();
  return resolvedLocale === 'JP' ? 'US$' : '$';
}
