"use client";

import {
	DocsExample,
	Header,
	IconButton,
	PropsTable,
	type PropsTableRow,
	Stack,
	Typography,
	useTheme,
} from "@braingame/bgui";

const headerProps: PropsTableRow[] = [
	{
		name: "brand",
		type: "React.ReactNode",
		required: true,
		description: "Brand element rendered on the left.",
	},
	{ name: "links", type: "HeaderLink[]", description: "Primary navigation links." },
	{ name: "cta", type: "HeaderCta", description: "Optional call-to-action button." },
	{
		name: "actions",
		type: "React.ReactNode",
		description: "Custom trailing controls (e.g., theme toggle).",
	},
];

const usageSnippet = `import { Header, Typography } from "@braingame/bgui";

<Header
  brand={<Typography level="title-sm">Brain Game</Typography>}
  links={[{ label: "Docs", href: "/components" }]}
  cta={{ label: "Get Access", onClick: handleAccess }}
/>;`;

export default function HeaderDocs() {
	const theme = useTheme();

	return (
		<Stack spacing="xl2">
			<Stack spacing="sm">
				<Typography level="h1">Header</Typography>
				<Typography level="body-lg" textColor={theme.colors.onSurfaceVariant}>
					Header bundles brand, navigation, and trailing actions into a responsive bar.
				</Typography>
			</Stack>

			<DocsExample
				title="Default"
				code={`<Header
  brand={<Typography level="title-sm">Brain Game</Typography>}
  links={[
    { label: "Docs", href: "/components" },
    { label: "Components", href: "/showcase" },
  ]}
  cta={{ label: "Get Access", onClick: () => undefined }}
/>`}
			>
				<Header
					brand={<Typography level="title-sm">Brain Game</Typography>}
					links={[
						{ label: "Docs", href: "/components" },
						{ label: "Components", href: "/showcase" },
					]}
					cta={{ label: "Get Access", onClick: () => undefined }}
				/>
			</DocsExample>

			<DocsExample
				title="Actions"
				code={`<Header
  brand={<Typography level="title-sm">Brain Game</Typography>}
  links={[{ label: "Docs", href: "/components" }]}
  actions={<IconButton iconName="dark_mode" aria-label="Toggle theme" />}
/>`}
			>
				<Header
					brand={<Typography level="title-sm">Brain Game</Typography>}
					links={[{ label: "Docs", href: "/components" }]}
					actions={<IconButton iconName="dark_mode" variant="plain" aria-label="Toggle theme" />}
				/>
			</DocsExample>

			<Stack spacing="sm">
				<Typography level="h2">API</Typography>
				<PropsTable rows={headerProps} testID="props-table" />
			</Stack>

			<DocsExample title="Usage" code={usageSnippet} allowToggle={false}>
				<Typography level="body-md" textColor={theme.colors.onSurfaceVariant}>
					Links accept optional icons and target attributes for external navigation.
				</Typography>
			</DocsExample>
		</Stack>
	);
}
