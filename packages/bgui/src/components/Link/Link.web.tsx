import { textStyles } from "@braingame/utils";
import { Linking, Pressable } from "react-native";
import { Text } from "../Text";
import { styles } from "./styles";
import type { LinkProps } from "./types";

// Check if we're in an Expo environment with expo-router
let ExpoLink: any;
try {
	ExpoLink = require("expo-router").Link;
} catch (e) {
	// expo-router not available
}

export const Link = ({
	children,
	href,
	onPress,
	external = false,
	disabled = false,
	variant = "inline",
	"aria-label": ariaLabel,
	...rest
}: LinkProps) => {
	const label = external && ariaLabel ? `${ariaLabel} (opens in new window)` : ariaLabel;

	// For web, determine if this is an internal or external link
	const isInternalLink = href && !external && !href.startsWith("http") && !href.startsWith("//");

	// If we have expo-router and it's an internal link, use expo-router's Link
	if (ExpoLink && isInternalLink && href && !onPress) {
		return (
			<ExpoLink
				href={href}
				asChild
				accessibilityRole="link"
				accessibilityLabel={label}
				disabled={disabled}
			>
				<Pressable
					style={[textStyles.link, variant === "standalone" && styles.standalone]}
					{...rest}
				>
					<Text>{children}</Text>
				</Pressable>
			</ExpoLink>
		);
	}

	// Otherwise, use standard Pressable with Linking.openURL
	const handlePress = () => {
		if (disabled) return;
		if (onPress) {
			onPress();
			return;
		}
		if (href) {
			// For external links or when expo-router is not available
			Linking.openURL(href);
		}
	};

	const text = <Text>{children}</Text>;
	const style = [textStyles.link, variant === "standalone" && styles.standalone];

	return (
		<Pressable
			accessibilityRole="link"
			accessibilityLabel={label}
			onPress={handlePress}
			disabled={disabled}
			style={style}
			{...rest}
		>
			{text}
		</Pressable>
	);
};
