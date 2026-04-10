'use client';

import { Box, HStack, Link, Spacer, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

import { useTranslations } from '@/hooks/useTranslations';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <Box as="footer" bgColor="bg.subtle" borderTopWidth="1px" mt={12} px={4} py={6}>
      <HStack maxW="6xl" mx="auto">
        <HStack gap={4}>
          <Text color="fg.subtle" fontSize="sm">
            Cyclethon Tracker
          </Text>
          <Text color="fg.subtle" fontSize="sm">
            ·
          </Text>
          <Link
            _hover={{ color: 'fg', textDecoration: 'none' }}
            asChild
            color="fg.muted"
            fontSize="sm"
          >
            <NextLink href="/about">{t('about')}</NextLink>
          </Link>
        </HStack>
        <Spacer />
        <Text color="fg.subtle" fontSize="xs" opacity={0.5}>
          v{process.env.APP_VERSION}
        </Text>
        <Spacer />
      </HStack>
    </Box>
  );
}
