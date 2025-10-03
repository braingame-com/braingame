"use client";

import {
	Box,
	DocsExample,
	PropsTable,
	type PropsTableRow,
	Stack,
	Typography,
	useTheme,
} from "@braingame/bgui";

const boxProps: PropsTableRow[] = [
	{
		name: "padding",
		type: "Spacing token | number",
		description: "Apply consistent inner spacing using theme tokens.",
	},
	{
		name: "backgroundColor",
		type: "Color token | string",
		description: "Optional background color.",
	},
	{
		name: "borderRadius",
		type: "Radius token | number",
		description: "Rounded corners aligned with design tokens.",
	},
	{
		name: "style",
		type: "StyleProp<ViewStyle>",
		description: "Additional styles merged with token output.",
	},
];

const usageSnippet = `import { Box } from "@braingame/bgui";

<Box backgroundColor="surfaceContainer" padding="lg" borderRadius="lg">
  Content goes here
</Box>;`;

export default function BoxDocs() {
	const theme = useTheme();

	return (
		<Stack spacing="xl2">
			<Stack spacing="sm">
				<Typography level="h1">Box</Typography>
				<Typography level="body-lg" textColor={theme.colors.onSurfaceVariant}>
					Box is the foundational layout primitive for spacing, borders, and backgrounds.
				</Typography>
			</Stack>

			<DocsExample title="Spacing & radii" allowToggle={false}>
				<Stack direction="row" spacing="md" useFlexGap style={{ flexWrap: "wrap" }}>
					<Box backgroundColor="surfaceContainerLow" padding="md" borderRadius="md">
						<Typography level="body-sm">Default Box</Typography>
					</Box>
					<Box backgroundColor="primaryContainer" padding="lg" borderRadius="xl">
						<Typography level="body-sm" textColor={theme.colors.onPrimaryContainer}>
							Token-based styling
						</Typography>
					</Box>
				</Stack>
			</DocsExample>

			<Stack spacing="sm">
				<Typography level="h2">API</Typography>
				<PropsTable rows={boxProps} testID="props-table" />
			</Stack>

			<DocsExample title="Usage" code={usageSnippet} allowToggle={false}>
				<Typography level="body-md" textColor={theme.colors.onSurfaceVariant}>
					Combine Box with Stack for grid-like layouts without writing inline styles.
				</Typography>
			</DocsExample>
		</Stack>
	);
}
