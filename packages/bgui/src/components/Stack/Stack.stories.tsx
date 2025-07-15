import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack.web';
import { Text } from '../Text/Text.web';
import React from 'react';

const meta = {
  title: 'Components/Stack',
  component: Stack,
  parameters: {
    docs: {
      description: {
        component: 'A layout component that arranges children with consistent spacing using flexbox.',
      },
    },
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      defaultValue: 'column',
    },
    spacing: {
      control: 'select', 
      options: [0, 'xs', 'sm', 'md', 'lg', 'xl', 'xl2', 'xl3', 'xl4'],
      defaultValue: 0,
    },
    useFlexGap: {
      control: 'boolean',
      defaultValue: true,
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <div style={{ background: '#e0e0e0', padding: 16 }}>Item 1</div>
        <div style={{ background: '#e0e0e0', padding: 16 }}>Item 2</div>
        <div style={{ background: '#e0e0e0', padding: 16 }}>Item 3</div>
      </>
    ),
    spacing: 'md',
  },
};

export const Directions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div>
        <h4>Column (default)</h4>
        <Stack spacing="sm">
          <div style={{ background: '#e0e0e0', padding: 8 }}>Item 1</div>
          <div style={{ background: '#e0e0e0', padding: 8 }}>Item 2</div>
          <div style={{ background: '#e0e0e0', padding: 8 }}>Item 3</div>
        </Stack>
      </div>
      <div>
        <h4>Row</h4>
        <Stack direction="row" spacing="sm">
          <div style={{ background: '#e0e0e0', padding: 8 }}>Item 1</div>
          <div style={{ background: '#e0e0e0', padding: 8 }}>Item 2</div>
          <div style={{ background: '#e0e0e0', padding: 8 }}>Item 3</div>
        </Stack>
      </div>
    </div>
  ),
};

export const SpacingVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((spacing) => (
        <div key={spacing}>
          <h4>Spacing: {spacing}</h4>
          <Stack spacing={spacing}>
            <div style={{ background: '#e0e0e0', padding: 8 }}>Item 1</div>
            <div style={{ background: '#e0e0e0', padding: 8 }}>Item 2</div>
            <div style={{ background: '#e0e0e0', padding: 8 }}>Item 3</div>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const WithDivider: Story = {
  args: {
    children: (
      <>
        <div style={{ padding: 16 }}>Section 1</div>
        <div style={{ padding: 16 }}>Section 2</div>
        <div style={{ padding: 16 }}>Section 3</div>
      </>
    ),
    divider: <hr style={{ width: '100%', margin: 0 }} />,
    spacing: 'md',
  },
};

export const NestedStacks: Story = {
  render: () => (
    <Stack spacing="lg">
      <h3>Outer Stack (column)</h3>
      <Stack direction="row" spacing="md">
        <Stack spacing="sm">
          <div style={{ background: '#e0e0e0', padding: 8 }}>Col 1 Row 1</div>
          <div style={{ background: '#e0e0e0', padding: 8 }}>Col 1 Row 2</div>
          <div style={{ background: '#e0e0e0', padding: 8 }}>Col 1 Row 3</div>
        </Stack>
        <Stack spacing="sm">
          <div style={{ background: '#e0e0e0', padding: 8 }}>Col 2 Row 1</div>
          <div style={{ background: '#e0e0e0', padding: 8 }}>Col 2 Row 2</div>
          <div style={{ background: '#e0e0e0', padding: 8 }}>Col 2 Row 3</div>
        </Stack>
      </Stack>
    </Stack>
  ),
};
