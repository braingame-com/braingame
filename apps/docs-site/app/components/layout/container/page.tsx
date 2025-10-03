"use client";

import {
	Container as BguiContainer,
	Box,
	DocsExample,
	PropsTable,
	type PropsTableRow,
	Stack,
	Typography,
	useTheme,
} from "@braingame/bgui";

const containerProps: PropsTableRow[] = [
	{
		name: "maxWidth",
		type: 'false | "xs" | "sm" | "md" | "lg" | "xl"',
		defaultValue: '"lg"',
		description: "Maximum width breakpoint.",
	},
	{
		name: "disableGutters",
		type: "boolean",
		defaultValue: "false",
		description: "Remove horizontal padding.",
	},
	{
		name: "fixed",
		type: "boolean",
		defaultValue: "false",
		description: "Lock container width to breakpoint value instead of max width.",
	},
];

const usageSnippet = `import { Container } from "@braingame/bgui";

<Container maxWidth="md">
  <Content />
</Container>;`;

export default function ContainerDocs() {
	const theme = useTheme();

	return (
		<Stack spacing="xl2">
			<Stack spacing="sm">
				<Typography level="h1">Container</Typography>
				<Typography level="body-lg" textColor={theme.colors.onSurfaceVariant}>
					Container centers content and applies responsive gutters.
				</Typography>
			</Stack>

			<DocsExample title="Breakpoints" allowToggle={false}>
				<Stack spacing="md">
					<BguiContainer
						maxWidth="sm"
						style={{
							backgroundColor: theme.colors.surfaceContainerLow,
							paddingVertical: theme.spacing.md,
						}}
					>
						<Typography level="body-sm">maxWidth="sm"</Typography>
					</BguiContainer>
					<BguiContainer
						maxWidth="lg"
						style={{
							backgroundColor: theme.colors.surfaceContainerLow,
							paddingVertical: theme.spacing.md,
						}}
					>
						<Typography level="body-sm">maxWidth="lg"</Typography>
					</BguiContainer>
				</Stack>
			</DocsExample>

			<Stack spacing="sm">
				<Typography level="h2">API</Typography>
				<PropsTable rows={containerProps} testID="props-table" />
			</Stack>

			<DocsExample title="Usage" code={usageSnippet} allowToggle={false}>
				<Box backgroundColor="surfaceContainerLow" padding="md" borderRadius="lg">
					<Typography level="body-md" textColor={theme.colors.onSurfaceVariant}>
						Use Container to cap content width while still applying responsive gutters.
					</Typography>
				</Box>
			</DocsExample>
		</Stack>
	);
}
