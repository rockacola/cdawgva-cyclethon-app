'use client';

import { Dialog, Flex, HStack, IconButton, Portal, Text } from '@chakra-ui/react';
import { X } from 'lucide-react';
import { useState } from 'react';

import { useColorMode } from '@/components/ui/color-mode';
import { APPEARANCE_MODES, APPEARANCE_MODE_DEFAULT, TIMEZONE_MODES } from '@/lib/constants';
import type { AppearanceMode } from '@/lib/constants';
import { STORAGE_KEYS, storage } from '@/lib/storage';
import { useTimezoneContext } from '@/providers/TimezoneProvider';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SettingsModal({ open, onClose }: Props) {
  const { setColorMode } = useColorMode();
  const [appearance, setAppearance] = useState<AppearanceMode>(() =>
    storage.get(STORAGE_KEYS.APPEARANCE, APPEARANCE_MODE_DEFAULT)
  );
  const { setTimezoneMode, timezoneMode } = useTimezoneContext();

  function handleAppearanceChange(value: AppearanceMode) {
    setAppearance(value);
    storage.set(STORAGE_KEYS.APPEARANCE, value);
    setColorMode(value.toLowerCase() as 'light' | 'dark' | 'system');
  }

  return (
    <Dialog.Root
      onOpenChange={(e) => !e.open && onClose()}
      open={open}
      size={{ base: 'full', md: 'sm' }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Settings</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <IconButton aria-label="Close settings" size="sm" variant="ghost">
                  <X size={16} />
                </IconButton>
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body pb={6}>
              <Flex align="center" justify="space-between" mb={4}>
                <Text fontSize="sm" fontWeight="medium">
                  Appearance
                </Text>
                <HStack color="fg.muted" fontSize="sm" gap={1.5}>
                  {APPEARANCE_MODES.map((mode, i) => (
                    <HStack gap={1.5} key={mode}>
                      {i > 0 && <Text>|</Text>}
                      {mode === appearance ? (
                        <Text color="fg" fontWeight="bold">
                          {mode}
                        </Text>
                      ) : (
                        <Text
                          _hover={{ color: 'fg' }}
                          cursor="pointer"
                          onClick={() => handleAppearanceChange(mode)}
                        >
                          {mode}
                        </Text>
                      )}
                    </HStack>
                  ))}
                </HStack>
              </Flex>

              <Flex align="center" justify="space-between">
                <Text fontSize="sm" fontWeight="medium">
                  Timezone
                </Text>
                <HStack color="fg.muted" fontSize="sm" gap={1.5}>
                  {TIMEZONE_MODES.map((mode, i) => (
                    <HStack gap={1.5} key={mode}>
                      {i > 0 && <Text>|</Text>}
                      {mode === timezoneMode ? (
                        <Text color="fg" fontWeight="bold">
                          {mode}
                        </Text>
                      ) : (
                        <Text
                          _hover={{ color: 'fg' }}
                          cursor="pointer"
                          onClick={() => setTimezoneMode(mode)}
                        >
                          {mode}
                        </Text>
                      )}
                    </HStack>
                  ))}
                </HStack>
              </Flex>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
