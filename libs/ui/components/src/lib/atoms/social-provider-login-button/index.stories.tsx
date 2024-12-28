import { Meta, StoryObj } from '@storybook/react';
import { SocialProvider, SocialProviderLoginButton } from '.';

const meta: Meta<typeof SocialProviderLoginButton> = {
  component: SocialProviderLoginButton,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof SocialProviderLoginButton>;

export const Google: Story = {
  args: {
    socialProvider: SocialProvider.GOOGLE,
    children: 'Login with Google',
  },
};
