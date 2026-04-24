'use client';

import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { Activity, Droplets, Hash, Heart, MessageSquare, Tv } from 'lucide-react';
import type { ReactNode } from 'react';

import { FlatCard } from '@/components/FlatCard';
import { LedgerSection } from '@/components/LedgerSection';
import { PageHeader } from '@/components/PageHeader';
import { useTranslations } from '@/hooks/useTranslations';

interface Source {
  detailKey: string;
  href?: string;
  icon: ReactNode;
  linkKey?: string;
  nameKey: string;
}

const SOURCES: Source[] = [
  {
    detailKey: 'sourceTiltifyDetail',
    icon: <Activity size={14} />,
    nameKey: 'sourceTiltifyName',
  },
  {
    detailKey: 'sourceRedditDetail',
    href: 'https://www.reddit.com/r/CDawgVA/',
    icon: <MessageSquare size={14} />,
    linkKey: 'sourceRedditLink',
    nameKey: 'sourceRedditName',
  },
  {
    detailKey: 'sourceDiscordDetail',
    href: 'https://discord.com/invite/cdawgva',
    icon: <Hash size={14} />,
    linkKey: 'sourceDiscordLink',
    nameKey: 'sourceDiscordName',
  },
];

interface SupportLink {
  bodyKey: string;
  href: string;
  icon: ReactNode;
  labelKey: string;
  titleKey: string;
}

const SUPPORT_LINKS: SupportLink[] = [
  {
    bodyKey: 'donateBody',
    href: 'https://tiltify.com/@cdawgva/cyclethon-5',
    icon: <Heart size={14} />,
    labelKey: 'donateLink',
    titleKey: 'donateTitle',
  },
  {
    bodyKey: 'plasmaBody',
    href: 'https://www.idfa.org.au/plasma-awareness/',
    icon: <Droplets size={14} />,
    labelKey: 'plasmaLink',
    titleKey: 'plasmaTitle',
  },
  {
    bodyKey: 'spreadBody',
    href: 'https://www.twitch.tv/cdawg',
    icon: <Tv size={14} />,
    labelKey: 'spreadLink',
    titleKey: 'spreadTitle',
  },
];

export function AboutContent() {
  const t = useTranslations('about');

  return (
    <Box>
      {/* Page header */}
      <PageHeader>
        <Flex align="center" gap={3} mb={4}>
          <Box bg="accent" flexShrink={0} h="1px" w={5} />
          <Text
            color="accent"
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="widest"
            textTransform="uppercase"
          >
            {t('sectionLabel')}
          </Text>
        </Flex>
        <Text
          as="h1"
          fontFamily="heading"
          fontSize={{ base: '4xl', md: '6xl' }}
          fontWeight={400}
          letterSpacing="-0.03em"
          lineHeight="0.95"
        >
          {t('title')}
        </Text>
        <Text
          color="fg.muted"
          fontSize={{ base: 'md', md: 'lg' }}
          lineHeight={1.6}
          maxW="2xl"
          mt={5}
        >
          {t('intro1')}
        </Text>
        <Text
          color="fg.muted"
          fontSize={{ base: 'md', md: 'lg' }}
          lineHeight={1.6}
          maxW="2xl"
          mt={3}
        >
          {t('intro2')}
        </Text>
      </PageHeader>

      {/* Data sources */}
      <LedgerSection index="01" title={t('dataSourcesLabel')}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={2}>
          {SOURCES.map(({ nameKey, detailKey, href, linkKey, icon }) => (
            <FlatCard
              body={t(detailKey)}
              href={href}
              icon={icon}
              key={nameKey}
              label={linkKey ? t(linkKey) : undefined}
              title={t(nameKey)}
            />
          ))}
        </SimpleGrid>
      </LedgerSection>

      {/* How to support */}
      <LedgerSection borderBottom={false} index="02" title={t('supportLabel')}>
        <Text color="fg.muted" fontSize="sm" lineHeight={1.6} mb={5}>
          {t('supportIntro')}
        </Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={2}>
          {SUPPORT_LINKS.map(({ titleKey, bodyKey, href, labelKey, icon }) => (
            <FlatCard
              body={t(bodyKey)}
              href={href}
              icon={icon}
              key={titleKey}
              label={t(labelKey)}
              title={t(titleKey)}
            />
          ))}
        </SimpleGrid>
      </LedgerSection>
    </Box>
  );
}
