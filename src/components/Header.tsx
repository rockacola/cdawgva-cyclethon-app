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

const standaloneNavLinks = [{ href: '/journey', label: 'Journey' }];

const donationNavLinks = [
  { href: '/donations/live', label: 'Live' },
  { href: '/donations/search', label: 'Search' },
  { href: '/donations/top', label: 'Top' },
];

// Flat list for mobile drawer
const allNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/donations/live', label: 'Live Donations' },
  { href: '/donations/search', label: 'Search Donations' },
  { href: '/donations/top', label: 'Top Donors' },
  { href: '/journey', label: 'Journey' },
];

export function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <HStack as="header" borderBottomWidth="1px" px={4} py={3}>
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
            Donations
          </Span>
          <Box alignSelf="stretch" borderLeftWidth="1px" />
          {donationNavLinks.map(({ href, label }, i) => {
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
                      {label}
                    </Span>
                  </NextLink>
                </Link>
              </Fragment>
            );
          })}
        </HStack>

        {/* Standalone links (e.g. Journey) */}
        {standaloneNavLinks.map(({ href, label }) => {
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
                <Span fontWeight={isActive ? 600 : 400}>{label}</Span>
              </NextLink>
            </Link>
          );
        })}
      </HStack>

      <Spacer />

      <IconButton
        aria-label="Open settings"
        onClick={() => setSettingsOpen(true)}
        size="sm"
        variant="ghost"
      >
        <Settings size={18} />
      </IconButton>

      <SettingsModal onClose={() => setSettingsOpen(false)} open={settingsOpen} />

      {/* Mobile drawer */}
      <Drawer.Root onOpenChange={(e) => setDrawerOpen(e.open)} open={drawerOpen} placement="start">
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
                  {allNavLinks.map(({ href, label }) => {
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
                        <NextLink href={href}>{label}</NextLink>
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
  );
}
