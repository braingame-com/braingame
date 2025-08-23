import { Text } from "@braingame/bgui";
import { useNavigation } from "@react-navigation/native";
import type React from "react";
import { useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const onboardingSteps = [
	{
		id: "train",
		icon: "🧠",
		title: "Train Your Mind",
		description: "Daily exercises designed by neuroscientists to improve focus and mental clarity",
	},
	{
		id: "track",
		icon: "📊",
		title: "Track Progress",
		description: "Visualize your improvement with detailed analytics and insights",
	},
	{
		id: "achieve",
		icon: "🎯",
		title: "Achieve Goals",
		description: "Set personal targets and build lasting habits with our guided programs",
	},
	{
		id: "community",
		icon: "🏆",
		title: "Join Community",
		description: "Connect with thousands of people on the same journey to peak performance",
	},
];

interface OnboardingStepProps {
	step: (typeof onboardingSteps)[0];
	index: number;
	scrollX: Animated.SharedValue<number>;
}

const OnboardingStep: React.FC<OnboardingStepProps> = ({ step, index, scrollX }) => {
	const inputRange = [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH];

	const animatedStyle = useAnimatedStyle(() => {
		const scale = interpolate(scrollX.value, inputRange, [0.8, 1, 0.8], Extrapolate.CLAMP);
		const opacity = interpolate(scrollX.value, inputRange, [0.5, 1, 0.5], Extrapolate.CLAMP);

		return {
			transform: [{ scale }],
			opacity,
		};
	});

	return (
		<View style={styles.stepContainer}>
			<Animated.View style={[styles.stepContent, animatedStyle]}>
				<Text style={styles.stepIcon}>{step.icon}</Text>
				<Text style={styles.stepTitle}>{step.title}</Text>
				<Text style={styles.stepDescription}>{step.description}</Text>
			</Animated.View>
		</View>
	);
};

export const OnboardingModal: React.FC = () => {
	const navigation = useNavigation();
	const [currentStep, setCurrentStep] = useState(0);
	const scrollX = useSharedValue(0);
	const scrollViewRef = useRef<ScrollView>(null);

	const handleNext = () => {
		if (currentStep < onboardingSteps.length - 1) {
			const nextStep = currentStep + 1;
			setCurrentStep(nextStep);
			scrollViewRef.current?.scrollTo({ x: nextStep * SCREEN_WIDTH, animated: true });
		} else {
			handleComplete();
		}
	};

	const handleSkip = () => {
		handleComplete();
	};

	const handleComplete = () => {
		// Save onboarding completion status
		navigation.goBack();
	};

	const renderStep = (step: (typeof onboardingSteps)[0], index: number) => {
		return <OnboardingStep key={step.id} step={step} index={index} scrollX={scrollX} />;
	};

	return (
		<SafeAreaView style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity onClick={handleSkip}>
					<Text style={styles.skipButton}>Skip</Text>
				</TouchableOpacity>
			</View>

			{/* Content */}
			<ScrollView
				ref={scrollViewRef}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={(event) => {
					scrollX.value = event.nativeEvent.contentOffset.x;
					const step = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
					setCurrentStep(step);
				}}
				scrollEventThrottle={16}
			>
				{onboardingSteps.map(renderStep)}
			</ScrollView>

			{/* Pagination */}
			<View style={styles.pagination}>
				{onboardingSteps.map((step, index) => (
					<View
						key={step.id}
						style={[styles.paginationDot, currentStep === index && styles.paginationDotActive]}
					/>
				))}
			</View>

			{/* Bottom Actions */}
			<View style={styles.footer}>
				<TouchableOpacity style={styles.nextButton} onClick={handleNext}>
					<Text style={styles.nextButtonText}>
						{currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		alignItems: "flex-end",
		paddingHorizontal: 20,
		paddingVertical: 16,
	},
	skipButton: {
		fontSize: 16,
		color: "#007fff",
		fontFamily: "Lexend",
		fontWeight: "400",
	},
	stepContainer: {
		width: SCREEN_WIDTH,
		paddingHorizontal: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	stepContent: {
		alignItems: "center",
	},
	stepIcon: {
		fontSize: 80,
		marginBottom: 40,
	},
	stepTitle: {
		fontSize: 28,
		fontWeight: "700",
		fontFamily: "Lexend",
		marginBottom: 16,
		textAlign: "center",
	},
	stepDescription: {
		fontSize: 16,
		color: "#666",
		fontFamily: "Lexend",
		fontWeight: "400",
		textAlign: "center",
		lineHeight: 24,
	},
	pagination: {
		flexDirection: "row",
		justifyContent: "center",
		paddingVertical: 20,
	},
	paginationDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: "#e1e1e1",
		marginHorizontal: 4,
	},
	paginationDotActive: {
		backgroundColor: "#007fff",
		width: 24,
	},
	footer: {
		paddingHorizontal: 20,
		paddingBottom: 30,
	},
	nextButton: {
		backgroundColor: "#007fff",
		paddingVertical: 16,
		borderRadius: 12,
		alignItems: "center",
	},
	nextButtonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "600",
		fontFamily: "Lexend",
	},
});
