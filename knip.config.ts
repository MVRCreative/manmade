import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  // Files to exclude from Knip analysis
  ignore: [
    // Boilerplate primitives kept for upcoming landing pages. Knip flags
    // them because the current /design-system showcase only exercises a
    // subset. Keep them available as the public surface of the kit.
    'src/components/common/**',
    'src/lib/**',
    // Infrastructure carried over from the original boilerplate (DB,
    // logger, validation). Not wired into any current route but retained
    // for future use. Remove this entry once they're either used again
    // or intentionally deleted.
    'src/libs/DB.ts',
    'src/libs/Logger.ts',
    'src/utils/AppConfig.ts',
    'src/utils/DBConnection.ts',
    'src/validations/**',
  ],
  // Dependencies to ignore during analysis
  ignoreDependencies: [
    '@commitlint/types',
    '@swc/helpers', // Avoid error in CI: "`npm ci` can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync."
    'vite',
    // Intended building blocks listed on the home page; will be consumed
    // by upcoming landing pages and the Shopify integration.
    '@shopify/storefront-api-client',
    'clsx',
    'graphql',
    // Carried over from the original boilerplate, not yet rewired.
    '@faker-js/faker',
    '@hookform/resolvers',
    '@logtape/logtape',
    'react-hook-form',
    'vitest-browser-react',
  ],
  // Include custom Playwright test file suffixes
  playwright: {
    entry: ['tests/**/*.@(integ|e2e).ts'],
  },
  // Binaries to ignore during analysis
  ignoreBinaries: [],
  compilers: {
    css: (text: string) => [...text.matchAll(/(?<=@)import[^;]+/gu)].join('\n'),
  },
  treatConfigHintsAsErrors: true,
};

export default config;
