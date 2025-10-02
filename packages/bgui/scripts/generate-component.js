#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const toPosix = (value) => value.split(path.sep).join("/");

const input = process.argv[2];

if (!input) {
	console.error(
		"Usage: pnpm --filter @braingame/bgui generate:component [primitives/|compositions/]ComponentName",
	);
	process.exit(1);
}

const GROUP_ALIASES = new Map([
	["primitive", "primitives"],
	["primitives", "primitives"],
	["prim", "primitives"],
	["composition", "compositions"],
	["compositions", "compositions"],
	["comp", "compositions"],
]);

const parseInput = (raw) => {
	const segments = raw.split("/").filter(Boolean);
	if (segments.length === 1) {
		return { group: "primitives", component: segments[0] };
	}
	if (segments.length === 2) {
		const groupAlias = segments[0].toLowerCase();
		const resolved = GROUP_ALIASES.get(groupAlias);
		if (!resolved) {
			console.error(
				`Unknown component group "${segments[0]}". Use "primitives" or "compositions".`,
			);
			process.exit(1);
		}
		return { group: resolved, component: segments[1] };
	}

	console.error("Component path should look like 'ComponentName' or 'primitives/ComponentName'");
	process.exit(1);
};

const { group, component } = parseInput(input);

if (!/^[A-Z][a-zA-Z0-9]*$/.test(component)) {
	console.error("Component name must be in PascalCase (e.g. Button, TextField)");
	process.exit(1);
}

const srcDir = path.join(__dirname, "..", "src");
const componentDir = path.join(srcDir, "components", group, component);

if (fs.existsSync(componentDir)) {
	console.error(`Component ${component} already exists at ${componentDir}`);
	process.exit(1);
}

fs.mkdirSync(componentDir, { recursive: true });

const relativeImport = (from, target) => {
	const relPath = toPosix(path.relative(from, target));
	return relPath.startsWith(".") ? relPath : `./${relPath}`;
};

const themeImportPath = relativeImport(componentDir, path.join(srcDir, "theme"));
const testUtilsImportPath = relativeImport(
	componentDir,
	path.join(srcDir, "test-utils", "render-with-theme"),
);

const storyCategory = group === "primitives" ? "Primitives" : "Compositions";

const files = new Map([
	[
		"index.ts",
		`export { ${component} } from "./${component}";
export type { ${component}Props } from "./${component}.types";
`,
	],
	[
		`${component}.types.ts`,
		`import type { ReactNode } from "react";
import type { PressableProps } from "react-native";

export interface ${component}Props extends PressableProps {
	children?: ReactNode;
	/**
	 * Tone token applied to background and text colors.
	 */
	tone?: "surface" | "primary" | "danger";
}
`,
	],
	[
		`${component}.tsx`,
		`import { forwardRef, useMemo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import type { Theme } from "${themeImportPath}";
import { useTheme } from "${themeImportPath}";
import type { ${component}Props } from "./${component}.types";

type Tone = NonNullable<${component}Props["tone"]>;

const styles = StyleSheet.create({
	base: {
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 12,
	},
	text: {
		fontWeight: "600",
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},
});

const toneMap: Record<Tone, (theme: Theme) => { background: string; foreground: string; borderColor?: string; borderWidth?: number }>
	= {
		surface: (theme) => ({
			background: theme.colors.surface,
			foreground: theme.colors.onSurface,
			borderColor: theme.colors.outlineVariant,
			borderWidth: 1,
		}),
		primary: (theme) => ({
			background: theme.colors.primary,
			foreground: theme.colors.onPrimary,
		}),
		danger: (theme) => ({
			background: theme.colors.error,
			foreground: theme.colors.onError,
		}),
	};

export const ${component} = forwardRef<Pressable, ${component}Props>(
	({ children, style, tone = "surface", ...rest }, ref) => {
		const theme = useTheme();
		const palette = useMemo(() => toneMap[tone](theme), [theme, tone]);

		return (
			<Pressable
				ref={ref}
				accessibilityRole="button"
				style={StyleSheet.flatten([
					styles.base,
					{
						backgroundColor: palette.background,
						borderColor: palette.borderColor,
						borderWidth: palette.borderWidth ?? 0,
						paddingHorizontal: theme.spacing.md,
						paddingVertical: theme.spacing.sm,
					},
					style,
				])}
				{...rest}
			>
				{typeof children === "string" || typeof children === "number" ? (
					<Text style={[styles.text, { color: palette.foreground }]}>{children}</Text>
				) : (
					children
				)}
			</Pressable>
		);
	},
);

${component}.displayName = "${component}";
`,
	],
	[
		`${component}.test.tsx`,
		`import { fireEvent, StyleSheet } from "@testing-library/react-native";
import { renderWithTheme } from "${testUtilsImportPath}";
import lightTheme, { darkTheme } from "${themeImportPath}/theme";
import { ${component} } from "./${component}";

describe("${component}", () => {
	it("renders children", () => {
		const { getByText } = renderWithTheme(<${component}>Label</${component}>);
		expect(getByText("Label")).toBeTruthy();
	});

	it("forwards press events", () => {
		const onPress = jest.fn();
		const { getByRole } = renderWithTheme(
			<${component} onPress={onPress}>Tap</${component}>,
		);
		fireEvent.press(getByRole("button"));
		expect(onPress).toHaveBeenCalled();
	});

	it("adapts tone between light and dark themes", () => {
		const toneProps = { tone: "primary", testID: "subject" } as const;
		const { getByTestId: getLight } = renderWithTheme(
			<${component} {...toneProps}>Tone</${component}>,
		);
		const lightStyleProp = getLight("subject").props.style;
		const lightStyles = StyleSheet.flatten(
			typeof lightStyleProp === "function"
				? lightStyleProp({ pressed: false, hovered: false, focused: false })
				: lightStyleProp,
		);
		expect(lightStyles?.backgroundColor).toBe(lightTheme.colors.primary);

		const { getByTestId: getDark } = renderWithTheme(
			<${component} {...toneProps}>Tone</${component}>,
			{ theme: "dark" },
		);
		const darkStyleProp = getDark("subject").props.style;
		const darkStyles = StyleSheet.flatten(
			typeof darkStyleProp === "function"
				? darkStyleProp({ pressed: false, hovered: false, focused: false })
				: darkStyleProp,
		);
		expect(darkStyles?.backgroundColor).toBe(darkTheme.colors.primary);
		expect(darkStyles?.backgroundColor).not.toBe(lightStyles?.backgroundColor);
	});
});
`,
	],
	[
		`${component}.stories.tsx`,
		`import type { Meta, StoryObj } from "@storybook/react";
import { ${component} } from "./${component}";

const meta = {
	title: "${storyCategory}/${component}",
	component: ${component},
	args: {
		children: "${component} content",
	},
} satisfies Meta<typeof ${component}>;

export default meta;

type Story = StoryObj<typeof ${component}>;

export const Playground: Story = {};

export const PrimaryTone: Story = {
	args: {
		tone: "primary",
		children: "Primary tone",
	},
};

export const DangerTone: Story = {
	args: {
		tone: "danger",
		children: "Danger tone",
	},
};
`,
	],
]);

for (const [fileName, contents] of files) {
	fs.writeFileSync(path.join(componentDir, fileName), contents, "utf-8");
}

console.log(
	`✅ Created ${component} in ${componentDir}\n   → Remember to export it from packages/bgui/src/index.ts`,
);
