'use client';

import { Box, Heading, Link, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';

import { useTranslations } from '@/hooks/useTranslations';

export function HomeCause() {
  const t = useTranslations('home');

  return (
    <Stack gap={4}>
      <Text
        color="fg.muted"
        fontSize="xs"
        fontWeight="semibold"
        letterSpacing="wide"
        textTransform="uppercase"
      >
        {t('causeSectionLabel')}
      </Text>
      <Box
        aspectRatio={16 / 7}
        borderRadius="2xl"
        borderWidth="1px"
        overflow="hidden"
        position="relative"
      >
        <Image
          alt="The Cause"
          fill
          src="/images/cyclethon-4-4.jpg"
          style={{ objectFit: 'cover', filter: 'sepia(0.2) opacity(0.75)' }}
        />
      </Box>
      <Heading as="h2" size="lg">
        {t('causeTitle')}
      </Heading>
      <Text color="fg.muted" fontSize="sm">
        {t('causeDescription')}
      </Text>
      <Text color="fg.muted" fontSize="sm">
        {t('causeGetInvolved')}
        <Link
          fontSize="sm"
          href="https://primaryimmune.org/get-involved/raise-awareness-and-funds-idf/diy-gaming"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t('causeGetInvolvedLink')}
        </Link>
      </Text>
    </Stack>
  );
}
