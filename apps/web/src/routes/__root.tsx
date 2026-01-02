import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

import type { RouterContext } from '@/integrations/tanstack-query';

import Footer from '@/components/footer';
import Header from '@/components/header';

import appCss from '@/styles.css?url';

const THEME_COOKIE_NAME = 'theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

export const Route = createRootRouteWithContext<RouterContext>()({
  loader: () => {
    // Note: In TanStack Start, accessing request in loaders requires additional setup
    // The blocking script below handles theme detection client-side to prevent flash
    // For true server-side checking, you would need to extend the router context
    // to include request information, or use a server function with middleware
    return { theme: THEME_LIGHT };
  },
  head: () => {
    return {
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
      scripts: [
        {
          children: `
            (function() {
              try {
                function getCookie(name) {
                  var value = "; " + document.cookie;
                  var parts = value.split("; " + name + "=");
                  if (parts.length === 2) return parts.pop().split(";").shift();
                  return null;
                }
                var cookieTheme = getCookie('${THEME_COOKIE_NAME}');
                var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                var theme = cookieTheme || (prefersDark ? '${THEME_DARK}' : '${THEME_LIGHT}');
                document.documentElement.classList.add(theme);
                if (theme === '${THEME_DARK}') {
                  document.documentElement.classList.remove('${THEME_LIGHT}');
                } else {
                  document.documentElement.classList.remove('${THEME_DARK}');
                }
              } catch (e) {}
            })();
          `,
        },
      ],
    };
  },

  notFoundComponent: () => <p>Not Found</p>,

  shellComponent: RootDocument,
});

function RootDocument({ children }: PropsWithChildren) {
  // Theme is set by the blocking script in head, so we don't need to read from loader
  // The script runs before React hydration, preventing any flash
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-body text-text">
        <Header />
        {children}
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}
