// @ts-nocheck
"use client";

import { Box, Button, Container, Footer, Header, Icon, Stack, Typography } from "@braingame/bgui";

export default function ShowcasePage() {
	return (
		<Box style={{ backgroundColor: "#0f172a", minHeight: "100vh", paddingVertical: 48 }}>
			<Container>
				<Stack spacing="lg">
					<Typography level="h2" style={{ color: "white" }}>
						Component Showcase
					</Typography>
					<Typography level="body-md" style={{ color: "rgba(255,255,255,0.72)" }}>
						Each block below uses the new universal primitives without touching legacy web/native
						splits.
					</Typography>
					<Stack direction="row" spacing="md" useFlexGap={false} style={{ flexWrap: "wrap" }}>
						<Box style={{ backgroundColor: "#172554", borderRadius: 12, padding: 16 }}>
							<Typography style={{ color: "white" }}>Button</Typography>
							<Button onClick={() => {}}>Click me</Button>
						</Box>
						<Box style={{ backgroundColor: "#172554", borderRadius: 12, padding: 16 }}>
							<Typography style={{ color: "white" }}>Stack</Typography>
							<Stack spacing="xs">
								<Typography style={{ color: "rgba(255,255,255,0.72)" }}>Item one</Typography>
								<Typography style={{ color: "rgba(255,255,255,0.72)" }}>Item two</Typography>
								<Typography style={{ color: "rgba(255,255,255,0.72)" }}>Item three</Typography>
							</Stack>
						</Box>
						<Box style={{ backgroundColor: "#172554", borderRadius: 12, padding: 16 }}>
							<Typography style={{ color: "white" }}>Icon</Typography>
							<Stack direction="row" spacing="sm">
								<Icon name="favorite" color="#f472b6" size={28} accessibilityLabel="Favorite" />
								<Icon name="mail" color="#38bdf8" size={28} accessibilityLabel="Mail" />
								<Icon
									name="calendar_today"
									color="#facc15"
									size={28}
									accessibilityLabel="Calendar"
								/>
							</Stack>
						</Box>
						<Box
							style={{
								backgroundColor: "#172554",
								borderRadius: 12,
								padding: 16,
								flex: 1,
								minWidth: 260,
							}}
						>
							<Typography style={{ color: "white" }}>Header</Typography>
							<Header
								brand={<Typography level="title-sm">Brain Game</Typography>}
								links={[
									{ label: "Overview", href: "#" },
									{ label: "Pricing", href: "#" },
								]}
								cta={{ label: "Get Started", variant: "solid", onClick: () => undefined }}
								backgroundColor="#1f2937"
								border={false}
								paddingY="sm"
							/>
						</Box>
						<Box
							style={{
								backgroundColor: "#172554",
								borderRadius: 12,
								padding: 16,
								flex: 1,
								minWidth: 260,
							}}
						>
							<Typography style={{ color: "white", marginBottom: 12 }}>Footer</Typography>
							<Footer
								brand={
									<Typography level="title-sm" style={{ color: "#e2e8f0" }}>
										Brain Game
									</Typography>
								}
								description="Built for ambitious humans and teams who want signal, not noise."
								links={[
									{ label: "Docs", href: "#" },
									{ label: "Components", href: "#" },
								]}
								socialLinks={[{ label: "Twitter", href: "https://x.com", icon: "share" }]}
								legalLinks={[
									{ label: "Privacy", href: "#" },
									{ label: "Terms", href: "#" },
								]}
								copyright="© 2025 Brain Game"
							/>
						</Box>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
}
