import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Icon, type ButtonProps } from "@repo/ui-core/primitives";

const buttonSizes = ["xs", "sm", "md", "lg", "xl"];
const buttonVariants = [
  "filled",
  "light",
  "outline",
  "subtle",
  "transparent",
  "white",
];
const buttonRadiuses = ["xs", "sm", "md", "lg", "xl"];

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

const variantLabel = (variant: string) => {
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
              variant={variant as ButtonProps["variant"]}
              size={size as ButtonProps["size"]}
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
              variant={variant as ButtonProps["variant"]}
              size={size as ButtonProps["size"]}
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
              variant={variant as ButtonProps["variant"]}
              size={size as ButtonProps["size"]}
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

export const IconOnly: Story = {
  name: "Icon Only",
  render: () => (
    <div className="flex flex-row gap-4">
      {buttonVariants.map((variant) => (
        <div key={`${variant}-container`} className="flex flex-col gap-4">
          {buttonSizes.map((size) => (
            <Button
              key={`${variant}-${size}`}
              variant={variant as ButtonProps["variant"]}
              size={size as ButtonProps["size"]}
            >
              <Icon name="ArrowRight" className="size-4" />
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};
