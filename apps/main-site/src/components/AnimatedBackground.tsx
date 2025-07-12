import { View } from "@braingame/bgui";
import { useEffect, useRef } from "react";
import { Animated, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

interface ParticleProps {
	delay: number;
}

function Particle({ delay }: ParticleProps) {
	const translateY = useRef(new Animated.Value(height + 100)).current;
	const translateX = useRef(new Animated.Value(Math.random() * width)).current;
	const opacity = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const animation = Animated.loop(
			Animated.sequence([
				Animated.delay(delay),
				Animated.parallel([
					Animated.timing(translateY, {
						toValue: -100,
						duration: 20000 + Math.random() * 10000,
						useNativeDriver: true,
					}),
					Animated.sequence([
						Animated.timing(opacity, {
							toValue: 1,
							duration: 2000,
							useNativeDriver: true,
						}),
						Animated.timing(opacity, {
							toValue: 0,
							duration: 2000,
							delay: 16000,
							useNativeDriver: true,
						}),
					]),
				]),
			]),
		);

		animation.start();

		return () => {
			animation.stop();
		};
	}, [delay, translateY, opacity]);

	const size = 2 + Math.random() * 4;

	return (
		<Animated.View
			style={{
				position: "absolute",
				width: size,
				height: size,
				borderRadius: size / 2,
				backgroundColor: "#0074D9",
				opacity,
				transform: [{ translateY }, { translateX }],
			}}
		/>
	);
}

export function AnimatedBackground() {
	const gradientAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const animation = Animated.loop(
			Animated.timing(gradientAnim, {
				toValue: 1,
				duration: 10000,
				useNativeDriver: false,
			}),
		);

		animation.start();

		return () => {
			animation.stop();
		};
	}, [gradientAnim]);

	const backgroundColor = gradientAnim.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: ["#000", "#001", "#000"],
	});

	return (
		<Animated.View
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor,
			}}
		>
			{/* Gradient overlay - using a large circle View */}
			<View
				style={{
					position: "absolute",
					width: width * 2,
					height: width * 2,
					borderRadius: width,
					backgroundColor: "rgba(0, 116, 217, 0.05)",
					top: "50%",
					left: "50%",
					marginTop: -width,
					marginLeft: -width,
				}}
			/>

			{/* Particles */}
			{Array.from({ length: 20 }).map((_, i) => (
				<Particle key={`particle-${i}`} delay={i * 800} />
			))}

			{/* Grid pattern using individual lines */}
			<View
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					opacity: 0.1,
				}}
			>
				{/* Vertical lines */}
				{Array.from({ length: Math.floor(width / 50) }).map((_, i) => (
					<View
						key={`v-line-${i}`}
						style={{
							position: "absolute",
							left: i * 50,
							top: 0,
							bottom: 0,
							width: 1,
							backgroundColor: "#0074D9",
						}}
					/>
				))}
				{/* Horizontal lines */}
				{Array.from({ length: Math.floor(height / 50) }).map((_, i) => (
					<View
						key={`h-line-${i}`}
						style={{
							position: "absolute",
							top: i * 50,
							left: 0,
							right: 0,
							height: 1,
							backgroundColor: "#0074D9",
						}}
					/>
				))}
			</View>
		</Animated.View>
	);
}
