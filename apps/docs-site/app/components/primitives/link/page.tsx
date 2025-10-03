"use client";

import {
	Link as BguiLink,
	DocsExample,
	PropsTable,
	type PropsTableRow,
	Stack,
	Typography,
	useTheme,
} from "@braingame/bgui";

const linkProps: PropsTableRow[] = [
	{
		name: "href",
		type: "string",
		required: true,
		description: "Destination URL.",
	},
	{
		name: "variant",
		type: '"plain" | "outlined" | "soft" | "solid"',
		defaultValue: '"plain"',
		description: "Visual treatment.",
	},
	{
		name: "color",
		type: '"primary" | "neutral" | "danger" | "success" | "warning"',
		defaultValue: '"primary"',
		description: "Tone for the link text/background.",
	},
	{
		name: "underline",
		type: '"always" | "hover" | "none"',
		defaultValue: '"hover"',
		description: "Underline visibility.",
	},
	{
		name: "startDecorator",
		type: "React.ReactNode",
		description: "Leading adornment (icon, badge).",
	},
];

const variantsExample = `<Stack direction="row" spacing="sm" useFlexGap style={{ flexWrap: \"wrap\" }}>
  <BguiLink href="#" variant="plain">Plain</BguiLink>
  <BguiLink href="#" variant="outlined">Outlined</BguiLink>
  <BguiLink href="#" variant="soft">Soft</BguiLink>
  <BguiLink href="#" variant="solid">Solid</BguiLink>
</Stack>`;

const decoratorsExample = `<BguiLink href="#" startDecorator="↗" target="_blank">
  External link
</BguiLink>`;

const usageSnippet = `import { Link } from "@braingame/bgui";

function SettingsLink() {
  return (
    <Link href="/settings" variant="plain">
      Manage settings
    </Link>
  );
}`;

export default function LinkDocs() {
	const theme = useTheme();

	return (
		<Stack spacing="xl2">
			<Stack spacing="sm">
				<Typography level="h1">Link</Typography>
				<Typography level="body-lg" textColor={theme.colors.onSurfaceVariant}>
					Links provide inline navigation with theme-aware styling for hover, focus, and pressed
					states.
				</Typography>
			</Stack>

			<DocsExample title="Variants" code={variantsExample}>
				<Stack direction="row" spacing="sm" useFlexGap style={{ flexWrap: "wrap" }}>
					<BguiLink href="#" variant="plain">
						Plain
					</BguiLink>
					<BguiLink href="#" variant="outlined">
						Outlined
					</BguiLink>
					<BguiLink href="#" variant="soft">
						Soft
					</BguiLink>
					<BguiLink href="#" variant="solid">
						Solid
					</BguiLink>
				</Stack>
			</DocsExample>

			<DocsExample title="Decorators" code={decoratorsExample}>
				<BguiLink href="#" startDecorator="↗" target="_blank">
					External link
				</BguiLink>
			</DocsExample>

			<Stack spacing="sm">
				<Typography level="h2">API</Typography>
				<PropsTable rows={linkProps} testID="props-table" />
			</Stack>

			<DocsExample title="Usage" code={usageSnippet} allowToggle={false}>
				<Typography level="body-md" textColor={theme.colors.onSurfaceVariant}>
					Links render as accessible anchors on web and Pressable on native while preserving focus
					styles.
				</Typography>
			</DocsExample>
		</Stack>
	);
}
