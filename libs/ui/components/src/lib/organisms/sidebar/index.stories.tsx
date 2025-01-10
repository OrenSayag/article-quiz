import { Meta, StoryObj } from '@storybook/react';
import { Sidebar, SidebarProvider } from '.';

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  argTypes: {},
  args: {},
  decorators: [
    (Story) => (
      <div>
        <SidebarProvider>
          <Story />
        </SidebarProvider>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Primary: Story = {
  args: {
    session: {
      user: {
        image: '',
        name: 'Oren Sayag',
      },
      expires: '',
    },
  },
};
