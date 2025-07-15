import type React from "react";
import { useEffect, useRef } from "react";
import { Animated, Dimensions, Platform, View } from "react-native";
import { styles } from "./styles";
import type { AnimatedGradientBackgroundProps } from "./types";

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
	style,
	...viewProps
}) => {
	const { width, height } = Dimensions.get("window");
	const blobAnimations = useRef<BlobAnimation[]>([]);

	// Initialize animations for each blob only once on mount
	const isInitialized = useRef(false);
	useEffect(() => {
		if (!isInitialized.current) {
			for (let i = 0; i < blobCount; i++) {
				blobAnimations.current.push({
					x: new Animated.Value(Math.random() * width),
					y: new Animated.Value(Math.random() * height),
					scale: new Animated.Value(0.5 + Math.random() * 0.5),
					opacity: new Animated.Value(blobOpacity),
				});
			}
			isInitialized.current = true;
		}
	}, [blobCount, blobOpacity, height, width]);

	useEffect(() => {
		if (!animate) return;

		const animations = blobAnimations.current.map((blob) => {
			const createAnimation = (value: Animated.Value, toValue: number, duration: number) =>
				Animated.loop(
					Animated.sequence([
						Animated.timing(value, {
							toValue,
							duration: duration + Math.random() * duration * 0.5,
							useNativeDriver: true,
						}),
						Animated.timing(value, {
							toValue: Math.random(),
							duration: duration + Math.random() * duration * 0.5,
							useNativeDriver: true,
						}),
					]),
				);

			const xAnimation = createAnimation(blob.x, Math.random() * width, duration);
			const yAnimation = createAnimation(blob.y, Math.random() * height, duration);
			const scaleAnimation = createAnimation(blob.scale, 0.5 + Math.random() * 0.5, duration * 0.8);
			const opacityAnimation = createAnimation(
				blob.opacity,
				blobOpacity * (0.5 + Math.random() * 0.5),
				duration * 0.6,
			);

			xAnimation.start();
			yAnimation.start();
			scaleAnimation.start();
			opacityAnimation.start();

			return () => {
				xAnimation.stop();
				yAnimation.stop();
				scaleAnimation.stop();
				opacityAnimation.stop();
			};
		});

		return () => {
			animations.forEach((cleanup) => cleanup());
		};
	}, [animate, width, height, duration, blobOpacity]);

	const blurStyle = Platform.select({
		web: {
			filter: `blur(${blurRadius}px)`,
		},
		default: {},
	});

	// Generate consistent sizes for blobs
	const blobSizes = useRef<number[]>([]);
	if (blobSizes.current.length === 0) {
		for (let i = 0; i < blobCount; i++) {
			blobSizes.current.push(Math.min(width, height) * (0.4 + Math.random() * 0.3));
		}
	}

	return (
		<View style={[styles.container, style]} {...viewProps}>
			<View style={[styles.blurContainer, blurStyle]}>
				{blobAnimations.current.map((blob, index) => {
					const color = colors[index % colors.length];
					const size = blobSizes.current[index] || 200;
					const blobId = `blob-${index}`;

					return (
						<Animated.View
							key={blobId}
							style={[
								styles.blobLayer,
								{
									backgroundColor: color,
									width: size,
									height: size,
									transform: [
										{ translateX: blob.x },
										{ translateY: blob.y },
										{ scale: blob.scale },
									],
									opacity: blob.opacity,
								},
							]}
						/>
					);
				})}
			</View>
		</View>
	);
};
