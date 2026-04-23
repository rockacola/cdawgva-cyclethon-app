'use client';

import { Box, Container, Flex, Link, SimpleGrid, Text } from '@chakra-ui/react';
import { Activity, Droplets, ExternalLink, Hash, Heart, MessageSquare, Tv } from 'lucide-react';
import type { ReactNode } from 'react';

import { LedgerSection } from '@/components/LedgerSection';
import { useTranslations } from '@/hooks/useTranslations';

interface Source {
  detailKey: string;
  href?: string;
  icon: ReactNode;
  linkKey?: string;
  nameKey: string;
}

const sources: Source[] = [
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

const supportLinks: SupportLink[] = [
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

function FlatCard({
  body,
  href,
  icon,
  label,
  title,
}: {
  body: string;
  href?: string;
  icon: ReactNode;
  label?: string;
  title: string;
}) {
  return (
    <Box borderColor="border" borderWidth="1px" p={5}>
      <Flex align="center" color="accent" gap={2} mb={3}>
        {icon}
        <Text fontFamily="mono" fontSize="xs" letterSpacing="widest" textTransform="uppercase">
          {title}
        </Text>
      </Flex>
      <Text color="fg.muted" fontSize="sm" lineHeight={1.6}>
        {body}
      </Text>
      {href && label ? (
        <Link
          _hover={{ color: 'fg' }}
          alignItems="center"
          color="fg.subtle"
          display="inline-flex"
          fontFamily="mono"
          fontSize="xs"
          gap={1.5}
          href={href}
          letterSpacing="wide"
          mt={3}
          rel="noopener noreferrer"
          target="_blank"
        >
          {label} <ExternalLink size={10} />
        </Link>
      ) : null}
    </Box>
  );
}

export function AboutContent() {
  const t = useTranslations('about');

  return (
    <Box py={{ base: 10, md: 16 }}>
      <Container maxW="5xl" px={{ base: 3, md: 8 }}>
        {/* Page header */}
        <Box borderBottomWidth="1px" borderColor="border" mb={0} pb={{ base: 8, md: 12 }}>
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
        </Box>

        {/* Data sources */}
        <LedgerSection index="01" title={t('dataSourcesLabel')}>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={2}>
            {sources.map(({ nameKey, detailKey, href, linkKey, icon }) => (
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
            {supportLinks.map(({ titleKey, bodyKey, href, labelKey, icon }) => (
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
      </Container>
    </Box>
  );
}
