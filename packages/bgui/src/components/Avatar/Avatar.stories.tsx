import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: 'Avatars are used to represent people or entities. They can display an image, initials, or an icon.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['plain', 'outlined', 'soft', 'solid'],
      defaultValue: 'soft',
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
    src: {
      control: 'text',
    },
    alt: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'JD',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'User profile',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar variant="plain">P</Avatar>
      <Avatar variant="outlined">O</Avatar>
      <Avatar variant="soft">S</Avatar>
      <Avatar variant="solid">S</Avatar>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar color="primary">P</Avatar>
      <Avatar color="neutral">N</Avatar>
      <Avatar color="danger">D</Avatar>
      <Avatar color="success">S</Avatar>
      <Avatar color="warning">W</Avatar>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar size="sm">S</Avatar>
      <Avatar size="md">M</Avatar>
      <Avatar size="lg">L</Avatar>
    </div>
  ),
};

export const Initials: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar>A</Avatar>
      <Avatar>AB</Avatar>
      <Avatar>ABC</Avatar>
      <Avatar>JD</Avatar>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar>👤</Avatar>
      <Avatar>🏢</Avatar>
      <Avatar>🌟</Avatar>
      <Avatar>💼</Avatar>
    </div>
  ),
};

export const Clickable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar onClick={() => alert('Avatar clicked!')}>JD</Avatar>
      <Avatar onClick={() => alert('Another click!')} variant="outlined">AB</Avatar>
      <Avatar onClick={() => alert('Solid click!')} variant="solid">CD</Avatar>
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
            <h3 style={{ marginBottom: 16 }}>{variant.charAt(0).toUpperCase() + variant.slice(1)}</h3>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              {colors.map(color => (
                <Avatar key={`${variant}-${color}`} variant={variant} color={color}>
                  {color.charAt(0).toUpperCase()}
                </Avatar>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const WithImageFallback: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar 
        src="https://example.com/nonexistent.jpg" 
        alt="User"
      >
        JD
      </Avatar>
      <Avatar 
        src="https://example.com/broken-image.jpg" 
        alt="User"
        variant="outlined"
      >
        AB
      </Avatar>
    </div>
  ),
};

export const UserList: Story = {
  render: () => {
    const users = [
      { name: 'John Doe', initials: 'JD', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
      { name: 'Jane Smith', initials: 'JS', image: 'https://images.unsplash.com/photo-1494790108755-2616b811b24c?w=150&h=150&fit=crop&crop=face' },
      { name: 'Bob Johnson', initials: 'BJ', image: null },
      { name: 'Alice Brown', initials: 'AB', image: null },
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {users.map(user => (
          <div key={user.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar 
              src={user.image || undefined}
              alt={user.name}
              onClick={() => alert(`Clicked on ${user.name}`)}
            >
              {user.initials}
            </Avatar>
            <div>
              <div style={{ fontWeight: 'bold' }}>{user.name}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {user.image ? 'Has profile image' : 'Using initials'}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const AvatarGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar style={{ marginRight: -8, zIndex: 4 }}>JD</Avatar>
      <Avatar style={{ marginRight: -8, zIndex: 3 }} variant="outlined">AB</Avatar>
      <Avatar style={{ marginRight: -8, zIndex: 2 }} color="success">CD</Avatar>
      <Avatar style={{ zIndex: 1 }} color="warning">+3</Avatar>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div>
      <h3>Small (32px)</h3>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
        <Avatar size="sm">S</Avatar>
        <Avatar size="sm" variant="outlined">S</Avatar>
        <Avatar size="sm" variant="solid">S</Avatar>
        <Avatar size="sm" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="User" />
      </div>
      
      <h3>Medium (40px)</h3>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
        <Avatar size="md">M</Avatar>
        <Avatar size="md" variant="outlined">M</Avatar>
        <Avatar size="md" variant="solid">M</Avatar>
        <Avatar size="md" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="User" />
      </div>
      
      <h3>Large (48px)</h3>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Avatar size="lg">L</Avatar>
        <Avatar size="lg" variant="outlined">L</Avatar>
        <Avatar size="lg" variant="solid">L</Avatar>
        <Avatar size="lg" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="User" />
      </div>
    </div>
  ),
};