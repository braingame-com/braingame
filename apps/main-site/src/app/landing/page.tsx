"use client";

import {
	BGUIThemeProvider,
	Box,
	Button,
	Container,
	Footer,
	Header,
	Input,
	Link,
	Stack,
	Typography,
} from "@braingame/bgui";
import { useState } from "react";
import type { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

const primitiveNames = ["Box", "Typography", "Button", "Input", "Stack", "Container", "Link", "Icon"];
const compositionNames = ["Header", "Footer"];

export default function LandingPage() {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<"idle" | "submitted">("idle");

	const handleChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
		setEmail(event.nativeEvent.text);
	};

	const handleSubmit = () => {
		if (!email.trim()) return;
		setStatus("submitted");
		// TODO: wire up waitlist submission endpoint.
	};

	return (
		<BGUIThemeProvider>
			<Box style={{ minHeight: "100vh", backgroundColor: "#050505" }}>
				<Header
					brand={<Typography level="title-sm">Brain Game</Typography>}
					links={[
						{ label: "Docs", href: "https://braingame.dev/docs" },
						{ label: "Components", href: "https://braingame.dev/docs/components" },
					]}
					cta={{ label: "Join Waitlist", onClick: handleSubmit, variant: "soft" }}
					backgroundColor="#050505"
					border={false}
					paddingY="sm"
				/>

				<Container style={{ paddingVertical: 64 }}>
					<Stack spacing="xl">
						<Stack spacing="md">
							<Typography level="eyebrow" textColor="#9ef7ff">
								Lead Generation
							</Typography>
							<Typography level="display" style={{ color: "white" }}>
								Enterprise UI with startup velocity
							</Typography>
							<Typography level="body-lg" style={{ color: "rgba(255,255,255,0.72)" }}>
								Launch new surfaces in hours, not weeks. Brain Game UI ships React and React Native primitives
								that stay perfectly in sync across marketing, docs, and product experiences.
							</Typography>
						</Stack>

						<Stack direction="row" spacing="md" useFlexGap style={{ flexWrap: "wrap", alignItems: "center" }}>
							<Box style={{ flex: 1, minWidth: 240 }}>
								<Input
									value={email}
									placeholder="Enter your work email"
									onChange={handleChange}
									type="email"
								/>
							</Box>
							<Button onClick={handleSubmit} variant="solid">
								Stay Updated
							</Button>
						</Stack>

						{status === "submitted" ? (
							<Box style={{ backgroundColor: "#122b39", padding: 16, borderRadius: 12 }}>
								<Typography style={{ color: "#a7f3ff" }}>
									Thanks! You'll hear from us when the next component drop is ready.
								</Typography>
							</Box>
						) : null}

						<Stack spacing="md">
							<Typography level="title-md" style={{ color: "white" }}>
								Primitives ready on day one
							</Typography>
							<Box style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
								{primitiveNames.map((name) => (
									<Box
										key={name}
										style={{
											backgroundColor: "#101827",
											padding: 12,
											borderRadius: 10,
										}}
									>
										<Typography style={{ color: "white" }}>{name}</Typography>
									</Box>
								))}
							</Box>
						</Stack>

						{compositionNames.length ? (
							<Stack spacing="md">
								<Typography level="title-md" style={{ color: "white" }}>
									Compositions for real screens
								</Typography>
								<Box style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
									{compositionNames.map((name) => (
										<Box
											key={name}
											style={{
												backgroundColor: "#101827",
												padding: 12,
												borderRadius: 10,
										}}
										>
											<Typography style={{ color: "white" }}>{name}</Typography>
										</Box>
									))}
								</Box>
							</Stack>
						) : null}

						<Stack spacing="sm">
							<Typography style={{ color: "rgba(255,255,255,0.65)" }}>
								Explore the component docs to see live examples or jump straight into the codebase.
							</Typography>
							<Link href="https://github.com/jordancrow-stewart/braingame" target="_blank">
								View the repository
							</Link>
						</Stack>
					</Stack>
				</Container>

				<Footer
					brand={{ label: "Brain Game", href: "/" }}
					socialLinks={[
						{ icon: "github", label: "GitHub", href: "https://github.com/jordancrow-stewart/braingame" },
						{ icon: "x", label: "Twitter", href: "https://twitter.com/braingame" },
					]}
					links={[
						[
							{ label: "Docs", href: "https://braingame.dev/docs" },
							{ label: "Components", href: "https://braingame.dev/docs/components" },
						],
						[
							{ label: "Terms", href: "/terms" },
							{ label: "Privacy", href: "/privacy" },
						],
					]}
					style={{ backgroundColor: "#050505", borderTop: "1px solid rgba(255,255,255,0.12)" }}
				/>
			</Box>
		</BGUIThemeProvider>
	);
}
