import { Platform } from "react-native";

/**
 * Material 3 Elevation System
 *
 * Elevation creates visual hierarchy through shadows and surface tints.
 * M3 defines 6 elevation levels (0-5), each with specific use cases.
 *
 * @see https://m3.material.io/styles/elevation
 */

/**
 * Native elevation styles for React Native (iOS/Android)
 * Each level includes both iOS shadow properties and Android elevation
 */
export const elevation = {
	level0: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0,
		shadowRadius: 0,
		elevation: 0,
	},
	level1: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.15,
		shadowRadius: 1.0,
		elevation: 1,
	},
	level2: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 3,
	},
	level3: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 6,
	},
	level4: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 4.65,
		elevation: 8,
	},
	level5: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.35,
		shadowRadius: 5.46,
		elevation: 12,
	},
} as const;

/**
 * Web elevation styles using box-shadow
 */
const webElevation = {
	level0: "none",
	level1: "0px 1px 2px rgba(0, 0, 0, 0.15)",
	level2: "0px 1px 3px rgba(0, 0, 0, 0.20)",
	level3: "0px 3px 6px rgba(0, 0, 0, 0.25)",
	level4: "0px 4px 8px rgba(0, 0, 0, 0.30)",
	level5: "0px 6px 12px rgba(0, 0, 0, 0.35)",
} as const;

/**
 * M3 Elevation levels with semantic naming
 */
export type ElevationLevel = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Get platform-specific elevation styles
 *
 * @param level - M3 elevation level (0-5)
 * @returns Platform-specific shadow/elevation styles
 *
 * @example
 * ```tsx
 * const cardStyle = {
 *   ...getElevation(1),
 *   backgroundColor: colors.surface,
 * };
 * ```
 */
export function getElevation(level: ElevationLevel) {
	if (Platform.OS === "web") {
		return { boxShadow: webElevation[`level${level}`] };
	}
	return elevation[`level${level}`];
}

/**
 * Material 3 Surface Tint
 * Creates depth through color instead of shadows (useful for dark themes)
 *
 * @param level - Elevation level (0-5)
 * @param primaryColor - The primary color to use for tinting
 * @returns RGBA color string with appropriate opacity
 */
export function getSurfaceTint(level: ElevationLevel, primaryColor: string): string {
	const opacity = level * 0.05; // 5% per level

	// Convert hex to RGB if needed
	if (primaryColor.startsWith("#")) {
		const hex = primaryColor.slice(1);
		const r = Number.parseInt(hex.slice(0, 2), 16);
		const g = Number.parseInt(hex.slice(2, 4), 16);
		const b = Number.parseInt(hex.slice(4, 6), 16);
		return `rgba(${r}, ${g}, ${b}, ${opacity})`;
	}

	// Assume it's already in a usable format
	return primaryColor;
}

/**
 * Component elevation recommendations from M3
 */
export const componentElevation = {
	// Cards
	card: 1 as ElevationLevel,
	cardHover: 2 as ElevationLevel,
	cardDragging: 4 as ElevationLevel,

	// Buttons
	buttonFilled: 0 as ElevationLevel,
	buttonElevated: 1 as ElevationLevel,
	buttonElevatedHover: 2 as ElevationLevel,

	// FAB
	fab: 3 as ElevationLevel,
	fabPressed: 4 as ElevationLevel,

	// Dialogs & Sheets
	dialog: 3 as ElevationLevel,
	bottomSheet: 3 as ElevationLevel,

	// Navigation
	appBar: 0 as ElevationLevel,
	appBarScrolled: 2 as ElevationLevel,

	// Menus
	menu: 2 as ElevationLevel,
	tooltip: 0 as ElevationLevel, // Uses surface tint instead
} as const;
