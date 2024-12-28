import { Meta, StoryObj } from '@storybook/react';
import { LoggingInTemplate } from '.';

const meta: Meta<typeof LoggingInTemplate> = {
  component: LoggingInTemplate,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof LoggingInTemplate>;

export const Primary: Story = {
  args: {},
};
