import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        bg: {
          panel: {
            value: { base: '{colors.white}', _dark: '{colors.gray.800}' },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
