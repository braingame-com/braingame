#!/usr/bin/env node
/**
 * Enhanced CLI to scaffold a new BGUI component with enterprise-grade boilerplate.
 *
 * Features:
 * - Creates components in the correct src/components/ structure
 * - Generates comprehensive TypeScript types
 * - Includes styles, validation, and test files
 * - Follows current BGUI patterns and best practices
 * - Auto-updates package exports
 */
const fs = require("node:fs");
const path = require("node:path");

const [, , rawName, ...options] = process.argv;

if (!rawName) {
	console.error("Usage: pnpm bgui:scaffold <ComponentName> [options]");
	console.error("Options:");
	console.error("  --simple     Create a simple component without advanced features");
	console.error("  --hook       Create a custom hook instead of a component");
	console.error("  --util       Create a utility function");
	console.error("");
	console.error("Examples:");
	console.error("  pnpm bgui:scaffold MyComponent");
	console.error("  pnpm bgui:scaffold MyComponent --simple");
	console.error("  pnpm bgui:scaffold useMyHook --hook");
	process.exit(1);
}

const componentName = rawName.trim();
const isSimple = options.includes("--simple");
const isHook = options.includes("--hook");
const isUtil = options.includes("--util");

// Validation
const pascalCasePattern = /^[A-Z][A-Za-z0-9]*$/;
const hookPattern = /^use[A-Z][A-Za-z0-9]*$/;

if (isHook && !hookPattern.test(componentName)) {
	console.error("Hook name must start with 'use' and be in camelCase, e.g. useMyHook");
	process.exit(1);
}

if (!isHook && !isUtil && !pascalCasePattern.test(componentName)) {
	console.error("Component name must be in PascalCase, e.g. MyComponent");
	process.exit(1);
}

const rootDir = path.resolve(__dirname, "..");

// Determine target directory based on type
let targetDir;
if (isHook) {
	targetDir = path.join(rootDir, "packages", "bgui", "src", "hooks");
} else if (isUtil) {
	targetDir = path.join(rootDir, "packages", "bgui", "src", "utils");
} else {
	targetDir = path.join(rootDir, "packages", "bgui", "src", "components", componentName);
}

// Check if already exists
if (
	fs.existsSync(targetDir) ||
	(isHook && fs.existsSync(path.join(targetDir, `${componentName}.ts`)))
) {
	console.error(
		`${isHook ? "Hook" : isUtil ? "Utility" : "Component"} ${componentName} already exists`,
	);
	process.exit(1);
}

// Create directory for components
if (!isHook && !isUtil) {
	fs.mkdirSync(targetDir, { recursive: true });
}

// Generate files based on type
if (isHook) {
	generateHook(componentName, targetDir);
} else if (isUtil) {
	generateUtil(componentName, targetDir);
} else {
	generateComponent(componentName, targetDir, isSimple);
}

console.log(`✅ Scaffolded ${componentName} successfully!`);
console.log(`📁 Location: ${path.relative(rootDir, targetDir)}`);

if (!isHook && !isUtil) {
	console.log("");
	console.log("Next steps:");
	console.log("1. Add your component logic and styles");
	console.log("2. Run tests: pnpm test");
	console.log("3. Add to Storybook for visual testing");
}

