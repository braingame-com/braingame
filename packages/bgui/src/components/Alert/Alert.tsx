import { useThemeColor } from "@braingame/utils";
import { Pressable, Text, View } from "react-native";
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
				variant === "floating" && { elevation: 4 },
				style,
			]}
		>
			<View style={styles.content}>
				{title ? <Text style={[styles.title, { color: textColor }]}>{title}</Text> : null}
				<Text style={{ color: textColor }}>{message}</Text>
			</View>
			{actions && <View style={styles.actions}>{actions}</View>}
			{dismissible && (
				<Pressable accessibilityLabel="Dismiss" onPress={onDismiss}>
					<Icon name="xmark" size={16} color="text" />
				</Pressable>
			)}
		</View>
	);
}
