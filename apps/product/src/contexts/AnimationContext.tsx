import React, { createContext, useContext, useRef, ReactNode } from 'react';
import { Animated, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

interface AnimationContextValue {
	scroll: Animated.Value;
	headerOpacity: Animated.AnimatedDivision<number>;
	contentOpacity: Animated.AnimatedDivision<number>;
	titleScale: Animated.AnimatedDivision<number>;
	onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

/**
 * Animation Context
 * Global animation state management for scroll-based animations
 * Sophisticated dual-opacity system with performance optimizations
 * Ported from bg1 React to React Native with enhancements
 */
const AnimationContext = createContext<AnimationContextValue | undefined>(undefined);

interface AnimationProviderProps {
	children: ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
	// Persistent animated value for scroll position
	const scroll = useRef(new Animated.Value(0)).current;

	// Animation ranges based on design tokens
	const ANIMATION_START = 16; // t.m equivalent
	const ANIMATION_END = 48;   // t.xl * 2 for smoother transition

	/**
	 * Header opacity - increases as user scrolls down
	 * Creates sticky header effect
	 */
	const headerOpacity = scroll.interpolate({
		inputRange: [ANIMATION_START, ANIMATION_END],
		outputRange: [0, 1],
		extrapolate: 'clamp',
	});

	/**
	 * Content opacity - decreases as user scrolls down
	 * Creates fade-out effect for page titles
	 */
	const contentOpacity = scroll.interpolate({
		inputRange: [ANIMATION_START, ANIMATION_END],
		outputRange: [1, 0],
		extrapolate: 'clamp',
	});

	/**
	 * Title scale - subtle scale effect
	 * Creates dynamic sizing as user scrolls
	 */
	const titleScale = scroll.interpolate({
		inputRange: [0, ANIMATION_START, ANIMATION_END],
		outputRange: [1, 1, 0.9],
		extrapolate: 'clamp',
	});

	/**
	 * Optimized scroll handler
	 * Uses setValue for direct manipulation (no state updates)
	 */
	const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const offsetY = event.nativeEvent.contentOffset.y;
		scroll.setValue(offsetY);
	};

	const value: AnimationContextValue = {
		scroll,
		headerOpacity,
		contentOpacity,
		titleScale,
		onScroll,
	};

	return (
		<AnimationContext.Provider value={value}>
			{children}
		</AnimationContext.Provider>
	);
};

/**
 * Hook to access animation context
 */
export const useAnimation = (): AnimationContextValue => {
	const context = useContext(AnimationContext);
	if (!context) {
		throw new Error('useAnimation must be used within an AnimationProvider');
	}
	return context;
};

/**
 * HOC to wrap components with animation context
 */
export const withAnimation = <P extends object>(
	Component: React.ComponentType<P>
): React.FC<P> => {
	return (props: P) => (
		<AnimationProvider>
			<Component {...props} />
		</AnimationProvider>
	);
};