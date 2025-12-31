type FooterLink = {
  name: string;
  href: string;
};

const footerLinks: Record<string, Array<FooterLink>> = {
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

const Footer = () => {
  const renderSection = (title: string, links: Array<FooterLink>) => {
    return (
      <div>
        <h4 className="mb-4 text-sm text-bright">{title}</h4>
        <ul className="space-y-3">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-sm text-gray-6 dark:text-dark-1 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <footer className="border-t border-gray-2 dark:border-dark-4 bg-white dark:bg-body">
      <div className="mx-auto max-w-7xl px-6 pt-12 lg:px-8 md:grid md:grid-cols-2">
        <div className="pb-8 md:pb-0">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600">
              <img src="/logo.svg" alt="Loki-Form" className="size-8" />
            </div>
            <span className="text-lg text-neutral-900 dark:text-white">Loki-Form</span>
          </div>
          <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400 max-w-96">
            JSON-driven forms for developers who value control and portability.
          </p>
        </div>

        <div className="hidden sm:inline-grid grid-cols-3 gap-8">
          {renderSection('Product', footerLinks.product ?? [])}

          {renderSection('Resources', footerLinks.resources ?? [])}

          {renderSection('Company', footerLinks.company ?? [])}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mt-6 border-t border-gray-2 dark:border-dark-4">
          <p className="text-xs text-bright py-4">&copy; {new Date().getFullYear()} Loki-Form. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
