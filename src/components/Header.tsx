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
import { Home, Menu, Settings, X } from 'lucide-react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

import { SettingsModal } from '@/components/SettingsModal';
import { useTranslations } from '@/hooks/useTranslations';

const standaloneNavLinks = [{ href: '/journey', labelKey: 'journey' }] as const;

const donationNavLinks = [
  { href: '/donations/live', labelKey: 'live' },
  { href: '/donations/search', labelKey: 'search' },
  { href: '/donations/top', labelKey: 'top' },
] as const;

// Flat list for mobile drawer
const allNavLinks = [
  { href: '/', labelKey: 'home' },
  { href: '/donations/live', labelKey: 'liveDonations' },
  { href: '/donations/search', labelKey: 'searchDonations' },
  { href: '/donations/top', labelKey: 'topDonors' },
  { href: '/journey', labelKey: 'journey' },
] as const;

export function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const t = useTranslations('header');

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <Box as="header" borderBottomWidth="1px" px={4} py={3}>
      <HStack maxW="6xl" mx="auto">
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

        {/* Desktop nav */}
        <HStack display={{ base: 'none', md: 'flex' }} gap={6}>
          {/* Home */}
          <Link
            _hover={{ color: 'fg', textDecoration: 'none' }}
            asChild
            color={pathname === '/' ? 'fg' : 'fg.muted'}
          >
            <NextLink aria-label="Home" href="/">
              <Home size={18} />
            </NextLink>
          </Link>

          {/* Donations group */}
          <HStack bg="bg.subtle" borderRadius="lg" borderWidth="1px" gap={0} px={1} py={1}>
            <Span color="fg.muted" fontSize="sm" opacity={0.4} px={2}>
              {t('donations')}
            </Span>
            <Box alignSelf="stretch" borderLeftWidth="1px" />
            {donationNavLinks.map(({ href, labelKey }, i) => {
              const isActive = pathname.startsWith(href);
              return (
                <Fragment key={href}>
                  {i > 0 && (
                    <Span color="fg.subtle" fontSize="xs" opacity={0.4} userSelect="none">
                      |
                    </Span>
                  )}
                  <Link
                    _hover={{ color: 'fg', textDecoration: 'none' }}
                    asChild
                    borderRadius="md"
                    color={isActive ? 'fg' : 'fg.muted'}
                    px={2}
                    py={0.5}
                  >
                    <NextLink href={href}>
                      <Span fontSize="sm" fontWeight={isActive ? 600 : 400}>
                        {t(labelKey)}
                      </Span>
                    </NextLink>
                  </Link>
                </Fragment>
              );
            })}
          </HStack>

          {/* Standalone links (e.g. Journey) */}
          {standaloneNavLinks.map(({ href, labelKey }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                _hover={{ color: 'fg', textDecoration: 'none' }}
                asChild
                color={isActive ? 'fg' : 'fg.muted'}
                fontSize="sm"
                key={href}
              >
                <NextLink href={href}>
                  <Span fontWeight={isActive ? 600 : 400}>{t(labelKey)}</Span>
                </NextLink>
              </Link>
            );
          })}
        </HStack>

        <Spacer />

        <IconButton
          aria-label="Open settings"
          onClick={() => setSettingsOpen(true)}
          size="md"
          variant="outline"
        >
          <Settings size={20} />
        </IconButton>

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
                          borderRadius="md"
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
