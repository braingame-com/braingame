#!/usr/bin/env node
/**
 * Documentation Generator - Creates quick documentation snippets
 * 
 * Generates:
 * - Component API documentation
 * - README updates
 * - Quick reference guides
 */

const fs = require("node:fs");
const path = require("node:path");

const [, , command, componentName] = process.argv;

const commands = {
	"component-api": "Generate API documentation for a component",
	"readme-section": "Generate README section for a component",
	"quick-ref": "Generate quick reference guide",
	help: "Show this help message",
};

if (!command || command === "help") {
	console.log("📚 Documentation Generator\n");
	console.log("Available commands:");
	for (const [cmd, desc] of Object.entries(commands)) {
		console.log(`  ${cmd.padEnd(15)} ${desc}`);
	}
	console.log("\nUsage: node scripts/doc-generator.js <command> [component]");
	process.exit(0);
}

const rootDir = path.resolve(__dirname, "..");

switch (command) {
	case "component-api":
		generateComponentAPI(componentName);
		break;
	case "readme-section":
		generateReadmeSection(componentName);
		break;
	case "quick-ref":
		generateQuickRef();
		break;
	default:
		console.error(`Unknown command: ${command}`);
		process.exit(1);
}

function generateComponentAPI(name) {
	if (!name) {
		console.error("Component name required");
		process.exit(1);
	}

	const componentDir = path.join(rootDir, "packages/bgui/src/components", name);
	if (!fs.existsSync(componentDir)) {
		console.error(`Component ${name} not found`);
		process.exit(1);
	}

	// Read types file to extract props
	const typesFile = path.join(componentDir, "types.ts");
	let propsInterface = "";
	
	if (fs.existsSync(typesFile)) {
		const content = fs.readFileSync(typesFile, "utf8");
		const interfaceMatch = content.match(/export interface \w+Props \{([\s\S]*?)\}/);
		if (interfaceMatch) {
			propsInterface = interfaceMatch[1];
		}
	}

	console.log(`# ${name} Component API\n`);
	console.log(`## Props\n`);
	
	if (propsInterface) {
		// Parse props from interface
		const props = propsInterface
			.split('\n')
			.map(line => line.trim())
			.filter(line => line && !line.startsWith('/**') && !line.startsWith('*'))
			.filter(line => line.includes(':'));

		console.log("| Prop | Type | Default | Description |");
		console.log("|------|------|---------|-------------|");
		
		for (const prop of props) {
			const match = prop.match(/(\w+)(\?)?:\s*([^;]+);?/);
			if (match) {
				const [, propName, optional, propType] = match;
				const isOptional = optional === '?';
				const cleanType = propType.replace(/\s+/g, ' ').trim();
				
				console.log(`| \`${propName}\` | \`${cleanType}\` | ${isOptional ? 'undefined' : 'required'} | Description needed |`);
			}
		}
	} else {
		console.log("No props interface found");
	}

	console.log(`\n## Usage\n`);
	console.log("```tsx");
	console.log(`import { ${name} } from "@braingame/bgui";`);
	console.log("");
	console.log(`<${name}>`);
	console.log("  Content goes here");
	console.log(`</${name}>`);
	console.log("```");

	console.log(`\n## Examples\n`);
	console.log("### Basic Usage");
	console.log("```tsx");
	console.log(`<${name}>`);
	console.log("  Basic example");
	console.log(`</${name}>`);
	console.log("```");
}

function generateReadmeSection(name) {
	if (!name) {
		console.error("Component name required");
		process.exit(1);
	}

	console.log(`## ${name}\n`);
	console.log(`The ${name} component provides [describe functionality].\n`);
	console.log("### Features\n");
	console.log("- Feature 1");
	console.log("- Feature 2");
	console.log("- Feature 3\n");
	console.log("### Quick Example\n");
	console.log("```tsx");
	console.log(`import { ${name} } from "@braingame/bgui";`);
	console.log("");
	console.log(`function MyComponent() {`);
	console.log(`  return (`);
	console.log(`    <${name}>`);
	console.log("      Example content");
	console.log(`    </${name}>`);
	console.log("  );");
	console.log("}");
	console.log("```\n");
	console.log(`[View full API documentation →](./docs/components/${name}.md)\n`);
}

function generateQuickRef() {
	console.log("# Brain Game Development Quick Reference\n");
	
	console.log("## 🛠️ Development Commands\n");
	console.log("```bash");
	console.log("# Create new component");
	console.log("pnpm bgui:scaffold MyComponent");
	console.log("");
	console.log("# Create simple component");
	console.log("pnpm bgui:scaffold MyComponent --simple");
	console.log("");
	console.log("# Create custom hook");
	console.log("pnpm bgui:scaffold useMyHook --hook");
	console.log("");
	console.log("# Development tools");
	console.log("pnpm dev:stats        # Project statistics");
	console.log("pnpm dev:analyze      # Component analysis");
	console.log("pnpm dev:deps         # Dependency health");
	console.log("");
	console.log("# Workspace tools");
	console.log("pnpm workspace list   # List all packages");
	console.log("pnpm workspace run bgui test  # Run tests in bgui");
	console.log("```\n");

	console.log("## 📦 Package Structure\n");
	console.log("```");
	console.log("packages/bgui/src/");
	console.log("├── components/       # All UI components");
	console.log("│   ├── Button/");
	console.log("│   │   ├── Button.tsx");
	console.log("│   │   ├── types.ts");
	console.log("│   │   ├── styles.ts");
	console.log("│   │   ├── Button.test.tsx");
	console.log("│   │   └── Button.stories.tsx");
	console.log("├── hooks/           # Custom React hooks");
	console.log("├── utils/           # Utility functions");
	console.log("└── constants/       # Shared constants");
	console.log("```\n");

	console.log("## 🧪 Testing\n");
	console.log("```bash");
	console.log("pnpm test            # Run all tests");
	console.log("pnpm test:watch      # Watch mode");
	console.log("pnpm test:coverage   # With coverage");
	console.log("```\n");

	console.log("## 🎨 Storybook\n");
	console.log("```bash");
	console.log("pnpm storybook       # Start Storybook");
	console.log("```\n");

	console.log("## 🔧 Quality Checks\n");
	console.log("```bash");
	console.log("pnpm lint            # ESLint + Biome");
	console.log("pnpm typecheck       # TypeScript");
	console.log("pnpm format          # Auto-format");
	console.log("pnpm quality         # All quality checks");
	console.log("```");
}