import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';

const meta = {
  title: 'Components/Box',
  component: Box,
  parameters: {
    docs: {
      description: {
        component: 'A Box component that works across web and native platforms.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'neutral', 'danger', 'success', 'warning'],
    },
    variant: {
      control: 'select', 
      options: ['solid', 'soft', 'outlined', 'plain'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Box',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Box variant="solid">Solid</Box>
      <Box variant="soft">Soft</Box>
      <Box variant="outlined">Outlined</Box>
      <Box variant="plain">Plain</Box>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Box size="sm">Small</Box>
      <Box size="md">Medium</Box>
      <Box size="lg">Large</Box>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Box color="primary">Primary</Box>
      <Box color="neutral">Neutral</Box>
      <Box color="danger">Danger</Box>
      <Box color="success">Success</Box>
      <Box color="warning">Warning</Box>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Box',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Box',
    fullWidth: true,
  },
};
