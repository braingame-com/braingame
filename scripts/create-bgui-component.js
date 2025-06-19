#!/usr/bin/env node
/**
 * CLI to scaffold a new BGUI component with boilerplate files.
 */
const fs = require("node:fs");
const path = require("node:path");

const [, , rawName] = process.argv;

if (!rawName) {
	console.error("Usage: pnpm bgui:scaffold <ComponentName>");
	process.exit(1);
}

const componentName = rawName.trim();
const pascalCasePattern = /^[A-Z][A-Za-z0-9]*$/;
if (!pascalCasePattern.test(componentName)) {
	console.error("Component name must be in PascalCase, e.g. MyComponent");
	process.exit(1);
}

const rootDir = path.resolve(__dirname, "..");
const componentDir = path.join(rootDir, "packages", "bgui", componentName);

if (fs.existsSync(componentDir)) {
	console.error(`Component ${componentName} already exists at ${componentDir}`);
	process.exit(1);
}

fs.mkdirSync(componentDir, { recursive: true });

const files = {
	"index.tsx":
		`export { ${componentName} } from './${componentName}';\n` +
		`export type { ${componentName}Props } from './${componentName}';\n`,
	[`${componentName}.tsx`]: `import type { ReactNode } from 'react';\nimport { View } from 'react-native';\n\nexport interface ${componentName}Props {\n  children?: ReactNode;\n}\n\nexport const ${componentName} = ({ children }: ${componentName}Props) => {\n  return <View>{children}</View>;\n};\n`,
	[`${componentName}.test.tsx`]: `import { render } from '@testing-library/react-native';\nimport { ${componentName} } from './${componentName}';\n\ndescribe('${componentName}', () => {\n  it('renders children', () => {\n    const { getByText } = render(<${componentName}>Hello</${componentName}>);\n    expect(getByText('Hello')).toBeTruthy();\n  });\n});\n`,
	[`${componentName}.stories.tsx`]: `import type { Meta, StoryObj } from '@storybook/react';\nimport { ${componentName} } from './${componentName}';\n\nconst meta: Meta<typeof ${componentName}> = {\n  title: 'BGUI/${componentName}',\n  component: ${componentName},\n};\n\nexport default meta;\nexport const Default: StoryObj<typeof ${componentName}> = {\n  args: { children: 'Example' },\n};\n`,
	"README.md": `# ${componentName}\n\nBoilerplate for the ${componentName} component.\n`,
};

for (const [fileName, content] of Object.entries(files)) {
	fs.writeFileSync(path.join(componentDir, fileName), content, "utf8");
}

console.log(`Scaffolded ${componentName} at packages/bgui/${componentName}`);
