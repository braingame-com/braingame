import { Platform, View } from "react-native";
import { Text } from "../../components/Text";
import { useTheme } from "../../theme";
import { getBackgroundColor, styles } from "./styles";
import type { BadgeProps } from "./types";
import { getAriaLabel } from "./utils";

export const Badge = ({
	count,
	text,
	dot,
	color = "primary",
	variant = "count",
	style,
}: BadgeProps) => {
	const { colors } = useTheme();
	const backgroundColor = getBackgroundColor(variant, color, colors);
	const content = dot ? undefined : (text ?? (count != null ? String(count) : undefined));
	const ariaLabel = getAriaLabel(variant, dot, count, text, color);

	return (
		<View
			style={[styles.base, dot && styles.dot, { backgroundColor }, style]}
			accessibilityRole="text"
			accessibilityLabel={ariaLabel}
			{...(Platform.OS === "web"
				? {
						"aria-label": ariaLabel,
						"aria-live": variant === "notification" ? "polite" : undefined,
						"aria-atomic": "true",
					}
				: {})}
		>
			{content && (
				<Text
					variant="small"
					style={styles.text}
					{...(Platform.OS === "web" ? { "aria-hidden": true } : {})}
				>
					{content}
				</Text>
			)}
		</View>
	);
};
