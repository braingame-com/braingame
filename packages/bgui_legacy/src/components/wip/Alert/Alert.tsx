import type React from "react";
import { Pressable, Text, View } from "react-native";
import { Icon } from "../../components/Icon";
import { FLOATING_ALERT_ELEVATION } from "../../constants";
import { useTheme } from "../../theme";
import { styles, typeColorMap } from "./styles";
import type { AlertProps } from "./types";

export function Alert({
	title,
	message,
	type = "info",
	actions,
	dismissible = false,
	onDismiss,
	variant = "banner",
	style,
}: AlertProps) {
	const { colors } = useTheme();
	const textColor = colors.onSurface;
	const backgroundColor = typeColorMap(colors)[type];

	return (
		<View
			accessibilityRole="alert"
			style={[
				styles.container,
				{ backgroundColor },
				variant === "inline" && { borderRadius: 0 },
				variant === "floating" && { elevation: FLOATING_ALERT_ELEVATION },
				style,
			]}
		>
			<View style={styles.content}>
				{title ? <Text style={[styles.title, { color: textColor }]}>{title}</Text> : null}
				<Text style={{ color: textColor }}>{message}</Text>
			</View>
			{actions && <View style={styles.actions}>{actions as React.ReactNode}</View>}
			{dismissible && (
				<Pressable accessibilityLabel="Dismiss" onPress={onDismiss}>
					<Icon name="close" size={16} color="text" />
				</Pressable>
			)}
		</View>
	);
}
