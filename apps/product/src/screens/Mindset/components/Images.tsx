import { Text } from "@braingame/bgui";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	Dimensions,
	FlatList,
	Image,
	type NativeScrollEvent,
	type NativeSyntheticEvent,
	TouchableOpacity,
	View,
} from "react-native";
import { mindsetStyles } from "../styles";

interface ImagesProps {
	onComplete: () => void;
	completed: boolean;
}

// Import all images from images-section folder
const imageAssets = {
	"aka-thailand.jpg": require("../../../assets/images/images-section/aka-thailand.jpg"),
	"ali-liston.webp": require("../../../assets/images/images-section/ali-liston.webp"),
	"arnold.png": require("../../../assets/images/images-section/arnold.png"),
	"aspinall.webp": require("../../../assets/images/images-section/aspinall.webp"),
	"bisping.webp": require("../../../assets/images/images-section/bisping.webp"),
	"boat-deck.webp": require("../../../assets/images/images-section/boat-deck.webp"),
	"buakaw.jpg": require("../../../assets/images/images-section/buakaw.jpg"),
	"burj-khalifa.jpg": require("../../../assets/images/images-section/burj-khalifa.jpg"),
	"calvin-klein.webp": require("../../../assets/images/images-section/calvin-klein.webp"),
	"cigar-boys.jpg": require("../../../assets/images/images-section/cigar-boys.jpg"),
	"classic-boat.webp": require("../../../assets/images/images-section/classic-boat.webp"),
	"Dan-Bilzerian-Phuket.webp": require("../../../assets/images/images-section/Dan-Bilzerian-Phuket.webp"),
	"dana-white-donald-trump-kid-rock-elon-musk.webp": require("../../../assets/images/images-section/dana-white-donald-trump-kid-rock-elon-musk.webp"),
	"danaher.png": require("../../../assets/images/images-section/danaher.png"),
	"dave-courtney.png": require("../../../assets/images/images-section/dave-courtney.png"),
	"dc.webp": require("../../../assets/images/images-section/dc.webp"),
	"diamond.jpg": require("../../../assets/images/images-section/diamond.jpg"),
	"dricus.jpg": require("../../../assets/images/images-section/dricus.jpg"),
	"dua.webp": require("../../../assets/images/images-section/dua.webp"),
	"fedor.jpg": require("../../../assets/images/images-section/fedor.jpg"),
	"freedom-beach.webp": require("../../../assets/images/images-section/freedom-beach.webp"),
	"g-unit.webp": require("../../../assets/images/images-section/g-unit.webp"),
	"gatsalov.webp": require("../../../assets/images/images-section/gatsalov.webp"),
	"goggins.jpg": require("../../../assets/images/images-section/goggins.jpg"),
	"gold.webp": require("../../../assets/images/images-section/gold.webp"),
	"gordon-ryan.jpeg": require("../../../assets/images/images-section/gordon-ryan.jpeg"),
	"GSP-cold.webp": require("../../../assets/images/images-section/GSP-cold.webp"),
	"gucci-shorts.jpg": require("../../../assets/images/images-section/gucci-shorts.jpg"),
	"guerlain.png": require("../../../assets/images/images-section/guerlain.png"),
	"helicopter-tour-phuket.jpg": require("../../../assets/images/images-section/helicopter-tour-phuket.jpg"),
	"ilia-topuria.webp": require("../../../assets/images/images-section/ilia-topuria.webp"),
	"jacob.jpg": require("../../../assets/images/images-section/jacob.jpg"),
	"jada-and-friends.png": require("../../../assets/images/images-section/jada-and-friends.png"),
	"jeff-bezos.webp": require("../../../assets/images/images-section/jeff-bezos.webp"),
	"jocko.png": require("../../../assets/images/images-section/jocko.png"),
	"joe-rogan.jpg": require("../../../assets/images/images-section/joe-rogan.jpg"),
	"jon-jones-comeback.jpg": require("../../../assets/images/images-section/jon-jones-comeback.jpg"),
	"jon.png": require("../../../assets/images/images-section/jon.png"),
	"karelin.jpg": require("../../../assets/images/images-section/karelin.jpg"),
	"khabib.jpg": require("../../../assets/images/images-section/khabib.jpg"),
	"lamborghini.jpg": require("../../../assets/images/images-section/lamborghini.jpg"),
	"lenny-mclean.jpg": require("../../../assets/images/images-section/lenny-mclean.jpg"),
	"lsf-1.jpg": require("../../../assets/images/images-section/lsf-1.jpg"),
	"lsf-2.webp": require("../../../assets/images/images-section/lsf-2.webp"),
	"lsf-3.jpg": require("../../../assets/images/images-section/lsf-3.jpg"),
	"mayweather-rr.jpg": require("../../../assets/images/images-section/mayweather-rr.jpg"),
	"mcgregor-yacht.png": require("../../../assets/images/images-section/mcgregor-yacht.png"),
	"mcgregor.jpg": require("../../../assets/images/images-section/mcgregor.jpg"),
	"mike-tyson.jpg": require("../../../assets/images/images-section/mike-tyson.jpg"),
	"mike.png": require("../../../assets/images/images-section/mike.png"),
	"ngannou.jpg": require("../../../assets/images/images-section/ngannou.jpg"),
	"paddy.webp": require("../../../assets/images/images-section/paddy.webp"),
	"pena.png": require("../../../assets/images/images-section/pena.png"),
	"perfume-caps.webp": require("../../../assets/images/images-section/perfume-caps.webp"),
	"pool-n-buddha.jpg": require("../../../assets/images/images-section/pool-n-buddha.jpg"),
	"popcaan.jpg": require("../../../assets/images/images-section/popcaan.jpg"),
	"private-jet.jpg": require("../../../assets/images/images-section/private-jet.jpg"),
	"rocket.webp": require("../../../assets/images/images-section/rocket.webp"),
	"rolex.jpeg": require("../../../assets/images/images-section/rolex.jpeg"),
	"roy-shaw.webp": require("../../../assets/images/images-section/roy-shaw.webp"),
	"rr-ghost.jpg": require("../../../assets/images/images-section/rr-ghost.jpg"),
	"sam.png": require("../../../assets/images/images-section/sam.png"),
	"tai-jet.jpeg": require("../../../assets/images/images-section/tai-jet.jpeg"),
	"tates-at-ufc.jpg": require("../../../assets/images/images-section/tates-at-ufc.jpg"),
	"taylor.jpg": require("../../../assets/images/images-section/taylor.jpg"),
	"tough.jpg": require("../../../assets/images/images-section/tough.jpg"),
	"tyson-fury.webp": require("../../../assets/images/images-section/tyson-fury.webp"),
	"ufc-belt.webp": require("../../../assets/images/images-section/ufc-belt.webp"),
	"ufc-logo.jpg": require("../../../assets/images/images-section/ufc-logo.jpg"),
	"versace-briefs.jpg": require("../../../assets/images/images-section/versace-briefs.jpg"),
	"versace-silk-shirt.jpg": require("../../../assets/images/images-section/versace-silk-shirt.jpg"),
	"villa.webp": require("../../../assets/images/images-section/villa.webp"),
	"yacht-party.jpg": require("../../../assets/images/images-section/yacht-party.jpg"),
	"zahabi-gsp.jpg": require("../../../assets/images/images-section/zahabi-gsp.jpg"),
	"zuck.webp": require("../../../assets/images/images-section/zuck.webp"),
};

