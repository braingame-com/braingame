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

		if (href && typeof window !== "undefined") {
			if (external) {
				// Use window.open for external links
				window.open(href, "_blank", "noopener,noreferrer");
			} else {
				// For internal links, check if we have expo-router available
				try {
					const router = require("expo-router").router;
					if (router?.push) {
						router.push(href);
						return;
					}
				} catch (_e) {
					// expo-router not available, fall back to window.location
				}
				// Use window.location for internal navigation as fallback
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
			// biome-ignore lint/a11y/useSemanticElements: will be fixed in accessibility PR
			role="link"
			aria-label={label}
			{...rest}
		>
			<Text
				variant={variant === "inline" ? "body" : "bold"}
				style={[textStyles.link, disabled && styles.disabled]}
			>
				{children}
			</Text>
		</Pressable>
	);
};
