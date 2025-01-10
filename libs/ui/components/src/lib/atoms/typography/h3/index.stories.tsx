import { Meta, StoryObj } from '@storybook/react';
import { H3 } from '.';

const meta: Meta<typeof H3> = {
  component: H3,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof H3>;

export const Primary: Story = {
  args: {
    children: 'H3 Content',
  },
};
