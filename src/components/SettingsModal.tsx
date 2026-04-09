'use client';

import { Dialog, Flex, HStack, IconButton, Portal, Text } from '@chakra-ui/react';
import { X } from 'lucide-react';

import { useTranslations } from '@/hooks/useTranslations';
import {
  APPEARANCE_MODES,
  APPEARANCE_TRANSLATION_KEYS,
  LOCALE_LABELS,
  LOCALE_MODES,
  TIMEZONE_MODES,
  TIMEZONE_TRANSLATION_KEYS,
} from '@/lib/constants';
import { flags } from '@/lib/flags';
import { useAppearanceContext } from '@/providers/AppearanceProvider';
import { useLocaleContext } from '@/providers/LocaleProvider';
import { useTimezoneContext } from '@/providers/TimezoneProvider';

interface Props {
  onClose: () => void;
  open: boolean;
}

export function SettingsModal({ onClose, open }: Props) {
  const { appearanceMode, setAppearanceMode } = useAppearanceContext();
  const { localeMode, setLocaleMode } = useLocaleContext();
  const { setTimezoneMode, timezoneMode } = useTimezoneContext();
  const t = useTranslations('settings');

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
              <Dialog.Title>{t('title')}</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <IconButton aria-label="Close settings" size="sm" variant="ghost">
                  <X size={16} />
                </IconButton>
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body pb={6}>
              <Flex align="center" justify="space-between" mb={4}>
                <Text fontSize="sm" fontWeight="medium">
                  {t('appearance')}
                </Text>
                <HStack color="fg.muted" fontSize="sm" gap={1.5}>
                  {APPEARANCE_MODES.map((mode, i) => (
                    <HStack gap={1.5} key={mode}>
                      {i > 0 && <Text>|</Text>}
                      {mode === appearanceMode ? (
                        <Text color="fg" fontWeight="bold">
                          {t(APPEARANCE_TRANSLATION_KEYS[mode])}
                        </Text>
                      ) : (
                        <Text
                          _hover={{ color: 'fg' }}
                          cursor="pointer"
                          onClick={() => setAppearanceMode(mode)}
                        >
                          {t(APPEARANCE_TRANSLATION_KEYS[mode])}
                        </Text>
                      )}
                    </HStack>
                  ))}
                </HStack>
              </Flex>

              <Flex align="center" justify="space-between" mb={4}>
                <Text fontSize="sm" fontWeight="medium">
                  {t('timezone')}
                </Text>
                <HStack color="fg.muted" fontSize="sm" gap={1.5}>
                  {TIMEZONE_MODES.map((mode, i) => (
                    <HStack gap={1.5} key={mode}>
                      {i > 0 && <Text>|</Text>}
                      {mode === timezoneMode ? (
                        <Text color="fg" fontWeight="bold">
                          {t(TIMEZONE_TRANSLATION_KEYS[mode])}
                        </Text>
                      ) : (
                        <Text
                          _hover={{ color: 'fg' }}
                          cursor="pointer"
                          onClick={() => setTimezoneMode(mode)}
                        >
                          {t(TIMEZONE_TRANSLATION_KEYS[mode])}
                        </Text>
                      )}
                    </HStack>
                  ))}
                </HStack>
              </Flex>

              {flags.showLanguageSettings ? (
                <Flex align="center" justify="space-between">
                  <Text fontSize="sm" fontWeight="medium">
                    {t('language')}
                  </Text>
                  <HStack color="fg.muted" fontSize="sm" gap={1.5}>
                    {LOCALE_MODES.map((mode, i) => {
                      const label = mode === 'System' ? t('languageSystem') : LOCALE_LABELS[mode];
                      return (
                        <HStack gap={1.5} key={mode}>
                          {i > 0 && <Text>|</Text>}
                          {mode === localeMode ? (
                            <Text color="fg" fontWeight="bold">
                              {label}
                            </Text>
                          ) : (
                            <Text
                              _hover={{ color: 'fg' }}
                              cursor="pointer"
                              onClick={() => setLocaleMode(mode)}
                            >
                              {label}
                            </Text>
                          )}
                        </HStack>
                      );
                    })}
                  </HStack>
                </Flex>
              ) : null}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
