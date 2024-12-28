import { Meta, StoryObj } from '@storybook/react';
import { DashboardTemplate } from '.';

const meta: Meta<typeof DashboardTemplate> = {
  component: DashboardTemplate,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof DashboardTemplate>;

export const Primary: Story = {
  args: {},
};
