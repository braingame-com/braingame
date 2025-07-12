import { View } from "@braingame/bgui";
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

interface LogoProps {
	size?: number;
	animated?: boolean;
	color?: string;
}

export function Logo({ size = 80, animated = true, color = "#0074D9" }: LogoProps) {
	const rotateValue = useRef(new Animated.Value(0)).current;
	const _pulseValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (!animated) return;

		// Rotation animation
		const rotateAnimation = Animated.loop(
			Animated.timing(rotateValue, {
				toValue: 1,
				duration: 20000,
				easing: Easing.linear,
				useNativeDriver: true,
			}),
		);

		rotateAnimation.start();

		return () => {
			rotateAnimation.stop();
		};
	}, [animated, rotateValue]);

	const rotate = rotateValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});

	return (
		<View
			style={{
				width: size,
				height: size,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Animated.View
				style={{
					width: size,
					height: size,
					transform: [{ rotate }],
				}}
			>
				{/* Brain Game Logo - Using View-based design for React Native compatibility */}
				<View style={{ width: size, height: size, position: "absolute" }}>
					{/* Central circle */}
					<View
						style={{
							position: "absolute",
							width: size * 0.16,
							height: size * 0.16,
							borderRadius: size * 0.08,
							backgroundColor: color,
							top: "50%",
							left: "50%",
							marginTop: -size * 0.08,
							marginLeft: -size * 0.08,
						}}
					/>

					{/* Corner nodes */}
					<View
						style={{
							position: "absolute",
							width: size * 0.1,
							height: size * 0.1,
							borderRadius: size * 0.05,
							backgroundColor: color,
							opacity: 0.7,
							top: "30%",
							left: "30%",
							marginTop: -size * 0.05,
							marginLeft: -size * 0.05,
						}}
					/>
					<View
						style={{
							position: "absolute",
							width: size * 0.1,
							height: size * 0.1,
							borderRadius: size * 0.05,
							backgroundColor: color,
							opacity: 0.7,
							top: "30%",
							left: "70%",
							marginTop: -size * 0.05,
							marginLeft: -size * 0.05,
						}}
					/>
					<View
						style={{
							position: "absolute",
							width: size * 0.1,
							height: size * 0.1,
							borderRadius: size * 0.05,
							backgroundColor: color,
							opacity: 0.7,
							top: "70%",
							left: "30%",
							marginTop: -size * 0.05,
							marginLeft: -size * 0.05,
						}}
					/>
					<View
						style={{
							position: "absolute",
							width: size * 0.1,
							height: size * 0.1,
							borderRadius: size * 0.05,
							backgroundColor: color,
							opacity: 0.7,
							top: "70%",
							left: "70%",
							marginTop: -size * 0.05,
							marginLeft: -size * 0.05,
						}}
					/>

					{/* Connecting lines (using thin rectangles) */}
					<View
						style={{
							position: "absolute",
							width: 1.5,
							height: size * 0.6,
							backgroundColor: color,
							opacity: 0.3,
							top: "20%",
							left: "50%",
							marginLeft: -0.75,
						}}
					/>
					<View
						style={{
							position: "absolute",
							width: size * 0.6,
							height: 1.5,
							backgroundColor: color,
							opacity: 0.3,
							top: "50%",
							left: "20%",
							marginTop: -0.75,
						}}
					/>
				</View>
			</Animated.View>
		</View>
	);
}
