import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PerformanceBaseline } from './PerformanceBaseline.web';

const meta = {
  title: 'Tests/Performance Baseline',
  component: PerformanceBaseline,
  parameters: {
    docs: {
      description: {
        component: 'Performance baseline testing for BGUI components. This measures render times for Box, Text, Stack, Divider, and Container components.',
      },
    },
  },
} satisfies Meta<typeof PerformanceBaseline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PerformanceBaseline />,
  parameters: {
    docs: {
      description: {
        story: 'Run performance tests to establish baseline render times for Tier 1 components.',
      },
    },
  },
};