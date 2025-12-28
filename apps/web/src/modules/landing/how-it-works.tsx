import { Icon } from '@repo/ui-core/primitives';

const steps = [
  {
    icon: 'Edit3',
    step: '01',
    title: 'Build Forms Visually',
    description:
      'Use our intuitive web interface to design forms with multiple question types, sections, and conditional logic.',
  },
  {
    icon: 'FileJson2',
    step: '02',
    title: 'Export as JSON',
    description:
      'Your form becomes a clean, structured JSON schema — the single source of truth for your form architecture.',
  },
  {
    icon: 'Layers',
    step: '03',
    title: 'Render Anywhere',
    description:
      'Use our standalone library to render forms in any webview, application, or internal tool. Framework-agnostic and portable.',
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-neutral-900 dark:text-neutral-100">How It Works</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Three steps to freedom from form vendor lock-in
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <div
              key={item.title}
              className="group relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-8 transition-all hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Icon name={item.icon} className="size-6" />
                </div>
                <span className="text-3xl font-mono text-neutral-200 dark:text-neutral-800 group-hover:text-neutral-300 dark:group-hover:text-neutral-700">
                  {item.step}
                </span>
              </div>

              <h3 className="mb-3 text-neutral-900 dark:text-neutral-100">{item.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
