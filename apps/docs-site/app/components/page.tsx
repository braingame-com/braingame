"use client";

import { Link as BguiLink, Stack, Typography, useTheme } from "@braingame/bgui";

const sections = [
	{
		title: "Primitives",
		items: [
			{ label: "Button", href: "/components/primitives/button" },
			{ label: "Input", href: "/components/primitives/input" },
			{ label: "Link", href: "/components/primitives/link" },
			{ label: "Typography", href: "/components/primitives/typography" },
			{ label: "Icon", href: "/components/primitives/icon" },
		],
	},
	{
		title: "Layout",
		items: [
			{ label: "Box", href: "/components/layout/box" },
			{ label: "Container", href: "/components/layout/container" },
			{ label: "Stack", href: "/components/layout/stack" },
		],
	},
	{
		title: "Compositions",
		items: [
			{ label: "Header", href: "/components/compositions/header" },
			{ label: "Footer", href: "/components/compositions/footer" },
		],
	},
];

export default function ComponentsIndexPage() {
	const theme = useTheme();

	return (
		<Stack spacing="xl2">
			<Stack spacing="sm">
				<Typography level="h1">Component Catalog</Typography>
				<Typography level="body-lg" textColor={theme.colors.onSurfaceVariant}>
					Explore production-ready Brain Game UI surfaces. Each page includes live examples and prop
					tables.
				</Typography>
			</Stack>

			<Stack spacing="xl">
				{sections.map((section) => (
					<Stack key={section.title} spacing="sm">
						<Typography level="title-md">{section.title}</Typography>
						<Stack spacing="xs">
							{section.items.map((item) => (
								<BguiLink key={item.href} href={item.href} variant="plain">
									{item.label}
								</BguiLink>
							))}
						</Stack>
					</Stack>
				))}
			</Stack>
		</Stack>
	);
}
