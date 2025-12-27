import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Button,
  Icon,
  type ButtonProps,
  type ButtonRadius,
  type ButtonSize,
  type ButtonVariant,
} from "@repo/ui-core/primitives";

const buttonSizes: ButtonSize[] = ["xs", "sm", "md", "lg", "xl"];
const buttonVariants: ButtonVariant[] = [
  "default",
  "filled",
  "light",
  "outline",
  "subtle",
  "transparent",
  "white",
];
const buttonRadiuses: ButtonRadius[] = ["xs", "sm", "md", "lg", "xl"];

const meta = {
  title: "Primitives/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    disabled: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
    radius: {
      control: "select",
      options: buttonRadiuses,
    },
    size: {
      control: "select",
      options: buttonSizes,
    },
    variant: {
      control: "select",
      options: buttonVariants,
    },
  },
  args: {
    disabled: false,
    fullWidth: false,
    radius: "sm",
    size: "sm",
    variant: "filled",
  },
} satisfies Meta<ButtonProps>;

export default meta;

type Story = StoryObj<typeof meta>;

const variantLabel = (variant: NonNullable<ButtonProps["variant"]>) => {
  return variant.charAt(0).toUpperCase() + variant.slice(1);
};

export const Default: Story = {
  args: {
    variant: "filled",
    children: "Button",
  },
};

export const Variants: Story = {
  name: "Variants & Sizes",
  render: () => (
    <div className="flex flex-row gap-4">
      {buttonVariants.map((variant) => (
        <div key={`${variant}-container`} className="flex flex-col gap-4">
          {buttonSizes.map((size) => (
            <Button
              key={`${variant}-${size}`}
              type="button"
              variant={variant}
              size={size}
            >
              {variantLabel(variant)}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const IconRight: Story = {
  name: "Icon Right",
  render: () => (
    <div className="flex flex-row gap-4">
      {buttonVariants.map((variant) => (
        <div key={`${variant}-container`} className="flex flex-col gap-4">
          {buttonSizes.map((size) => (
            <Button
              key={`${variant}-${size}`}
              type="button"
              variant={variant}
              size={size}
            >
              {variantLabel(variant)}
              <Icon name="ArrowRight" className="size-4" />
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const IconLeft: Story = {
  name: "Icon Left",
  render: () => (
    <div className="flex flex-row gap-4">
      {buttonVariants.map((variant) => (
        <div key={`${variant}-container`} className="flex flex-col gap-4">
          {buttonSizes.map((size) => (
            <Button
              key={`${variant}-${size}`}
              type="button"
              variant={variant}
              size={size}
            >
              <Icon name="CircleArrowLeft" className="size-4" />
              {variantLabel(variant)}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};
