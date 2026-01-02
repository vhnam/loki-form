import type { ComponentProps } from 'react';

import { cn } from '@repo/ui-core/utils';

type ExampleProps = ComponentProps<'div'> & {
  title?: string;
  containerClassName?: string;
};

const ExampleWrapper = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className="bg-background w-full">
      <div
        data-slot="example-wrapper"
        className={cn(
          'mx-auto grid min-h-screen w-full max-w-5xl min-w-0 content-center items-center gap-8 p-4 pt-2 sm:gap-12 sm:p-6 md:gap-8 lg:p-12 2xl:max-w-6xl',

          className,
        )}
        {...props}
      />
    </div>
  );
};

const Example = ({ title, children, className, containerClassName, ...props }: ExampleProps) => {
  const containerClasses = cn(
    'mx-auto flex w-full max-w-lg min-w-0 flex-col gap-1 self-stretch lg:max-w-none',
    containerClassName,
  );

  const contentClasses = cn(
    "bg-background text-foreground flex min-w-0 flex-1 flex-col items-center gap-6 *:[div:not([class*='w-'])]:w-full",
    title && 'border border-dashed p-4 sm:p-6',
    className,
  );

  const container = (
    <div data-slot="example" className={containerClasses} {...props}>
      {title && <div className="text-muted-foreground px-1.5 py-2 text-xs font-medium">{title}</div>}
      <div data-slot="example-content" className={contentClasses}>
        {children}
      </div>
    </div>
  );

  return title ? <ExampleWrapper>{container}</ExampleWrapper> : container;
};

export { Example, type ExampleProps };
