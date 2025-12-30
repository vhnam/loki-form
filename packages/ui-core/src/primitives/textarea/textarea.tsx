import { type VariantProps, cva } from 'class-variance-authority';
import { type AriaAttributes, type ComponentProps } from 'react';

import { cn } from '@repo/ui-core/utils';

const textareaVariants = cva(
  cn(
    'border border-gray-4 border-solid placeholder:text-placeholder text-color resize-none',
    'focus-visible:border-primary-color-filled aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  ),
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm px-3 py-1.375 leading-[1.55]',
        md: 'text-md px-3 py-2 leading-[1.55]',
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
