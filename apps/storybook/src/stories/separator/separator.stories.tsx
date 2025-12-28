import { Example } from '@/components/example';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Separator, type SeparatorOrientation, type SeparatorProps } from '@repo/ui-core/primitives';

const separatorOrientations: SeparatorOrientation[] = ['horizontal', 'vertical'];

const meta = {
  title: 'Primitives/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: separatorOrientations,
    },
  },
  args: {
    orientation: 'horizontal',
  },
} satisfies Meta<SeparatorProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <Example title="Horizontal">
      <div className="text-xs/relaxed flex flex-col gap-4 text-sm">
        <div className="flex flex-col gap-1">
          <div className="leading-none font-medium">@repo/ui-core</div>
          <div className="text-muted-foreground">The Foundation for your Design System</div>
        </div>
        <Separator />
        <div>A set of beautifully designed components that you can customize, extend, and build on.</div>
      </div>
    </Example>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Example title="Vertical">
      <div className="text-xs/relaxed flex h-5 items-center gap-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </Example>
  ),
};

export const VerticalMenu: Story = {
  render: () => (
    <Example title="Vertical Menu">
      <div className="text-xs/relaxed flex items-center gap-2 text-sm md:gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-medium">Settings</span>
          <span className="text-muted-foreground text-xs">Manage preferences</span>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col gap-1">
          <span className="font-medium">Account</span>
          <span className="text-muted-foreground text-xs">Profile & security</span>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col gap-1">
          <span className="font-medium">Help</span>
          <span className="text-muted-foreground text-xs">Support & docs</span>
        </div>
      </div>
    </Example>
  ),
};

export const InList: Story = {
  render: () => (
    <Example title="In List">
      <div className="text-xs/relaxed flex flex-col gap-2 text-sm">
        <dl className="flex items-center justify-between">
          <dt>Item 1</dt>
          <dd className="text-muted-foreground">Value 1</dd>
        </dl>
        <Separator />
        <dl className="flex items-center justify-between">
          <dt>Item 2</dt>
          <dd className="text-muted-foreground">Value 2</dd>
        </dl>
        <Separator />
        <dl className="flex items-center justify-between">
          <dt>Item 3</dt>
          <dd className="text-muted-foreground">Value 3</dd>
        </dl>
      </div>
    </Example>
  ),
};
