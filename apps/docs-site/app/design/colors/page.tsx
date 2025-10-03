"use client";

import { Box, Stack, Typography, useTheme } from "@braingame/bgui";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

interface ColorSwatch {
	label: string;
	value: string;
	textColor?: string;
	showBorder?: boolean;
}

interface ColorGroup {
	title: string;
	description: string;
	swatches: ColorSwatch[];
}

export default function ColorsPage() {
	const theme = useTheme();
	const colorGroups = useMemo<ColorGroup[]>(
		() => [
			{
				title: "Primary palette",
				description: "Use primary tokens for brand-defining actions and highlights.",
				swatches: [
					{ label: "primary", value: theme.colors.primary, textColor: theme.colors.onPrimary },
					{
						label: "onPrimary",
						value: theme.colors.onPrimary,
						textColor: theme.colors.primary,
						showBorder: true,
					},
					{
						label: "primaryContainer",
						value: theme.colors.primaryContainer,
						textColor: theme.colors.onPrimaryContainer,
					},
					{
						label: "onPrimaryContainer",
						value: theme.colors.onPrimaryContainer,
						textColor: theme.colors.primaryContainer,
						showBorder: true,
					},
				],
			},
			{
				title: "Neutral surfaces",
				description: "Surface tokens provide elevation states and content backgrounds.",
				swatches: [
					{
						label: "surface",
						value: theme.colors.surface,
						textColor: theme.colors.onSurface,
						showBorder: true,
					},
					{
						label: "surfaceVariant",
						value: theme.colors.surfaceVariant,
						textColor: theme.colors.onSurfaceVariant,
					},
					{
						label: "surfaceContainer",
						value: theme.colors.surfaceContainer,
						textColor: theme.colors.onSurface,
					},
					{
						label: "surfaceContainerHigh",
						value: theme.colors.surfaceContainerHigh,
						textColor: theme.colors.onSurface,
					},
				],
			},
			{
				title: "Semantic feedback",
				description: "Error, success, warning, and info tokens communicate status.",
				swatches: [
					{ label: "error", value: theme.colors.error, textColor: theme.colors.onError },
					{ label: "success", value: theme.colors.success, textColor: theme.colors.onSuccess },
					{ label: "warning", value: theme.colors.warning, textColor: theme.colors.onWarning },
					{ label: "info", value: theme.colors.info, textColor: theme.colors.onInfo },
				],
			},
			{
				title: "Outline & utility",
				description: "Outline tokens support borders and dividers.",
				swatches: [
					{
						label: "outline",
						value: theme.colors.outline,
						textColor: theme.colors.onSurface,
						showBorder: true,
					},
					{
						label: "outlineVariant",
						value: theme.colors.outlineVariant,
						textColor: theme.colors.onSurface,
						showBorder: true,
					},
				],
			},
		],
		[theme],
	);

	return (
		<Stack spacing="xl2">
			<Stack spacing="sm">
				<Typography level="h1">Color system</Typography>
				<Typography level="body-lg" textColor={theme.colors.onSurface}>
					BGUI blends Material 3 palettes with Brain Game brand tokens. Token names describe
					purpose, not hue, so components stay in sync across themes.
				</Typography>
			</Stack>

			<Stack spacing="md">
				<Typography level="title-md">Usage guidelines</Typography>
				<Stack direction="row" spacing="md" useFlexGap style={{ flexWrap: "wrap" }}>
					<Box
						backgroundColor="surface"
						borderRadius="lg"
						padding="md"
						style={{ flex: 1, minWidth: 220 }}
					>
						<Typography level="title-sm">Primary actions</Typography>
						<Typography level="body-sm" textColor={theme.colors.onSurface}>
							Reserve `primary` / `primaryContainer` for the most important calls-to-action, and
							pair them with the matching `on*` color for readable content.
						</Typography>
					</Box>
					<Box
						backgroundColor="surface"
						borderRadius="lg"
						padding="md"
						style={{ flex: 1, minWidth: 220 }}
					>
						<Typography level="title-sm">Surface hierarchy</Typography>
						<Typography level="body-sm" textColor={theme.colors.onSurface}>
							Use the `surfaceContainer*` scale to step elevation: `Low` for cards, `High` for
							overlays, and `Highest` for floating panels.
						</Typography>
					</Box>
					<Box
						backgroundColor="surface"
						borderRadius="lg"
						padding="md"
						style={{ flex: 1, minWidth: 220 }}
					>
						<Typography level="title-sm">Feedback states</Typography>
						<Typography level="body-sm" textColor={theme.colors.onSurface}>
							Tie semantic tokens (`success`, `error`, `warning`, `info`) directly to status
							banners, toasts, and field validation to reinforce meaning.
						</Typography>
					</Box>
				</Stack>
			</Stack>

			<Stack spacing="md">
				<Typography level="title-md">Spacing scale</Typography>
				<Stack direction="row" spacing="md" useFlexGap style={{ flexWrap: "wrap" }}>
					{(["xs", "sm", "md", "lg", "xl"] as const).map((token) => (
						<Box
							key={token}
							backgroundColor="surface"
							borderRadius="lg"
							padding="md"
							style={{ flex: 1, minWidth: 160 }}
						>
							<Typography level="title-sm">spacing.{token}</Typography>
							<Typography level="body-sm" textColor={theme.colors.onSurface}>
								{theme.spacing[token]} px &mdash; use for{" "}
								{token === "xs"
									? "tight text groupings"
									: token === "sm"
										? "compact layouts"
										: token === "md"
											? "default padding"
											: token === "lg"
												? "section spacing"
												: "hero/section breathing room"}
							</Typography>
						</Box>
					))}
				</Stack>
			</Stack>

			<Stack spacing="md">
				<Typography level="title-md">Principles</Typography>
				<Stack direction="row" spacing="md" useFlexGap style={{ flexWrap: "wrap" }}>
					<Box
						backgroundColor="surface"
						borderRadius="lg"
						padding="md"
						style={{ flex: 1, minWidth: 220 }}
					>
						<Typography level="title-sm">Semantic naming</Typography>
						<Typography level="body-sm" textColor={theme.colors.onSurface}>
							Tokens describe intent (primary, surface) rather than hex values.
						</Typography>
					</Box>
					<Box
						backgroundColor="surface"
						borderRadius="lg"
						padding="md"
						style={{ flex: 1, minWidth: 220 }}
					>
						<Typography level="title-sm">Accessibility</Typography>
						<Typography level="body-sm" textColor={theme.colors.onSurface}>
							Primary combinations pass AA contrast for text and icons.
						</Typography>
					</Box>
					<Box
						backgroundColor="surface"
						borderRadius="lg"
						padding="md"
						style={{ flex: 1, minWidth: 220 }}
					>
						<Typography level="title-sm">Theme aware</Typography>
						<Typography level="body-sm" textColor={theme.colors.onSurface}>
							Tokens automatically adapt between light and dark themes.
						</Typography>
					</Box>
				</Stack>
			</Stack>

			<Stack spacing="xl">
				{colorGroups.map((group) => (
					<Stack key={group.title} spacing="md">
						<Stack spacing="xs">
							<Typography level="title-md">{group.title}</Typography>
							<Typography level="body-sm" textColor={theme.colors.onSurface}>
								{group.description}
							</Typography>
						</Stack>
						<Stack direction="row" spacing="md" useFlexGap style={{ flexWrap: "wrap" }}>
							{group.swatches.map((swatch) => (
								<Box
									key={`${group.title}-${swatch.label}`}
									padding="md"
									borderRadius="lg"
									style={{
										minWidth: 180,
										backgroundColor: swatch.value,
										borderColor: swatch.showBorder ? theme.colors.outlineVariant : "transparent",
										borderWidth: swatch.showBorder ? StyleSheet.hairlineWidth : 0,
									}}
								>
									<Typography
										level="body-sm"
										textColor={swatch.textColor ?? theme.colors.onSurface}
									>
										{swatch.label}
									</Typography>
									<Typography
										level="body-xs"
										textColor={swatch.textColor ?? theme.colors.onSurface}
										style={{ opacity: 0.72 }}
									>
										{swatch.value}
									</Typography>
								</Box>
							))}
						</Stack>
					</Stack>
				))}
			</Stack>
		</Stack>
	);
}
