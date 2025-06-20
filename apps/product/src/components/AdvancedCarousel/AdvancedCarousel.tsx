import React, { useRef, useEffect, useState } from 'react';
import {
	View,
	ScrollView,
	Dimensions,
	NativeSyntheticEvent,
	NativeScrollEvent,
} from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	withTiming,
	interpolate,
	Extrapolate,
	runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Text } from '@braingame/bgui';
import { advancedCarouselStyles } from './styles';

const { width: screenWidth } = Dimensions.get('window');

interface CarouselItem {
	id: string;
	content: React.ReactNode;
	title?: string;
}

interface AdvancedCarouselProps {
	items: CarouselItem[];
	itemWidth?: number;
	spacing?: number;
	autoPlay?: boolean;
	autoPlayInterval?: number;
	showIndicators?: boolean;
	showArrows?: boolean;
	onIndexChange?: (index: number) => void;
}

/**
 * Advanced Carousel Component
 * Sophisticated animation system with gesture support
 * Smooth spring animations and momentum scrolling
 * Built with React Native Reanimated for 60fps performance
 */
export const AdvancedCarousel: React.FC<AdvancedCarouselProps> = ({
	items,
	itemWidth = screenWidth - 40,
	spacing = 20,
	autoPlay = false,
	autoPlayInterval = 3000,
	showIndicators = true,
	showArrows = true,
	onIndexChange,
}) => {
	const scrollViewRef = useRef<ScrollView>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const autoPlayTimer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

	// Shared values for animations
	const scrollX = useSharedValue(0);
	const isScrolling = useSharedValue(false);
	const velocity = useSharedValue(0);

	const totalItemWidth = itemWidth + spacing;

	/**
	 * Update current index
	 */
	const updateIndex = (index: number) => {
		setCurrentIndex(index);
		onIndexChange?.(index);
	};

	/**
	 * Scroll to specific index with animation
	 */
	const scrollToIndex = (index: number, animated: boolean = true) => {
		const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
		const targetX = clampedIndex * totalItemWidth;
		
		scrollViewRef.current?.scrollTo({
			x: targetX,
			animated,
		});
		
		updateIndex(clampedIndex);
	};

	/**
	 * Handle scroll events
	 */
	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const offsetX = event.nativeEvent.contentOffset.x;
		scrollX.value = offsetX;
		
		// Calculate current index based on scroll position
		const index = Math.round(offsetX / totalItemWidth);
		if (index !== currentIndex && index >= 0 && index < items.length) {
			updateIndex(index);
		}
	};

	/**
	 * Handle scroll begin
	 */
	const handleScrollBegin = () => {
		isScrolling.value = true;
		stopAutoPlay();
	};

	/**
	 * Handle scroll end
	 */
	const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		isScrolling.value = false;
		const offsetX = event.nativeEvent.contentOffset.x;
		const index = Math.round(offsetX / totalItemWidth);
		
		// Snap to nearest item
		scrollToIndex(index, true);
		
		if (autoPlay) {
			startAutoPlay();
		}
	};

	/**
	 * Next item
	 */
	const goToNext = () => {
		const nextIndex = (currentIndex + 1) % items.length;
		scrollToIndex(nextIndex);
	};

	/**
	 * Previous item
	 */
	const goToPrevious = () => {
		const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
		scrollToIndex(prevIndex);
	};

	/**
	 * Start auto play
	 */
	const startAutoPlay = () => {
		if (!autoPlay) return;
		
		stopAutoPlay();
		autoPlayTimer.current = setInterval(() => {
			goToNext();
		}, autoPlayInterval);
	};

	/**
	 * Stop auto play
	 */
	const stopAutoPlay = () => {
		if (autoPlayTimer.current) {
			clearInterval(autoPlayTimer.current);
			autoPlayTimer.current = undefined;
		}
	};

	/**
	 * Pan gesture for swipe interactions
	 */
	const panGesture = Gesture.Pan()
		.onStart(() => {
			runOnJS(stopAutoPlay)();
		})
		.onUpdate((event) => {
			velocity.value = event.velocityX;
		})
		.onEnd((event) => {
			const threshold = itemWidth * 0.3;
			const swipeDistance = Math.abs(event.translationX);
			const swipeVelocity = Math.abs(event.velocityX);
			
			if (swipeDistance > threshold || swipeVelocity > 500) {
				if (event.translationX > 0) {
					runOnJS(goToPrevious)();
				} else {
					runOnJS(goToNext)();
				}
			}
			
			if (autoPlay) {
				runOnJS(startAutoPlay)();
			}
		});

	/**
	 * Auto play effect
	 */
	useEffect(() => {
		if (autoPlay) {
			startAutoPlay();
		}
		
		return () => {
			stopAutoPlay();
		};
	}, [autoPlay, autoPlayInterval]);

	/**
	 * Render carousel item with animations
	 */
	const renderItem = (item: CarouselItem, index: number) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const animatedStyle = useAnimatedStyle(() => {
			const inputRange = [
				(index - 1) * totalItemWidth,
				index * totalItemWidth,
				(index + 1) * totalItemWidth,
			];

			// Scale animation
			const scale = interpolate(
				scrollX.value,
				inputRange,
				[0.85, 1, 0.85],
				Extrapolate.CLAMP
			);

			// Opacity animation
			const opacity = interpolate(
				scrollX.value,
				inputRange,
				[0.5, 1, 0.5],
				Extrapolate.CLAMP
			);

			// Rotation animation (subtle)
			const rotateY = interpolate(
				scrollX.value,
				inputRange,
				[15, 0, -15],
				Extrapolate.CLAMP
			);

			return {
				transform: [
					{ scale: withSpring(scale, { damping: 15, stiffness: 150 }) },
					{ rotateY: `${rotateY}deg` },
				],
				opacity: withTiming(opacity, { duration: 300 }),
			};
		});

		return (
			<Animated.View
				key={item.id}
				style={[
					advancedCarouselStyles.itemContainer,
					{ width: itemWidth, marginRight: spacing },
					animatedStyle,
				]}
			>
				{item.content}
				{item.title && (
					<Text style={advancedCarouselStyles.itemTitle}>
						{item.title}
					</Text>
				)}
			</Animated.View>
		);
	};

	/**
	 * Render dot indicators
	 */
	const renderIndicators = () => {
		if (!showIndicators) return null;

		return (
			<View style={advancedCarouselStyles.indicatorsContainer}>
				{items.map((_, index) => {
					// eslint-disable-next-line react-hooks/rules-of-hooks
					const animatedStyle = useAnimatedStyle(() => {
						const isActive = index === currentIndex;
						const scale = withSpring(isActive ? 1.2 : 1);
						const opacity = withTiming(isActive ? 1 : 0.5);

						return {
							transform: [{ scale }],
							opacity,
						};
					});

					return (
						<Animated.View
							key={index}
							style={[
								advancedCarouselStyles.indicator,
								index === currentIndex && advancedCarouselStyles.activeIndicator,
								animatedStyle,
							]}
						/>
					);
				})}
			</View>
		);
	};

	return (
		<View style={advancedCarouselStyles.container}>
			<GestureDetector gesture={panGesture}>
				<View style={advancedCarouselStyles.carouselContainer}>
					<ScrollView
						ref={scrollViewRef}
						horizontal
						pagingEnabled={false}
						showsHorizontalScrollIndicator={false}
						snapToInterval={totalItemWidth}
						snapToAlignment="start"
						decelerationRate="fast"
						onScroll={handleScroll}
						onScrollBeginDrag={handleScrollBegin}
						onScrollEndDrag={handleScrollEnd}
						scrollEventThrottle={16}
						contentContainerStyle={{
							paddingHorizontal: (screenWidth - itemWidth) / 2,
						}}
					>
						{items.map((item, index) => renderItem(item, index))}
					</ScrollView>

					{/* Navigation Arrows */}
					{showArrows && items.length > 1 && (
						<>
							<Animated.View style={advancedCarouselStyles.leftArrow}>
								<Text
									style={advancedCarouselStyles.arrowText}
									onPress={goToPrevious}
								>
									‹
								</Text>
							</Animated.View>
							<Animated.View style={advancedCarouselStyles.rightArrow}>
								<Text
									style={advancedCarouselStyles.arrowText}
									onPress={goToNext}
								>
									›
								</Text>
							</Animated.View>
						</>
					)}
				</View>
			</GestureDetector>

			{/* Indicators */}
			{renderIndicators()}
		</View>
	);
};