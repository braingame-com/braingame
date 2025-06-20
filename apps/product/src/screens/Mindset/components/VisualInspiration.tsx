import React, { useState, useRef, useMemo, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import { Text } from '@braingame/bgui';
import { mindsetStyles } from '../styles';
import { VISUAL_INSPIRATION_IMAGES } from '../constants/images';

interface VisualInspirationProps {
	onComplete: () => void;
	completed: boolean;
}

const { width: screenWidth } = Dimensions.get('window');
const SLIDE_WIDTH = screenWidth - 80; // Account for padding/margins

/**
 * Visual Inspiration Component
 * 75+ motivational images in slideshow format
 * Athletes, luxury lifestyle, success symbols
 * Ported from dev-dil React to React Native
 */
export const VisualInspiration: React.FC<VisualInspirationProps> = ({ onComplete, completed }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const flatListRef = useRef<FlatList>(null);

	// Shuffle images on mount (same as dev-dil implementation)
	const shuffledImages = useMemo(() => {
		const shuffled = [...VISUAL_INSPIRATION_IMAGES];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	}, []);

	/**
	 * Handle slide change
	 */
	const handleSlideChange = useCallback((event: any) => {
		const slideSize = event.nativeEvent.layoutMeasurement.width;
		const index = event.nativeEvent.contentOffset.x / slideSize;
		const roundIndex = Math.round(index);
		
		if (roundIndex !== currentIndex) {
			setCurrentIndex(roundIndex);
		}
	}, [currentIndex]);

	/**
	 * Navigate to specific slide
	 */
	const goToSlide = useCallback((index: number) => {
		flatListRef.current?.scrollToIndex({
			index,
			animated: true,
		});
		setCurrentIndex(index);
	}, []);

	/**
	 * Previous/Next navigation
	 */
	const goToPrevious = useCallback(() => {
		if (currentIndex > 0) {
			goToSlide(currentIndex - 1);
		}
	}, [currentIndex, goToSlide]);

	const goToNext = useCallback(() => {
		if (currentIndex < shuffledImages.length - 1) {
			goToSlide(currentIndex + 1);
		}
	}, [currentIndex, shuffledImages.length, goToSlide]);

	/**
	 * Render individual slide
	 */
	const renderSlide = useCallback(({ item }: { item: typeof VISUAL_INSPIRATION_IMAGES[0] }) => (
		<View style={{
			width: SLIDE_WIDTH,
			height: SLIDE_WIDTH, // Square aspect ratio like dev-dil
			marginHorizontal: 10,
		}}>
			<Image
				source={{ uri: item.uri }}
				style={{
					width: '100%',
					height: '100%',
					borderRadius: 16,
				}}
				resizeMode="cover"
			/>
		</View>
	), []);

	/**
	 * Render dot indicators
	 */
	const renderDotIndicators = () => (
		<View style={{
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			marginTop: 20,
			flexWrap: 'wrap',
			paddingHorizontal: 20,
		}}>
			{shuffledImages.map((_, index) => (
				<TouchableOpacity
					key={index}
					onPress={() => goToSlide(index)}
					style={{
						width: index === currentIndex ? 12 : 8,
						height: index === currentIndex ? 12 : 8,
						borderRadius: index === currentIndex ? 6 : 4,
						backgroundColor: index === currentIndex ? '#007fff' : '#333',
						marginHorizontal: 2,
						marginVertical: 2,
					}}
				/>
			))}
		</View>
	);

	/**
	 * Handle marking inspiration as complete
	 */
	const handleComplete = () => {
		onComplete();
	};

	return (
		<View style={mindsetStyles.card}>
			{/* Card Header */}
			<View style={mindsetStyles.cardHeader}>
				<Text variant="title" style={mindsetStyles.cardTitle}>
					🖼️ Visual Inspiration
				</Text>
				<View style={[
					mindsetStyles.statusBadge,
					completed ? mindsetStyles.statusCompleted : mindsetStyles.statusPending
				]}>
					<Text style={mindsetStyles.statusText}>
						{completed ? '✓ Done' : 'To do'}
					</Text>
				</View>
			</View>

			<Text style={mindsetStyles.cardDescription}>
				{shuffledImages.length} motivational images for inspiration and mindset alignment
			</Text>

			{/* Slideshow Container */}
			<View style={{
				height: SLIDE_WIDTH + 60, // Extra space for navigation
				marginBottom: 20,
				position: 'relative',
			}}>
				{/* Main Slideshow */}
				<FlatList
					ref={flatListRef}
					data={shuffledImages}
					renderItem={renderSlide}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					onMomentumScrollEnd={handleSlideChange}
					contentContainerStyle={{
						paddingHorizontal: 30,
					}}
					snapToAlignment="center"
					decelerationRate="fast"
					getItemLayout={(_, index) => ({
						length: SLIDE_WIDTH + 20,
						offset: (SLIDE_WIDTH + 20) * index,
						index,
					})}
				/>

				{/* Navigation Buttons */}
				<TouchableOpacity
					onPress={goToPrevious}
					disabled={currentIndex === 0}
					style={{
						position: 'absolute',
						left: 10,
						top: '50%',
						transform: [{ translateY: -20 }],
						width: 40,
						height: 40,
						borderRadius: 20,
						backgroundColor: 'rgba(0, 0, 0, 0.6)',
						alignItems: 'center',
						justifyContent: 'center',
						opacity: currentIndex === 0 ? 0.3 : 1,
					}}
				>
					<Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>‹</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={goToNext}
					disabled={currentIndex === shuffledImages.length - 1}
					style={{
						position: 'absolute',
						right: 10,
						top: '50%',
						transform: [{ translateY: -20 }],
						width: 40,
						height: 40,
						borderRadius: 20,
						backgroundColor: 'rgba(0, 0, 0, 0.6)',
						alignItems: 'center',
						justifyContent: 'center',
						opacity: currentIndex === shuffledImages.length - 1 ? 0.3 : 1,
					}}
				>
					<Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>›</Text>
				</TouchableOpacity>

				{/* Slide Counter */}
				<View style={{
					position: 'absolute',
					bottom: 10,
					left: 20,
					backgroundColor: 'rgba(0, 0, 0, 0.6)',
					paddingHorizontal: 12,
					paddingVertical: 6,
					borderRadius: 12,
				}}>
					<Text style={{
						color: '#fff',
						fontSize: 12,
						fontWeight: '600',
						fontFamily: 'LexendSemiBold',
					}}>
						{currentIndex + 1} / {shuffledImages.length}
					</Text>
				</View>
			</View>

			{/* Dot Indicators */}
			{renderDotIndicators()}

			{/* Mark Complete Button */}
			<TouchableOpacity
				onPress={handleComplete}
				style={[mindsetStyles.button, { backgroundColor: '#00a550', marginTop: 24 }]}
			>
				<Text style={mindsetStyles.buttonText}>
					✓ Mark Complete
				</Text>
			</TouchableOpacity>
		</View>
	);
};