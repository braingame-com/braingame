import { Platform } from "react-native";
import type { LinkProps } from "./types";

// Platform-specific imports and implementations
let LinkImplementation: React.ComponentType<LinkProps>;

if (Platform.OS === "web") {
	const WebLink = require("./Link.web").Link;
	LinkImplementation = WebLink;
} else {
	const NativeLink = require("./Link.native").Link;
	LinkImplementation = NativeLink;
}

/**
 * Link component for navigation and external URLs.
 * Handles internal routing and external links with proper accessibility.
 *
 * @example
 * ```tsx
 * // Internal navigation link
 * <Link href="/settings">Go to Settings</Link>
 *
 * // External link
 * <Link
 *   href="https://example.com"
 *   external
 * >
 *   Visit our website
 * </Link>
 *
 * // Custom press handler
 * <Link
 *   onPress={() => {
 *     analytics.track('link_clicked');
 *     navigate('/dashboard');
 *   }}
 * >
 *   Dashboard
 * </Link>
 *
 * // Standalone variant
 * <Link
 *   href="/docs"
 *   variant="standalone"
 * >
 *   View Documentation
 * </Link>
 *
 * // Disabled link
 * <Link
 *   href="/premium"
 *   disabled
 * >
 *   Premium Features (Coming Soon)
 * </Link>
 *
 * // Link with custom content
 * <Link href="/profile" aria-label="View profile">
 *   <View style={{ flexDirection: 'row' }}>
 *     <Icon name="user" />
 *     <Text>Profile</Text>
 *   </View>
 * </Link>
 * ```
 *
 * @component
 */
export const Link = (props: LinkProps) => {
	const Component = LinkImplementation as React.FC<LinkProps>;
	return <Component {...props} />;
};
