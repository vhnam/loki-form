import baseConfig from '@repo/prettier-config';

export default {
  ...baseConfig,
  overrides: [
    ...(baseConfig.overrides || []),
    {
      files: '**/*.{ts,tsx}',
      options: {
        importOrder: [
          '^(?!@repo)@?\\w',
          '^@/constants/(.*)$',
          '^@repo/core-ui/lib(.*)$',
          '^@/hooks/(.*)$',
          '^@/utils/(.*)$',
          '^@repo/core-ui/hooks(.*)$',
          '^@repo/form-ui/utils(.*)$',
          '^@/providers/(.*)$',
          '^@/schemas/(.*)$',
          '^@repo/form-ui/enums(.*)$',
          '^@repo/form-ui/types(.*)$',
          '^@/types/(.*)$',
          '^@/services/(.*)$',
          '^@/stores/(.*)$',
          '^@/components/(.*)$',
          '^@repo/core-ui/components(.*)$',
          '^@repo/form-ui/components(.*)$',
          '^@/layouts/(.*)$',
          '^@/modules/(.*)$',
          '^@/i18n/(.*)$',
          '^[./]',
          '^@/mocks/(.*)$',
        ],
      },
    },
  ],
};
