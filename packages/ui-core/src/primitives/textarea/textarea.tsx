import { type VariantProps, cva } from 'class-variance-authority';
import { type AriaAttributes, type ComponentProps } from 'react';

import { cn } from '@repo/ui-core/utils';

const textareaVariants = cva(
  'border-input placeholder:text-placeholder text-text focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-md',
        lg: 'text-lg',
        xl: 'text-xl',
      },
      radius: {
        xs: 'rounded-xs',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
      },
      disabled: {
        false: null,
        true: 'bg-disabled',
      },
    },
    defaultVariants: {
      size: 'sm',
      radius: 'sm',
    },
  },
);

type TextareaProps = AriaAttributes & ComponentProps<'textarea'> & VariantProps<typeof textareaVariants>;
type TextareaSize = NonNullable<VariantProps<typeof textareaVariants>['size']>;
type TextareaRadius = NonNullable<VariantProps<typeof textareaVariants>['radius']>;

function Textarea({ className, disabled = false, size = 'sm', radius = 'sm', ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ size, radius, disabled }), className)}
      disabled={disabled}
      {...props}
    />
  );
}

export { Textarea, type TextareaProps, type TextareaSize, type TextareaRadius };