/**
 * Images Component
 * Motivational image slideshow with 75+ images
 * Ported from dev-dil React to React Native
 */
export const Images: React.FC<ImagesProps> = ({ onComplete, completed }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const flatListRef = useRef<FlatList>(null);
	const { width: screenWidth } = Dimensions.get("window");

	// Create shuffled images array (memoized)
	const shuffledImages = useMemo(() => {
		const imageKeys = Object.keys(imageAssets);
		return [...imageKeys].sort(() => Math.random() - 0.5);
	}, []);

	/**
	 * Handle scroll to update current index
	 */
	const handleScroll = useCallback(
		(event: NativeSyntheticEvent<NativeScrollEvent>) => {
			const { contentOffset } = event.nativeEvent;
			const index = Math.round(contentOffset.x / screenWidth);
			setCurrentIndex(index);
		},
		[screenWidth],
	);

	/**
	 * Navigate to specific slide
	 */
	const goToSlide = useCallback((index: number) => {
		flatListRef.current?.scrollToIndex({ index, animated: true });
		setCurrentIndex(index);
	}, []);

	/**
	 * Navigate to previous slide
	 */
	const goToPrevious = useCallback(() => {
		if (currentIndex > 0) {
			goToSlide(currentIndex - 1);
		}
	}, [currentIndex, goToSlide]);

	/**
	 * Navigate to next slide
	 */
	const goToNext = useCallback(() => {
		if (currentIndex < shuffledImages.length - 1) {
			goToSlide(currentIndex + 1);
		}
	}, [currentIndex, shuffledImages.length, goToSlide]);

	/**
	 * Mark as complete when user has viewed several images
	 */
	useEffect(() => {
		if (currentIndex >= 5 && !completed) {
			onComplete();
		}
	}, [currentIndex, completed, onComplete]);

	/**
	 * Render individual image item
	 */
	const renderImage = useCallback(
		({ item }: { item: string }) => (
			<View
				style={{
					width: screenWidth - 48, // Account for card padding
					height: 300,
					marginHorizontal: 0,
				}}
			>
				<Image
					source={imageAssets[item as keyof typeof imageAssets]}
					style={{
						width: "100%",
						height: "100%",
						borderRadius: 12,
					}}
					resizeMode="cover"
				/>
			</View>
		),
		[screenWidth],
	);

	/**
	 * Render dots indicator
	 */
	const renderDots = useCallback(
		() => (
			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					marginTop: 16,
					flexWrap: "wrap",
				}}
			>
				{shuffledImages.slice(0, Math.min(shuffledImages.length, 15)).map((item, index) => (
					<TouchableOpacity
						key={`dot-${item}`}
						onPress={() => goToSlide(index)}
						style={{
							width: 8,
							height: 8,
							borderRadius: 4,
							backgroundColor: index === currentIndex ? "#007fff" : "#505060",
							marginHorizontal: 4,
							marginVertical: 2,
						}}
					/>
				))}
				{shuffledImages.length > 15 && (
					<Text
						style={{
							color: "#aaa",
							fontSize: 12,
							marginLeft: 8,
						}}
					>
						+{shuffledImages.length - 15} more
					</Text>
				)}
			</View>
		),
		[shuffledImages, currentIndex, goToSlide],
	);

	return (
		<View style={mindsetStyles.card}>
			{/* Card Header */}
			<View style={mindsetStyles.cardHeader}>
				<Text variant="title" style={mindsetStyles.cardTitle}>
					🖼️ Visual Inspiration
				</Text>
				<View
					style={[
						mindsetStyles.statusBadge,
						completed ? mindsetStyles.statusCompleted : mindsetStyles.statusPending,
					]}
				>
					<Text style={mindsetStyles.statusText}>{completed ? "✓ Done" : "To do"}</Text>
				</View>
			</View>

			<Text style={mindsetStyles.cardDescription}>
				{shuffledImages.length} motivational images of success, strength, and excellence
			</Text>

			{/* Navigation Buttons */}
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: 16,
				}}
			>
				<TouchableOpacity
					onPress={goToPrevious}
					disabled={currentIndex === 0}
					style={{
						backgroundColor: currentIndex === 0 ? "#505060" : "#007fff",
						paddingHorizontal: 16,
						paddingVertical: 8,
						borderRadius: 6,
						minWidth: 60,
						alignItems: "center",
					}}
				>
					<Text
						style={{
							color: "#fff",
							fontWeight: "600",
							fontFamily: "LexendSemiBold",
						}}
					>
						← Prev
					</Text>
				</TouchableOpacity>

				<Text
					style={{
						color: "#aaa",
						fontSize: 14,
						fontFamily: "LexendRegular",
					}}
				>
					{currentIndex + 1} of {shuffledImages.length}
				</Text>

				<TouchableOpacity
					onPress={goToNext}
					disabled={currentIndex === shuffledImages.length - 1}
					style={{
						backgroundColor: currentIndex === shuffledImages.length - 1 ? "#505060" : "#007fff",
						paddingHorizontal: 16,
						paddingVertical: 8,
						borderRadius: 6,
						minWidth: 60,
						alignItems: "center",
					}}
				>
					<Text
						style={{
							color: "#fff",
							fontWeight: "600",
							fontFamily: "LexendSemiBold",
						}}
					>
						Next →
					</Text>
				</TouchableOpacity>
			</View>

			{/* Image Slideshow */}
			<FlatList
				ref={flatListRef}
				data={shuffledImages}
				renderItem={renderImage}
				keyExtractor={(item) => item}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={handleScroll}
				scrollEventThrottle={16}
				decelerationRate="fast"
				snapToInterval={screenWidth - 48}
				snapToAlignment="start"
				contentContainerStyle={{
					paddingHorizontal: 0,
				}}
			/>

			{/* Dots Indicator */}
			{renderDots()}

			{/* Progress Info */}
			<Text
				style={{
					color: "#aaa",
					fontSize: 12,
					textAlign: "center",
					marginTop: 16,
					fontFamily: "LexendRegular",
				}}
			>
				{completed
					? "✓ Keep scrolling for motivation"
					: "View a few images to complete this section"}
			</Text>
		</View>
	);
};
