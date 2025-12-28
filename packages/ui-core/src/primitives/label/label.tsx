import { type VariantProps, cva } from 'class-variance-authority';
import { type AriaAttributes, type ComponentProps } from 'react';

import { cn } from '@repo/ui-core/utils';

const labelVariants = cva(
  'flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-md',
        lg: 'text-lg',
        xl: 'text-xl',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

type LabelProps = AriaAttributes & ComponentProps<'label'> & VariantProps<typeof labelVariants>;
type LabelSize = NonNullable<LabelProps['size']>;

function Label({ className, size, ...props }: LabelProps) {
  return <label data-slot="label" className={cn(labelVariants({ size }), className)} {...props} />;
}

export { Label, type LabelProps, type LabelSize };
