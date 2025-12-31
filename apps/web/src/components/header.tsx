import { useState } from 'react';

import { ActionButton, Button, Icon } from '@repo/ui-core/primitives';

import ThemeToggle from '@/components/theme-toggle';

const navLinks: Array<{
  name: string;
  href: string;
}> = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Docs', href: '#docs' },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-default-border backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4 lg:px-8">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Loki-Form" className="size-8" />
          <span className="text-lg text-text">Loki-Form</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-text transition-colors hover:bg-gray-0 dark:hover:bg-dark-6 hover:text-bright rounded-md px-2 py-1"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button type="button" variant="default">
            Sign In
          </Button>
          <Button type="button" variant="filled">
            Get Started
          </Button>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <ActionButton
            aria-label="Toggle menu"
            type="button"
            variant="default"
            className="size-9"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <Icon name="X" className="size-5" /> : <Icon name="Menu" className="size-5" />}
          </ActionButton>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-default-border bg-body">
          <div className="px-4 py-4 space-y-3">
            <a
              href="#features"
              className="block py-2 text-sm text-dimmed hover:text-text"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block py-2 text-sm text-dimmed hover:text-text"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="block py-2 text-sm text-dimmed hover:text-text"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#docs"
              className="block py-2 text-sm text-dimmed hover:text-text"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </a>
            <div className="pt-3 space-y-2 border-t border-default-border">
              <Button type="button" variant="default" fullWidth className="justify-start">
                Sign In
              </Button>
              <Button type="button" fullWidth variant="filled">
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
