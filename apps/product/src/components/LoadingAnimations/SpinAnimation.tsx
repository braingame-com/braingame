import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withRepeat,
	withTiming,
	Easing,
	interpolate,
} from 'react-native-reanimated';
import { Text } from '@braingame/bgui';
import { spinAnimationStyles } from './styles';

interface SpinAnimationProps {
	size?: number;
	color?: string;
	speed?: number;
	children?: React.ReactNode;
}

/**
 * Spin Animation Component
 * Smooth continuous rotation animation
 * Perfect for loading spinners and rotating elements
 */
export const SpinAnimation: React.FC<SpinAnimationProps> = ({
	size = 24,
	color = '#007fff',
	speed = 1000,
	children,
}) => {
	const rotation = useSharedValue(0);

	useEffect(() => {
		rotation.value = withRepeat(
			withTiming(360, {
				duration: speed,
				easing: Easing.linear,
			}),
			-1,
			false
		);
	}, [speed]);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotation.value}deg` }],
	}));

	return (
		<Animated.View
			style={[
				spinAnimationStyles.container,
				{
					width: size,
					height: size,
				},
				animatedStyle,
			]}
		>
			{children || (
				<View
					style={[
						spinAnimationStyles.defaultSpinner,
						{
							width: size,
							height: size,
							borderRadius: size / 2,
							borderColor: `${color}30`,
							borderTopColor: color,
							borderWidth: size / 8,
						},
					]}
				/>
			)}
		</Animated.View>
	);
};

/**
 * Wave Animation Component
 * Multiple dots with wave-like animation
 */
interface WaveAnimationProps {
	dotCount?: number;
	dotSize?: number;
	color?: string;
	duration?: number;
}

export const WaveAnimation: React.FC<WaveAnimationProps> = ({
	dotCount = 5,
	dotSize = 8,
	color = '#007fff',
	duration = 800,
}) => {
	const dots = Array.from({ length: dotCount }, () => useSharedValue(0));

	useEffect(() => {
		dots.forEach((dot, index) => {
			const delay = (index * duration) / dotCount;

			setTimeout(() => {
				dot.value = withRepeat(
					withTiming(1, {
						duration: duration / 2,
						easing: Easing.inOut(Easing.sin),
					}),
					-1,
					true
				);
			}, delay);
		});
	}, [duration, dotCount]);

	return (
		<View style={spinAnimationStyles.waveContainer}>
			{dots.map((dot, index) => {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				const animatedStyle = useAnimatedStyle(() => {
					const scale = interpolate(dot.value, [0, 1], [0.5, 1.5]);
					const opacity = interpolate(dot.value, [0, 1], [0.3, 1]);

					return {
						transform: [{ scale }],
						opacity,
					};
				});

				return (
					<Animated.View
						key={index}
						style={[
							spinAnimationStyles.waveDot,
							{
								width: dotSize,
								height: dotSize,
								borderRadius: dotSize / 2,
								backgroundColor: color,
							},
							animatedStyle,
						]}
					/>
				);
			})}
		</View>
	);
};

/**
 * Bounce Animation Component
 * Playful bouncing animation
 */
interface BounceAnimationProps {
	children: React.ReactNode;
	height?: number;
	duration?: number;
}

export const BounceAnimation: React.FC<BounceAnimationProps> = ({
	children,
	height = 10,
	duration = 600,
}) => {
	const translateY = useSharedValue(0);

	useEffect(() => {
		translateY.value = withRepeat(
			withTiming(-height, {
				duration: duration / 2,
				easing: Easing.out(Easing.quad),
			}),
			-1,
			true
		);
	}, [height, duration]);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
	}));

	return (
		<Animated.View style={animatedStyle}>
			{children}
		</Animated.View>
	);
};

/**
 * Loading Text Animation
 * Animated loading text with dots
 */
interface LoadingTextProps {
	text?: string;
	dotCount?: number;
	color?: string;
}

export const LoadingText: React.FC<LoadingTextProps> = ({
	text = 'Loading',
	dotCount = 3,
	color = '#aaa',
}) => {
	const dots = Array.from({ length: dotCount }, () => useSharedValue(0));

	useEffect(() => {
		dots.forEach((dot, index) => {
			const delay = index * 200;

			setTimeout(() => {
				dot.value = withRepeat(
					withTiming(1, {
						duration: 600,
						easing: Easing.inOut(Easing.sin),
					}),
					-1,
					true
				);
			}, delay);
		});
	}, [dotCount]);

	return (
		<View style={spinAnimationStyles.loadingTextContainer}>
			<Text style={[spinAnimationStyles.loadingText, { color }]}>
				{text}
			</Text>
			<View style={spinAnimationStyles.dotsContainer}>
				{dots.map((dot, index) => {
					// eslint-disable-next-line react-hooks/rules-of-hooks
					const animatedStyle = useAnimatedStyle(() => ({
						opacity: interpolate(dot.value, [0, 1], [0.3, 1]),
					}));

					return (
						<Animated.Text
							key={index}
							style={[
								spinAnimationStyles.loadingDot,
								{ color },
								animatedStyle,
							]}
						>
							.
						</Animated.Text>
					);
				})}
			</View>
		</View>
	);
};