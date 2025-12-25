import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@repo/ui-core/primitives";

const meta = {
  title: "Primitives/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "light", "outline", "subtle", "transparent", "white"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    radius: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
  args: {
    variant: "filled",
    size: "sm",
    radius: "sm",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: {
    variant: "filled",
    children: "Button",
  },
};

export const Light: Story = {
  args: {
    variant: "light",
    children: "Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Button",
  },
};

export const Subtle: Story = {
  args: {
    variant: "subtle",
    children: "Button",
  },
};

export const Transparent: Story = {
  args: {
    variant: "transparent",
    children: "Button",
  },
};

export const White: Story = {
  args: {
    variant: "white",
    children: "Button",
  },
};
