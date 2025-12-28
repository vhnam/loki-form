import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { type VariantProps, cva } from 'class-variance-authority';
import type { AriaAttributes } from 'react';

import { cn, hasReadableText } from '@repo/ui-core/utils';

const buttonVariants = cva(
  cn(
    'flex items-center justify-center font-sans border border-transparent border-solid active:translate-y-0.25',
    "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
  ),
  {
    variants: {
      variant: {
        default: 'text-default-color border-gray-4 hover:bg-gray-0',
        filled: 'bg-primary-color-filled text-white hover:bg-primary-color-filled-hover',
        light: 'bg-primary-color-light text-primary-color-light-color hover:bg-primary-color-light-hover',
        outline: cn('text-blue-outline border-blue-outline hover:bg-blue-outline-hover'),
        subtle: cn('text-primary-color-light-color hover:bg-primary-color-light-hover bg-transparent'),
        transparent: cn('text-primary-color-light-color bg-transparent'),
        white: cn('text-primary-color-light-color bg-white'),
      },
      size: {
        xs: 'px-xs h-7.5 text-xs [&_svg]:size-3 has-[>svg]:gap-1',
        sm: 'px-sm h-9 text-sm [&_svg]:size-4 has-[>svg]:gap-1',
        md: 'px-md h-10.5 text-md [&_svg]:size-4 has-[>svg]:gap-1.5',
        lg: 'px-lg h-12.5 text-lg [&_svg]:size-4 has-[>svg]:gap-1.5',
        xl: 'px-xl h-15 text-xl [&_svg]:size-5 has-[>svg]:gap-1.5',
      },
      radius: {
        xs: 'rounded-xs',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
      },
      fullWidth: {
        false: 'w-fit',
        true: 'w-full',
      },
    },
  },
);

type ButtonProps = AriaAttributes & ButtonPrimitive.Props & VariantProps<typeof buttonVariants>;
type ButtonVariant = NonNullable<ButtonProps['variant']>;
type ButtonSize = NonNullable<ButtonProps['size']>;
type ButtonRadius = NonNullable<ButtonProps['radius']>;
type ButtonFullWidth = NonNullable<ButtonProps['fullWidth']>;

function Button({
  className,
  children,
  'aria-label': ariaLabel,
  variant = 'filled',
  size = 'sm',
  radius = 'sm',
  fullWidth = false,
  ...props
}: ButtonProps) {
  const hasText = hasReadableText(children);

  if (process.env.NODE_ENV !== 'production') {
    if (!hasText && !ariaLabel) {
      console.warn('[Button] please use ActionButton for icon-only buttons');
    }

    if (hasText && ariaLabel) {
      console.warn('[Button] do not use aria-label when button has visible text');
    }
  }

  return (
    <ButtonPrimitive
      {...(!hasText && ariaLabel ? { 'aria-label': ariaLabel } : {})}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, radius, fullWidth }), className)}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
}

export {
  Button,
  buttonVariants,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
  type ButtonRadius,
  type ButtonFullWidth,
};
