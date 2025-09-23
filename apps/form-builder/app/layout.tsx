import '@repo/core-ui/globals.css';

import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { Inter, JetBrains_Mono, Merriweather } from 'next/font/google';
import { PropsWithChildren } from 'react';

import { BRAND_DESCRIPTION, BRAND_NAME } from '@/constants/branding';

import { cn } from '@repo/core-ui/lib/utils';

import QueryProvider from '@/providers/query';
import ThemeProvider from '@/providers/theme';

import { Toaster } from '@repo/core-ui/components/sonner';

const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });
const merriweather = Merriweather({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: BRAND_NAME,
  description: BRAND_DESCRIPTION,
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'antialiased',
          jetBrainsMono.className,
          merriweather.className,
          inter.className
        )}
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
