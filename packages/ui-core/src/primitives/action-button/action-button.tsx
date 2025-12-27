import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { hasReadableText } from "@repo/ui-core/utils";
import { cn } from "@repo/ui-core/utils";
import {
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
  type ButtonRadius,
} from "@repo/ui-core/primitives";

import { buttonVariants } from "../button/button";

type ActionButtonProps = ButtonProps;
type ActionButtonVariant = ButtonVariant;
type ActionButtonSize = ButtonSize;
type ActionButtonRadius = ButtonRadius;

const actionButtonSizeOverrides: Record<ActionButtonSize, string> = {
  xs: "px-0 size-4.5 [&_svg]:size-3",
  sm: "px-0 size-5.5 [&_svg]:size-4",
  md: "px-0 size-7 [&_svg]:size-4",
  lg: "px-0 size-8.5 [&_svg]:size-4",
  xl: "px-0 size-11 [&_svg]:size-5",
};

function ActionButton({
  children,
  "aria-label": ariaLabel,
  className,
  size = "md",
  radius = "sm",
  fullWidth = false,
  variant = "filled",
  ...props
}: ActionButtonProps) {
  const hasText = hasReadableText(children);

  if (process.env.NODE_ENV !== "production") {
    if (hasText) {
      console.warn("[ActionButton] please use Button for buttons with text");
    }

    if (!ariaLabel) {
      console.warn(
        "[ActionButton] aria-label is mandatory for icon-only buttons"
      );
    }
  }

  return (
    <ButtonPrimitive
      {...(!hasText && ariaLabel ? { "aria-label": ariaLabel } : {})}
      data-slot="action-button"
      className={cn(
        buttonVariants({ variant, size, radius, fullWidth }),
        actionButtonSizeOverrides[size as ActionButtonSize],
        "!px-0",
        className
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
