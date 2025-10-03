"use client";

import {
	DocsExample,
	Footer,
	PropsTable,
	type PropsTableRow,
	Stack,
	Typography,
	useTheme,
} from "@braingame/bgui";

const footerProps: PropsTableRow[] = [
	{ name: "brand", type: "React.ReactNode", description: "Brand element or logo." },
	{ name: "description", type: "string", description: "Short summary below the brand." },
	{ name: "links", type: "FooterLink[]", description: "Primary navigation links." },
	{ name: "legalLinks", type: "FooterLink[]", description: "Secondary legal links." },
	{
		name: "socialLinks",
		type: "FooterSocialLink[]",
		description: "Social icons with accessible labels.",
	},
];

const usageSnippet = `import { Footer, Typography } from "@braingame/bgui";

<Footer
  brand={<Typography level="title-sm">Brain Game</Typography>}
  description="Signal-first tools for ambitious humans."
  links={[{ label: "Docs", href: "/components" }]}
  legalLinks={[{ label: "Privacy", href: "/privacy" }]}
  socialLinks={[{ icon: "code", label: "GitHub", href: "https://github.com/braingame" }]}
  copyright="© 2025 Brain Game"
/>;`;

export default function FooterDocs() {
	const theme = useTheme();

	return (
		<Stack spacing="xl2">
			<Stack spacing="sm">
				<Typography level="h1">Footer</Typography>
				<Typography level="body-lg" textColor={theme.colors.onSurfaceVariant}>
					Footer surfaces navigation, legal text, and social links with responsive spacing.
				</Typography>
			</Stack>

			<DocsExample title="Default" allowToggle={false}>
				<Footer
					brand={<Typography level="title-sm">Brain Game</Typography>}
					description="Signal-first tools for ambitious humans."
					links={[
						{ label: "Docs", href: "/components" },
						{ label: "Components", href: "/showcase" },
					]}
					legalLinks={[
						{ label: "Privacy", href: "/privacy" },
						{ label: "Terms", href: "/terms" },
					]}
					socialLinks={[
						{ icon: "code", label: "GitHub", href: "https://github.com/braingame" },
						{ icon: "share", label: "Twitter", href: "https://x.com/braingame" },
					]}
					copyright="© 2025 Brain Game"
				/>
			</DocsExample>

			<Stack spacing="sm">
				<Typography level="h2">API</Typography>
				<PropsTable rows={footerProps} testID="props-table" />
			</Stack>

			<DocsExample title="Usage" code={usageSnippet} allowToggle={false}>
				<Typography level="body-md" textColor={theme.colors.onSurfaceVariant}>
					Supply grouped links via{" "}
					<Typography component="span" level="body-md">
						links
					</Typography>{" "}
					and social icons with accessible labels via{" "}
					<Typography component="span" level="body-md">
						socialLinks
					</Typography>
					.
				</Typography>
			</DocsExample>
		</Stack>
	);
}
