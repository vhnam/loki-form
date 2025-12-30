import { Button, Icon } from '@repo/ui-core/primitives';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 dark:border-neutral-800 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 px-4 py-2 backdrop-blur-sm">
            <Icon name="Code2" className="size-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">JSON-Driven Form Engine</span>
          </div>

          <h1 className="mb-6 bg-gradient-to-br from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">
            Build complex, dynamic forms from JSON — without locking into UI frameworks
          </h1>

          <p className="mb-10 text-lg text-neutral-600 dark:text-neutral-400">
            Design structured forms via a web interface, export as clean JSON, and render anywhere with our standalone
            library. Built for developers who value control and portability.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="filled" size="lg" className="group">
              Create Your First Form
              <Icon name="ArrowRight" className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              <Icon name="Code2" className="mr-2 size-4" />
              View JSON Example
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
