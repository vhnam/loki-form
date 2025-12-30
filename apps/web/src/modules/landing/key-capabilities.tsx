import { Icon } from '@repo/ui-core/primitives';

const capabilities = [
  {
    icon: 'Blocks',
    title: 'Section-Based Forms',
    description: 'Organize complex forms into logical sections with seamless navigation between them.',
  },
  {
    icon: 'GitBranch',
    title: 'Conditional Flows',
    description: 'Jump between sections based on user answers. Create dynamic, non-linear form experiences.',
  },
  {
    icon: 'Box',
    title: 'Nested Sub-Forms',
    description: 'Embed entire sub-forms inside checkbox or dropdown options for unlimited complexity.',
  },
  {
    icon: 'Workflow',
    title: 'Framework-Agnostic',
    description: 'Our rendering library works anywhere — React, Vue, vanilla JS, or any webview environment.',
  },
];

const KeyCapabilities = () => {
  return (
    <section
      id="features"
      className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-neutral-900 dark:text-neutral-100">Key Capabilities</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">Built for scale, designed for flexibility</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability) => (
            <div
              key={capability.title}
              className="group rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/50 p-6 transition-colors hover:border-blue-300 dark:hover:border-blue-500/50 hover:bg-neutral-50 dark:hover:bg-neutral-950"
            >
              <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-colors group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20">
                <Icon name={capability.icon} className="size-5" />
              </div>

              <h3 className="mb-2 text-neutral-900 dark:text-neutral-100">{capability.title}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{capability.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyCapabilities;
