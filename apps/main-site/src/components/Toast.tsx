"use client";

import { Text } from "@braingame/bgui";
import { useCallback, useEffect, useRef } from "react";
import type { ViewStyle } from "react-native";
import { Animated } from "react-native";

export interface ToastProps {
	message: string;
	type?: "success" | "error" | "warning" | "info";
	duration?: number;
	onDismiss?: () => void;
	position?: "top" | "bottom";
}

const typeColors = {
	success: "#22c55e",
	error: "#ef4444",
	warning: "#f59e0b",
	info: "#3b82f6",
};

const typeIcons = {
	success: "✓",
	error: "✕",
	warning: "⚠",
	info: "ℹ",
};

export function Toast({
	message,
	type = "info",
	duration = 3000,
	onDismiss,
	position = "bottom",
}: ToastProps) {
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const slideAnim = useRef(new Animated.Value(position === "top" ? -100 : 100)).current;

	const dismissToast = useCallback(() => {
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
			}),
			Animated.timing(slideAnim, {
				toValue: position === "top" ? -100 : 100,
				duration: 200,
				useNativeDriver: true,
			}),
		]).start(() => {
			onDismiss?.();
		});
	}, [fadeAnim, onDismiss, position, slideAnim]);

	useEffect(() => {
		// Animate in
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}),
		]).start();

		// Auto dismiss
		const timer = setTimeout(() => {
			dismissToast();
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, fadeAnim, slideAnim, dismissToast]);

	const containerStyle: ViewStyle = {
		position: "absolute",
		left: 20,
		right: 20,
		[position]: 40,
		backgroundColor: "#1a1a1a",
		borderRadius: 12,
		borderWidth: 1,
		borderColor: typeColors[type],
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 8,
		paddingHorizontal: 16,
		paddingVertical: 12,
		flexDirection: "row",
		alignItems: "center",
		opacity: fadeAnim,
		transform: [{ translateY: slideAnim }],
	};

	return (
		<Animated.View style={containerStyle}>
			<Text
				style={{
					color: typeColors[type],
					fontSize: 20,
					marginRight: 12,
				}}
			>
				{typeIcons[type]}
			</Text>
			<Text
				level="body-md"
				style={{
					flex: 1,
					color: "#fff",
				}}
			>
				{message}
			</Text>
		</Animated.View>
	);
}
