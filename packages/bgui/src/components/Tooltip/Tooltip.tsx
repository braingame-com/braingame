import { Colors, Tokens, useThemeColor } from "@braingame/utils";
import { ReactNode, useId, useRef, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import type { TooltipProps } from "./types";

export const Tooltip = ({
	content,
	children,
	placement = "top",
	delay = 300,
	variant = "dark",
	disabled = false,
}: TooltipProps) => {
	const [visible, setVisible] = useState(false);
	const timeoutRef = useRef<number>();
	const tooltipId = useId();

	const show = () => {
		if (disabled) return;
		timeoutRef.current = window.setTimeout(() => setVisible(true), delay);
	};

	const hide = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setVisible(false);
	};

	// Handle keyboard interactions
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (Platform.OS === "web" && e.key === "Escape" && visible) {
			hide();
		}
	};

	const backgroundColor =
		variant === "light"
			? useThemeColor("card")
			: variant === "info"
				? Colors.universal.primary
				: "rgba(0,0,0,0.85)";

	const textColor = variant === "dark" ? "#fff" : useThemeColor("text");

	return (
		<View style={styles.container}>
			<Pressable
				onHoverIn={show}
				onHoverOut={hide}
				onFocus={show}
				onBlur={hide}
				{...(Platform.OS === "web"
					? {
							"aria-describedby": visible ? tooltipId : undefined,
							tabIndex: 0,
							onKeyDown: handleKeyDown as any,
						}
					: {})}
			>
				{children}
			</Pressable>
			{visible && (
				<View
					nativeID={tooltipId}
					{...(Platform.OS === "web"
						? {
								id: tooltipId,
								role: "tooltip",
								"aria-live": "polite",
								"aria-hidden": !visible,
							}
						: {})}
					style={[styles.base, styles[placement], { backgroundColor }]}
					accessibilityRole="text"
					accessibilityLiveRegion="polite"
				>
					{typeof content === "string" ? (
						<Text style={[styles.text, { color: textColor }]}>{content}</Text>
					) : (
						content
					)}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "relative",
		alignSelf: "flex-start",
	},
	base: {
		position: "absolute",
		paddingHorizontal: Tokens.s,
		paddingVertical: Tokens.xs,
		borderRadius: Tokens.xs,
		maxWidth: 200,
		zIndex: 999,
	},
	text: {
		fontSize: Tokens.s,
	},
	top: {
		bottom: "100%",
		marginBottom: Tokens.xs,
	},
	bottom: {
		top: "100%",
		marginTop: Tokens.xs,
	},
	left: {
		right: "100%",
		marginRight: Tokens.xs,
	},
	right: {
		left: "100%",
		marginLeft: Tokens.xs,
	},
});

export default Tooltip;
