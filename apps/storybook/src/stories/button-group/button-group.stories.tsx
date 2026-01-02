import { Example } from '@/components/example';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ActionButton, Button, ButtonGroup, type ButtonGroupProps, Icon } from '@repo/ui-core/primitives';

const meta = {
  title: 'Primitives/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    orientation: 'horizontal',
  },
} satisfies Meta<ButtonGroupProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Example>
      <div className="flex flex-col gap-4">
        <ButtonGroup>
          <Button variant="default">Button</Button>
          <Button variant="default">Another Button</Button>
        </ButtonGroup>
      </div>
    </Example>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Example>
      <div className="flex gap-4">
        <ButtonGroup orientation="vertical" className="h-fit">
          <ActionButton variant="default" aria-label="Increment">
            <Icon name="Plus" className="size-4" />
          </ActionButton>
          <ActionButton variant="default" aria-label="Decrement">
            <Icon name="Minus" className="size-4" />
          </ActionButton>
        </ButtonGroup>
      </div>
    </Example>
  ),
};
