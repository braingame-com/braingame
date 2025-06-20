import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withRepeat,
	withTiming,
	withSequence,
	Easing,
} from 'react-native-reanimated';
import { pulseAnimationStyles } from './styles';

interface PulseAnimationProps {
	size?: number;
	color?: string;
	duration?: number;
	pulseCount?: number;
	style?: any;
	children?: React.ReactNode;
}

/**
 * Pulse Animation Component
 * Sophisticated pulsing animation with multiple ripples
 * Great for loading indicators and attention-grabbing elements
 */
export const PulseAnimation: React.FC<PulseAnimationProps> = ({
	size = 60,
	color = '#007fff',
	duration = 2000,
	pulseCount = 3,
	style,
	children,
}) => {
	const pulses = Array.from({ length: pulseCount }, () => ({
		scale: useSharedValue(0),
		opacity: useSharedValue(1),
	}));

	/**
	 * Start pulse animation with staggered delays
	 */
	useEffect(() => {
		pulses.forEach((pulse, index) => {
			const delay = (index * duration) / pulseCount;

			setTimeout(() => {
				pulse.scale.value = withRepeat(
					withSequence(
						withTiming(1, {
							duration: duration * 0.6,
							easing: Easing.out(Easing.quad),
						}),
						withTiming(1.5, {
							duration: duration * 0.4,
							easing: Easing.in(Easing.quad),
						})
					),
					-1,
					false
				);

				pulse.opacity.value = withRepeat(
					withSequence(
						withTiming(0.8, {
							duration: duration * 0.3,
							easing: Easing.out(Easing.quad),
						}),
						withTiming(0, {
							duration: duration * 0.7,
							easing: Easing.in(Easing.quad),
						})
					),
					-1,
					false
				);
			}, delay);
		});
	}, [duration, pulseCount]);

	/**
	 * Render pulse rings
	 */
	const renderPulses = () =>
		pulses.map((pulse, index) => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const animatedStyle = useAnimatedStyle(() => ({
				transform: [{ scale: pulse.scale.value }],
				opacity: pulse.opacity.value,
			}));

			return (
				<Animated.View
					key={index}
					style={[
						pulseAnimationStyles.pulse,
						{
							width: size,
							height: size,
							borderRadius: size / 2,
							backgroundColor: color,
						},
						animatedStyle,
					]}
				/>
			);
		});

	return (
		<View style={[pulseAnimationStyles.container, { width: size, height: size }, style]}>
			{renderPulses()}
			{children && (
				<View style={pulseAnimationStyles.content}>
					{children}
				</View>
			)}
		</View>
	);
};

/**
 * Breathing Animation Component
 * Gentle breathing effect for subtle animations
 */
interface BreathingAnimationProps {
	children: React.ReactNode;
	duration?: number;
	scaleRange?: [number, number];
}

export const BreathingAnimation: React.FC<BreathingAnimationProps> = ({
	children,
	duration = 3000,
	scaleRange = [1, 1.05],
}) => {
	const scale = useSharedValue(scaleRange[0]);

	useEffect(() => {
		scale.value = withRepeat(
			withSequence(
				withTiming(scaleRange[1], {
					duration: duration / 2,
					easing: Easing.inOut(Easing.sin),
				}),
				withTiming(scaleRange[0], {
					duration: duration / 2,
					easing: Easing.inOut(Easing.sin),
				})
			),
			-1,
			false
		);
	}, [duration, scaleRange]);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}));

	return (
		<Animated.View style={animatedStyle}>
			{children}
		</Animated.View>
	);
};