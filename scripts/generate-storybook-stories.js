#!/usr/bin/env node

/**
 * Generate Storybook stories for all BGUI components
 */

const fs = require("node:fs");
const path = require("node:path");

const componentsDir = path.join(__dirname, "../packages/bgui/src/components");

// Template for generating stories
const generateStoryTemplate = (componentName) => {
	const hasVariants = [
		"Button",
		"Card",
		"Badge",
		"Alert",
		"Text",
		"TextInput",
		"Toast",
		"Modal",
		"Switch",
		"Checkbox",
	].includes(componentName);

	const hasSize = ["Button", "Badge", "Icon", "Avatar", "Spinner", "Text"].includes(componentName);

	const hasColor = ["Badge", "Text", "Icon", "Divider", "ProgressBar"].includes(componentName);

	return `import type { Meta, StoryObj } from "@storybook/react";
import { ${componentName} } from "./${componentName}";

const meta: Meta<typeof ${componentName}> = {
	title: "Components/${componentName}",
	component: ${componentName},
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {${
		hasVariants
			? `
		variant: {
			control: "select",
			options: [], // TODO: Add variant options
		},`
			: ""
	}${
		hasSize
			? `
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},`
			: ""
	}${
		hasColor
			? `
		color: {
			control: "color",
		},`
			: ""
	}
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		// TODO: Add default props
	},
};

// TODO: Add more story variations
`;
};

// Read all component directories
const components = fs
	.readdirSync(componentsDir)
	.filter((file) => {
		const fullPath = path.join(componentsDir, file);
		return fs.statSync(fullPath).isDirectory();
	})
	.filter((dir) => {
		// Check if component file exists
		const componentFile = path.join(componentsDir, dir, `${dir}.tsx`);
		return fs.existsSync(componentFile);
	});

console.log(`Found ${components.length} components to generate stories for.\n`);

let created = 0;
let skipped = 0;

components.forEach((componentName) => {
	const storyPath = path.join(componentsDir, componentName, `${componentName}.stories.tsx`);

	// Skip if story already exists
	if (fs.existsSync(storyPath)) {
		console.log(`⏭️  Skipping ${componentName} - story already exists`);
		skipped++;
		return;
	}

	// Generate story content
	const storyContent = generateStoryTemplate(componentName);

	// Write story file
	fs.writeFileSync(storyPath, storyContent);
	console.log(`✅ Created story for ${componentName}`);
	created++;
});

console.log(`\n📚 Summary:`);
console.log(`   Created: ${created} stories`);
console.log(`   Skipped: ${skipped} (already exist)`);
console.log(`   Total:   ${components.length} components`);

if (created > 0) {
	console.log(`\n🎯 Next steps:`);
	console.log(`   1. Review generated stories and add component-specific props`);
	console.log(`   2. Add meaningful story variations for each component`);
	console.log(`   3. Run 'pnpm storybook' to view the stories`);
}