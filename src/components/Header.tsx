'use client';

import { Drawer, HStack, IconButton, Link, Portal, Spacer, Stack } from '@chakra-ui/react';
import { Home, Menu, Settings, X } from 'lucide-react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { SettingsModal } from '@/components/SettingsModal';
import { flags } from '@/lib/flags';

const allNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/journey', label: 'Journey', flag: flags.showJourney },
  { href: '/donations/live', label: 'Live Donations' },
];

const navLinks = allNavLinks.filter((link) => !('flag' in link) || link.flag);

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
        {navLinks.map(({ href, label }) => {
          const isActive = href === '/' ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              _hover={{ color: 'fg', textDecoration: 'none' }}
              asChild
              color={isActive ? 'fg' : 'fg.muted'}
              key={href}
            >
              <NextLink aria-label={label} href={href}>
                {href === '/' ? (
                  <Home size={18} />
                ) : (
                  <span style={{ fontWeight: isActive ? 600 : 400 }}>{label}</span>
                )}
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
                  {navLinks.map(({ href, label }) => {
                    const isActive = href === '/' ? pathname === href : pathname.startsWith(href);
                    return (
                      <Link
                        _hover={{ bg: 'bg.subtle', textDecoration: 'none' }}
                        asChild
                        bg={isActive ? 'bg.subtle' : undefined}
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
