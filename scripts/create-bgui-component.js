#!/usr/bin/env node
/**
 * CLI to scaffold a new BGUI component following the Platform Adapter Pattern
 * 
 * Creates the following structure:
 * packages/bgui/src/components/Button/
 * ├── Button.native.tsx     // Native implementation using Restyle
 * ├── Button.web.tsx        // Web implementation (copy from Joy UI)
 * ├── ButtonProps.ts        // Shared props interface
 * ├── Button.test.tsx       // Component tests
 * ├── Button.stories.tsx    // Storybook documentation
 * └── index.ts              // Universal export
 */

const fs = require('fs');
const path = require('path');

// Simple console utilities
const error = (msg) => console.error(`❌ ${msg}`);
const success = (msg) => console.log(`✅ ${msg}`);
const info = (msg) => console.log(`📝 ${msg}`);

const [,, componentName] = process.argv;

if (!componentName) {
  error('Usage: node scripts/create-bgui-component.js <ComponentName>');
  console.log('Example: node scripts/create-bgui-component.js Button');
  process.exit(1);
}

// Validate component name
if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
  error('Component name must be in PascalCase (e.g., Button, TextField)');
  process.exit(1);
}

const rootDir = path.resolve(__dirname, '..');
const componentDir = path.join(rootDir, 'packages', 'bgui', 'src', 'components', componentName);

// Check if component already exists
if (fs.existsSync(componentDir)) {
  error(`Component ${componentName} already exists at ${componentDir}`);
  process.exit(1);
}

// Create component directory
fs.mkdirSync(componentDir, { recursive: true });

// File templates
const templates = {
  // Shared props interface
  'ButtonProps.ts': `import type { ColorPaletteProp, VariantProp } from '../../web-bgui/styles/types';

/**
 * Shared props interface for ${componentName} component
 * This ensures API consistency between web and native implementations
 */
export interface ${componentName}Props {
  /**
   * The content of the ${componentName}
   */
  children?: React.ReactNode;
  
  /**
   * The color palette to use
   * @default 'neutral'
   */
  color?: ColorPaletteProp;
  
  /**
   * The variant to use
   * @default 'solid'
   */
  variant?: VariantProp;
  
  /**
   * The size of the ${componentName}
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * If true, the ${componentName} will be disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * If true, the ${componentName} will take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Click handler
   */
  onClick?: () => void;
  
  /**
   * Accessibility label
   */
  'aria-label'?: string;
}
`.replace(/Button/g, componentName),

  // Web implementation (will be copied from Joy UI)
  'Button.web.tsx': `'use client';
// TODO: Copy the implementation from web-bgui/${componentName}/${componentName}.tsx
// and adapt imports to work with our structure
// Remember: web-bgui is temporary and will be deleted once all components are migrated

import type { ${componentName}Props } from './${componentName}Props';

/**
 * Web implementation of ${componentName}
 * 
 * TODO: Copy implementation from web-bgui/${componentName}/${componentName}.tsx
 * - Update imports to use relative paths
 * - Ensure it works with our shared ${componentName}Props interface
 * - The Joy UI implementation is the source of truth for visual design
 */
export const ${componentName}: React.FC<${componentName}Props> = (props) => {
  // TODO: Copy Joy UI implementation here
  return <div>TODO: Copy from web-bgui/${componentName}</div>;
};
`.replace(/Button/g, componentName),

  // Native implementation stub
  'Button.native.tsx': `import React from 'react';
import { Pressable, Text } from 'react-native';
import { createBox, createText, useTheme } from '@shopify/restyle';
import type { Theme } from '../../theme/theme';
import type { ${componentName}Props } from './${componentName}Props';

const Box = createBox<Theme>();
const ThemedText = createText<Theme>();

/**
 * Native implementation of ${componentName} using Shopify Restyle
 * 
 * TODO: Implement by replicating the behavioral logic from Joy UI's use${componentName} hook
 * Focus on accessibility, state management, and event handling
 */
export function ${componentName}({
  children,
  color = 'neutral',
  variant = 'solid',
  size = 'md',
  disabled = false,
  fullWidth = false,
  onClick,
  'aria-label': ariaLabel,
}: ${componentName}Props) {
  const theme = useTheme<Theme>();
  
  // TODO: Extract behavioral logic from web-bgui/${componentName}/use${componentName} hook
  // TODO: Implement variant styles based on theme.components.BGUI_${componentName}
  // TODO: Implement size variants
  // TODO: Implement color palette support
  
  return (
    <Pressable
      onPress={disabled ? undefined : onClick}
      disabled={disabled}
      accessible
      accessibilityLabel={ariaLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={{ width: fullWidth ? '100%' : 'auto' }}
    >
      <Box
        backgroundColor="primary"
        padding="m"
        borderRadius="m"
        opacity={disabled ? 0.5 : 1}
      >
        <ThemedText variant="button" color="onPrimary">
          {children}
        </ThemedText>
      </Box>
    </Pressable>
  );
}
`.replace(/Button/g, componentName),

  // Universal index file
  'index.ts': `// Platform-specific exports handled by Metro bundler
export { ${componentName} } from './${componentName}';
export type { ${componentName}Props } from './${componentName}Props';
`.replace(/Button/g, componentName),

  // Test file stub
  'Button.test.tsx': `import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ${componentName} } from './${componentName}.native';

describe('${componentName}', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <${componentName}>Test ${componentName}</${componentName}>
    );
    
    expect(getByText('Test ${componentName}')).toBeTruthy();
  });
  
  it('handles click events', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <${componentName} onClick={handleClick}>Click me</${componentName}>
    );
    
    fireEvent.press(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('respects disabled state', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <${componentName} disabled onClick={handleClick}>
        Disabled ${componentName}
      </${componentName}>
    );
    
    fireEvent.press(getByText('Disabled ${componentName}'));
    expect(handleClick).not.toHaveBeenCalled();
  });
  
  it('applies accessibility props', () => {
    const { getByLabelText } = render(
      <${componentName} aria-label="Custom label">Content</${componentName}>
    );
    
    expect(getByLabelText('Custom label')).toBeTruthy();
  });
});
`.replace(/Button/g, componentName),

  // Storybook file stub
  'Button.stories.tsx': `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta = {
  title: 'Components/${componentName}',
  component: ${componentName},
  parameters: {
    docs: {
      description: {
        component: 'A ${componentName} component that works across web and native platforms.',
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
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '${componentName}',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <${componentName} variant="solid">Solid</${componentName}>
      <${componentName} variant="soft">Soft</${componentName}>
      <${componentName} variant="outlined">Outlined</${componentName}>
      <${componentName} variant="plain">Plain</${componentName}>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <${componentName} size="sm">Small</${componentName}>
      <${componentName} size="md">Medium</${componentName}>
      <${componentName} size="lg">Large</${componentName}>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <${componentName} color="primary">Primary</${componentName}>
      <${componentName} color="neutral">Neutral</${componentName}>
      <${componentName} color="danger">Danger</${componentName}>
      <${componentName} color="success">Success</${componentName}>
      <${componentName} color="warning">Warning</${componentName}>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Disabled ${componentName}',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width ${componentName}',
    fullWidth: true,
  },
};
`.replace(/Button/g, componentName),

  // Platform-specific component file for Metro bundler
  'Button.tsx': `// This file enables platform-specific imports
// Metro bundler will automatically pick .native.tsx for React Native
// and .web.tsx for web builds

export { ${componentName} } from './${componentName}.native';
export type { ${componentName}Props } from './${componentName}Props';
`.replace(/Button/g, componentName),
};

