import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input, Label, type LabelProps, type LabelSize, Textarea } from '@repo/ui-core/primitives';

const labelSizes: LabelSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta = {
  title: 'Primitives/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    htmlFor: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: labelSizes,
    },
  },
  args: {
    size: 'sm',
  },
} satisfies Meta<LabelProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="input-username">Username</Label>
      <Input id="input-username" placeholder="Enter your username" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="label-demo-disabled">Disabled</Label>
      <Input id="label-demo-disabled" placeholder="Disabled" disabled />
    </div>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="label-demo-message">Message</Label>
      <Textarea id="label-demo-message" placeholder="Message" />
    </div>
  ),
};
