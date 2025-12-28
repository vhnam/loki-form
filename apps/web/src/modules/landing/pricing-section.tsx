import { Button, Icon } from '@repo/ui-core/primitives';

const tiers = [
  {
    name: 'Free',
    description: 'Perfect for getting started',
    features: [
      'Create forms via Loki-Form website',
      'Up to 3 forms per account',
      'All question types included',
      'JSON export',
      'Standalone rendering library',
      'Community support',
    ],
    cta: 'Start Building Free',
    highlighted: false,
  },
  {
    name: 'Premium',
    badge: 'Coming Soon',
    description: 'For teams and advanced workflows',
    features: [
      'Everything in Free',
      'Unlimited forms',
      'Team collaboration',
      'API access',
      'Advanced conditional logic',
      'Priority support',
      'Custom branding',
    ],
    cta: 'Join Waitlist',
    highlighted: true,
  },
];

const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-neutral-900 dark:text-neutral-100">Simple, Transparent Pricing</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">Start free, scale when you're ready</p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-lg border p-8 ${
                tier.highlighted
                  ? 'border-blue-300 dark:border-blue-500/50 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/30 dark:to-neutral-900/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]'
                  : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/50'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 rounded-full border border-blue-400 dark:border-blue-500/50 bg-blue-100 dark:bg-blue-950/50 px-3 py-1 backdrop-blur-sm">
                    <Icon name="Sparkles" className="size-3 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs text-blue-700 dark:text-blue-300">{tier.badge}</span>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="mb-2 text-neutral-900 dark:text-neutral-100">{tier.name}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{tier.description}</p>
              </div>

              <ul className="mb-8 space-y-3">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Icon name="Check" className="mt-0.5 size-4 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  tier.highlighted
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                variant={tier.highlighted ? 'default' : 'outline'}
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
