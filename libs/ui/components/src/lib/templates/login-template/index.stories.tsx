import { Meta, StoryObj } from '@storybook/react';
import { LoginTemplate, LoginType } from '.';

const meta: Meta<typeof LoginTemplate> = {
  component: LoginTemplate,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof LoginTemplate>;

export const SignIn: Story = {
  args: {
    onLogin(provider: string) {
      alert(`Not implemented - sign in with ${provider}`);
    },
    type: LoginType.SIGN_IN,
  },
};

export const SignUp: Story = {
  args: {
    onLogin(provider: string) {
      alert(`Not implemented - sign up with ${provider}`);
    },
    type: LoginType.SIGN_UP,
  },
};
