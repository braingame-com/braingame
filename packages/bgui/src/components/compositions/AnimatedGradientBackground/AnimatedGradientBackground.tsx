import { forwardRef, useEffect, useMemo, useRef } from "react";
import {
	Animated,
	Dimensions,
	Easing,
	Platform,
	StyleSheet,
	View,
	type ViewStyle,
} from "react-native";
import type { AnimatedGradientBackgroundProps } from "./AnimatedGradientBackground.types";

const DEFAULT_COLORS = ["#FF4136", "#FF851B", "#FFDC00", "#2ECC40", "#0074D9", "#B10DC9"] as const;

interface BlobAnimationState {
	id: string;
	size: number;
	initialScale: number;
	x: Animated.Value;
	y: Animated.Value;
	scale: Animated.Value;
	opacity: Animated.Value;
}

const useNativeDriverForTransforms = Platform.OS !== "web";

export const AnimatedGradientBackground = forwardRef<View, AnimatedGradientBackgroundProps>(
	(
		{
			colors = DEFAULT_COLORS,
			duration = 10000,
			animate = true,
			blobCount = 6,
			blobOpacity = 0.3,
			blurRadius = 100,
			children,
			style,
			testID,
			...viewProps
		},
		ref,
	) => {
		const { width, height } = Dimensions.get("window");
		const blobAnimations = useRef<BlobAnimationState[]>([]);
		const runningAnimations = useRef<Animated.CompositeAnimation[]>([]);
		const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

		const flattenedStyle = useMemo(
			() =>
				StyleSheet.flatten<ViewStyle>([
					styles.container,
					Platform.OS === "web"
						? ({
								backgroundImage: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)",
								backgroundColor: "#0f0f0f",
							} as unknown as ViewStyle)
						: null,
					style as ViewStyle,
				]),
			[style],
		);

		useEffect(() => {
			blobAnimations.current = Array.from({ length: blobCount }, (_, index) => {
				const initialScale = 0.6 + Math.random() * 0.4;
				const size = 200 + Math.random() * 240;
				return {
					id: `blob-${index}`,
					size,
					initialScale,
					x: new Animated.Value(Math.random() * width),
					y: new Animated.Value(Math.random() * height),
					scale: new Animated.Value(initialScale),
					opacity: new Animated.Value(blobOpacity),
				} satisfies BlobAnimationState;
			});

			return () => {
				blobAnimations.current = [];
			};
		}, [blobCount, blobOpacity, height, width]);

		useEffect(() => {
			blobAnimations.current.forEach((blob) => {
				blob.opacity.setValue(blobOpacity);
			});
		}, [blobOpacity]);

		useEffect(() => {
			timersRef.current.forEach((timer) => clearTimeout(timer));
			timersRef.current = [];

			runningAnimations.current.forEach((animation) => {
				animation.stop();
			});
			runningAnimations.current = [];

			if (!animate) {
				return () => {
					runningAnimations.current.forEach((animation) => animation.stop());
					runningAnimations.current = [];
				};
			}

			const animations = blobAnimations.current.map((blob, _index) => {
				const movement = Animated.loop(
					Animated.sequence([
						Animated.parallel([
							Animated.timing(blob.x, {
								toValue: Math.random() * width,
								duration: duration * 1.2,
								easing: Easing.inOut(Easing.quad),
								useNativeDriver: false,
							}),
							Animated.timing(blob.y, {
								toValue: Math.random() * height,
								duration: duration * 1.2,
								easing: Easing.inOut(Easing.quad),
								useNativeDriver: false,
							}),
						]),
						Animated.parallel([
							Animated.timing(blob.x, {
								toValue: Math.random() * width,
								duration: duration * 1.2,
								easing: Easing.inOut(Easing.quad),
								useNativeDriver: false,
							}),
							Animated.timing(blob.y, {
								toValue: Math.random() * height,
								duration: duration * 1.2,
								easing: Easing.inOut(Easing.quad),
								useNativeDriver: false,
							}),
						]),
					]),
				);

				const scaleAnimation = Animated.loop(
					Animated.sequence([
						Animated.timing(blob.scale, {
							toValue: blob.initialScale * 1.2,
							duration: duration / 2,
							easing: Easing.inOut(Easing.ease),
							useNativeDriver: useNativeDriverForTransforms,
						}),
						Animated.timing(blob.scale, {
							toValue: blob.initialScale,
							duration: duration / 2,
							easing: Easing.inOut(Easing.ease),
							useNativeDriver: useNativeDriverForTransforms,
						}),
					]),
				);

				return Animated.parallel([movement, scaleAnimation]);
			});

			runningAnimations.current = animations;
			const totalBlobs = Math.min(blobAnimations.current.length, blobCount);

			animations.forEach((animation, index) => {
				const delay = (index % Math.max(totalBlobs, 1)) * 150;
				const timer = setTimeout(() => {
					animation.start();
				}, delay);
				timersRef.current.push(timer);
			});

			return () => {
				timersRef.current.forEach((timer) => clearTimeout(timer));
				timersRef.current = [];
				animations.forEach((animation) => animation.stop());
				runningAnimations.current = [];
			};
		}, [animate, blobCount, duration, height, width]);

		const blurStyle =
			Platform.OS === "web"
				? ({ filter: `blur(${blurRadius}px)`, willChange: "transform" } as unknown as ViewStyle)
				: ({
						shadowColor: "#000",
						shadowOffset: { width: 0, height: 0 },
						shadowOpacity: 0.25,
						shadowRadius: blurRadius / 20,
					} satisfies ViewStyle);

		return (
			<View ref={ref} style={flattenedStyle} testID={testID} {...viewProps}>
				<View pointerEvents="none" style={styles.gradientContainer}>
					{blobAnimations.current.map((blob, index) => (
						<Animated.View
							key={blob.id}
							pointerEvents="none"
							testID={`bgui-animated-gradient-blob-${index}`}
							style={[
								styles.blob,
								{
									width: blob.size,
									height: blob.size,
									backgroundColor: colors[index % colors.length],
									opacity: animate ? blob.opacity : blobOpacity,
									transform: [
										{ translateX: blob.x },
										{ translateY: blob.y },
										{ scale: blob.scale },
									],
								},
								blurStyle,
							]}
						/>
					))}
				</View>
				{children ? (
					<View pointerEvents="box-none" style={styles.contentLayer}>
						{children}
					</View>
				) : null}
			</View>
		);
	},
);

AnimatedGradientBackground.displayName = "AnimatedGradientBackground";

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
