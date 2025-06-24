import { Platform } from "react-native";
import type { IconProps } from "./types";

// Platform-specific imports and implementations
let IconImplementation: React.ComponentType<IconProps>;

if (Platform.OS === "web") {
	const WebIcon = require("./Icon.web").Icon;
	IconImplementation = WebIcon;
} else {
	const NativeIcon = require("./Icon.native").Icon;
	IconImplementation = NativeIcon;
}

/**
 * Icon component using FontAwesome 6 icons.
 * Supports different variants, sizes, and theme colors.
 *
 * @example
 * ```tsx
 * // Basic icon
 * <Icon name="home" />
 *
 * // With size and color
 * <Icon name="star" size="lg" color="primary" />
 *
 * // Custom size in pixels
 * <Icon name="heart" size={32} color="danger" />
 *
 * // Decorative icon (hidden from screen readers)
 * <Icon name="chevron-right" decorative />
 *
 * // Icon with accessibility label
 * <Icon name="trash" aria-label="Delete item" />
 *
 * // Brand icon
 * <Icon name="github" variant="brand" />
 * ```
 *
 * @see https://fontawesome.com/icons for available icon names
 * @component
 */
export function Icon(props: IconProps) {
	const Component = IconImplementation as React.FC<IconProps>;
	return <Component {...props} />;
}
