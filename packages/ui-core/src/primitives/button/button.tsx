import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@repo/ui-core/utils";

const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-md border border-transparent bg-clip-padding focus-visible:ring-[2px] aria-invalid:ring-[2px] [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none",
  {
    variants: {
      variant: {
        default: "text-default-color border-default-color",
        filled:
          "bg-primary-color-filled text-white hover:bg-primary-color-filled-hover",
        light:
          "bg-primary-color-light text-primary-color-light-color hover:bg-primary-color-light-hover",
        outline: cn(
          "text-blue-outline border-blue-outline hover:bg-blue-outline-hover",
          "aria-expanded:bg-muted aria-expanded:text-foreground"
        ),
        subtle: cn(
          "text-primary-color-light-color hover:bg-primary-color-light-hover bg-transparent",
          "aria-expanded:bg-primary-color-light aria-expanded:text-primary-color-light-color"
        ),
        transparent: cn(
          "text-primary-color-light-color bg-transparent",
          "aria-expanded:bg-muted aria-expanded:text-foreground"
        ),
        white: cn(
          "text-primary-color-light-color bg-white",
          "aria-expanded:bg-muted aria-expanded:text-foreground"
        ),
      },
      size: {
        xs: "px-xs py-1 text-xs/relaxed",
        sm: "px-sm py-1 text-sm/relaxed",
        md: "px-md py-1 text-md/relaxed",
        lg: "px-lg py-1 text-lg/relaxed",
        xl: "px-xl py-1 text-xl/relaxed",
      },
      radius: {
        xs: "rounded-xs",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "sm",
      radius: "sm",
    },
  }
);

function Button({
  className,
  variant = "filled",
  size = "md",
  radius = "md",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, radius }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
