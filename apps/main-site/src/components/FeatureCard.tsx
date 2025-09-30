import { Text, View } from "@braingame/bgui";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

interface FeatureCardProps {
	icon: string;
	title: string;
	description: string;
	delay?: number;
}

export function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
	const scaleValue = useRef(new Animated.Value(0.8)).current;
	const fadeValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.parallel([
			Animated.timing(scaleValue, {
				toValue: 1,
				duration: 600,
				delay,
				useNativeDriver: true,
			}),
			Animated.timing(fadeValue, {
				toValue: 1,
				duration: 600,
				delay,
				useNativeDriver: true,
			}),
		]).start();
	}, [delay, scaleValue, fadeValue]);

	return (
		<Animated.View
			style={{
				opacity: fadeValue,
				transform: [{ scale: scaleValue }],
			}}
		>
			<View
				style={{
					backgroundColor: "rgba(255, 255, 255, 0.03)",
					borderRadius: 16,
					padding: 24,
					borderWidth: 1,
					borderColor: "rgba(255, 255, 255, 0.1)",
					minHeight: 180,
				}}
			>
				<Text
					style={{
						fontSize: 48,
						marginBottom: 16,
						textAlign: "center",
					}}
				>
					{icon}
				</Text>
				<Text
					level="title-lg"
					style={{
						color: "#fff",
						marginBottom: 8,
						textAlign: "center",
						fontSize: 20,
					}}
				>
					{title}
				</Text>
				<Text
					level="body-md"
					style={{
						color: "#999",
						textAlign: "center",
						fontSize: 14,
						lineHeight: 20,
					}}
				>
					{description}
				</Text>
			</View>
		</Animated.View>
	);
}
