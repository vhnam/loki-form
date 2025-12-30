import { useState } from 'react';

import { Button, Icon } from '@repo/ui-core/primitives';

import ThemeToggle from '@/components/theme-toggle';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4 lg:px-8">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Loki-Form" className="size-8" />
          <span className="font-heading text-lg text-neutral-900 dark:text-white">Loki-Form</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm text-neutral-600 dark:text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-neutral-600 dark:text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            How It Works
          </a>
          <a
            href="#pricing"
            className="text-sm text-neutral-600 dark:text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            Pricing
          </a>
          <a
            href="#docs"
            className="text-sm text-neutral-600 dark:text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            Docs
          </a>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button variant="default" size="sm" type="button">
            Sign In
          </Button>
          <Button type="button" variant="filled" size="sm">
            Get Started
          </Button>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} variant="subtle" size="md">
            {mobileMenuOpen ? (
              <Icon name="X" className="size-5 text-neutral-700 dark:text-neutral-300" />
            ) : (
              <Icon name="Menu" className="size-5 text-neutral-700 dark:text-neutral-300" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <div className="px-4 py-4 space-y-3">
            <a
              href="#features"
              className="block py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="block py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#docs"
              className="block py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </a>
            <div className="pt-3 flex items-center justify-end gap-2 border-t border-neutral-200 dark:border-neutral-800">
              <Button type="button" variant="default" size="sm">
                Sign In
              </Button>
              <Button type="button" variant="filled" size="sm">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
