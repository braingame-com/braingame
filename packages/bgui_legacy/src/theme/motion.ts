import { Animated, Easing as RNEasing } from "react-native";

/**
 * Material 3 Motion System
 *
 * Motion brings the interface to life while maintaining usability.
 * M3 defines standard durations and easing curves for consistent animations.
 *
 * @see https://m3.material.io/styles/motion
 */

/**
 * M3 Duration tokens in milliseconds
 * Organized by categories: short, medium, long, extra long
 */
export const durations = {
	// Short durations (50-200ms) - Micro interactions
	short1: 50, // Selection states, ripples
	short2: 100, // Small transitions, fades
	short3: 150, // Icon transforms, small reveals
	short4: 200, // Bottom sheet peek, chips

	// Medium durations (250-400ms) - Standard transitions
	medium1: 250, // Card expansion, FAB morph
	medium2: 300, // Bottom sheet full, nav drawer
	medium3: 350, // Dialog appear, page transition
	medium4: 400, // Complex choreography

	// Long durations (450-600ms) - Emphasis animations
	long1: 450, // Stagger sequences start
	long2: 500, // Emphasis animations
	long3: 550, // Screen-to-screen transitions
	long4: 600, // Complex multi-element sequences

	// Extra long durations (700-1000ms) - Special cases
	extraLong1: 700, // Onboarding, first-run
	extraLong2: 800, // Celebrations, achievements
	extraLong3: 900, // Major state changes
	extraLong4: 1000, // Maximum duration
} as const;

export type DurationToken = keyof typeof durations;

/**
 * M3 Easing curves as CSS cubic-bezier strings
 */
export const easing = {
	// Emphasized easing - For user-initiated actions
	emphasized: {
		accelerate: "cubic-bezier(0.3, 0.0, 0.8, 0.15)",
		decelerate: "cubic-bezier(0.05, 0.7, 0.1, 1.0)",
		standard: "cubic-bezier(0.2, 0.0, 0.0, 1.0)",
	},

	// Standard easing - For system-initiated actions
	standard: {
		accelerate: "cubic-bezier(0.3, 0.0, 1.0, 1.0)",
		decelerate: "cubic-bezier(0.0, 0.0, 0.0, 1.0)",
		standard: "cubic-bezier(0.2, 0.0, 0.0, 1.0)",
	},
} as const;

/**
 * React Native Easing curves
 * Approximations of M3 curves for React Native's Animated API
 */
export const nativeEasing = {
	emphasized: {
		accelerate: RNEasing.in(RNEasing.ease),
		decelerate: RNEasing.out(RNEasing.ease),
		standard: RNEasing.inOut(RNEasing.ease),
	},
	standard: {
		accelerate: RNEasing.in(RNEasing.linear),
		decelerate: RNEasing.out(RNEasing.linear),
		standard: RNEasing.linear,
	},
} as const;

/**
 * Create a fade in animation
 *
 * @param value - Animated.Value to animate (should start at 0)
 * @param duration - Duration token or milliseconds
 * @returns Animated.CompositeAnimation
 */
export function createFadeIn(
	value: Animated.Value,
	duration: DurationToken | number = "short2",
): Animated.CompositeAnimation {
	const ms = typeof duration === "number" ? duration : durations[duration];

	return Animated.timing(value, {
		toValue: 1,
		duration: ms,
		easing: nativeEasing.standard.decelerate,
		useNativeDriver: true,
	});
}

/**
 * Create a fade out animation
 *
 * @param value - Animated.Value to animate (should start at 1)
 * @param duration - Duration token or milliseconds
 * @returns Animated.CompositeAnimation
 */
export function createFadeOut(
	value: Animated.Value,
	duration: DurationToken | number = "short1",
): Animated.CompositeAnimation {
	const ms = typeof duration === "number" ? duration : durations[duration];

	return Animated.timing(value, {
		toValue: 0,
		duration: ms,
		easing: nativeEasing.standard.accelerate,
		useNativeDriver: true,
	});
}

/**
 * Create a scale animation (for press states)
 *
 * @param value - Animated.Value to animate
 * @param toValue - Target scale (0.95 for press down, 1.0 for release)
 * @param duration - Duration token or milliseconds
 * @returns Animated.CompositeAnimation
 */
export function createScale(
	value: Animated.Value,
	toValue = 0.95,
	duration: DurationToken | number = "short1",
): Animated.CompositeAnimation {
	const ms = typeof duration === "number" ? duration : durations[duration];

	return Animated.timing(value, {
		toValue,
		duration: ms,
		easing: toValue < 1 ? nativeEasing.emphasized.accelerate : nativeEasing.emphasized.decelerate,
		useNativeDriver: true,
	});
}

/**
 * Create a slide animation
 *
 * @param value - Animated.Value to animate
 * @param toValue - Target position
 * @param duration - Duration token or milliseconds
 * @returns Animated.CompositeAnimation
 */
export function createSlide(
	value: Animated.Value,
	toValue: number,
	duration: DurationToken | number = "medium2",
): Animated.CompositeAnimation {
	const ms = typeof duration === "number" ? duration : durations[duration];

	return Animated.timing(value, {
		toValue,
		duration: ms,
		easing: nativeEasing.emphasized.standard,
		useNativeDriver: true,
	});
}

/**
 * Create a spring animation (for playful interactions)
 *
 * @param value - Animated.Value to animate
 * @param toValue - Target value
 * @param config - Spring configuration
 * @returns Animated.CompositeAnimation
 */
export function createSpring(
	value: Animated.Value,
	toValue: number,
	config = { stiffness: 120, damping: 15, mass: 1 },
): Animated.CompositeAnimation {
	return Animated.spring(value, {
		toValue,
		stiffness: config.stiffness,
		damping: config.damping,
		mass: config.mass,
		useNativeDriver: true,
	});
}

/**
 * Stagger animations for lists
 *
 * @param animations - Array of animations to stagger
 * @param delay - Delay between each animation start
 * @returns Animated.CompositeAnimation
 */
export function createStagger(
	animations: Animated.CompositeAnimation[],
	delay = 50,
): Animated.CompositeAnimation {
	return Animated.stagger(delay, animations);
}

/**
 * Component-specific animation presets
 */
export const animations = {
	// Button animations
	buttonPress: (scale: Animated.Value) => createScale(scale, 0.95, "short1"),
	buttonRelease: (scale: Animated.Value) => createScale(scale, 1.0, "short2"),

	// Card animations
	cardHover: (scale: Animated.Value) => createScale(scale, 1.02, "short4"),
	cardPress: (scale: Animated.Value) => createScale(scale, 0.98, "short2"),

	// FAB animations
	fabEnter: (scale: Animated.Value) =>
		Animated.sequence([
			Animated.timing(scale, {
				toValue: 1.1,
				duration: durations.medium1,
				easing: nativeEasing.emphasized.decelerate,
				useNativeDriver: true,
			}),
			Animated.timing(scale, {
				toValue: 1.0,
				duration: durations.short3,
				easing: nativeEasing.standard.standard,
				useNativeDriver: true,
			}),
		]),

	// Modal animations
	modalEnter: (opacity: Animated.Value, scale: Animated.Value) =>
		Animated.parallel([
			createFadeIn(opacity, "medium2"),
			Animated.timing(scale, {
				toValue: 1,
				duration: durations.medium2,
				easing: nativeEasing.emphasized.decelerate,
				useNativeDriver: true,
			}),
		]),
} as const;
