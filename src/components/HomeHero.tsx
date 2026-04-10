'use client';

import { Badge, Box, Container, HStack, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';

import { useTranslations } from '@/hooks/useTranslations';

export function HomeHero() {
  const t = useTranslations('home');

  return (
    <Box bgColor="bg.subtle" borderBottomWidth="1px" py={{ base: 12, md: 20 }}>
      <Container maxW="5xl" px={{ base: 3, md: 8 }}>
        <SimpleGrid alignItems="center" columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 14 }}>
          <Stack gap={5}>
            <HStack flexWrap="wrap" gap={2}>
              <Badge bgColor="indigo.100" color="gray.600" size="sm" variant="subtle">
                {t('15days')}
              </Badge>
              <Badge bgColor="indigo.100" color="gray.600" size="sm" variant="subtle">
                {t('japanYear')}
              </Badge>
            </HStack>
            <Heading as="h1" lineHeight="1.1" size={{ base: '3xl', md: '4xl' }}>
              {t('theyreBack')}
              <br />
              {t('onTheRoad')}
              <br />
              {t('again')}
            </Heading>
            <Text color="fg.muted" fontSize={{ base: 'md', md: 'lg' }}>
              {t('heroDescription')}
            </Text>
          </Stack>
          <Box
            aspectRatio={4 / 3}
            borderRadius="2xl"
            borderWidth="1px"
            overflow="hidden"
            position="relative"
          >
            <Image
              alt="Cyclethon 4"
              fill
              src="/images/cyclethon-4-1.jpg"
              style={{ objectFit: 'cover', filter: 'sepia(0.2) opacity(0.75)' }}
            />
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
