import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

// The Ledger palette
const L = {
  // light
  paper: '#f6f1e7',
  paperDim: '#efe8da',
  paperMuted: '#e5dac8',
  ink: '#1a1614',
  inkDim: '#4a4239',
  inkMuted: '#86796a',
  rule: '#dcd3bf',
  ruleStrong: '#bfb59e',
  // dark
  darkPaper: '#1a1614',
  darkPaperDim: '#261f1a',
  darkPaperMuted: '#322820',
  darkPaperPanel: '#201c18',
  darkInk: '#f0e8d8',
  darkInkDim: '#c4b8a8',
  darkInkMuted: '#8a7e6e',
  darkRule: '#3d302a',
  darkRuleStrong: '#564540',
};

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: 'var(--font-playfair), "Playfair Display", Georgia, serif' },
        mono: { value: 'var(--font-mono), "JetBrains Mono", ui-monospace, Menlo, monospace' },
      },
      colors: {
        // Repurposed as warm amber — used by HomeHero badges
        indigo: {
          50: { value: '#fdf6ed' },
          100: { value: '#f5e4c8' },
          200: { value: '#eaccaa' },
          300: { value: '#dab080' },
          400: { value: '#c98f56' },
          500: { value: '#b8742e' },
          600: { value: '#9a5c1f' },
          700: { value: '#7a4614' },
          800: { value: '#5c320b' },
          900: { value: '#3d2005' },
          950: { value: '#240f00' },
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
          DEFAULT: { value: { base: L.paper, _dark: L.darkPaper } },
          muted: { value: { base: L.paperMuted, _dark: L.darkPaperMuted } },
          panel: { value: { base: L.paper, _dark: L.darkPaperPanel } },
          subtle: { value: { base: L.paperDim, _dark: L.darkPaperDim } },
        },
        border: {
          DEFAULT: { value: { base: L.rule, _dark: L.darkRule } },
          emphasized: { value: { base: L.ruleStrong, _dark: L.darkRuleStrong } },
        },
        fg: {
          DEFAULT: { value: { base: L.ink, _dark: L.darkInk } },
          muted: { value: { base: L.inkDim, _dark: L.darkInkDim } },
          subtle: { value: { base: L.inkMuted, _dark: L.darkInkMuted } },
        },
        accent: {
          DEFAULT: { value: { base: '#d94a1f', _dark: '#e8633a' } },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
