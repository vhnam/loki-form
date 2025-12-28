import { type VariantProps, cva } from 'class-variance-authority';
import { type AriaAttributes, type ComponentProps } from 'react';

import { cn } from '@repo/ui-core/utils';

const textareaVariants = cva(
  'placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full outline-none disabled:cursor-not-allowed disabled:opacity-50',
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

type TextareaProps = AriaAttributes & ComponentProps<'textarea'> & VariantProps<typeof textareaVariants>;

function Textarea({ className, size = 'sm', ...props }: TextareaProps) {
  return <textarea data-slot="textarea" className={cn(textareaVariants({ size }), className)} {...props} />;
}

export { Textarea, type TextareaProps };
