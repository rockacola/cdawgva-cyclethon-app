'use client';

import { Box, Grid, HStack, Link, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';

import { useTranslations } from '@/hooks/useTranslations';

export function HomeCause() {
  const t = useTranslations('homeCause');

  return (
    <Grid
      alignItems="start"
      columnGap={{ base: 0, md: 14 }}
      rowGap={8}
      templateColumns={{ base: '1fr', md: '1.2fr 1fr' }}
    >
      <Stack gap={5}>
        <Text
          as="h2"
          color="fg"
          fontFamily="heading"
          fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
          fontWeight={400}
          letterSpacing="-0.03em"
          lineHeight={1.05}
        >
          {t('heading')}
        </Text>
        <Text color="fg.muted" fontSize="md" lineHeight={1.7}>
          {t('body1')}
        </Text>
        <Text color="fg.muted" fontSize="md" lineHeight={1.7}>
          {t('body2')}
        </Text>
        <HStack gap={6} mt={1}>
          <Link
            borderBottomWidth="1px"
            borderColor="accent"
            color="fg"
            fontSize="sm"
            href="https://primaryimmune.org/get-involved"
            rel="noopener noreferrer"
            target="_blank"
            textDecoration="none"
          >
            {t('learnMore')}
          </Link>
          <Link
            color="fg.subtle"
            fontSize="sm"
            href="https://primaryimmune.org/get-involved/raise-awareness-and-funds-idf/diy-gaming"
            rel="noopener noreferrer"
            target="_blank"
            textDecoration="none"
          >
            {t('ironmouseStory')}
          </Link>
        </HStack>
      </Stack>
      <Box
        _hover={{ filter: 'opacity(0.9)' }}
        aspectRatio={1 / 1}
        borderRadius="2px"
        filter="opacity(0.85)"
        overflow="hidden"
        position="relative"
        transition="filter 0.2s ease"
      >
        <Image
          alt="The Cause"
          fill
          src="/images/cyclethon-4-4.jpg"
          style={{ filter: 'sepia(0.2)', objectFit: 'cover' }}
        />
      </Box>
    </Grid>
  );
}
