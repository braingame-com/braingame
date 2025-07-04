import type { ImageSourcePropType, ViewStyle } from "react-native";

export interface OnboardingSlideProps {
	/**
	 * Main title for the slide
	 */
	title: string;

	/**
	 * Description text
	 */
	description: string;

	/**
	 * Optional image or illustration
	 */
	image?: ImageSourcePropType;

	/**
	 * Whether this is the last slide
	 */
	isLast?: boolean;

	/**
	 * Current slide index (for progress dots)
	 */
	currentIndex?: number;

	/**
	 * Total number of slides (for progress dots)
	 */
	totalSlides?: number;

	/**
	 * Callback when Skip is pressed
	 */
	onSkip?: () => void;

	/**
	 * Callback when Next/Get Started is pressed
	 */
	onNext?: () => void;

	/**
	 * Custom styling
	 */
	style?: ViewStyle;
}
