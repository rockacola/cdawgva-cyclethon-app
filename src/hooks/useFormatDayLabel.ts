import { useTranslations } from '@/hooks/useTranslations';
import { getEventDayInfo } from '@/lib/journey';

export function useFormatDayLabel(): (epochSeconds: number) => string {
  const t = useTranslations('dayNav');
  return function formatDayLabel(epochSeconds: number): string {
    const info = getEventDayInfo(epochSeconds);
    if (info.type === 'pre') {
      return t('pre');
    }
    if (info.type === 'post') {
      return t('post');
    }
    return t('dayLabel', { day: info.day });
  };
}
