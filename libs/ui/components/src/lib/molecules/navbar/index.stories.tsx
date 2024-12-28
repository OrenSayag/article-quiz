import { Meta, StoryObj } from '@storybook/react';
import { Navbar } from '.';

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Primary: Story = {
  args: {
    session: {
      user: {
        name: 'Oren Sayag',
        image:
          'https://lh3.googleusercontent.com/a/ACg8ocKLUK4bG9SF5QUa_8IOQAM0dqKX8NC9DbMqDheFR2FS0DtZR1nD=s96-c',
      },
      expires: '',
    },
  },
};
