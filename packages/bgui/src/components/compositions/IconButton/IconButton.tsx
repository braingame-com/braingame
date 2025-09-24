import { forwardRef, useMemo } from "react";
import { type StyleProp, StyleSheet, type View, type ViewStyle } from "react-native";
import { theme } from "../../../theme";
import { Box } from "../../primitives/Box";
import { Button } from "../../primitives/Button";
import { CircularProgress } from "../../primitives/CircularProgress";
import { Icon } from "../../primitives/Icon";
import type { IconButtonProps } from "./IconButton.types";

const ZERO_WIDTH_SPACE = "\u200B";

const ICON_BUTTON_SIZES = {
	sm: {
		dimension: 32,
		iconSize: 18,
		padding: theme.spacing.xs,
		borderRadius: theme.radii.sm,
		spinnerSize: "sm" as const,
	},
	md: {
		dimension: 40,
		iconSize: 22,
		padding: theme.spacing.sm,
		borderRadius: theme.radii.md,
		spinnerSize: "sm" as const,
	},
	lg: {
		dimension: 48,
		iconSize: 26,
		padding: theme.spacing.md,
		borderRadius: theme.radii.lg,
		spinnerSize: "md" as const,
	},
} as const;

type SizeKey = keyof typeof ICON_BUTTON_SIZES;

const resolveThemeColor = (value?: string) => {
	if (!value) return undefined;
	return theme.colors[value as keyof typeof theme.colors] ?? value;
};

const styles = StyleSheet.create({
	button: {
		justifyContent: "center",
		alignItems: "center",
	},
	decorator: {
		justifyContent: "center",
		alignItems: "center",
	},
});

export const IconButton = forwardRef<View, IconButtonProps>(
	(
		{
			children,
			color = "neutral",
			iconName,
			iconSize,
			loading = false,
			loadingIndicator,
			loadingPosition = "center",
			size = "md",
			style,
			variant = "plain",
			fullWidth,
			...buttonProps
		},
		ref,
	) => {
		const sizeTokens = ICON_BUTTON_SIZES[size as SizeKey];

		if (process.env.NODE_ENV !== "production" && !buttonProps["aria-label"]) {
			console.warn("IconButton requires an accessible `aria-label` for assistive technologies.");
		}

		const variantKey = `${variant}-${color}` as keyof typeof theme.components.IconButton.variants;
		const variantTokens =
			theme.components.IconButton.variants[variantKey] ??
			theme.components.IconButton.variants["plain-neutral"];
		const resolvedIconColor = resolveThemeColor(variantTokens.color) ?? theme.colors.onSurface;

		const computedIconSize = iconSize ?? sizeTokens.iconSize;

		const iconContent = useMemo(() => {
			if (children) {
				return children;
			}

			if (iconName) {
				return <Icon name={iconName} size={computedIconSize} color={resolvedIconColor} />;
			}

			return null;
		}, [children, iconName, computedIconSize, resolvedIconColor]);

		const shouldHideDecorator = loading && loadingPosition === "center";

		const horizontalPadding = Math.max(sizeTokens.padding - theme.spacing.xs, 0);
		const buttonStyle = [
			styles.button,
			{
				width: fullWidth ? "100%" : sizeTokens.dimension,
				minWidth: fullWidth ? "100%" : sizeTokens.dimension,
				height: sizeTokens.dimension,
				paddingHorizontal: horizontalPadding,
				paddingVertical: horizontalPadding,
				borderRadius: sizeTokens.borderRadius,
			},
			style,
		].filter(Boolean) as StyleProp<ViewStyle>;

		const resolvedLoadingIndicator = loadingIndicator ?? (
			<CircularProgress
				size={sizeTokens.spinnerSize}
				color={variant === "solid" ? "neutral" : color}
				variant={variant === "solid" ? "plain" : "soft"}
			/>
		);

		const startDecorator = iconContent ? (
			<Box
				style={[
					styles.decorator,
					{
						width: computedIconSize,
						height: computedIconSize,
						marginRight: -theme.spacing.xs,
					},
				]}
			>
				{iconContent}
			</Box>
		) : null;

		return (
			<Button
				ref={ref}
				color={color}
				variant={variant}
				size={size}
				fullWidth={fullWidth}
				loading={loading}
				loadingIndicator={resolvedLoadingIndicator}
				loadingPosition={loadingPosition}
				startDecorator={shouldHideDecorator ? null : startDecorator}
				style={buttonStyle}
				{...buttonProps}
			>
				{ZERO_WIDTH_SPACE}
			</Button>
		);
	},
);

IconButton.displayName = "IconButton";
