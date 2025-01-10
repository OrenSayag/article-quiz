import { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './index';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const url = window.location.href;

export const Primary: Story = {
  args: {
    previousHref: url + '&page=1',
    nextHref: url + '&page=3',
    items: [
      {
        type: 'page',
        href: url + '&page=1',
        page: 1,
      },
      {
        type: 'page',
        href: url + '&page=2',
        page: 2,
        isActive: true,
      },
      {
        type: 'page',
        href: url + '&page=3',
        page: 3,
      },
      {
        type: 'ellipsis',
      },
      {
        type: 'page',
        href: url + '&page=200',
        page: 200,
      },
    ],
  },
};
