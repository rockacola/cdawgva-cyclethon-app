'use client';

import { Text } from '@chakra-ui/react';

import { useTranslations } from '@/hooks/useTranslations';
import { isAnonymous } from '@/lib/donationUtils';

interface Props {
  name: string;
}

export function DonorName({ name }: Props) {
  const t = useTranslations('common');

  if (isAnonymous(name)) {
    return (
      <Text as="span" color="fg.muted" fontStyle="italic" fontWeight="normal">
        {t('anonymous')}
      </Text>
    );
  }
  return <>{name}</>;
}