function generateComponent(componentName, targetDir, isSimple) {
	const files = {};

	// Index file
	files["index.ts"] = `export { ${componentName} } from "./${componentName}";
export type { ${componentName}Props } from "./types";
`;

	// Types file
	files["types.ts"] = `import type { ReactNode } from "react";
import type { ViewStyle } from "react-native";

/**
 * Props for the ${componentName} component
 */
export interface ${componentName}Props {
	/**
	 * Content to render inside the ${componentName}.
	 */
	children?: ReactNode;

	/**
	 * Custom styles to apply to the ${componentName}.
	 */
	style?: ViewStyle;

	/**
	 * Whether the ${componentName} is disabled.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Size variant of the ${componentName}.
	 * @default "md"
	 */
	size?: "sm" | "md" | "lg";

	/**
	 * Accessibility label for screen readers.
	 */
	"aria-label"?: string;
}
`;

	// Main component file
	if (isSimple) {
		files[`${componentName}.tsx`] = `import type React from "react";
import { View } from "react-native";
import type { ${componentName}Props } from "./types";

/**
 * ${componentName} component for [describe the purpose].
 *
 * @example
 * \`\`\`tsx
 * <${componentName}>
 *   Content goes here
 * </${componentName}>
 * \`\`\`
 */
export const ${componentName} = ({
	children,
	style,
	disabled = false,
	"aria-label": ariaLabel,
}: ${componentName}Props) => {
	return (
		<View
			style={[
				{ opacity: disabled ? 0.6 : 1 },
				style,
			]}
			accessibilityLabel={ariaLabel}
			accessibilityRole="none"
		>
			{children}
		</View>
	);
};
`;
	} else {
		files[`${componentName}.tsx`] = `import { useThemeColor } from "@braingame/utils";
import { memo } from "react";
import { View } from "react-native";
import { useInteractiveState } from "../../hooks";
import { validateProps } from "../../utils/validation";
import { withErrorBoundary } from "../../utils/withErrorBoundary";
import { get${componentName}Styles, validationRules } from "./styles";
import type { ${componentName}Props } from "./types";

/**
 * ${componentName} component for [describe the purpose].
 *
 * @example
 * \`\`\`tsx
 * // Basic usage
 * <${componentName}>
 *   Content goes here
 * </${componentName}>
 *
 * // With custom size
 * <${componentName} size="lg">
 *   Large content
 * </${componentName}>
 *
 * // Disabled state
 * <${componentName} disabled>
 *   Disabled content
 * </${componentName}>
 * \`\`\`
 *
 * @component
 */
function ${componentName}Component({
	children,
	style,
	disabled = false,
	size = "md",
	"aria-label": ariaLabel,
}: ${componentName}Props) {
	// Validate props in development
	if (__DEV__) {
		validateProps({ size, disabled }, validationRules, "${componentName}");
	}

	const backgroundColor = useThemeColor("background");
	const { isHovered, handleHoverIn, handleHoverOut } = useInteractiveState();
	
	const componentStyles = get${componentName}Styles({
		size,
		disabled,
		isHovered,
		backgroundColor,
	});

	return (
		<View
			style={[componentStyles.container, style]}
			accessibilityLabel={ariaLabel}
			accessibilityRole="none"
			accessibilityState={{ disabled }}
			onMouseEnter={handleHoverIn}
			onMouseLeave={handleHoverOut}
		>
			{children}
		</View>
	);
}

export const ${componentName} = withErrorBoundary(memo(${componentName}Component), "${componentName}");
`;

		// Styles file for complex components
		files["styles.ts"] = `import { Tokens } from "@braingame/utils";
import { validators } from "../../utils/validation";
import type { ${componentName}Props } from "./types";

/**
 * Size configuration for ${componentName}
 */
const SIZE_CONFIG = {
	sm: { padding: Tokens.xs, minHeight: 32 },
	md: { padding: Tokens.s, minHeight: 40 },
	lg: { padding: Tokens.m, minHeight: 48 },
} as const;

/**
 * Generate styles for ${componentName} based on props
 */
export function get${componentName}Styles({
	size,
	disabled,
	isHovered,
	backgroundColor,
}: {
	size: NonNullable<${componentName}Props["size"]>;
	disabled: boolean;
	isHovered: boolean;
	backgroundColor: string;
}) {
	const sizeConfig = SIZE_CONFIG[size];
	
	return {
		container: {
			backgroundColor,
			padding: sizeConfig.padding,
			minHeight: sizeConfig.minHeight,
			borderRadius: Tokens.xs,
			opacity: disabled ? 0.6 : isHovered ? 0.8 : 1,
		},
	};
}

/**
 * Validation rules for ${componentName} props
 */
export const validationRules = {
	size: validators.oneOf(["sm", "md", "lg"]),
	disabled: validators.boolean,
};
`;
	}

	// Test file
	files[`${componentName}.test.tsx`] = `import React from "react";
import { render, screen } from "../../test-utils";
import { ${componentName} } from "./${componentName}";

describe("${componentName}", () => {
	it("renders children correctly", () => {
		render(
			<${componentName}>
				Test content
			</${componentName}>
		);
		
		expect(screen.getByText("Test content")).toBeTruthy();
	});

	it("applies custom styles", () => {
		const customStyle = { backgroundColor: "red" };
		
		render(
			<${componentName} style={customStyle}>
				Content
			</${componentName}>
		);
		
		const component = screen.getByText("Content").parent;
		expect(component).toHaveStyle(customStyle);
	});

	it("handles disabled state", () => {
		render(
			<${componentName} disabled aria-label="Disabled component">
				Disabled content
			</${componentName}>
		);
		
		const component = screen.getByLabelText("Disabled component");
		expect(component).toHaveAccessibilityState({ disabled: true });
	});

	it("supports different sizes", () => {
		const { rerender } = render(
			<${componentName} size="sm">
				Small
			</${componentName}>
		);
		
		const smallComponent = screen.getByText("Small").parent;
		expect(smallComponent).toBeTruthy();
		
		rerender(
			<${componentName} size="lg">
				Large
			</${componentName}>
		);
		
		const largeComponent = screen.getByText("Large").parent;
		expect(largeComponent).toBeTruthy();
	});

	it("provides accessibility support", () => {
		render(
			<${componentName} aria-label="Accessible ${componentName.toLowerCase()}">
				Content
			</${componentName}>
		);
		
		expect(screen.getByLabelText("Accessible ${componentName.toLowerCase()}")).toBeTruthy();
	});
});
`;

	// Storybook file
	files[`${componentName}.stories.tsx`] = `import type { Meta, StoryObj } from "@storybook/react";
import { ${componentName} } from "./${componentName}";

const meta: Meta<typeof ${componentName}> = {
	title: "BGUI/Components/${componentName}",
	component: ${componentName},
	parameters: {
		docs: {
			description: {
				component: "${componentName} component for [describe the purpose].",
			},
		},
	},
	argTypes: {
		size: {
			control: { type: "select" },
			options: ["sm", "md", "lg"],
		},
		disabled: {
			control: { type: "boolean" },
		},
	},
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
	args: {
		children: "Default ${componentName}",
	},
};

export const AllSizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
			<${componentName} size="sm">Small</${componentName}>
			<${componentName} size="md">Medium</${componentName}>
			<${componentName} size="lg">Large</${componentName}>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled ${componentName}",
		disabled: true,
	},
};

export const WithCustomStyles: Story = {
	args: {
		children: "Custom styled ${componentName}",
		style: {
			backgroundColor: "#f0f0f0",
			borderWidth: 2,
			borderColor: "#ccc",
		},
	},
};
`;

	// Write all files
	for (const [fileName, content] of Object.entries(files)) {
		fs.writeFileSync(path.join(targetDir, fileName), content, "utf8");
	}

	// Update package exports
	updatePackageExports(componentName);
}

