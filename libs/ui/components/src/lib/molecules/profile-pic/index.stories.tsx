import { Meta, StoryObj } from '@storybook/react';
import { ProfilePic } from '.';

const meta: Meta<typeof ProfilePic> = {
  component: ProfilePic,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof ProfilePic>;

export const Primary: Story = {
  args: {
    url: 'https://lh3.googleusercontent.com/a/ACg8ocKLUK4bG9SF5QUa_8IOQAM0dqKX8NC9DbMqDheFR2FS0DtZR1nD=s96-c',
    name: 'oren sayag',
  },
};
