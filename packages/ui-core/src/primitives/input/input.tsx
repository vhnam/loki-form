import { Input as InputPrimitive } from '@base-ui/react/input';
import { type VariantProps, cva } from 'class-variance-authority';
import { type AriaAttributes, type ComponentProps } from 'react';

import { cn } from '@repo/ui-core/utils';

const inputVariants = cva('border border-solid border-gray-4', {
  variants: {
    size: {
      xs: 'text-xs h-7.5 px-2.5',
      sm: 'text-sm h-9 px-3',
      md: 'text-md h-10.5 px-3.5',
      lg: 'text-lg h-12.5 px-4',
      xl: 'text-xl h-15 px-4.5',
    },
    radius: {
      xs: 'rounded-xs',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
  },
  defaultVariants: {
    size: 'sm',
    radius: 'sm',
  },
});

type InputProps = AriaAttributes & Omit<ComponentProps<'input'>, 'size'> & VariantProps<typeof inputVariants>;
type InputSize = NonNullable<InputProps['size']>;
type InputRadius = NonNullable<InputProps['radius']>;

function Input({ className, size = 'sm', radius = 'sm', ...props }: InputProps) {
  return <InputPrimitive data-slot="input" className={cn(inputVariants({ size, radius }), className)} {...props} />;
}

export { Input, type InputProps, type InputSize, type InputRadius };