function generateHook(hookName, targetDir) {
	const filePath = path.join(targetDir, `${hookName}.ts`);

	const content = `import { useCallback, useState } from "react";

/**
 * Custom hook for [describe the purpose].
 *
 * @example
 * \`\`\`tsx
 * function MyComponent() {
 *   const { value, setValue, reset } = ${hookName}("initial");
 *   
 *   return (
 *     <div>
 *       <span>{value}</span>
 *       <button onClick={() => setValue("new value")}>Update</button>
 *       <button onClick={reset}>Reset</button>
 *     </div>
 *   );
 * }
 * \`\`\`
 */
export function ${hookName}<T>(initialValue: T) {
	const [value, setValue] = useState<T>(initialValue);

	const reset = useCallback(() => {
		setValue(initialValue);
	}, [initialValue]);

	return {
		value,
		setValue,
		reset,
	};
}
`;

	fs.writeFileSync(filePath, content, "utf8");

	// Update hooks index
	updateHooksIndex(hookName);
}

function generateUtil(utilName, targetDir) {
	const filePath = path.join(targetDir, `${utilName}.ts`);

	const content = `/**
 * Utility function for [describe the purpose].
 *
 * @param input - The input parameter
 * @returns The processed result
 *
 * @example
 * \`\`\`ts
 * const result = ${utilName}("input");
 * console.log(result); // processed output
 * \`\`\`
 */
export function ${utilName}(input: string): string {
	// TODO: Implement your utility logic here
	return input.toLowerCase().trim();
}

/**
 * Type guard helper for ${utilName}
 */
export function is${utilName}Valid(input: unknown): input is string {
	return typeof input === "string" && input.length > 0;
}
`;

	fs.writeFileSync(filePath, content, "utf8");
}

