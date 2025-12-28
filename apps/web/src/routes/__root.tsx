import type { QueryClient } from '@tanstack/react-query';
import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

import { Footer } from '@/components/footer';
import Header from '@/components/header';
import appCss from '@/styles.css?url';

export interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Loki Form',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  notFoundComponent: () => <p>Not Found</p>,

  shellComponent: RootDocument,
});

function RootDocument({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.add(theme);
                if (theme === 'dark') {
                  document.documentElement.classList.remove('light');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}
