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

export interface TextProps extends Omit<RNTextProps, "style"> {
	children: ReactNode;
	variant?: TextVariant;
	color?: ThemeColor;
	align?: "left" | "center" | "right";
	numberOfLines?: number;
	mono?: boolean; // Support for monospace variant from bg1
	style?: StyleProp<TextStyle>;
}
