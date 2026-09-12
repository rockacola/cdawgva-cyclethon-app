'use client';

import { Box, HStack, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

import { useTranslations } from '@/hooks/useTranslations';
import { MAIN_DONATION_URL } from '@/lib/constants';
import { getEdition } from '@/lib/editions';
import { useEditionContext } from '@/providers/EditionProvider';

import { PageContainer } from './PageContainer';

export function Footer() {
  const year = useEditionContext();
  const t = useTranslations('footer');
  const edition = getEdition(year);
  const isArchivedEdition = edition !== undefined && !edition.isLive;

  const aboutHref = `/${year}/about`;

  const causeLinks = [
    { external: true, href: 'https://primaryimmune.org', label: t('causeLinkIDF') },
    ...(isArchivedEdition
      ? []
      : [{ external: true, href: MAIN_DONATION_URL, label: t('causeLinkDonate') }]),
  ];

  const siteLinks = [
    { href: `/${year}/donations/live`, label: t('siteLinkLiveDonations') },
    { href: `/${year}/donations/search`, label: t('siteLinkSearch') },
    { href: `/${year}/journey`, label: t('siteLinkJourney') },
    { href: `/${year}/finish-line`, label: t('siteLinkFinishLine') },
    { href: aboutHref, label: t('siteLinkAbout') },
  ];

  return (
    <Box as="footer" bg="fg" color="bg">
      <PageContainer>
        <Box py={{ base: 10, md: 12 }}>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 8, md: 10 }}>
            {/* Brand */}
            <Stack gap={3}>
              <Text fontFamily="heading" fontSize="2xl" fontWeight={400} letterSpacing="-0.02em">
                CDawgVA Cyclethon
              </Text>
              <Text
                color="fg.subtle"
                fontFamily="mono"
                fontSize="sm"
                letterSpacing="widest"
                textTransform="uppercase"
              >
                {t('brandTagline')}
              </Text>
              <Text color="bg" fontSize="xs" lineHeight={1.6} opacity={0.6}>
                {t('brandDescription')}
              </Text>
            </Stack>

            {/* The Cause */}
            <Stack gap={3}>
              <Text
                color="fg.subtle"
                fontFamily="mono"
                fontSize="sm"
                letterSpacing="widest"
                textTransform="uppercase"
              >
                {t('causeHeading')}
              </Text>
              {causeLinks.map(({ href, label, external }) => (
                <Link
                  _hover={{ color: 'bg', textDecoration: 'none' }}
                  color="bg"
                  fontSize="sm"
                  href={href}
                  key={label}
                  opacity={0.65}
                  rel={external ? 'noopener noreferrer' : undefined}
                  target={external ? '_blank' : undefined}
                >
                  {label}
                </Link>
              ))}
            </Stack>

            {/* Site */}
            <Stack gap={3}>
              <Text
                color="fg.subtle"
                fontFamily="mono"
                fontSize="sm"
                letterSpacing="widest"
                textTransform="uppercase"
              >
                {t('siteHeading')}
              </Text>
              {siteLinks.map(({ href, label }) => (
                <Link
                  _hover={{ color: 'bg', textDecoration: 'none' }}
                  asChild
                  color="bg"
                  fontSize="sm"
                  key={label}
                  opacity={0.65}
                >
                  <NextLink href={href}>{label}</NextLink>
                </Link>
              ))}
            </Stack>
          </SimpleGrid>

          {/* Bottom rule */}
          <HStack
            borderTopColor="fg.subtle"
            borderTopWidth="1px"
            justify="space-between"
            mt={{ base: 8, md: 10 }}
            pt={4}
          >
            <Text color="bg" fontFamily="mono" fontSize="sm" letterSpacing="wide" opacity={0.4}>
              <Link _hover={{ opacity: 1 }} asChild color="bg" textDecoration="none">
                <NextLink href={aboutHref}>{t('about')}</NextLink>
              </Link>
              {' · '}
              {t('disclaimer')}
            </Text>
            <Text color="bg" fontFamily="mono" fontSize="sm" letterSpacing="wide" opacity={0.4}>
              v{process.env.APP_VERSION}
            </Text>
          </HStack>
        </Box>
      </PageContainer>
    </Box>
  );
}
