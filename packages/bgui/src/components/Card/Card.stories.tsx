import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: 'Cards contain content and actions about a single subject.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['plain', 'outlined', 'soft', 'solid'],
      defaultValue: 'outlined',
    },
    color: {
      control: 'select',
      options: ['primary', 'neutral', 'danger', 'success', 'warning'],
      defaultValue: 'neutral',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      defaultValue: 'vertical',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <h3>Card Title</h3>
        <p>This is the card content with some text.</p>
      </>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Card variant="plain">
        <h4>Plain</h4>
        <p>Plain card variant</p>
      </Card>
      <Card variant="outlined">
        <h4>Outlined</h4>
        <p>Outlined card variant</p>
      </Card>
      <Card variant="soft">
        <h4>Soft</h4>
        <p>Soft card variant</p>
      </Card>
      <Card variant="solid">
        <h4>Solid</h4>
        <p>Solid card variant</p>
      </Card>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Card color="primary">
        <h4>Primary</h4>
        <p>Primary color card</p>
      </Card>
      <Card color="neutral">
        <h4>Neutral</h4>
        <p>Neutral color card</p>
      </Card>
      <Card color="danger">
        <h4>Danger</h4>
        <p>Danger color card</p>
      </Card>
      <Card color="success">
        <h4>Success</h4>
        <p>Success color card</p>
      </Card>
      <Card color="warning">
        <h4>Warning</h4>
        <p>Warning color card</p>
      </Card>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <Card size="sm">
        <h4>Small</h4>
        <p>Small card</p>
      </Card>
      <Card size="md">
        <h4>Medium</h4>
        <p>Medium card</p>
      </Card>
      <Card size="lg">
        <h4>Large</h4>
        <p>Large card</p>
      </Card>
    </div>
  ),
};

export const Orientations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card orientation="vertical">
        <h4>Vertical Card</h4>
        <p>This card has vertical orientation (default)</p>
      </Card>
      <Card orientation="horizontal">
        <h4>Horizontal Card</h4>
        <p>This card has horizontal orientation</p>
      </Card>
    </div>
  ),
};

export const Clickable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Card onClick={() => alert('Card clicked!')}>
        <h4>Clickable Card</h4>
        <p>Click me to see an alert!</p>
      </Card>
      <Card onClick={() => alert('Another click!')}>
        <h4>Another Clickable</h4>
        <p>This card is also clickable</p>
      </Card>
    </div>
  ),
};

export const AllVariantsAndColors: Story = {
  render: () => {
    const variants = ['plain', 'outlined', 'soft', 'solid'] as const;
    const colors = ['primary', 'neutral', 'danger', 'success', 'warning'] as const;
    
    return (
      <div>
        {variants.map(variant => (
          <div key={variant} style={{ marginBottom: 20 }}>
            <h3>{variant.charAt(0).toUpperCase() + variant.slice(1)}</h3>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {colors.map(color => (
                <Card key={`${variant}-${color}`} variant={variant} color={color}>
                  <h4>{color}</h4>
                  <p>Sample content</p>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const ProductCard: Story = {
  render: () => (
    <Card style={{ maxWidth: 300 }}>
      <div style={{ 
        width: '100%', 
        height: 200, 
        backgroundColor: '#f0f0f0',
        marginBottom: 16,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        📸 Image
      </div>
      <h3 style={{ margin: '0 0 8px 0' }}>Product Name</h3>
      <p style={{ margin: '0 0 16px 0', color: '#666' }}>
        A great product with amazing features that you'll love.
      </p>
      <div style={{ fontSize: 24, fontWeight: 'bold', color: '#007bff' }}>
        $99.99
      </div>
    </Card>
  ),
};

export const UserCard: Story = {
  render: () => (
    <Card orientation="horizontal" style={{ maxWidth: 400 }}>
      <div style={{ 
        width: 80, 
        height: 80, 
        backgroundColor: '#007bff',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 24,
        marginRight: 16
      }}>
        👤
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: '0 0 8px 0' }}>John Doe</h3>
        <p style={{ margin: '0 0 8px 0', color: '#666' }}>
          Senior Developer
        </p>
        <p style={{ margin: 0, fontSize: 14, color: '#999' }}>
          john.doe@company.com
        </p>
      </div>
    </Card>
  ),
};

export const InteractiveCards: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string | null>(null);
    
    return (
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {['Option 1', 'Option 2', 'Option 3'].map(option => (
          <Card
            key={option}
            onClick={() => setSelected(option)}
            variant={selected === option ? 'solid' : 'outlined'}
            color={selected === option ? 'primary' : 'neutral'}
            style={{ cursor: 'pointer' }}
          >
            <h4>{option}</h4>
            <p>Click to select</p>
          </Card>
        ))}
      </div>
    );
  },
};