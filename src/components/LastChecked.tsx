'use client';

import { HStack, Spinner, Text } from '@chakra-ui/react';

import { RelativeTime } from '@/components/RelativeTime';
import { useTranslations } from '@/hooks/useTranslations';

interface Props {
  isRefreshing?: boolean;
  timestamp: number; // unix seconds
}

export function LastChecked({ isRefreshing = false, timestamp }: Props) {
  const t = useTranslations('common');

  return (
    <HStack color="fg.muted" fontSize={{ base: 'xs', md: 'sm' }} gap={1}>
      <Text fontWeight="medium">{t('lastChecked')}</Text>
      <HStack gap={1}>
        <RelativeTime showAbsoluteTime timestamp={timestamp} />
        {isRefreshing ? <Spinner color="blue.300" ml={2} size="sm" /> : null}
      </HStack>
    </HStack>
  );
}
