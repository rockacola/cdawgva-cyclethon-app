'use client';

import { Box, Dialog, Flex, HStack, IconButton, Portal, Text } from '@chakra-ui/react';
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
import { useAppearanceContext } from '@/providers/AppearanceProvider';
import { useLocaleContext } from '@/providers/LocaleProvider';
import { useTimezoneContext } from '@/providers/TimezoneProvider';

interface Props {
  onClose: () => void;
  open: boolean;
}

interface SettingRowProps {
  label: string;
  last?: boolean;
  options: {
    active: boolean;
    label: string;
    onSelect: () => void;
  }[];
}

function SettingRow({ label, last, options }: SettingRowProps) {
  return (
    <Flex
      align="center"
      borderBottomWidth={last ? '0' : '1px'}
      borderColor="border"
      justify="space-between"
      py={4}
    >
      <Text
        color="fg.subtle"
        fontFamily="mono"
        fontSize="xs"
        letterSpacing="wide"
        textTransform="uppercase"
      >
        {label}
      </Text>
      <HStack color="fg.muted" fontFamily="mono" fontSize="xs" gap={1.5}>
        {options.map((opt, i) => (
          <HStack gap={1.5} key={opt.label}>
            {i > 0 && (
              <Text color="border" userSelect="none">
                |
              </Text>
            )}
            {opt.active ? (
              <Text color="accent" fontWeight="medium">
                {opt.label}
              </Text>
            ) : (
              <Text _hover={{ color: 'fg' }} cursor="pointer" onClick={opt.onSelect}>
                {opt.label}
              </Text>
            )}
          </HStack>
        ))}
      </HStack>
    </Flex>
  );
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
            <Dialog.Header borderBottomWidth="1px" borderColor="border">
              <Flex align="center" gap={3}>
                <Box bg="accent" flexShrink={0} h="1px" w={4} />
                <Dialog.Title
                  color="accent"
                  fontFamily="mono"
                  fontSize="xs"
                  fontWeight="normal"
                  letterSpacing="widest"
                  textTransform="uppercase"
                >
                  {t('title')}
                </Dialog.Title>
              </Flex>
              <Dialog.CloseTrigger asChild>
                <IconButton aria-label="Close settings" size="sm" variant="ghost">
                  <X size={16} />
                </IconButton>
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body pb={2} pt={0}>
              <SettingRow
                label={t('appearance')}
                options={APPEARANCE_MODES.map((mode) => ({
                  active: mode === appearanceMode,
                  label: t(APPEARANCE_TRANSLATION_KEYS[mode]),
                  onSelect: () => setAppearanceMode(mode),
                }))}
              />
              <SettingRow
                label={t('timezone')}
                options={TIMEZONE_MODES.map((mode) => ({
                  active: mode === timezoneMode,
                  label: t(TIMEZONE_TRANSLATION_KEYS[mode]),
                  onSelect: () => setTimezoneMode(mode),
                }))}
              />
              <SettingRow
                label={t('language')}
                last
                options={LOCALE_MODES.map((mode) => ({
                  active: mode === localeMode,
                  label: mode === 'System' ? t('languageSystem') : LOCALE_LABELS[mode],
                  onSelect: () => setLocaleMode(mode),
                }))}
              />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
