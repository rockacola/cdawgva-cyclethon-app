'use client';

import { Box, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

import { PageContainer } from '@/components/PageContainer';
import { useTranslations } from '@/hooks/useTranslations';
import type { Edition } from '@/lib/editions';

interface Props {
  edition: Edition;
}

export function ArchivedEditionBanner({ edition }: Props) {
  const t = useTranslations('archive');

  return (
    <Box bg="bg.subtle" borderBottomWidth="1px">
      <PageContainer>
        <Box py={3}>
          <Text fontWeight="semibold">
            {t('bannerTitle', { editionNumber: edition.editionNumber })}
          </Text>
          <Text color="fg.muted" fontSize="sm">
            {t('bannerBody', { year: edition.year })}{' '}
            <Link asChild color="fg.muted" textDecoration="underline">
              <NextLink href="/">{t('bannerViewCurrent')}</NextLink>
            </Link>
          </Text>
        </Box>
      </PageContainer>
    </Box>
  );
}
