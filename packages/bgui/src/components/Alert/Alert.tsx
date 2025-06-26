import { useThemeColor } from "@braingame/utils";
import type React from "react";
import { Pressable, Text, View } from "react-native";
import { FLOATING_ALERT_ELEVATION } from "../../constants";
import { Icon } from "../Icon";
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
	const textColor = useThemeColor("text");
	const backgroundColor = typeColorMap[type];

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
					<Icon name="xmark" size={16} color="text" />
				</Pressable>
			)}
		</View>
	);
}
