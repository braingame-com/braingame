import type { ReactNode } from "react";
import type { TextProps as RNTextProps, StyleProp, TextStyle } from "react-native";

export type ThemeColor = "primary" | "secondary" | "danger" | "neutral" | "success" | "warning";

/**
 * Enhanced text variants combining bg1's typography hierarchy with current system
 * Provides semantic naming while maintaining backward compatibility
 */
export type TextVariant =
	// Legacy variants (maintained for backward compatibility)
	| "h1"
	| "h2"
	| "h3"
	| "body"
	| "caption"
	// Enhanced variants from bg1 (semantic, enterprise-grade naming)
	| "displayTitle" // Largest - hero text (replaces h1)
	| "title" // Main page titles (replaces h2)
	| "heading" // Section headings (replaces h3)
	| "subtitle" // Subheadings
	| "bold" // Emphasized body text
	| "text" // Default body text (same as body)
	| "secondaryText" // De-emphasized body text
	| "small" // Small text (same as caption)
	| "smallThin"; // Smallest, lightest text

/**
 * Props for the Text component
 */
export interface TextProps extends Omit<RNTextProps, "style"> {
	/**
	 * The text content to display.
	 * Can be a string or any React node.
	 */
	children: ReactNode;

	/**
	 * Typography variant that determines font size and weight.
	 * - Display variants: "displayTitle", "title", "heading", "subtitle"
	 * - Body variants: "body", "bold", "text", "secondaryText"
	 * - Small variants: "caption", "small", "smallThin"
	 * - Legacy variants: "h1", "h2", "h3" (maintained for backward compatibility)
	 * @default "body"
	 */
	variant?: TextVariant;

	/**
	 * Predefined color from the theme.
	 * - "primary": Primary brand color
	 * - "secondary": Secondary brand color
	 * - "danger": Error/destructive color
	 * - "success": Success/positive color
	 * - "warning": Warning/caution color
	 * - "neutral": Neutral gray color
	 * @default Uses theme's default text color
	 */
	color?: ThemeColor;

	/**
	 * Text alignment within its container.
	 * @default "left"
	 */
	align?: "left" | "center" | "right";

	/**
	 * Maximum number of lines before truncating with ellipsis.
	 * Useful for preventing text overflow in constrained layouts.
	 */
	numberOfLines?: number;

	/**
	 * Whether to use monospace font family.
	 * Useful for displaying code or maintaining character alignment.
	 * @default false
	 */
	mono?: boolean;

	/**
	 * Additional styles to apply to the text.
	 * Can override default variant styles.
	 */
	style?: StyleProp<TextStyle>;
}
