import { Button as ButtonPrimitive } from '@base-ui/react/button';

import {
  type ButtonProps,
  type ButtonRadius,
  type ButtonSize,
  type ButtonVariant,
  buttonVariants,
} from '@repo/ui-core/primitives';
import { cn, hasReadableText } from '@repo/ui-core/utils';

type ActionButtonProps = ButtonProps;
type ActionButtonVariant = ButtonVariant;
type ActionButtonSize = ButtonSize;
type ActionButtonRadius = ButtonRadius;

const actionButtonSizeOverrides: Record<ActionButtonSize, string> = {
  xs: 'size-4.5 [&_svg]:size-3',
  sm: 'size-5.5 [&_svg]:size-4',
  md: 'size-7 [&_svg]:size-4',
  lg: 'size-8.5 [&_svg]:size-4',
  xl: 'size-11 [&_svg]:size-5',
};

function ActionButton({
  children,
  'aria-label': ariaLabel,
  className,
  size = 'md',
  radius = 'sm',
  fullWidth = false,
  variant = 'filled',
  ...props
}: ActionButtonProps) {
  const hasText = hasReadableText(children);

  if (process.env.NODE_ENV !== 'production') {
    if (hasText) {
      console.warn('[ActionButton] please use Button for buttons with text');
    }

    if (!ariaLabel) {
      console.warn('[ActionButton] aria-label is mandatory for icon-only buttons');
    }
  }

  return (
    <ButtonPrimitive
      {...(!hasText && ariaLabel ? { 'aria-label': ariaLabel } : {})}
      data-slot="action-button"
      className={cn(
        buttonVariants({ variant, size, radius, fullWidth }),
        actionButtonSizeOverrides[size as ActionButtonSize],
        className,
        '!px-0',
      )}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
}

export {
  ActionButton,
  type ActionButtonProps,
  type ActionButtonVariant,
  type ActionButtonSize,
  type ActionButtonRadius,
};
