'use client';

import {
  Box,
  Drawer,
  HStack,
  IconButton,
  Link,
  Portal,
  Spacer,
  Span,
  Stack,
} from '@chakra-ui/react';
import { Menu, Settings, X } from 'lucide-react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { DonateLinkButton } from '@/components/DonateLinkButton';
import { SettingsModal } from '@/components/SettingsModal';
import { useTranslations } from '@/hooks/useTranslations';
import { getEdition } from '@/lib/editions';
import { useEditionContext } from '@/providers/EditionProvider';
import { useLocaleContext } from '@/providers/LocaleProvider';

export function Header() {
  const year = useEditionContext();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const t = useTranslations('header');
  const { resolvedLocale, setLocaleMode } = useLocaleContext();

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setDrawerOpen(false);
  }

  const homeHref = `/${year}`;
  const journeyHref = `/${year}/journey`;
  const aboutCyclethonHref = `/${year}/about-cyclethon`;
  const donationsLiveHref = `/${year}/donations/live`;
  const donationsSearchHref = `/${year}/donations/search`;
  const donationsTopHref = `/${year}/donations/top`;

  const standaloneNavLinks = [
    { href: journeyHref, labelKey: 'journey' },
    { href: aboutCyclethonHref, labelKey: 'aboutCyclethon' },
  ];

  const donationNavLinks = [
    { href: donationsLiveHref, labelKey: 'live' },
    { href: donationsSearchHref, labelKey: 'search' },
    { href: donationsTopHref, labelKey: 'top' },
  ];

  const allNavLinks = [
    { href: homeHref, labelKey: 'home' },
    { href: donationsLiveHref, labelKey: 'liveDonations' },
    { href: donationsSearchHref, labelKey: 'searchDonations' },
    { href: donationsTopHref, labelKey: 'topDonors' },
    { href: journeyHref, labelKey: 'journey' },
    { href: aboutCyclethonHref, labelKey: 'aboutCyclethon' },
  ];

  const isDonationsActive = pathname.includes('/donations/');
  const edition = getEdition(year);
  const isArchivedEdition = edition !== undefined && !edition.isLive;

  return (
    <Box as="header" borderBottomWidth="1px" px={{ base: 4, md: 8 }} py={3}>
      <HStack maxW="7xl" mx="auto">
        {/* Mobile burger */}
        <IconButton
          aria-label="Open menu"
          display={{ base: 'flex', md: 'none' }}
          onClick={() => setDrawerOpen(true)}
          size="sm"
          variant="ghost"
        >
          <Menu size={18} />
        </IconButton>

        {/* Wordmark */}
        <HStack asChild gap={2.5} textDecoration="none">
          <NextLink href={homeHref}>
            <Box display={{ base: 'none', sm: 'block' }}>
              <Span
                color="fg"
                fontSize="sm"
                fontWeight="semibold"
                lineHeight={1.2}
                textTransform="uppercase"
              >
                Cyclethon
              </Span>{' '}
              <Span
                color="fg.subtle"
                fontFamily="mono"
                fontSize="sm"
                letterSpacing="widest"
                lineHeight={1.2}
                textTransform="uppercase"
              >
                Tracker
              </Span>
            </Box>
          </NextLink>
        </HStack>

        {/* Desktop nav */}
        <HStack display={{ base: 'none', md: 'flex' }} flex={1} gap={0} justify="center">
          <NavLink active={pathname === homeHref} href={homeHref}>
            {t('home')}
          </NavLink>

          {/* Donations group */}
          <NavLink active={isDonationsActive} href={donationsLiveHref}>
            {t('donations')}
          </NavLink>
          {isDonationsActive
            ? donationNavLinks.map(({ href, labelKey }) => (
                <NavLink active={pathname.startsWith(href)} href={href} key={href} sub>
                  {t(labelKey)}
                </NavLink>
              ))
            : null}

          {standaloneNavLinks.map(({ href, labelKey }) => (
            <NavLink active={pathname.startsWith(href)} href={href} key={href}>
              {t(labelKey)}
            </NavLink>
          ))}
        </HStack>

        <Spacer display={{ base: 'flex', md: 'none' }} />

        {/* Right controls */}
        <HStack gap={2}>
          {/* Locale */}
          <Box
            _hover={{ color: 'fg' }}
            as="button"
            borderRadius="sm"
            color="fg.subtle"
            cursor="pointer"
            fontFamily="mono"
            fontSize="sm"
            fontWeight="semibold"
            letterSpacing="widest"
            onClick={() => setLocaleMode(resolvedLocale === 'EN' ? 'JA' : 'EN')}
            px={1.5}
            py={1}
            textTransform="uppercase"
          >
            {resolvedLocale === 'EN' ? '日本語' : 'EN'}
          </Box>

          <IconButton
            aria-label="Open settings"
            onClick={() => setSettingsOpen(true)}
            size="sm"
            variant="ghost"
          >
            <Settings size={16} />
          </IconButton>

          {/* Donate CTA */}
          {isArchivedEdition ? null : (
            <DonateLinkButton display={{ base: 'none', md: 'inline-block' }} />
          )}
        </HStack>

        <SettingsModal onClose={() => setSettingsOpen(false)} open={settingsOpen} />

        {/* Mobile drawer */}
        <Drawer.Root
          onOpenChange={(e) => setDrawerOpen(e.open)}
          open={drawerOpen}
          placement="start"
        >
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.CloseTrigger asChild>
                  <IconButton
                    aria-label="Close menu"
                    position="absolute"
                    right={3}
                    size="sm"
                    top={3}
                    variant="ghost"
                  >
                    <X size={18} />
                  </IconButton>
                </Drawer.CloseTrigger>
                <Drawer.Body pt={12}>
                  <Stack gap={1}>
                    {allNavLinks.map(({ href, labelKey }) => {
                      const isActive =
                        href === homeHref ? pathname === href : pathname.startsWith(href);
                      return (
                        <Link
                          _hover={{ bg: 'bg.subtle', textDecoration: 'none' }}
                          asChild
                          bgColor={isActive ? 'bg.subtle' : undefined}
                          borderRadius="sm"
                          display="block"
                          fontWeight={isActive ? 'semibold' : 'normal'}
                          key={href}
                          px={3}
                          py={2}
                        >
                          <NextLink href={href}>{t(labelKey)}</NextLink>
                        </Link>
                      );
                    })}
                    {isArchivedEdition ? null : <DonateLinkButton display="block" mt={2} />}
                  </Stack>
                </Drawer.Body>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </HStack>
    </Box>
  );
}

function NavLink({
  active,
  children,
  href,
  sub = false,
}: {
  active: boolean;
  children: React.ReactNode;
  href: string;
  sub?: boolean;
}) {
  return (
    <Link
      _hover={{ color: 'fg', textDecoration: 'none', borderBottomColor: 'accent' }}
      asChild
      borderBottomColor={active ? 'accent' : 'transparent'}
      borderBottomWidth="1.5px"
      color={active ? 'fg' : 'fg.muted'}
      fontSize={sub ? '11px' : 'sm'}
      fontWeight={active ? 600 : 400}
      letterSpacing={sub ? 'wide' : 'normal'}
      pb={0.5}
      px={sub ? 2 : 3}
      py={1}
      textTransform={sub ? 'uppercase' : 'none'}
      transition="all 0.12s"
    >
      <NextLink href={href}>
        <Span>{children}</Span>
      </NextLink>
    </Link>
  );
}
