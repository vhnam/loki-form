import { Button, Icon } from '@repo/ui-core/primitives';

const CTASection = () => {
  return (
    <section className="bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900 py-24">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="mb-6 text-xl text-bright">Ready to Build Your First Form?</h2>

        <p className="mb-10 text-lg text-gray-7 dark:text-dark-1">
          Join developers who are building scalable, portable forms without vendor lock-in. Start with our free tier and
          export your first JSON schema in minutes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" variant="filled">
            Get Started Free
            <Icon name="ArrowRight" className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button size="lg" variant="default">
            <Icon name="Github" className="mr-2 size-4" />
            View Documentation
          </Button>
        </div>

        <p className="mt-8 text-sm text-dimmed">No credit card required · 3 forms included on free tier</p>
      </div>
    </section>
  );
};

export default CTASection;
