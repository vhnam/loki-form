import '@repo/core-ui/globals.css';

import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { Merriweather, Open_Sans } from 'next/font/google';
import { PropsWithChildren } from 'react';

import { BRAND_DESCRIPTION, BRAND_NAME } from '@/constants/branding';

import QueryProvider from '@/providers/query';
import ThemeProvider from '@/providers/theme';

import { Toaster } from '@repo/core-ui/components/sonner';

const merriweather = Merriweather({ subsets: ['latin'] });
const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: BRAND_NAME,
  description: BRAND_DESCRIPTION,
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${openSans.className} ${merriweather.className} antialiased`}
      >
        <QueryProvider>
          <NextIntlClientProvider locale={locale}>
            <ThemeProvider>{children}</ThemeProvider>
          </NextIntlClientProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
