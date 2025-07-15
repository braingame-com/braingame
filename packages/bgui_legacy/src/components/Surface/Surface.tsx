"use client";

import type React from "react";
import { View, type ViewProps } from "react-native";
import { useTheme } from "../../theme";
import { type ElevationLevel, getElevation, getSurfaceTint } from "../../theme/elevation";

/**
 * Surface component properties
 */
export interface SurfaceProps extends ViewProps {
	/**
	 * Material 3 elevation level (0-5)
	 * Controls the shadow depth and visual hierarchy
	 *
	 * @default 0
	 */
	level?: ElevationLevel;

	/**
	 * Surface variant determines the background color
	 * - surface: Default surface color
	 * - surfaceVariant: Alternative surface for contrast
	 * - surfaceContainer: Contains other surfaces (lowest emphasis)
	 * - surfaceContainerHigh: Higher emphasis container
	 * - surfaceContainerHighest: Highest emphasis container
	 *
	 * @default "surface"
	 */
	variant?:
		| "surface"
		| "surfaceVariant"
		| "surfaceContainer"
		| "surfaceContainerHigh"
		| "surfaceContainerHighest";

	/**
	 * Whether to use surface tint instead of shadows
	 * Useful for dark themes where shadows are less visible
	 *
	 * @default false
	 */
	useTint?: boolean;

	/**
	 * Child components to render inside the surface
	 */
	children: React.ReactNode;
}

/**
 * Material 3 Surface Component
 *
 * Surface is a foundational component that provides elevation and background color.
 * It's the base for cards, sheets, dialogs, and other elevated components.
 *
 * @example
 * ```tsx
 * // Basic elevated surface
 * <Surface level={1}>
 *   <Text>Content</Text>
 * </Surface>
 *
 * // Card-like surface with variant
 * <Surface level={1} variant="surfaceVariant" style={styles.card}>
 *   <Text>Card Content</Text>
 * </Surface>
 *
 * // Surface with tint for dark mode
 * <Surface level={3} useTint>
 *   <Text>Dialog Content</Text>
 * </Surface>
 * ```
 */
export function Surface({
	level = 0,
	variant = "surface",
	useTint = false,
	style,
	children,
	...props
}: SurfaceProps) {
	const { colors, dark } = useTheme();

	// Get the appropriate background color
	const backgroundColor = colors[variant];

	// Get elevation styles
	const elevationStyle = getElevation(level);

	// Calculate surface tint if needed
	const tintStyle =
		useTint && level > 0
			? {
					backgroundColor: getSurfaceTint(level, colors.primary),
				}
			: {};

	// In dark mode, we might want to lighten the surface based on elevation
	const darkModeElevation =
		dark && level > 0
			? {
					backgroundColor: `${backgroundColor}${Math.round(level * 10).toString(16)}`, // Slight opacity increase
				}
			: {};

	return (
		<View
			style={[
				{
					backgroundColor,
					// Base surface styles
					overflow: "hidden", // Ensures children don't break shadow
				},
				elevationStyle,
				darkModeElevation,
				tintStyle,
				style,
			]}
			{...props}
		>
			{children}
		</View>
	);
}
