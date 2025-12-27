import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  ActionButton,
  Icon,
  type ActionButtonProps,
  type ActionButtonRadius,
  type ActionButtonSize,
  type ActionButtonVariant,
} from "@repo/ui-core/primitives";

const actionButtonSizes: ActionButtonSize[] = ["xs", "sm", "md", "lg", "xl"];
const actionButtonVariants: ActionButtonVariant[] = [
  "default",
  "filled",
  "light",
  "outline",
  "subtle",
  "transparent",
  "white",
];
const actionButtonRadiuses: ActionButtonRadius[] = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
];

const meta = {
  title: "Primitives/ActionButton",
  component: ActionButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    disabled: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
    radius: {
      control: "select",
      options: actionButtonRadiuses,
    },
    size: {
      control: "select",
      options: actionButtonSizes,
    },
    variant: {
      control: "select",
      options: actionButtonVariants,
    },
  },
  args: {
    disabled: false,
    fullWidth: false,
    radius: "sm",
    size: "md",
    variant: "filled",
  },
} satisfies Meta<ActionButtonProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default",
  args: {
    children: <Icon name="Plus" className="size-4" />,
  },
};

export const Variants: Story = {
  name: "Variants & Sizes",
  render: () => (
    <div className="flex flex-row gap-4">
      {actionButtonVariants.map((variant) => (
        <div key={`${variant}-container`} className="flex flex-col gap-4">
          {actionButtonSizes.map((size) => (
            <ActionButton
              aria-label="Next"
              key={`${variant}-${size}`}
              type="button"
              variant={variant}
              size={size}
            >
              <Icon name="ArrowRight" className="size-4" />
            </ActionButton>
          ))}
        </div>
      ))}
    </div>
  ),
};
