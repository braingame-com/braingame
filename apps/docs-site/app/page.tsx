"use client";

import {
	AnimatedGradientBackground,
	Box,
	Button,
	type ButtonProps,
	Card,
	CardContent,
	CardHeader,
	Container,
	Icon,
	type IconName,
	Stack,
	Typography,
	useTheme,
} from "@braingame/bgui";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const sections = [
	{ label: "Primitives", href: "/components/primitives/button" },
	{ label: "Inputs", href: "/components/primitives/input" },
	{ label: "Layout", href: "/components/layout/box" },
	{ label: "Feedback", href: "/components/feedback/alert" },
	{ label: "Compositions", href: "/showcase" },
];

type HeroHighlight = {
	title: string;
	description: string;
	icon: IconName;
};

type HeroAction = {
	label: string;
	href: string;
	icon: IconName;
	variant: ButtonProps["variant"];
};

const heroHighlights: HeroHighlight[] = [
	{
		title: "Universal primitives",
		description:
			"Single React Native source renders beautifully across web and native without forks.",
		icon: "code",
	},
	{
		title: "Production guardrails",
		description:
			"Baked-in accessibility, tokens, and motion defaults mean every surface ships compliant.",
		icon: "lock",
	},
	{
		title: "Design system in sync",
		description:
			"Docs, playgrounds, and guidelines dogfood the same theme provider your apps consume.",
		icon: "analytics",
	},
];

const heroActions: HeroAction[] = [
	{ label: "Explore components", href: "/components", icon: "play_arrow", variant: "solid" },
	{ label: "View design tokens", href: "/design/colors", icon: "dashboard", variant: "outlined" },
];

const heroStats = [
	{ label: "Components", value: "30+" },
	{ label: "Tokens", value: "120+" },
	{ label: "Coverage", value: "Light & Dark" },
];

export default function HomePage() {
	const theme = useTheme();
	const router = useRouter();

	const gradientColors = useMemo(
		() => [theme.colors.primary, theme.colors.secondary, theme.colors.tertiary],
		[theme.colors.primary, theme.colors.secondary, theme.colors.tertiary],
	);

	return (
		<Box backgroundColor="background">
			<AnimatedGradientBackground
				colors={gradientColors}
				blobOpacity={0.28}
				blobCount={5}
				blurRadius={160}
				style={{ paddingTop: theme.spacing.xl4, paddingBottom: theme.spacing.xl4 }}
			>
				<Container maxWidth="xl">
					<Stack spacing="xl3">
						<Stack spacing="lg">
							<Stack spacing="sm" style={{ maxWidth: 720 }}>
								<Typography level="title-sm" textColor={theme.colors.onPrimary}>
									Brain Game UI
								</Typography>
								<Typography level="h1" textColor={theme.colors.onPrimary}>
									Ship ambitious Brain Game experiences with a single design system
								</Typography>
								<Typography level="body-lg" textColor={theme.colors.onPrimary}>
									Every primitive, layout, and composition in these docs is the exact export you
									install from{" "}
									<Typography level="body-lg" component="span" textColor={theme.colors.onPrimary}>
										@braingame/bgui
									</Typography>
									— wired for light and dark modes, accessibility, and production velocity.
								</Typography>
							</Stack>
							<Stack direction="row" spacing="md" useFlexGap style={{ flexWrap: "wrap" }}>
								{heroActions.map((action) => {
									const iconColor =
										action.variant === "solid" ? theme.colors.onPrimary : theme.colors.primary;

									return (
										<Button
											key={action.href}
											variant={action.variant}
											color="primary"
											startDecorator={<Icon name={action.icon} size={18} color={iconColor} />}
											onClick={() => router.push(action.href)}
										>
											{action.label}
										</Button>
									);
								})}
							</Stack>
						</Stack>

						<Stack direction="row" spacing="lg" useFlexGap style={{ flexWrap: "wrap" }}>
							{heroHighlights.map((highlight) => (
								<Card
									key={highlight.title}
									variant="soft"
									color="neutral"
									style={{ flex: 1, minWidth: 260 }}
								>
									<CardHeader
										leading={
											<Box backgroundColor="primaryContainer" borderRadius="lg" padding="sm">
												<Icon
													name={highlight.icon}
													size={20}
													color={theme.colors.onPrimaryContainer}
												/>
											</Box>
										}
										title={highlight.title}
									/>
									<CardContent>
										<Typography level="body-md" textColor={theme.colors.onSurface}>
											{highlight.description}
										</Typography>
									</CardContent>
								</Card>
							))}
						</Stack>

						<Box backgroundColor="surfaceContainerLow" borderRadius="xl" padding="lg">
							<Stack direction="row" spacing="lg" useFlexGap style={{ flexWrap: "wrap" }}>
								{heroStats.map((stat) => (
									<Stack key={stat.label} spacing="xs" style={{ minWidth: 160 }}>
										<Typography level="title-lg">{stat.value}</Typography>
										<Typography level="body-sm" textColor={theme.colors.onSurface}>
											{stat.label}
										</Typography>
									</Stack>
								))}
							</Stack>
						</Box>
					</Stack>
				</Container>
			</AnimatedGradientBackground>

			<Container maxWidth="xl" style={{ paddingVertical: theme.spacing.xl3 }}>
				<Stack spacing="lg">
					<Typography level="title-md">Jump straight to a surface</Typography>
					<Stack direction="row" spacing="md" useFlexGap style={{ flexWrap: "wrap" }}>
						{sections.map((section) => (
							<Button
								key={section.href}
								variant="plain"
								color="neutral"
								onClick={() => router.push(section.href)}
							>
								{section.label}
							</Button>
						))}
					</Stack>
				</Stack>
			</Container>

			<Container maxWidth="xl" style={{ paddingBottom: theme.spacing.xl3 }}>
				<Stack spacing="lg">
					<Typography level="title-md">Design principles</Typography>
					<Stack direction="row" spacing="md" useFlexGap style={{ flexWrap: "wrap" }}>
						<Card
							key="clarity"
							variant="outlined"
							color="neutral"
							style={{ flex: 1, minWidth: 220 }}
						>
							<CardHeader
								title="Clarity first"
								subtitle="Every surface should favour readability and fast scanning."
							/>
							<CardContent>
								<Typography level="body-sm" textColor={theme.colors.onSurface}>
									We optimise for crisp typography, predictable spacing, and high contrast so users
									never work to understand the interface.
								</Typography>
							</CardContent>
						</Card>
						<Card
							key="universality"
							variant="outlined"
							color="neutral"
							style={{ flex: 1, minWidth: 220 }}
						>
							<CardHeader
								title="Universal surfaces"
								subtitle="One React Native codepath powers web and native."
							/>
							<CardContent>
								<Typography level="body-sm" textColor={theme.colors.onSurface}>
									Components respond to theme tokens and platform touch targets, giving product
									teams a single source of visual truth.
								</Typography>
							</CardContent>
						</Card>
						<Card key="speed" variant="outlined" color="neutral" style={{ flex: 1, minWidth: 220 }}>
							<CardHeader
								title="Ship with confidence"
								subtitle="Tooling catches regressions before they hit production."
							/>
							<CardContent>
								<Typography level="body-sm" textColor={theme.colors.onSurface}>
									Automated theme coverage, accessibility smoke tests, and scaffolded docs keep
									quality bars high without slowing delivery.
								</Typography>
							</CardContent>
						</Card>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
}
