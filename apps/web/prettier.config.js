// @ts-check
import baseConfig from '@repo/prettier-config';

/** @type {import('prettier').Config} */
const config = {
  ...baseConfig,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['^(?!@repo|@/|\\./).*', '^@repo/*', '@/integrations/*', '@/components/*', '^@/*', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
