import './commands';

// React hydration mismatches are expected in Cypress's SSR+browser environment
// and fire after the page is already rendered. Allow the test to continue rather
// than failing on an error unrelated to visual output.
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Hydration failed')) {
    return false;
  }
});
