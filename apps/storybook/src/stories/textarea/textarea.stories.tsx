import { Example } from '@/components/example';
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Field,
  FieldDescription,
  FieldLabel,
  Textarea,
  type TextareaProps,
  type TextareaRadius,
  type TextareaSize,
} from '@repo/ui-core/primitives';

const textareaSizes: TextareaSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const textareaRadiuses: TextareaRadius[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta = {
  title: 'Primitives/Textarea',
  component: Textarea,
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
      options: textareaSizes,
    },
    radius: {
      control: 'select',
      options: textareaRadiuses,
    },
  },
  args: {
    size: 'sm',
    radius: 'sm',
    disabled: false,
    readOnly: false,
    required: false,
  },
} satisfies Meta<TextareaProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Example>
      <Textarea placeholder="Enter your email" />
    </Example>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <Example title="With Label">
      <Field>
        <FieldLabel htmlFor="textarea-demo-message">Message</FieldLabel>
        <Textarea id="textarea-demo-message" placeholder="Type your message here." rows={6} />
      </Field>
    </Example>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Example title="With Description">
      <Field>
        <FieldLabel htmlFor="textarea-demo-message-2">Message</FieldLabel>
        <Textarea id="textarea-demo-message-2" placeholder="Type your message here." rows={6} />
        <FieldDescription>Type your message and press enter to send.</FieldDescription>
      </Field>
    </Example>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Example title="Disabled">
      <Field>
        <FieldLabel htmlFor="textarea-demo-disabled">Message</FieldLabel>
        <Textarea id="textarea-demo-disabled" placeholder="Type your message here." disabled />
      </Field>
    </Example>
  ),
};
