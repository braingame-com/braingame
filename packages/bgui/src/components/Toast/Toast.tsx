import { useEffect, useState } from "react";
import { AccessibilityInfo, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../../../utils/constants/Colors";
import { Tokens } from "../../../../utils/constants/Tokens";
import { useThemeColor } from "../../../../utils/hooks/useThemeColor";
import { Text } from "../../../Text";
import { View } from "../../../View";
import type { ToastProps } from "./types";

const DEFAULT_DURATION = 3000;

const typeColorMap = {
	success: Colors.universal.positive,
	warning: Colors.universal.warn,
	error: Colors.universal.negative,
	info: Colors.universal.primary,
};

export const Toast = ({
	message,
	type = "info",
	duration = DEFAULT_DURATION,
	actionLabel,
	onActionPress,
	variant = "simple",
}: ToastProps) => {
	const [visible, setVisible] = useState(true);
	const backgroundColor = typeColorMap[type];
	const textColor = useThemeColor("text");

	useEffect(() => {
		AccessibilityInfo.announceForAccessibility(message);
		const id = setTimeout(() => setVisible(false), duration);
		return () => clearTimeout(id);
	}, [duration, message]);

	if (!visible) return null;

	return (
		<View
			style={[styles.container, { backgroundColor }]}
			accessibilityLiveRegion="polite"
			accessibilityRole="alert"
		>
			<Text style={[styles.message, { color: textColor }]}>{message}</Text>
			{variant === "with-action" && actionLabel && onActionPress && (
				<Pressable onPress={onActionPress} style={styles.actionButton}>
					<Text style={[styles.actionText, { color: textColor }]}>{actionLabel}</Text>
				</Pressable>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: Tokens.m,
		paddingVertical: Tokens.s,
		borderRadius: Tokens.s,
		margin: Tokens.s,
	},
	message: {
		flex: 1,
		marginRight: Tokens.s,
	},
	actionButton: {
		paddingHorizontal: Tokens.s,
		paddingVertical: Tokens.xs,
	},
	actionText: {
		fontWeight: "600",
	},
});
