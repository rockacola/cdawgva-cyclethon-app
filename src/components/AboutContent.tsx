'use client';

import {
  Box,
  Card,
  Container,
  HStack,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Activity, Droplets, ExternalLink, Hash, Heart, MessageSquare, Tv } from 'lucide-react';
import type { ReactNode } from 'react';

import { useTranslations } from '@/hooks/useTranslations';

interface Source {
  nameKey: string;
  detailKey: string;
  href?: string;
  linkKey?: string;
  icon: ReactNode;
}

const sources: Source[] = [
  {
    icon: <Activity size={16} />,
    nameKey: 'sourceTiltifyName',
    detailKey: 'sourceTiltifyDetail',
  },
  {
    icon: <MessageSquare size={16} />,
    nameKey: 'sourceRedditName',
    detailKey: 'sourceRedditDetail',
    href: 'https://www.reddit.com/r/CDawgVA/',
    linkKey: 'sourceRedditLink',
  },
  {
    icon: <Hash size={16} />,
    nameKey: 'sourceDiscordName',
    detailKey: 'sourceDiscordDetail',
    href: 'https://discord.com/invite/cdawgva',
    linkKey: 'sourceDiscordLink',
  },
];

interface SupportLink {
  titleKey: string;
  bodyKey: string;
  href: string;
  labelKey: string;
  icon: ReactNode;
}

const supportLinks: SupportLink[] = [
  {
    icon: <Heart size={16} />,
    titleKey: 'donateTitle',
    bodyKey: 'donateBody',
    href: 'https://tiltify.com/@cdawgva/cyclethon-5',
    labelKey: 'donateLink',
  },
  {
    icon: <Droplets size={16} />,
    titleKey: 'plasmaTitle',
    bodyKey: 'plasmaBody',
    href: 'https://www.idfa.org.au/plasma-awareness/',
    labelKey: 'plasmaLink',
  },
  {
    icon: <Tv size={16} />,
    titleKey: 'spreadTitle',
    bodyKey: 'spreadBody',
    href: 'https://www.twitch.tv/cdawg',
    labelKey: 'spreadLink',
  },
];

export function AboutContent() {
  const t = useTranslations('about');

  return (
    <Box py={{ base: 6, md: 20 }}>
      <Container maxW="4xl" px={{ base: 3, md: 8 }}>
        {/* Project */}
        <Stack gap={4} mb={16}>
          <Heading as="h1" size={{ base: 'xl', md: '2xl' }}>
            {t('title')}
          </Heading>
          <Text color="fg.muted" maxW="2xl">
            {t('intro1')}
          </Text>
          <Text color="fg.muted" maxW="2xl">
            {t('intro2')}
          </Text>
        </Stack>

        {/* Data sources */}
        <Stack gap={4} mb={16}>
          <Text
            color="fg.muted"
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="wide"
            textTransform="uppercase"
          >
            {t('dataSourcesLabel')}
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
            {sources.map(({ nameKey, detailKey, href, linkKey, icon }) => (
              <Card.Root key={nameKey} variant="outline">
                <Card.Body gap={3} p={4}>
                  <HStack color="fg.subtle" gap={2}>
                    {icon}
                    <Text color="fg" fontSize="sm" fontWeight="semibold">
                      {t(nameKey)}
                    </Text>
                  </HStack>
                  <Text color="fg.muted" fontSize="xs">
                    {t(detailKey)}
                  </Text>
                  {href && linkKey ? (
                    <Link
                      alignItems="center"
                      display="inline-flex"
                      fontSize="xs"
                      gap={1}
                      href={href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {t(linkKey)} <ExternalLink size={10} />
                    </Link>
                  ) : null}
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        </Stack>

        {/* Support */}
        <Stack gap={4}>
          <Text
            color="fg.muted"
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="wide"
            textTransform="uppercase"
          >
            {t('supportLabel')}
          </Text>
          <Text color="fg.muted" maxW="2xl">
            {t('supportIntro')}
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
            {supportLinks.map(({ titleKey, bodyKey, href, labelKey, icon }) => (
              <Card.Root key={titleKey} variant="outline">
                <Card.Body gap={3} p={4}>
                  <HStack color="fg.subtle" gap={2}>
                    {icon}
                    <Text color="fg" fontSize="sm" fontWeight="semibold">
                      {t(titleKey)}
                    </Text>
                  </HStack>
                  <Text color="fg.muted" fontSize="xs">
                    {t(bodyKey)}
                  </Text>
                  <Link
                    alignItems="center"
                    display="inline-flex"
                    fontSize="xs"
                    gap={1}
                    href={href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {t(labelKey)} <ExternalLink size={10} />
                  </Link>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
