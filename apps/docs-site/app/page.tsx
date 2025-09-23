// @ts-nocheck
"use client";

import { Box, Button, Container, Header, Link, Stack, Typography } from "@braingame/bgui";

const sections = [
	{ label: "Primitives", href: "/components/primitives/button" },
	{ label: "Inputs", href: "/components/inputs/input" },
	{ label: "Layout", href: "/components/layout/box" },
	{ label: "Feedback", href: "/components/feedback/alert" },
	{ label: "Compositions", href: "/showcase" },
];

export default function HomePage() {
	return (
		<Box style={{ minHeight: "100vh", backgroundColor: "#050505" }}>
			<Header
				brand={<Typography level="title-sm">Brain Game UI</Typography>}
				links={sections.map(({ label, href }) => ({ label, href }))}
				backgroundColor="#050505"
				border={false}
				paddingY="sm"
			/>
			<Container style={{ paddingVertical: 48 }}>
				<Stack spacing="xl">
					<Stack spacing="md">
						<Typography level="eyebrow" textColor="#9ef7ff">
							Documentation Hub
						</Typography>
						<Typography level="display" style={{ color: "white" }}>
							Build consistently with the Brain Game design system
						</Typography>
						<Typography level="body-md" style={{ color: "rgba(255,255,255,0.72)" }}>
							Explore ready-to-ship primitives, inputs, layouts, and compositions. Every example
							is wired to live code and prop tables so you can drop components straight into
							`@braingame/bgui` consumers.
						</Typography>
					</Stack>

					<Stack direction="row" spacing="md" useFlexGap style={{ flexWrap: "wrap" }}>
						{sections.map(({ label, href }) => (
							<Button key={label} asChild variant="soft" color="neutral">
								<Link href={href}>{label}</Link>
							</Button>
						))}
					</Stack>

					<Stack spacing="lg" style={{ backgroundColor: "#101827", padding: 24, borderRadius: 16 }}>
						<Typography level="title-md" style={{ color: "white" }}>
							What’s inside
						</Typography>
						<Stack spacing="sm">
							<Typography level="body-md" style={{ color: "rgba(255,255,255,0.72)" }}>
								• Component demos powered by the same exports you consume from `@braingame/bgui`
							</Typography>
							<Typography level="body-md" style={{ color: "rgba(255,255,255,0.72)" }}>
								• Prop tables generated from the current TypeScript surface area
							</Typography>
							<Typography level="body-md" style={{ color: "rgba(255,255,255,0.72)" }}>
								• Showcase compositions for real-world layouts and flows
							</Typography>
							<Typography level="body-md" style={{ color: "rgba(255,255,255,0.72)" }}>
								• Links back to issues when more primitives are required
							</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
}
