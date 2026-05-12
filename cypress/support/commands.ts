// cypress-image-diff-js is a CommonJS module (module.exports = fn).
// Cypress's webpack does not apply esModuleInterop, so `import ... from`
// resolves .default as undefined. require() gets the raw export directly.
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('cypress-image-diff-js')();
