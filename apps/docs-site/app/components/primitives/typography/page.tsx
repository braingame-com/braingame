"use client";

import {
	DocsExample,
	PropsTable,
	type PropsTableRow,
	Stack,
	Typography,
	useTheme,
} from "@braingame/bgui";

const typographyProps: PropsTableRow[] = [
	{
		name: "level",
		type: '"h1" | "h2" | "h3" | "h4" | "title-lg" | "title-md" | "title-sm" | "body-lg" | "body-md" | "body-sm" | "body-xs" | "inherit"',
		defaultValue: '"body-md"',
		description: "Semantic and stylistic preset.",
	},
	{
		name: "component",
		type: "string",
		description: "Override the rendered element (web only).",
	},
	{
		name: "textColor",
		type: "string",
		description: "Override the theme token for text color.",
	},
];

const usageSnippet = `import { Typography } from "@braingame/bgui";

function SectionHeading() {
  return (
    <Typography level="title-lg" gutterBottom>
      Goals
    </Typography>
  );
}`;

export default function TypographyDocs() {
	const theme = useTheme();

	return (
		<Stack spacing="xl2">
			<Stack spacing="sm">
				<Typography level="h1">Typography</Typography>
				<Typography level="body-lg" textColor={theme.colors.onSurfaceVariant}>
					Use typography levels to communicate hierarchy. Levels map to the design tokens defined in
					the Brain Game system.
				</Typography>
			</Stack>

			<DocsExample title="Levels" allowToggle={false}>
				<Stack spacing="sm">
					<Typography level="h1">Heading 1</Typography>
					<Typography level="h2">Heading 2</Typography>
					<Typography level="title-lg">Title Large</Typography>
					<Typography level="body-lg">Body Large</Typography>
					<Typography level="body-md">Body Medium</Typography>
					<Typography level="body-sm" textColor={theme.colors.onSurfaceVariant}>
						Body Small
					</Typography>
					<Typography level="body-xs" textColor={theme.colors.onSurfaceVariant}>
						Body Extra Small
					</Typography>
				</Stack>
			</DocsExample>

			<Stack spacing="sm">
				<Typography level="h2">API</Typography>
				<PropsTable rows={typographyProps} testID="props-table" />
			</Stack>

			<DocsExample title="Usage" code={usageSnippet} allowToggle={false}>
				<Typography level="body-md" textColor={theme.colors.onSurfaceVariant}>
					Use{" "}
					<Typography component="span" level="body-md">
						component
					</Typography>{" "}
					to change the rendered element while preserving visual style.
				</Typography>
			</DocsExample>
		</Stack>
	);
}
