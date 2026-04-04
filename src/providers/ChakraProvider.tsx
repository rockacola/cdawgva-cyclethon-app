'use client';

import { ChakraProvider as BaseChakraProvider } from '@chakra-ui/react';

import { ColorModeProvider } from '@/components/ui/color-mode';
import { system } from '@/lib/theme';

export function ChakraProvider({ children }: { children: React.ReactNode }) {
  return (
    <BaseChakraProvider value={system}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </BaseChakraProvider>
  );
}
