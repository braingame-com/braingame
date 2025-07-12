import { type ButtonProps, Text, View } from "@braingame/bgui";
import { useEffect, useRef } from "react";
import { Animated, Pressable } from "react-native";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "icon";

interface AnimatedButtonProps extends Omit<ButtonProps, "onPress"> {
	onPress?: () => void;
	children: React.ReactNode;
	ripple?: boolean;
}

export function AnimatedButton({
	onPress,
	children,
	variant = "primary",
	size = "md",
	disabled,
	loading,
	ripple = true,
}: AnimatedButtonProps) {
	const scaleAnim = useRef(new Animated.Value(1)).current;
	const rippleAnim = useRef(new Animated.Value(0)).current;
	const rippleScale = useRef(new Animated.Value(0)).current;
	const rotateAnim = useRef(new Animated.Value(0)).current;

	// Rotation animation for loading spinner
	useEffect(() => {
		if (loading) {
			Animated.loop(
				Animated.timing(rotateAnim, {
					toValue: 1,
					duration: 1000,
					useNativeDriver: true,
				}),
			).start();
		} else {
			rotateAnim.setValue(0);
		}
	}, [loading, rotateAnim]);

	const handlePressIn = () => {
		Animated.spring(scaleAnim, {
			toValue: 0.95,
			useNativeDriver: true,
		}).start();

		if (ripple) {
			rippleAnim.setValue(0.8);
			rippleScale.setValue(0);

			Animated.parallel([
				Animated.timing(rippleScale, {
					toValue: 1,
					duration: 400,
					useNativeDriver: true,
				}),
				Animated.timing(rippleAnim, {
					toValue: 0,
					duration: 400,
					useNativeDriver: true,
				}),
			]).start();
		}
	};

	const handlePressOut = () => {
		Animated.spring(scaleAnim, {
			toValue: 1,
			useNativeDriver: true,
		}).start();
	};

	const getButtonStyles = () => {
		const baseStyles = {
			paddingHorizontal: size === "sm" ? 16 : size === "lg" ? 32 : 24,
			paddingVertical: size === "sm" ? 8 : size === "lg" ? 16 : 12,
			borderRadius: 8,
			alignItems: "center" as const,
			justifyContent: "center" as const,
			position: "relative" as const,
			overflow: "hidden" as const,
		};

		const variantStyles: Record<ButtonVariant, any> = {
			primary: {
				backgroundColor: disabled ? "#666" : "#0074D9",
			},
			secondary: {
				backgroundColor: disabled ? "#333" : "#222",
				borderWidth: 1,
				borderColor: disabled ? "#444" : "#555",
			},
			ghost: {
				backgroundColor: "transparent",
			},
			danger: {
				backgroundColor: disabled ? "#666" : "#dc3545",
			},
			icon: {
				backgroundColor: "transparent",
				padding: 8,
			},
		};

		return { ...baseStyles, ...variantStyles[variant] };
	};

	return (
		<Pressable
			onPress={disabled || loading ? undefined : onPress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			disabled={disabled || loading}
		>
			<Animated.View
				style={[
					getButtonStyles(),
					{
						transform: [{ scale: scaleAnim }],
					},
				]}
			>
				{/* Ripple effect */}
				{ripple && (
					<Animated.View
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							width: 200,
							height: 200,
							marginLeft: -100,
							marginTop: -100,
							borderRadius: 100,
							backgroundColor: "rgba(255, 255, 255, 0.3)",
							opacity: rippleAnim,
							transform: [{ scale: rippleScale }],
						}}
					/>
				)}

				{/* Loading spinner */}
				{loading ? (
					<Animated.View
						style={{
							transform: [
								{
									rotate: rotateAnim.interpolate({
										inputRange: [0, 1],
										outputRange: ["0deg", "360deg"],
									}),
								},
							],
						}}
					>
						<Text style={{ color: variant === "primary" ? "#fff" : "#999" }}>⏳</Text>
					</Animated.View>
				) : (
					<View style={{ zIndex: 1 }}>{children}</View>
				)}
			</Animated.View>
		</Pressable>
	);
}
