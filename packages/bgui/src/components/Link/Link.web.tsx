import { textStyles } from "@braingame/utils";
import { Pressable } from "react-native";
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
			if (external) {
				// Use window.open for external links
				window.open(href, "_blank", "noopener,noreferrer");
			} else {
				// Use window.location for internal navigation
				window.location.href = href;
			}
		}
	};

	return (
		<Pressable
			onPress={handlePress}
			disabled={disabled}
			style={({ pressed }) => [
				styles.container,
				variant === "standalone" && styles.standalone,
				pressed && styles.pressed,
				disabled && styles.disabled,
			]}
			accessibilityRole="link"
			accessibilityLabel={label}
			// @ts-ignore - Web-specific props
			role="link"
			aria-label={label}
			{...rest}
		>
			<Text
				variant={variant === "inline" ? "body" : "bodyStrong"}
				style={[textStyles.link, disabled && textStyles.disabled]}
			>
				{children}
			</Text>
		</Pressable>
	);
};
