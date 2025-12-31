import { motion } from 'motion/react';

import { Icon } from '@repo/ui-core/primitives';

import InteractiveDemo from './interactive-demo';

const benefits = [
  'No vendor lock-in — your forms, your schema',
  'Version control friendly JSON output',
  'Portable across any platform or framework',
  'Self-hostable rendering library',
];

const DeveloperSection = () => {
  return (
    <section className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-body py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-xl text-bright">Built for Developers Who Value Control</h2>

          <p className="mx-auto max-w-3xl text-lg text-gray-7 dark:text-dark-1">
            Loki-Form treats JSON as the single source of truth. No proprietary formats, no hidden magic — just clean,
            structured data you can version, audit, and deploy with confidence.
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="mb-16">
          <InteractiveDemo />
        </div>

        {/* Benefits Grid */}
        <div className="mx-auto max-w-4xl">
          <h3 className="mb-8 text-center text-xl text-bright">Why Developers Choose Loki-Form</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-gray-0 dark:bg-dark-6 p-4"
              >
                <Icon name="CheckCircle2" className="mt-0.5 size-5 flex-shrink-0 text-primary-color-filled" />
                <span className="text-text">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
