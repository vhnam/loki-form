import { Example } from '@/components/example/example';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Field, FieldLabel, Input, Label, type LabelProps, type LabelSize, Textarea } from '@repo/ui-core/primitives';

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
  render: () => (
    <Example>
      <Label>Label</Label>
    </Example>
  ),
};

export const WithInput: Story = {
  render: () => (
    <Example title="With Input">
      <Field>
        <FieldLabel htmlFor="input-username">Username</FieldLabel>
        <Input id="input-username" placeholder="Enter your username" />
      </Field>
    </Example>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Example title="Disabled">
      <Field>
        <FieldLabel htmlFor="label-demo-disabled">Disabled</FieldLabel>
        <Input id="label-demo-disabled" placeholder="Disabled" disabled />
      </Field>
    </Example>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <Example title="With Textarea">
      <Field>
        <FieldLabel htmlFor="label-demo-message">Message</FieldLabel>
        <Textarea id="label-demo-message" placeholder="Message" />
      </Field>
    </Example>
  ),
};
