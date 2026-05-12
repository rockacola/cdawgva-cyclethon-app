import { defineConfig } from 'cypress';
import getCompareSnapshotsPlugin from 'cypress-image-diff-js/plugin';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    screenshotsFolder: 'cypress/screenshots',
    setupNodeEvents(on, config) {
      return getCompareSnapshotsPlugin(on, config);
    },
    specPattern: 'cypress/e2e/**/*.cy.{ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    video: false,
  },
});
