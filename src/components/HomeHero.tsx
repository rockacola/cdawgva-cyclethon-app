'use client';

import { Badge, Box, Grid, HStack, Heading, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';

import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { useTranslations } from '@/hooks/useTranslations';
import { getTotalDonorCount, getTotalRaisedUSD } from '@/lib/donationUtils';
import { getCompletedDays, getTotalDistanceKm } from '@/lib/journey';
import type { DonationsStats } from '@/lib/types';

interface HomeHeroProps {
  stats: DonationsStats;
}

export function HomeHero({ stats }: HomeHeroProps) {
  const t = useTranslations('home');
  const currencyPrefix = useCurrencyPrefix();

  const dayCount = getCompletedDays().length;
  const totalDistanceKm = getTotalDistanceKm();
  const totalDonors = getTotalDonorCount(stats);
  const totalDonations = getTotalRaisedUSD(stats);

  return (
    <Box borderBottomWidth="1px" py={{ base: 10, md: 16 }}>
      {/* Masthead metadata row */}
      <HStack
        borderBottomWidth="1px"
        color="fg.subtle"
        fontFamily="mono"
        fontSize="sm"
        justify="space-between"
        letterSpacing="widest"
        mb={{ base: 6, md: 8 }}
        pb={3}
        textTransform="uppercase"
      >
        <Text>CDawgVA Cyclethon 5</Text>
        <Text display={{ base: 'none', sm: 'block' }}>{t('eventDates')}</Text>
        <Text display={{ base: 'none', md: 'block' }}>{t('eventRoute')}</Text>
      </HStack>

      {/* Hero photo */}
      <Box
        _hover={{ filter: 'opacity(0.9)' }}
        aspectRatio={21 / 9}
        borderRadius="2px"
        filter="opacity(0.85)"
        mb={{ base: 8, md: 10 }}
        overflow="hidden"
        position="relative"
        transition="filter 0.2s ease"
        w="100%"
      >
        <Image
          alt="Cyclethon — on the road again"
          fill
          priority
          src="/images/cyclethon-4-1.jpg"
          style={{
            filter: 'sepia(0.2)',
            objectFit: 'cover',
            objectPosition: 'center 10%',
          }}
        />
      </Box>

      <Stack gap={{ base: 5, md: 6 }} maxW="3xl">
        {/* Edition chips */}
        <HStack flexWrap="wrap" gap={2}>
          <Badge
            borderRadius="full"
            fontFamily="mono"
            fontSize="sm"
            letterSpacing="widest"
            px={2.5}
            py={1}
            textTransform="uppercase"
            variant="outline"
          >
            {t('15days')}
          </Badge>
          <Badge
            borderRadius="full"
            fontFamily="mono"
            fontSize="sm"
            letterSpacing="widest"
            px={2.5}
            py={1}
            textTransform="uppercase"
            variant="outline"
          >
            {t('japanYear')}
          </Badge>
          <Badge
            borderRadius="full"
            color="accent"
            fontFamily="mono"
            fontSize="sm"
            letterSpacing="widest"
            px={2.5}
            py={1}
            textTransform="uppercase"
            variant="outline"
          >
            {t('complete')}
          </Badge>
        </HStack>

        {/* Editorial headline */}
        <Heading
          as="h1"
          fontFamily="heading"
          fontSize={{ base: '5xl', md: '6xl', lg: '7xl' }}
          fontWeight={400}
          letterSpacing="-0.03em"
          lineHeight={0.95}
        >
          {t('theyreBack')}
          <br />
          {t('onTheRoad')}
          <br />
          <Box as="em" color="accent" fontStyle="italic">
            {t('again')}.
          </Box>
        </Heading>

        {/* Description */}
        <Text color="fg.muted" fontSize={{ base: 'md', md: 'lg' }} lineHeight={1.6} maxW="xl">
          {t('heroDescription')}
        </Text>
      </Stack>

      {/* Stats strip */}
      <Grid
        borderTopWidth="1px"
        gridTemplateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }}
        mt={{ base: 8, md: 10 }}
        pt={{ base: 4, md: 6 }}
      >
        {[
          [dayCount.toLocaleString(), t('statsDays')],
          [`${totalDistanceKm.toLocaleString()} km`, t('statsDistance')],
          [totalDonors.toLocaleString(), t('statsDonors')],
          [`${currencyPrefix}${totalDonations.toLocaleString()}`, t('statsDonations')],
        ].map(([value, label], i) => (
          <Box
            borderLeftWidth={{ base: i % 2 !== 0 ? '1px' : 0, sm: i > 0 ? '1px' : 0 }}
            borderTopWidth={{ base: i >= 2 ? '1px' : 0, sm: 0 }}
            key={label}
            pl={{ base: i % 2 !== 0 ? 3 : 0, sm: i > 0 ? 6 : 0 }}
            pr={{ base: i % 2 === 0 ? 3 : 0, sm: 0 }}
            py={{ base: 3, sm: 1 }}
          >
            <Text
              fontFamily="heading"
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight={400}
              letterSpacing="-0.02em"
              lineHeight={1}
            >
              {value}
            </Text>
            <Text
              color="fg.subtle"
              fontFamily="mono"
              fontSize="sm"
              letterSpacing="widest"
              mt={0.5}
              textTransform="uppercase"
            >
              {label}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
