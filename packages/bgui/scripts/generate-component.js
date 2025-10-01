#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const componentName = process.argv[2];

if (!componentName) {
	console.error("Usage: pnpm --filter @braingame/bgui generate:component <ComponentName>");
	process.exit(1);
}

if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
	console.error("Component name must be in PascalCase (e.g. Button, TextField)");
	process.exit(1);
}

const componentDir = path.join(__dirname, "..", "src", "components", componentName);

if (fs.existsSync(componentDir)) {
	console.error(`Component ${componentName} already exists at ${componentDir}`);
	process.exit(1);
}

fs.mkdirSync(componentDir, { recursive: true });

const templates = new Map([
	[
		"index.ts",
		`export { ${componentName} } from './${componentName}';
export type { ${componentName}Props } from './${componentName}.types';
`,
	],
	[
		`${componentName}.types.ts`,
		`import type { ReactNode } from 'react';
import type { PressableProps } from 'react-native';

export interface ${componentName}Props extends Omit<PressableProps, 'children'> {
  children?: ReactNode;
  /**
   * Optional tone variant for the component.
   */
  tone?: 'primary' | 'neutral';
}
`,
	],
	[
		`${componentName}.tsx`,
		`import { forwardRef } from 'react';
import { Pressable, Text } from 'react-native';
import { useTheme } from '../../theme';
import type { ${componentName}Props } from './${componentName}.types';

type PressableRef = Pressable | null;

export const ${componentName} = forwardRef<PressableRef, ${componentName}Props>(
  ({ children, style, tone = 'neutral', ...rest }, ref) => {
    const theme = useTheme();
    const background = tone === 'primary' ? theme.colors.primary : theme.colors.surfaceVariant;
    const foreground = tone === 'primary' ? theme.colors.onPrimary : theme.colors.onSurface;

    return (
      <Pressable
        ref={ref}
        style={[{
          padding: theme.spacing.md,
          borderRadius: theme.radii.md,
          backgroundColor: background,
        }, style]}
        {...rest}
      >
        {typeof children === 'string' || typeof children === 'number' ? (
          <Text style={{ color: foreground }}>{children}</Text>
        ) : (
          children
        )}
      </Pressable>
    );
  },
);

${componentName}.displayName = '${componentName}';
`,
	],
	[
		`${componentName}.test.tsx`,
		`import { fireEvent } from '@testing-library/react-native';
import { renderWithTheme } from '../../test-utils/render-with-theme';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders children', () => {
    const { getByText } = renderWithTheme(<${componentName}>Hello</${componentName}>);
    expect(getByText('Hello')).toBeTruthy();
  });

  it('applies tone styling', () => {
    const { getByTestId } = renderWithTheme(
      <${componentName} testID="component" tone="primary">
        Toned
      </${componentName}>,
    );

    const styleArray = getByTestId('component').props.style;
    const resolvedStyle = Array.isArray(styleArray) ? styleArray[0] : styleArray;
    expect(resolvedStyle?.backgroundColor).toBeDefined();
  });

  it('forwards press handlers', () => {
    const onPress = jest.fn();
    const { getByTestId } = renderWithTheme(
      <${componentName} testID="component" onPress={onPress}>
        Tap me
      </${componentName}>,
    );

    fireEvent.press(getByTestId('component'));
    expect(onPress).toHaveBeenCalled();
  });
});
`,
	],
	[
		`${componentName}.stories.tsx`,
		`import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta = {
  title: 'Components/${componentName}',
  component: ${componentName},
  args: {
    children: '${componentName} content',
  },
} satisfies Meta<typeof ${componentName}>;

export default meta;

type Story = StoryObj<typeof ${componentName}>;

export const Playground: Story = {
  args: {},
};

export const PrimaryTone: Story = {
  args: {
    tone: 'primary',
  },
};
`,
	],
]);

for (const [fileName, contents] of templates) {
	fs.writeFileSync(path.join(componentDir, fileName), contents, "utf-8");
}

console.log(`✅ Created ${componentName} in ${componentDir}`);
