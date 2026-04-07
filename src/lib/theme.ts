import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        indigo: {
          50: { value: '#eef2ff' },
          100: { value: '#e0e7ff' },
          200: { value: '#c7d2fe' },
          300: { value: '#a5b4fc' },
          400: { value: '#818cf8' },
          500: { value: '#4f46e5' },
          600: { value: '#4338ca' },
          700: { value: '#3730a3' },
          800: { value: '#312e81' },
          900: { value: '#1e1b4b' },
          950: { value: '#0f0c29' },
        },
      },
    },
    slotRecipes: {
      table: {
        slots: ['root', 'header', 'body', 'footer', 'row', 'columnHeader', 'cell', 'caption'],
        base: {
          root: {
            rounded: 'md',
          },
        },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: {
            value: { base: '{colors.white}', _dark: '{colors.gray.900}' },
          },
          panel: {
            value: { base: '{colors.white}', _dark: '{colors.gray.800}' },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
