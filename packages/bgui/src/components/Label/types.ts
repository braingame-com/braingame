import type { ReactNode } from "react";
import type { TextStyle } from "react-native";

/**
 * Props for the Label component
 */
export interface LabelProps {
	/**
	 * Label text or content.
	 * Typically descriptive text for form fields.
	 */
	children: ReactNode;

	/**
	 * ID of the form element this label describes.
	 * Creates proper label-input association.
	 */
	htmlFor?: string;

	/**
	 * Whether to show a required indicator (*).
	 * Visual cue for mandatory fields.
	 * @default false
	 */
	required?: boolean;

	/**
	 * Text size variant.
	 * - "sm": Small text
	 * - "md": Medium text
	 * - "lg": Large text
	 * @default "md"
	 */
	size?: "sm" | "md" | "lg";

	/**
	 * Label display variant.
	 * - "standard": Normal label positioning
	 * - "floating": Animated floating label
	 * @default "standard"
	 */
	variant?: "standard" | "floating";

	/**
	 * Additional text styles to apply.
	 */
	style?: TextStyle;
}
