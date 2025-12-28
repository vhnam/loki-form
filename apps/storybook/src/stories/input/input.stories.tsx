import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input, type InputProps, type InputRadius, type InputSize, Label } from '@repo/ui-core/primitives';

const inputSizes: InputSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const inputRadiuses: InputRadius[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta = {
  title: 'Primitives/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    readOnly: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: inputSizes,
    },
    radius: {
      control: 'select',
      options: inputRadiuses,
    },
  },
  args: {
    type: 'text',
    size: 'sm',
    radius: 'sm',
    disabled: false,
    readOnly: false,
    required: false,
    placeholder: 'Enter your name',
  },
} satisfies Meta<InputProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="input-email">Email</Label>
      <Input type="email" id="input-email" placeholder="name@example.com" />
    </div>
  ),
};
