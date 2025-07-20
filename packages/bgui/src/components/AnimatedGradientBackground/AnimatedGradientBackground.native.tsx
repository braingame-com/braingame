import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, View, StyleSheet } from "react-native";
import type { AnimatedGradientBackgroundProps } from "./AnimatedGradientBackgroundProps";

/**
 * Native implementation of AnimatedGradientBackground component
 *
 * Creates an animated gradient background with floating blobs
 */

const DEFAULT_COLORS = ["#FF4136", "#FF851B", "#FFDC00", "#2ECC40", "#0074D9", "#B10DC9"];

interface BlobAnimation {
	x: Animated.Value;
	y: Animated.Value;
	scale: Animated.Value;
	opacity: Animated.Value;
}

export const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({
	colors = DEFAULT_COLORS,
	duration = 10000,
	animate = true,
	blobCount = 6,
	blobOpacity = 0.3,
	blurRadius = 100,
	children,
	style,
	testID,
	...props
}) => {
	const { width, height } = Dimensions.get("window");
	const blobAnimations = useRef<BlobAnimation[]>([]);

	// Initialize animations for each blob
	useEffect(() => {
		if (blobAnimations.current.length === 0) {
			for (let i = 0; i < blobCount; i++) {
				blobAnimations.current.push({
					x: new Animated.Value(Math.random() * width),
					y: new Animated.Value(Math.random() * height),
					scale: new Animated.Value(0.5 + Math.random() * 0.5),
					opacity: new Animated.Value(blobOpacity),
				});
			}
		}
	}, [blobCount, blobOpacity, width, height]);

	useEffect(() => {
		if (!animate) return;

		const animations = blobAnimations.current.map((blob) => {
			const createAnimation = (value: Animated.Value, toValue: number, duration: number) =>
				Animated.loop(
					Animated.sequence([
						Animated.timing(value, {
							toValue,
							duration: duration / 2,
							useNativeDriver: true,
						}),
						Animated.timing(value, {
							toValue: value._value,
							duration: duration / 2,
							useNativeDriver: true,
						}),
					]),
				);

			return Animated.parallel([
				createAnimation(blob.scale, 1.2, duration),
				Animated.loop(
					Animated.sequence([
						Animated.timing(blob.x, {
							toValue: Math.random() * width,
							duration: duration * 1.5,
							useNativeDriver: false,
						}),
						Animated.timing(blob.y, {
							toValue: Math.random() * height,
							duration: duration * 1.5,
							useNativeDriver: false,
						}),
					]),
				),
			]);
		});

		animations.forEach((anim) => anim.start());

		return () => {
			animations.forEach((anim) => anim.stop());
		};
	}, [animate, duration, width, height]);

	return (
		<View style={[styles.container, style]} testID={testID} {...props}>
			{/* Background gradient */}
			<View style={styles.gradientContainer}>
				{animate &&
					blobAnimations.current.map((blob, index) => {
						const color = colors[index % colors.length];
						const size = 200 + Math.random() * 200;

						return (
							<Animated.View
								key={index}
								style={[
									styles.blob,
									{
										width: size,
										height: size,
										backgroundColor: color,
										opacity: blob.opacity,
										transform: [
											{ translateX: blob.x },
											{ translateY: blob.y },
											{ scale: blob.scale },
										],
									},
								]}
							/>
						);
					})}
			</View>

			{/* Content layer */}
			{children && <View style={styles.contentLayer}>{children}</View>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0f0f0f",
		overflow: "hidden",
	},
	gradientContainer: {
		...StyleSheet.absoluteFillObject,
	},
	blob: {
		position: "absolute",
		borderRadius: 999,
	},
	contentLayer: {
		...StyleSheet.absoluteFillObject,
		zIndex: 1,
	},
});