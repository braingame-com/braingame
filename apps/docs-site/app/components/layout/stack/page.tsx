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

const stackProps: PropsTableRow[] = [
	{
		name: "direction",
		type: '"column" | "row" | "column-reverse" | "row-reverse"',
		defaultValue: '"column"',
		description: "Layout direction.",
	},
	{
		name: "spacing",
		type: "Spacing token | number",
		defaultValue: "0",
		description: "Gap between children.",
	},
	{
		name: "useFlexGap",
		type: "boolean",
		defaultValue: "true",
		description: "Use native gap when available.",
	},
];

const usageSnippet = `import { Stack } from "@braingame/bgui";

<Stack direction="row" spacing="md">
  <Card />
  <Card />
</Stack>;`;

export default function StackDocs() {
	const theme = useTheme();

	const sampleBox = (label: string) => (
		<Box
			key={label}
			backgroundColor="surfaceContainerHigh"
			padding="md"
			borderRadius="md"
			style={{ minWidth: 80, alignItems: "center" }}
		>
			<Typography level="body-sm">{label}</Typography>
		</Box>
	);

	return (
		<Stack spacing="xl2">
			<Stack spacing="sm">
				<Typography level="h1">Stack</Typography>
				<Typography level="body-lg" textColor={theme.colors.onSurfaceVariant}>
					Stack composes children with consistent gaps and supports responsive flexbox directions.
				</Typography>
			</Stack>

			<DocsExample title="Direction" allowToggle={false}>
				<Stack spacing="md">
					<Stack direction="row" spacing="sm" useFlexGap style={{ flexWrap: "wrap" }}>
						{["One", "Two", "Three"].map(sampleBox)}
					</Stack>
					<Stack direction="column" spacing="sm">
						{["A", "B", "C"].map(sampleBox)}
					</Stack>
				</Stack>
			</DocsExample>

			<Stack spacing="sm">
				<Typography level="h2">API</Typography>
				<PropsTable rows={stackProps} testID="props-table" />
			</Stack>

			<DocsExample title="Usage" code={usageSnippet} allowToggle={false}>
				<Typography level="body-md" textColor={theme.colors.onSurfaceVariant}>
					Stack can render grid-like layouts by combining{" "}
					<Typography component="span" level="body-md">
						direction
					</Typography>
					and{" "}
					<Typography component="span" level="body-md">
						useFlexGap
					</Typography>
					.
				</Typography>
			</DocsExample>
		</Stack>
	);
}
