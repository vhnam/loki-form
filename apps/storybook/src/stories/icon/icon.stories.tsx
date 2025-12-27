import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon, iconList, type IconProps } from '@repo/ui-core/primitives';

const meta = {
  title: 'Primitives/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(iconList.icons),
    },
    size: {
      control: 'number',
    },
  },
  args: {
    name: 'ArrowRight',
    size: 16,
  },
} satisfies Meta<IconProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'ArrowRight',
  },
};
