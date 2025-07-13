import { useThemeColor } from "@braingame/utils";
import { useEffect, useId, useRef, useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { DEFAULT_TOOLTIP_DELAY } from "../../constants";
import { useMountedState } from "../../hooks/useMountedState";
import { getTooltipBackgroundColor, getTooltipTextColor, styles } from "./styles";
import type { TooltipProps } from "./types";

export const Tooltip = ({
	content,
	children,
	placement = "top",
	delay = DEFAULT_TOOLTIP_DELAY,
	variant = "dark",
	disabled = false,
}: TooltipProps) => {
	const [visible, setVisible] = useState(false);
	const timeoutRef = useRef<number | undefined>(undefined);
	const tooltipId = useId();
	const isMounted = useMountedState();

	const show = () => {
		if (disabled) return;
		timeoutRef.current = window.setTimeout(() => {
			if (isMounted()) {
				setVisible(true);
			}
		}, delay);
	};

	const hide = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		if (isMounted()) {
			setVisible(false);
		}
	};

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	// Handle keyboard interactions
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (Platform.OS === "web" && e.key === "Escape" && visible) {
			hide();
		}
	};

	const cardColor = useThemeColor("card");
	const textColor = useThemeColor("text");
	const backgroundColor = getTooltipBackgroundColor(variant, cardColor);
	const resolvedTextColor = getTooltipTextColor(variant, textColor);

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
							onKeyDown: handleKeyDown as React.KeyboardEventHandler,
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
						<Text style={[styles.text, { color: resolvedTextColor }]}>{content}</Text>
					) : (
						content
					)}
				</View>
			)}
		</View>
	);
};
