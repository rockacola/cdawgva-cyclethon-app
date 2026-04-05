'use client';

import { Dialog, Flex, HStack, IconButton, Portal, Text } from '@chakra-ui/react';
import { X } from 'lucide-react';

import { APPEARANCE_MODES, TIMEZONE_MODES } from '@/lib/constants';
import { useAppearanceContext } from '@/providers/AppearanceProvider';
import { useTimezoneContext } from '@/providers/TimezoneProvider';

interface Props {
  onClose: () => void;
  open: boolean;
}

export function SettingsModal({ onClose, open }: Props) {
  const { appearanceMode, setAppearanceMode } = useAppearanceContext();
  const { setTimezoneMode, timezoneMode } = useTimezoneContext();

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
                      {mode === appearanceMode ? (
                        <Text color="fg" fontWeight="bold">
                          {mode}
                        </Text>
                      ) : (
                        <Text
                          _hover={{ color: 'fg' }}
                          cursor="pointer"
                          onClick={() => setAppearanceMode(mode)}
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
