import { useThemeColor } from "@braingame/utils";
import { useEffect, useState } from "react";
import { AccessibilityInfo, Pressable } from "react-native";
import { Text } from "../Text";
import { View as BView } from "../View";
import { DEFAULT_DURATION, styles, typeColorMap } from "./styles";
import type { ToastProps } from "./types";

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
		<BView
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
		</BView>
	);
};
