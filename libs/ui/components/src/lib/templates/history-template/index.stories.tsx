import { Meta, StoryObj } from '@storybook/react';
import { HistoryTemplate } from '.';

const meta: Meta<typeof HistoryTemplate> = {
  component: HistoryTemplate,
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof HistoryTemplate>;

export const Primary: Story = {
  args: {
    totalPages: 1,
    currentPage: 1,
    history: [
      {
        quizSource:
          'https://kubernetes.io/docs/concepts/overview/working-with-objects/object-management/',
        faviconUrl:
          'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://kubernetes.io&size=16',
        createdAt: '2025-01-10T07:40:01.000Z',
      },
      {
        quizSource:
          'https://kubernetes.io/docs/concepts/overview/working-with-objects/',
        faviconUrl:
          'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://kubernetes.io&size=16',
        createdAt: '2025-01-10T07:33:25.000Z',
      },
    ],
  },
};
