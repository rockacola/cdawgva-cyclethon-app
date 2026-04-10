'use client';

import { Box, HStack, Link, Text } from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';
import NextLink from 'next/link';

import { DonationFeed } from '@/components/DonationFeed';
import { useTranslations } from '@/hooks/useTranslations';
import type { Donation } from '@/lib/types';

interface Props {
  donations: Donation[];
}

export function LatestDonations({ donations }: Props) {
  const t = useTranslations('donationFeed');

  return (
    <Box py={{ base: 10, md: 16 }}>
      <Text
        color="fg.muted"
        fontSize="xs"
        fontWeight="semibold"
        letterSpacing="wide"
        mb={6}
        textTransform="uppercase"
      >
        {t('latestDonations')}
      </Text>
      <DonationFeed donations={donations} />
      <HStack justify="flex-end" mt={4}>
        <Link _hover={{ textDecoration: 'none' }} asChild fontSize="sm">
          <NextLink href="/donations/search">
            <HStack gap={1}>
              <Text>{t('viewAll')}</Text>
              <ArrowRight size={14} />
            </HStack>
          </NextLink>
        </Link>
      </HStack>
    </Box>
  );
}
