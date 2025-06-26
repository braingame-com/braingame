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

interface LazyImagesProps {
	onComplete: () => void;
	completed: boolean;
}

// Define type for image assets
type ImageAsset = () => number;

// Define image map outside the function to allow access to keys
const imageMap: Record<string, ImageAsset> = {
	"aka-thailand.jpg": () => require("../../../assets/images/images-section/aka-thailand.jpg"),
	"ali-liston.webp": () => require("../../../assets/images/images-section/ali-liston.webp"),
	"arnold.png": () => require("../../../assets/images/images-section/arnold.png"),
	"aspinall.webp": () => require("../../../assets/images/images-section/aspinall.webp"),
	"bisping.webp": () => require("../../../assets/images/images-section/bisping.webp"),
	"boat-deck.webp": () => require("../../../assets/images/images-section/boat-deck.webp"),
	"buakaw.jpg": () => require("../../../assets/images/images-section/buakaw.jpg"),
	"burj-khalifa.jpg": () => require("../../../assets/images/images-section/burj-khalifa.jpg"),
	"calvin-klein.webp": () => require("../../../assets/images/images-section/calvin-klein.webp"),
	"cigar-boys.jpg": () => require("../../../assets/images/images-section/cigar-boys.jpg"),
	"classic-boat.webp": () => require("../../../assets/images/images-section/classic-boat.webp"),
	"Dan-Bilzerian-Phuket.webp": () =>
		require("../../../assets/images/images-section/Dan-Bilzerian-Phuket.webp"),
	"dana-white-donald-trump-kid-rock-elon-musk.webp": () =>
		require("../../../assets/images/images-section/dana-white-donald-trump-kid-rock-elon-musk.webp"),
	"danaher.png": () => require("../../../assets/images/images-section/danaher.png"),
	"dave-courtney.png": () => require("../../../assets/images/images-section/dave-courtney.png"),
	"dc.webp": () => require("../../../assets/images/images-section/dc.webp"),
	"diamond.jpg": () => require("../../../assets/images/images-section/diamond.jpg"),
	"dricus.jpg": () => require("../../../assets/images/images-section/dricus.jpg"),
	"dua.webp": () => require("../../../assets/images/images-section/dua.webp"),
	"fedor.jpg": () => require("../../../assets/images/images-section/fedor.jpg"),
	"freedom-beach.webp": () => require("../../../assets/images/images-section/freedom-beach.webp"),
	"g-unit.webp": () => require("../../../assets/images/images-section/g-unit.webp"),
	"gatsalov.webp": () => require("../../../assets/images/images-section/gatsalov.webp"),
	"goggins.jpg": () => require("../../../assets/images/images-section/goggins.jpg"),
	"gold.webp": () => require("../../../assets/images/images-section/gold.webp"),
	"gordon-ryan.jpeg": () => require("../../../assets/images/images-section/gordon-ryan.jpeg"),
	"GSP-cold.webp": () => require("../../../assets/images/images-section/GSP-cold.webp"),
	"gucci-shorts.jpg": () => require("../../../assets/images/images-section/gucci-shorts.jpg"),
	"guerlain.png": () => require("../../../assets/images/images-section/guerlain.png"),
	"helicopter-tour-phuket.jpg": () =>
		require("../../../assets/images/images-section/helicopter-tour-phuket.jpg"),
	"ilia-topuria.webp": () => require("../../../assets/images/images-section/ilia-topuria.webp"),
	"jacob.jpg": () => require("../../../assets/images/images-section/jacob.jpg"),
	// Only load the most important/smaller images initially
	// Large images like "jada-and-friends.png" (2.3MB), "jon.png" (2.3MB), "lamborghini.jpg" (3.8MB) excluded
	"jeff-bezos.webp": () => require("../../../assets/images/images-section/jeff-bezos.webp"),
	"jocko.png": () => require("../../../assets/images/images-section/jocko.png"),
	"joe-rogan.jpg": () => require("../../../assets/images/images-section/joe-rogan.jpg"),
	"jon-jones-comeback.jpg": () =>
		require("../../../assets/images/images-section/jon-jones-comeback.jpg"),
	"karelin.jpg": () => require("../../../assets/images/images-section/karelin.jpg"),
	"khabib.jpg": () => require("../../../assets/images/images-section/khabib.jpg"),
	"lenny-mclean.jpg": () => require("../../../assets/images/images-section/lenny-mclean.jpg"),
	"lsf-1.jpg": () => require("../../../assets/images/images-section/lsf-1.jpg"),
	"lsf-3.jpg": () => require("../../../assets/images/images-section/lsf-3.jpg"),
	"mayweather-rr.jpg": () => require("../../../assets/images/images-section/mayweather-rr.jpg"),
	"mcgregor.jpg": () => require("../../../assets/images/images-section/mcgregor.jpg"),
	"mike-tyson.jpg": () => require("../../../assets/images/images-section/mike-tyson.jpg"),
	"ngannou.jpg": () => require("../../../assets/images/images-section/ngannou.jpg"),
	"paddy.webp": () => require("../../../assets/images/images-section/paddy.webp"),
	"perfume-caps.webp": () => require("../../../assets/images/images-section/perfume-caps.webp"),
	"pool-n-buddha.jpg": () => require("../../../assets/images/images-section/pool-n-buddha.jpg"),
	"popcaan.jpg": () => require("../../../assets/images/images-section/popcaan.jpg"),
	"private-jet.jpg": () => require("../../../assets/images/images-section/private-jet.jpg"),
	"rocket.webp": () => require("../../../assets/images/images-section/rocket.webp"),
	"rolex.jpeg": () => require("../../../assets/images/images-section/rolex.jpeg"),
	"roy-shaw.webp": () => require("../../../assets/images/images-section/roy-shaw.webp"),
	"rr-ghost.jpg": () => require("../../../assets/images/images-section/rr-ghost.jpg"),
	"tai-jet.jpeg": () => require("../../../assets/images/images-section/tai-jet.jpeg"),
	"tates-at-ufc.jpg": () => require("../../../assets/images/images-section/tates-at-ufc.jpg"),
	"tough.jpg": () => require("../../../assets/images/images-section/tough.jpg"),
	"tyson-fury.webp": () => require("../../../assets/images/images-section/tyson-fury.webp"),
	"ufc-belt.webp": () => require("../../../assets/images/images-section/ufc-belt.webp"),
	"ufc-logo.jpg": () => require("../../../assets/images/images-section/ufc-logo.jpg"),
	"versace-briefs.jpg": () => require("../../../assets/images/images-section/versace-briefs.jpg"),
	"yacht-party.jpg": () => require("../../../assets/images/images-section/yacht-party.jpg"),
	"zahabi-gsp.jpg": () => require("../../../assets/images/images-section/zahabi-gsp.jpg"),
	"zuck.webp": () => require("../../../assets/images/images-section/zuck.webp"),
};