function updatePackageExports(componentName) {
	const indexPath = path.join(__dirname, "..", "packages", "bgui", "index.ts");

	try {
		let content = fs.readFileSync(indexPath, "utf8");

		// Find the right place to insert the export (after other component exports)
		const exportPattern = /export \{ \w+ \} from "\.\/src\/components\/\w+";/g;
		const matches = [...content.matchAll(exportPattern)];

		if (matches.length > 0) {
			// Insert after the last component export
			const lastMatch = matches[matches.length - 1];
			const insertIndex = lastMatch.index + lastMatch[0].length;

			const newExport = `\nexport { ${componentName} } from "./src/components/${componentName}";`;
			content = content.slice(0, insertIndex) + newExport + content.slice(insertIndex);
		} else {
			// Fallback: add at the end of component exports section
			const componentSectionStart = content.indexOf("// All Components from src/components");
			if (componentSectionStart !== -1) {
				const newExport = `export { ${componentName} } from "./src/components/${componentName}";\n`;
				const insertIndex = content.indexOf("\n", componentSectionStart) + 1;
				content = content.slice(0, insertIndex) + newExport + content.slice(insertIndex);
			}
		}

		// Add type export
		const typePattern = /export type \{ \w+Props \} from "\.\/src\/components\/\w+\/types";/g;
		const typeMatches = [...content.matchAll(typePattern)];

		if (typeMatches.length > 0) {
			const lastTypeMatch = typeMatches[typeMatches.length - 1];
			const insertIndex = lastTypeMatch.index + lastTypeMatch[0].length;

			const newTypeExport = `\nexport type { ${componentName}Props } from "./src/components/${componentName}/types";`;
			content = content.slice(0, insertIndex) + newTypeExport + content.slice(insertIndex);
		}

		fs.writeFileSync(indexPath, content, "utf8");
		console.log("✅ Updated package exports");
	} catch (error) {
		console.warn("⚠️ Could not auto-update package exports:", error.message);
		console.log("📝 Manual step: Add this to packages/bgui/index.ts:");
		console.log(`export { ${componentName} } from "./src/components/${componentName}";`);
		console.log(
			`export type { ${componentName}Props } from "./src/components/${componentName}/types";`,
		);
	}
}

function updateHooksIndex(hookName) {
	const hooksIndexPath = path.join(__dirname, "..", "packages", "bgui", "src", "hooks", "index.ts");

	try {
		let content = "";
		if (fs.existsSync(hooksIndexPath)) {
			content = fs.readFileSync(hooksIndexPath, "utf8");
		}

		const newExport = `export { ${hookName} } from "./${hookName}";\n`;
		content += newExport;

		fs.writeFileSync(hooksIndexPath, content, "utf8");
		console.log("✅ Updated hooks index");
	} catch (error) {
		console.warn("⚠️ Could not auto-update hooks index:", error.message);
	}
}
