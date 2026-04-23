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
import { useEffect, useState } from 'react';

import { SettingsModal } from '@/components/SettingsModal';
import { useTranslations } from '@/hooks/useTranslations';
import { MAIN_DONATION_URL } from '@/lib/constants';
import { useLocaleContext } from '@/providers/LocaleProvider';

const standaloneNavLinks = [
  { href: '/journey', labelKey: 'journey' },
  { href: '/about-cyclethon', labelKey: 'aboutCyclethon' },
] as const;

const donationNavLinks = [
  { href: '/donations/live', labelKey: 'live' },
  { href: '/donations/search', labelKey: 'search' },
  { href: '/donations/top', labelKey: 'top' },
] as const;

const allNavLinks = [
  { href: '/', labelKey: 'home' },
  { href: '/donations/live', labelKey: 'liveDonations' },
  { href: '/donations/search', labelKey: 'searchDonations' },
  { href: '/donations/top', labelKey: 'topDonors' },
  { href: '/journey', labelKey: 'journey' },
  { href: '/about-cyclethon', labelKey: 'aboutCyclethon' },
] as const;

export function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const t = useTranslations('header');
  const { resolvedLocale, setLocaleMode } = useLocaleContext();

  useEffect(
    function closeDrawerOnNav() {
      setDrawerOpen(false);
    },
    [pathname]
  );

  const isDonationsActive = pathname.startsWith('/donations');

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
          <NextLink href="/">
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
          <NavLink active={pathname === '/'} href="/">
            {t('home')}
          </NavLink>

          {/* Donations group */}
          <NavLink active={isDonationsActive} href="/donations/live">
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
            display={{ base: 'none', md: 'block' }}
            fontFamily="mono"
            fontSize="sm"
            fontWeight="semibold"
            letterSpacing="widest"
            onClick={() => setLocaleMode(resolvedLocale === 'EN' ? 'JP' : 'EN')}
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
          <Link
            _hover={{ bg: 'accent', textDecoration: 'none' }}
            bg="fg"
            borderRadius="2px"
            color="bg"
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize="xs"
            fontWeight="semibold"
            href={MAIN_DONATION_URL}
            letterSpacing="wide"
            px={3}
            py={1.5}
            rel="noopener noreferrer"
            target="_blank"
            textTransform="uppercase"
            transition="background 0.15s"
          >
            {t('donateNow')}
          </Link>
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
                      const isActive = href === '/' ? pathname === href : pathname.startsWith(href);
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
                    <Link
                      _hover={{ bg: 'accent', textDecoration: 'none' }}
                      bg="fg"
                      borderRadius="2px"
                      color="bg"
                      display="block"
                      fontSize="xs"
                      fontWeight="semibold"
                      href={MAIN_DONATION_URL}
                      letterSpacing="wide"
                      mt={2}
                      px={3}
                      py={2}
                      rel="noopener noreferrer"
                      target="_blank"
                      textTransform="uppercase"
                      transition="background 0.15s"
                    >
                      {t('donateNow')}
                    </Link>
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