// Create files
Object.entries(templates).forEach(([filename, content]) => {
  const filePath = path.join(componentDir, filename.replace('Button', componentName));
  fs.writeFileSync(filePath, content, 'utf8');
  success(`Created ${filePath}`);
});

// Update package exports
const indexPath = path.join(rootDir, 'packages', 'bgui', 'src', 'index.ts');
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Find where to insert the new export
const exportMarker = '// Components';
const exportLines = indexContent.split('\n');
const insertIndex = exportLines.findIndex(line => line.includes(exportMarker));

if (insertIndex !== -1) {
  // Insert the new component export after the marker
  exportLines.splice(insertIndex + 1, 0, 
    `export { ${componentName} } from './components/${componentName}';`,
    `export type { ${componentName}Props } from './components/${componentName}';`,
    ''
  );
  
  fs.writeFileSync(indexPath, exportLines.join('\n'), 'utf8');
  success('Updated bgui package exports');
}

// Success message with next steps
console.log(`
✅ Component ${componentName} created successfully!

📝 Next steps:
📝 1. Copy the implementation from web-bgui/${componentName} into ${componentName}.web.tsx
📝 2. Update imports in the web implementation to use relative paths
📝 3. Implement the native version by studying web-bgui/${componentName}/use${componentName} hook
📝 4. Map Joy UI behavioral logic to React Native patterns
📝 5. Implement theme variants in native version
📝 6. Run tests: pnpm test
📝 7. Add to Storybook: pnpm storybook

📝 Remember: 
📝 - The web-bgui folder is temporary and will be deleted after migration
📝 - Copy the Joy UI code, don't re-export it
📝 - The web implementation is the source of truth for visual design!
`);