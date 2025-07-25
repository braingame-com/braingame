import { Tokens } from "@braingame/utils";
import { Dimensions, StyleSheet, View } from "react-native";
import { Text } from "../../components/Text";
import { useTheme } from "../../theme";
import { Button } from "../Button";
import { Image } from "../Image";
import type { OnboardingSlideProps } from "./types";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

function OnboardingSlideComponent({
	title,
	description,
	image,
	isLast = false,
	currentIndex = 0,
	totalSlides = 1,
	onSkip,
	onNext,
	style,
}: OnboardingSlideProps) {
	const { colors } = useTheme();

	return (
		<View style={[styles.container, { backgroundColor: colors.background }, style]}>
			{/* Skip button in top right */}
			{!isLast && onSkip && (
				<View style={styles.skipContainer}>
					<Button variant="ghost" size="sm" onPress={onSkip}>
						Skip
					</Button>
				</View>
			)}

			{/* Content */}
			<View style={styles.content}>
				{/* Image */}
				{image && (
					<View style={styles.imageContainer}>
						<Image src={image} style={styles.image} alt="Onboarding illustration" />
					</View>
				)}

				{/* Text content */}
				<View style={styles.textContainer}>
					<Text variant="displayTitle" align="center" style={styles.title}>
						{title}
					</Text>
					<Text variant="body" align="center" color="secondary" style={styles.description}>
						{description}
					</Text>
				</View>
			</View>

			{/* Bottom section with dots and button */}
			<View style={styles.bottomSection}>
				{/* Progress dots */}
				{totalSlides > 1 && (
					<View style={styles.dotsContainer}>
						{Array.from({ length: totalSlides }).map((_, index) => (
							<View
								// biome-ignore lint/suspicious/noArrayIndexKey: Dots are static visual indicators
								key={`dot-${index}`}
								style={[
									styles.dot,
									{
										backgroundColor:
											index === currentIndex ? colors.primary : colors.outlineVariant,
									},
									index === currentIndex && styles.activeDot,
								]}
							/>
						))}
					</View>
				)}

				{/* Action button */}
				{onNext && (
					<Button
						variant="primary"
						size="lg"
						onPress={onNext}
						icon={!isLast ? "arrow-right" : undefined}
						iconPosition="right"
						fullWidth
					>
						{isLast ? "Get Started" : "Next"}
					</Button>
				)}
			</View>
		</View>
	);
}

export const OnboardingSlide = OnboardingSlideComponent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	skipContainer: {
		position: "absolute",
		top: Tokens.m,
		right: Tokens.m,
		zIndex: 1,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: Tokens.xl,
	},
	imageContainer: {
		width: screenWidth * 0.8,
		height: screenHeight * 0.4,
		marginBottom: Tokens.xl,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	textContainer: {
		alignItems: "center",
		maxWidth: screenWidth * 0.9,
	},
	title: {
		marginBottom: Tokens.m,
	},
	description: {
		lineHeight: 24,
	},
	bottomSection: {
		paddingHorizontal: Tokens.xl,
		paddingBottom: Tokens.xl,
		alignItems: "center",
	},
	dotsContainer: {
		flexDirection: "row",
		marginBottom: Tokens.xl,
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginHorizontal: 4,
	},
	activeDot: {
		width: 24,
	},
});
