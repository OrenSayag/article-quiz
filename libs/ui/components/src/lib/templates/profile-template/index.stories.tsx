import { Meta, StoryObj } from '@storybook/react';
import { ProfileTemplate } from '.';

const meta: Meta<typeof ProfileTemplate> = {
  component: ProfileTemplate,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof ProfileTemplate>;

export const Primary: Story = {
  args: {
    session: {
      user: {
        name: 'Oren Sayag',
        image:
          'hps://lh3.googleusercontent.com/a/ACg8ocKLUK4bG9SF5QUa_8IOQAM0dqKX8NC9DbMqDheFR2FS0DtZR1nD=s96-c',
      },
      expires: '',
    },
  },
};
