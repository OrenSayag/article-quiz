import { Meta, StoryObj } from '@storybook/react';
import { H2 } from '.';

const meta: Meta<typeof H2> = {
  component: H2,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof H2>;

export const Primary: Story = {
  args: {
    children: 'H2 Content',
  },
};
