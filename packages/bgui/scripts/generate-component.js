#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const componentName = process.argv[2];

if (!componentName) {
	console.error("Please provide a component name");
	console.error("Usage: node scripts/generate-component.js ComponentName");
	process.exit(1);
}

// Ensure proper casing
const properName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

const componentsDir = path.join(__dirname, "..", "src", "components", properName);

// Check if component already exists
if (fs.existsSync(componentsDir)) {
	console.error(`Component ${properName} already exists!`);
	process.exit(1);
}

// Create component directory
fs.mkdirSync(componentsDir, { recursive: true });

// Component templates with the new naming convention
const templates = {
	"index.ts": `export { ${properName} } from './${properName}';
export type { ${properName}Props } from './${properName}Props';
`,

	[`${properName}Props.ts`]: `import type { ReactNode, CSSProperties } from 'react';

/**
 * Shared props interface for ${properName} component
 * 
 * TODO: Add description of what ${properName} is used for
 */
export interface ${properName}Props {
  /**
   * The content of the component
   */
  children?: ReactNode;
  
  /**
   * The color of the component.
   * @default 'primary'
   */
  color?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
  
  /**
   * The variant to use.
   * @default 'solid'
   */
  variant?: 'plain' | 'outlined' | 'soft' | 'solid';
  
  /**
   * The size of the component.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * If true, the component is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Click handler
   */
  onClick?: (event: any) => void;
  
  /**
   * Additional styles
   */
  style?: CSSProperties | any;
  
  /**
   * Test ID for testing
   */
  testID?: string;
  
  /**
   * Accessibility label
   */
  'aria-label'?: string;
}
`,

	[`${properName}.tsx`]: `// This file enables platform-specific imports
// Metro bundler will automatically pick .native.tsx for React Native
// and .web.tsx for web builds

export { ${properName} } from './${properName}.native';
export type { ${properName}Props } from './${properName}Props';
`,

	[`${properName}.web.tsx`]: `'use client';
// TODO: Copy the implementation from web-bgui/${properName}/${properName}.tsx
// and adapt imports to work with our structure
// Remember: web-bgui is temporary and will be deleted once all components are migrated

import type { ${properName}Props } from './${properName}Props';

/**
 * Web implementation of ${properName}
 * 
 * TODO: Copy implementation from web-bgui/${properName}/${properName}.tsx
 * - Update imports to use relative paths
 * - Ensure it works with our shared ${properName}Props interface
 * - The Joy UI implementation is the source of truth for visual design
 */
export const ${properName}: React.FC<${properName}Props> = (props) => {
  // TODO: Copy Joy UI implementation here
  return <div>TODO: Copy from web-bgui/${properName}</div>;
};
`,

	[`${properName}.native.tsx`]: `import React from 'react';
import { Pressable, Text } from 'react-native';
import { createBox, createText, useTheme } from '@shopify/restyle';
import type { Theme } from '../../theme/theme';
import type { ${properName}Props } from './${properName}Props';

const Box = createBox<Theme>();
const ThemedText = createText<Theme>();

/**
 * Native implementation of ${properName} using Shopify Restyle
 * 
 * TODO: Implement by replicating the behavioral logic from Joy UI's use${properName} hook
 * Focus on accessibility, state management, and event handling
 */
export function ${properName}({
  children,
  color = 'neutral',
  variant = 'solid',
  size = 'md',
  disabled = false,
  onClick,
  'aria-label': ariaLabel,
}: ${properName}Props) {
  const theme = useTheme<Theme>();
  
  // TODO: Extract behavioral logic from web-bgui/${properName}/use${properName} hook
  // TODO: Implement variant styles based on theme.components.BGUI_${properName}
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
`,

	[`${properName}.stories.tsx`]: `import type { Meta, StoryObj } from '@storybook/react';
import { ${properName} } from './${properName}';

const meta = {
  title: 'Components/${properName}',
  component: ${properName},
  parameters: {
    docs: {
      description: {
        component: 'A ${properName} component that works across web and native platforms.',
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
  },
} satisfies Meta<typeof ${properName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '${properName}',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <${properName} variant="solid">Solid</${properName}>
      <${properName} variant="soft">Soft</${properName}>
      <${properName} variant="outlined">Outlined</${properName}>
      <${properName} variant="plain">Plain</${properName}>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <${properName} size="sm">Small</${properName}>
      <${properName} size="md">Medium</${properName}>
      <${properName} size="lg">Large</${properName}>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <${properName} color="primary">Primary</${properName}>
      <${properName} color="neutral">Neutral</${properName}>
      <${properName} color="danger">Danger</${properName}>
      <${properName} color="success">Success</${properName}>
      <${properName} color="warning">Warning</${properName}>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Disabled ${properName}',
    disabled: true,
  },
};
`,

	[`${properName}.test.tsx`]: `import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ${properName} } from './${properName}.native';

describe('${properName}', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <${properName}>Test ${properName}</${properName}>
    );
    
    expect(getByText('Test ${properName}')).toBeTruthy();
  });
  
  it('handles click events', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <${properName} onClick={handleClick}>Click me</${properName}>
    );
    
    fireEvent.press(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('respects disabled state', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <${properName} disabled onClick={handleClick}>
        Disabled ${properName}
      </${properName}>
    );
    
    fireEvent.press(getByText('Disabled ${properName}'));
    expect(handleClick).not.toHaveBeenCalled();
  });
  
  it('applies accessibility props', () => {
    const { getByLabelText } = render(
      <${properName} aria-label="Custom label">Content</${properName}>
    );
    
    expect(getByLabelText('Custom label')).toBeTruthy();
  });
});
`,
};

// Create all files
Object.entries(templates).forEach(([filename, content]) => {
	const filePath = path.join(componentsDir, filename);
	fs.writeFileSync(filePath, content);
	console.log(`Created: ${filePath}`);
});

// Update src/index.ts to export the new component
const indexPath = path.join(__dirname, "..", "src", "index.ts");
let indexContent = fs.readFileSync(indexPath, "utf8");

// Find the last component export
const lastExportMatch = indexContent.match(/export type { \w+Props } from '\.\/components\/\w+';/g);
const lastExport = lastExportMatch ? lastExportMatch[lastExportMatch.length - 1] : null;

if (lastExport) {
	// Add new exports after the last component export
	const newExports = `\nexport { ${properName} } from './components/${properName}';\nexport type { ${properName}Props } from './components/${properName}';`;
	indexContent = indexContent.replace(lastExport, lastExport + newExports);

	fs.writeFileSync(indexPath, indexContent);
	console.log(`Updated: ${indexPath}`);
}

console.log(`\n✅ Component ${properName} generated successfully!`);
console.log("\n📝 Next steps:");
console.log(`1. Copy the Joy UI implementation from web-bgui/${properName}`);
console.log("2. Implement the native version with Restyle");
console.log("3. Add theme variants to theme.ts");
console.log("4. Run tests and verify Storybook stories");
