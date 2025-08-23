import { createBox, createText, useTheme } from "@shopify/restyle";
import { forwardRef, useState } from "react";
import { type GestureResponderEvent, Pressable, StyleSheet, View } from "react-native";
import { theme } from "../../theme";
import type { Theme } from "../../theme/theme";
import type { ListItemProps } from "./ListItemProps";

const Box = createBox<Theme>();
const ThemedText = createText<Theme>();

interface ListContext {
	size?: "sm" | "md" | "lg";
	color?: "primary" | "neutral" | "danger" | "success" | "warning";
	variant?: "plain" | "outlined" | "soft" | "solid";
	marker?: "disc" | "circle" | "square" | "decimal" | "none";
	orientation?: "horizontal" | "vertical";
	index?: number;
}

/**
 * Native implementation of ListItem component
 *
 * List items are used to represent items in a list.
 * Supports decorators, interactive states, and accessibility.
 */
export const ListItem = forwardRef<View, ListItemProps & { __listContext?: ListContext }>(
	(
		{
			children,
			color,
			variant,
			disabled = false,
			selected = false,
			nested = false,
			sticky = false,
			startAction,
			endAction,
			button = false,
			onClick,
			style,
			testID,
			role = "listitem",
			"aria-label": ariaLabel,
			"aria-describedby": ariaDescribedBy,
			"aria-labelledby": ariaLabelledBy,
			"aria-selected": ariaSelected,
			"aria-disabled": ariaDisabled,
			__listContext,
			...props
		},
		ref,
	) => {
		const restyleTheme = useTheme<Theme>();
		const [isPressed, setIsPressed] = useState(false);

		// Inherit from parent List context if not explicitly set
		const effectiveColor = color || __listContext?.color || "neutral";
		const effectiveVariant = variant || __listContext?.variant || "plain";
		const effectiveSize = __listContext?.size || "md";

		// Get variant styles from theme
		const getVariantStyles = () => {
			const variantKey =
				`${effectiveVariant}-${effectiveColor}` as keyof typeof theme.components.ListItem.variants;
			const variantStyle = theme.components.ListItem.variants[variantKey];

			if (!variantStyle) {
				// Fallback to plain-neutral
				return theme.components.ListItem.variants["plain-neutral"];
			}

			return variantStyle;
		};

		// Get size-based styles
		const getSizeStyles = () => {
			const sizes = {
				sm: {
					paddingVertical: theme.spacing.xs,
					paddingHorizontal: theme.spacing.sm,
					minHeight: 32,
					fontSize: theme.fontSizes.sm,
				},
				md: {
					paddingVertical: theme.spacing.sm,
					paddingHorizontal: theme.spacing.md,
					minHeight: 40,
					fontSize: theme.fontSizes.md,
				},
				lg: {
					paddingVertical: theme.spacing.md,
					paddingHorizontal: theme.spacing.lg,
					minHeight: 48,
					fontSize: theme.fontSizes.lg,
				},
			};

			return sizes[effectiveSize];
		};

		// Handle press events
		const handlePressIn = (_event: GestureResponderEvent) => {
			setIsPressed(true);
		};

		const handlePressOut = (_event: GestureResponderEvent) => {
			setIsPressed(false);
		};

		const handlePress = (event: GestureResponderEvent) => {
			if (!disabled && onClick) {
				onClick(event);
			}
		};

		const variantStyles = getVariantStyles();
		const sizeStyles = getSizeStyles();

		// Build item styles - ensure only React Native compatible styles
		const baseItemStyle = {
			backgroundColor: variantStyles.backgroundColor
				? restyleTheme.colors[variantStyles.backgroundColor as keyof Theme["colors"]]
				: "transparent",
			borderWidth: variantStyles.borderWidth || 0,
			borderColor: variantStyles.borderColor
				? restyleTheme.colors[variantStyles.borderColor as keyof Theme["colors"]]
				: "transparent",
			paddingVertical: sizeStyles.paddingVertical,
			paddingHorizontal: sizeStyles.paddingHorizontal,
			minHeight: sizeStyles.minHeight,
		};

		const itemStyles = [
			styles.container,
			baseItemStyle,
			nested && { paddingLeft: sizeStyles.paddingHorizontal * 2 },
			selected && styles.selected,
			disabled && styles.disabled,
			__listContext?.orientation === "horizontal" && styles.horizontal,
		].filter(Boolean);

		// Get text color
		const textColor = variantStyles.color
			? restyleTheme.colors[variantStyles.color as keyof Theme["colors"]]
			: restyleTheme.colors.onSurface;

		// Render marker if needed
		const renderMarker = () => {
			const marker = __listContext?.marker;
			if (!marker || marker === "none") return null;

			const markerSymbols = {
				disc: "•",
				circle: "◦",
				square: "▪",
				decimal: `${(__listContext?.index || 0) + 1}.`,
			};

			return (
				<ThemedText style={[styles.marker, { color: textColor, fontSize: sizeStyles.fontSize }]}>
					{markerSymbols[marker]}
				</ThemedText>
			);
		};

		// Content wrapper for interactive items
		const content = (
			<View style={styles.content}>
				{renderMarker()}
				{startAction && <Box marginRight="sm">{startAction}</Box>}
				<View style={styles.mainContent}>
					{typeof children === "string" ? (
						<ThemedText
							style={[
								{ color: textColor, fontSize: sizeStyles.fontSize },
								disabled && styles.disabledText,
							]}
						>
							{children}
						</ThemedText>
					) : (
						children
					)}
				</View>
				{endAction && <Box marginLeft="sm">{endAction}</Box>}
			</View>
		);

		// If button or has onClick, make it interactive
		if (button || onClick) {
			return (
				<Pressable
					ref={ref as any}
					onPress={handlePress}
					onPressIn={handlePressIn}
					onPressOut={handlePressOut}
					disabled={disabled}
					accessible
					accessibilityRole={button ? "button" : (role as any)}
					accessibilityLabel={ariaLabel}
					accessibilityLabelledBy={ariaLabelledBy}
					accessibilityHint={ariaDescribedBy}
					accessibilityState={{
						disabled: disabled || ariaDisabled,
						selected: selected || ariaSelected,
					}}
					testID={testID}
					style={({ pressed }) => {
						const pressedStyle = {
							opacity: disabled ? 0.6 : pressed || isPressed ? 0.8 : 1,
							transform: [{ scale: pressed || isPressed ? 0.98 : 1 }],
						};
						return [...itemStyles, pressedStyle];
					}}
					{...props}
				>
					{content}
				</Pressable>
			);
		}

		// Non-interactive item
		return (
			<View
				ref={ref}
				style={itemStyles}
				accessible
				accessibilityRole={role as any}
				accessibilityLabel={ariaLabel}
				accessibilityLabelledBy={ariaLabelledBy}
				accessibilityHint={ariaDescribedBy}
				accessibilityState={{
					disabled: disabled || ariaDisabled,
					selected: selected || ariaSelected,
				}}
				testID={testID}
				{...props}
			>
				{content}
			</View>
		);
	},
);

ListItem.displayName = "ListItem";

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: theme.radii.sm,
	},
	horizontal: {
		marginHorizontal: theme.spacing.xs,
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	mainContent: {
		flex: 1,
	},
	marker: {
		marginRight: theme.spacing.sm,
	},
	selected: {
		backgroundColor: "rgba(0, 0, 0, 0.08)",
	},
	disabled: {
		opacity: 0.6,
	},
	disabledText: {
		opacity: 0.8,
	},
});
