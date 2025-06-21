import { textStyles } from "@braingame/utils";
import { Link as ExpoLink } from "expo-router";
import { Linking, Platform, Pressable } from "react-native";
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
			if (external || Platform.OS !== "web") {
				Linking.openURL(href);
			}
		}
	};

	const text = <Text type="link">{children}</Text>;
	const style = [textStyles.link, variant === "standalone" && styles.standalone];

	if (href && !external && Platform.OS === "web") {
		return (
			<ExpoLink href={href} aria-label={label} style={style} {...rest}>
				{children}
			</ExpoLink>
		);
	}

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
