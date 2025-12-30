import { Icon } from '@repo/ui-core/primitives';

const footerLinks = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Documentation', href: '#docs' },
    { name: 'Changelog', href: '#' },
  ],
  resources: [
    { name: 'Examples', href: '#' },
    { name: 'JSON Schema', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'GitHub', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600">
                <img src="/logo.svg" alt="Loki-Form" className="size-8" />
              </div>
              <span className="text-lg text-neutral-900 dark:text-white">Loki-Form</span>
            </div>
            <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
              JSON-driven forms for developers who value control and portability.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-neutral-600 dark:text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                <Icon name="Github" className="size-5" />
              </a>
              <a
                href="#"
                className="text-neutral-600 dark:text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                <Icon name="Twitter" className="size-5" />
              </a>
              <a
                href="#"
                className="text-neutral-600 dark:text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                <Icon name="Linkedin" className="size-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm text-neutral-900 dark:text-white">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-600 dark:text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm text-neutral-900 dark:text-white">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-600 dark:text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm text-neutral-900 dark:text-white">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-600 dark:text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200 dark:border-neutral-800 pt-8">
          <p className="text-center text-sm text-neutral-500">
            © {new Date().getFullYear()} Loki-Form. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
