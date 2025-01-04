import { Meta, StoryObj } from '@storybook/react';
import { LoginFromExtensionSuccessfulModal } from '.';

const meta: Meta<typeof LoginFromExtensionSuccessfulModal> = {
  component: LoginFromExtensionSuccessfulModal,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof LoginFromExtensionSuccessfulModal>;

export const Primary: Story = {
  args: {
    onClose() {
      alert('close');
    },
  },
};
