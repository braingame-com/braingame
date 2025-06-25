import { textStyles } from "@braingame/utils";
import { Linking, Pressable } from "react-native";
import { Text } from "../Text";
import { styles } from "./styles";
import type { LinkProps } from "./types";

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

	const handlePress = () => {
		if (disabled) return;
		if (onPress) {
			onPress();
			return;
		}
		if (href) {
			// Native always uses Linking.openURL for all URLs
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
