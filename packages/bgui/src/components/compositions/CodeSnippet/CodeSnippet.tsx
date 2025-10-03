import { memo, useMemo } from "react";
import { Platform, StyleSheet, type ViewStyle } from "react-native";
import { useTheme } from "../../../theme";
import { Box } from "../../primitives/Box";
import { Typography } from "../../primitives/Typography";
import type { CodeSnippetProps } from "./CodeSnippet.types";

const monospaceFamily = Platform.select({
	ios: "Menlo",
	android: "monospace",
	default: "Roboto Mono, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
});

export const CodeSnippet = memo(function CodeSnippet({
	code,
	language,
	caption,
	style,
	testID,
}: CodeSnippetProps) {
	const theme = useTheme();

	const containerStyle = useMemo(
		() =>
			StyleSheet.flatten<ViewStyle>([
				{
					borderRadius: theme.radii.lg,
					borderColor: theme.colors.outlineVariant,
					borderWidth: StyleSheet.hairlineWidth,
					backgroundColor: theme.colors.surfaceContainerLow,
					padding: theme.spacing.md,
					gap: theme.spacing.sm,
				},
				style,
			]),
		[
			style,
			theme.colors.outlineVariant,
			theme.colors.surfaceContainerLow,
			theme.radii.lg,
			theme.spacing.md,
			theme.spacing.sm,
		],
	);

	const codeStyle = useMemo(() => {
		const base = {
			fontFamily: monospaceFamily ?? "monospace",
			fontSize: theme.fontSizes.sm,
			lineHeight: theme.fontSizes.sm * 1.6,
			color: theme.colors.onSurface,
		} as const;

		const webStyles =
			Platform.OS === "web"
				? ({
						whiteSpace: "pre-wrap",
						wordBreak: "break-word",
					} as Record<string, unknown>)
				: {};

		return StyleSheet.create({
			code: {
				...base,
				...webStyles,
			},
		});
	}, [theme.colors.onSurface, theme.fontSizes.sm]);

	return (
		<Box testID={testID} style={containerStyle}>
			{caption ? (
				<Typography level="body-sm" textColor={theme.colors.onSurfaceVariant}>
					{caption}
					{language ? (
						<Typography
							level="body-sm"
							component="span"
							textColor={theme.colors.onSurfaceVariant}
							style={{ marginLeft: theme.spacing.xs }}
						>
							({language})
						</Typography>
					) : null}
				</Typography>
			) : null}
			<Typography component="pre" style={codeStyle.code} accessibilityRole="text">
				{code}
			</Typography>
		</Box>
	);
});
