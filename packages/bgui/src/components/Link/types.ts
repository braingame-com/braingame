import type React from "react";
import type { PressableProps, ViewStyle } from "react-native";

/**
 * Props for the Link component
 */
export interface LinkProps
	extends Omit<PressableProps, "children" | "onPress" | "disabled" | "style"> {
	/**
	 * Link text or content.
	 * Can be text or custom React elements.
	 */
	children: React.ReactNode;

	/**
	 * Target URL for the link.
	 * Can be internal route or external URL.
	 */
	href?: string;

	/**
	 * Custom press handler.
	 * Overrides default navigation behavior.
	 */
	onPress?: () => void;

	/**
	 * Whether link opens in new window/tab.
	 * Adds "opens in new window" to accessibility label.
	 * @default false
	 */
	external?: boolean;

	/**
	 * Whether the link is disabled.
	 * Disabled links have reduced opacity and ignore interactions.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Visual style variant.
	 * - "inline": Text link within content
	 * - "standalone": Prominent link with padding
	 * @default "inline"
	 */
	variant?: "inline" | "standalone";

	/**
	 * Accessibility label for the link.
	 * Describes the link destination or purpose.
	 */
	"aria-label"?: string;

	/**
	 * Additional styles to apply to the link.
	 */
	style?: ViewStyle;
}
