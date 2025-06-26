import { useThemeColor } from "@braingame/utils";
import type React from "react";
import { Pressable, Text, View } from "react-native";
import { FLOATING_ALERT_ELEVATION } from "../../constants";
import { Icon } from "../Icon";
import { styles, typeColorMap } from "./styles";
import type { AlertProps } from "./types";

/**
 * Alert component for displaying important messages to users.
 * Supports different types, variants, and optional actions.
 *
 * @example
 * ```tsx
 * // Basic info alert
 * <Alert
 *   title="Information"
 *   message="This is an informational message."
 * />
 *
 * // Error alert with action
 * <Alert
 *   type="error"
 *   title="Error"
 *   message="Something went wrong."
 *   actions={[
 *     { label: "Retry", onPress: handleRetry },
 *     { label: "Cancel", onPress: handleCancel }
 *   ]}
 * />
 *
 * // Dismissible success alert
 * <Alert
 *   type="success"
 *   title="Success!"
 *   message="Your changes have been saved."
 *   dismissible
 *   onDismiss={() => setShowAlert(false)}
 * />
 *
 * // Inline warning alert
 * <Alert
 *   type="warning"
 *   variant="inline"
 *   message="Please review before continuing."
 * />
 *
 * // Floating alert
 * <Alert
 *   type="info"
 *   variant="floating"
 *   title="New Feature"
 *   message="Check out our latest update!"
 * />
 * ```
 *
 * @component
 */

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
