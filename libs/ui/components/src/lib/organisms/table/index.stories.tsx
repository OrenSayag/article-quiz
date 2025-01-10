import { Meta, StoryObj } from '@storybook/react';
import { Table } from '.';

const meta: Meta<typeof Table> = {
  component: Table,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Primary: Story = {
  args: {
    caption: 'History',
    heads: [
      {
        id: 'number',
        content: '#',
      },
      {
        id: 'description',
        content: 'Description',
      },
      {
        id: 'price',
        content: 'Price',
      },
      {
        id: 'date',
        content: 'Date',
      },
    ],
    rows: [
      {
        id: '1',
        cells: [
          {
            id: 'number',
            content: '1',
          },
          {
            id: 'description',
            content: 'TensorFlow',
          },
          {
            id: 'price',
            content: '19.99$',
          },
          {
            id: 'date',
            content: '01/01/1990',
          },
        ],
      },
      {
        id: '2',
        cells: [
          {
            id: 'number',
            content: '2',
          },
          {
            id: 'description',
            content: 'Kubernetes',
          },
          {
            id: 'price',
            content: '29.99$',
          },
          {
            id: 'date',
            content: '01/01/1993',
          },
        ],
      },
    ],
  },
};
