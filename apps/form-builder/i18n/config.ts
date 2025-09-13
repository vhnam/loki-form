export type Locale = (typeof locales)[number];

export const locales = ['en-US', 'vi-VN'] as const;
export const defaultLocale: Locale = 'en-US';