// Lazy load image assets - only load when needed
const getImageSource = (imageName: string) => {
	return imageMap[imageName]?.() || null;
};

/**
 * Lazy Images Component
 * Optimized version that only loads images when needed to reduce bundle size
 */
export const LazyImages: React.FC<LazyImagesProps> = ({ onComplete, completed }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [loadedImages, setLoadedImages] = useState<Record<string, number>>({});
	const flatListRef = useRef<FlatList>(null);
	const { width: screenWidth } = Dimensions.get("window");

	// Reduced image set to optimize bundle size
	const imageNames = useMemo(() => {
		// Use Fisher-Yates shuffle for unbiased randomization
		const names = Object.keys(imageMap);
		for (let i = names.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[names[i], names[j]] = [names[j], names[i]];
		}
		return names;
	}, []);

	// Load image on demand
	const loadImage = useCallback((imageName: string) => {
		setLoadedImages((prev) => {
			if (!prev[imageName]) {
				const source = getImageSource(imageName);
				if (source) {
					return { ...prev, [imageName]: source };
				}
			}
			return prev;
		});
	}, []);

	// Preload current and next few images
	useEffect(() => {
		const preloadRange = 3; // Load current + 2 ahead
		for (let i = currentIndex; i < Math.min(currentIndex + preloadRange, imageNames.length); i++) {
			loadImage(imageNames[i]);
		}
	}, [currentIndex, imageNames, loadImage]);

	const handleScroll = useCallback(
		(event: NativeSyntheticEvent<NativeScrollEvent>) => {
			const { contentOffset } = event.nativeEvent;
			const index = Math.round(contentOffset.x / screenWidth);
			setCurrentIndex(index);
		},
		[screenWidth],
	);

	const goToSlide = useCallback((index: number) => {
		flatListRef.current?.scrollToIndex({ index, animated: true });
		setCurrentIndex(index);
	}, []);

	const goToPrevious = useCallback(() => {
		if (currentIndex > 0) {
			goToSlide(currentIndex - 1);
		}
	}, [currentIndex, goToSlide]);

	const goToNext = useCallback(() => {
		if (currentIndex < imageNames.length - 1) {
			goToSlide(currentIndex + 1);
		}
	}, [currentIndex, imageNames.length, goToSlide]);

	useEffect(() => {
		if (currentIndex >= 5 && !completed) {
			onComplete();
		}
	}, [currentIndex, completed, onComplete]);

	const renderImage = useCallback(
		({ item }: { item: string }) => {
			const imageSource = loadedImages[item];

			return (
				<View
					style={{
						width: screenWidth - 48,
						height: 300,
						marginHorizontal: 0,
						backgroundColor: "#1a1a1a",
						borderRadius: 12,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{imageSource ? (
						<Image
							source={imageSource}
							style={{
								width: "100%",
								height: "100%",
								borderRadius: 12,
							}}
							resizeMode="cover"
						/>
					) : (
						<Text style={{ color: "#666", fontFamily: "LexendRegular" }}>Loading...</Text>
					)}
				</View>
			);
		},
		[screenWidth, loadedImages],
	);

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
				{imageNames.slice(0, Math.min(imageNames.length, 15)).map((item, index) => (
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
				{imageNames.length > 15 && (
					<Text
						style={{
							color: "#aaa",
							fontSize: 12,
							marginLeft: 8,
						}}
					>
						+{imageNames.length - 15} more
					</Text>
				)}
			</View>
		),
		[imageNames, currentIndex, goToSlide],
	);

	return (
		<View style={mindsetStyles.card}>
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
				{imageNames.length} motivational images loaded on demand
			</Text>

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
					{currentIndex + 1} of {imageNames.length}
				</Text>

				<TouchableOpacity
					onPress={goToNext}
					disabled={currentIndex === imageNames.length - 1}
					style={{
						backgroundColor: currentIndex === imageNames.length - 1 ? "#505060" : "#007fff",
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

			<FlatList
				ref={flatListRef}
				data={imageNames}
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

			{renderDots()}

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
