import { Typography } from "@braingame/bgui";
import { useNavigation } from "@react-navigation/native";
import type React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { withNavigationGuard } from "../../navigation/components/NavigationGuard";
import { useConditionalNavigation } from "../../navigation/hooks/useConditionalNavigation";

const PremiumFeature = ({
	icon,
	title,
	description,
}: {
	icon: string;
	title: string;
	description: string;
}) => (
	<View style={styles.feature}>
		<Typography style={styles.featureIcon}>{icon}</Typography>
		<View style={styles.featureContent}>
			<Typography style={styles.featureTitle}>{title}</Typography>
			<Typography style={styles.featureDescription}>{description}</Typography>
		</View>
	</View>
);

const PremiumScreenComponent: React.FC = () => {
	const _navigation = useNavigation();
	const { navigateWithConditions } = useConditionalNavigation();

	const handleSubscribe = () => {
		// This will check conditions before navigating
		navigateWithConditions("Payment", {
			planId: "premium_annual",
			price: 79.99,
		});
	};

	const handleFeaturePress = (feature: string) => {
		// Navigate to feature with subscription check
		navigateWithConditions(feature, undefined, { requiresSubscription: true });
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Header */}
				<View style={styles.header}>
					<Typography style={styles.logo}>🏆</Typography>
					<Typography style={styles.title}>BrainGame Premium</Typography>
					<Typography style={styles.subtitle}>Unlock your full potential with unlimited access</Typography>
				</View>

				{/* Features */}
				<View style={styles.featuresSection}>
					<Typography style={styles.sectionTitle}>Everything in Premium</Typography>

					<TouchableOpacity onPress={() => handleFeaturePress("AdvancedAnalytics")}>
						<PremiumFeature
							icon="📊"
							title="Advanced Analytics"
							description="Deep insights into your cognitive performance"
						/>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => handleFeaturePress("PersonalCoach")}>
						<PremiumFeature
							icon="🤖"
							title="AI Personal Coach"
							description="Personalized training recommendations"
						/>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => handleFeaturePress("UnlimitedContent")}>
						<PremiumFeature
							icon="♾️"
							title="Unlimited Content"
							description="Access to all exercises and video content"
						/>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => handleFeaturePress("OfflineMode")}>
						<PremiumFeature
							icon="📱"
							title="Offline Mode"
							description="Train anywhere without internet"
						/>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => handleFeaturePress("PrioritySupport")}>
						<PremiumFeature
							icon="💬"
							title="Priority Support"
							description="Get help from our expert team"
						/>
					</TouchableOpacity>
				</View>

				{/* Pricing */}
				<View style={styles.pricingSection}>
					<TouchableOpacity style={styles.pricingOption} onPress={handleSubscribe}>
						<View style={styles.pricingBadge}>
							<Typography style={styles.pricingBadgeText}>BEST VALUE</Typography>
						</View>
						<Typography style={styles.pricingTitle}>Annual</Typography>
						<Typography style={styles.pricingPrice}>$79.99</Typography>
						<Typography style={styles.pricingPeriod}>per year</Typography>
						<Typography style={styles.pricingSavings}>Save 33%</Typography>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.pricingOption, styles.pricingOptionMonthly]}
						onPress={() =>
							navigateWithConditions("Payment", {
								planId: "premium_monthly",
								price: 9.99,
							})
						}
					>
						<Typography style={styles.pricingTitle}>Monthly</Typography>
						<Typography style={styles.pricingPrice}>$9.99</Typography>
						<Typography style={styles.pricingPeriod}>per month</Typography>
					</TouchableOpacity>
				</View>

				{/* CTA Button */}
				<TouchableOpacity style={styles.ctaButton} onPress={handleSubscribe}>
					<Typography style={styles.ctaButtonText}>Start Free Trial</Typography>
					<Typography style={styles.ctaSubtext}>7 days free, then $79.99/year</Typography>
				</TouchableOpacity>

				{/* Terms */}
				<Typography style={styles.terms}>Cancel anytime. Recurring billing. Terms apply.</Typography>
			</ScrollView>
		</SafeAreaView>
	);
};

// Wrap with navigation guard requiring authentication
export const PremiumScreen = withNavigationGuard(PremiumScreenComponent, {
	requireAuth: true,
	requireOnboarding: true,
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		alignItems: "center",
		paddingVertical: 40,
		paddingHorizontal: 20,
	},
	logo: {
		fontSize: 60,
		marginBottom: 20,
	},
	title: {
		fontSize: 32,
		fontWeight: "700",
		fontFamily: "Lexend",
		marginBottom: 12,
	},
	subtitle: {
		fontSize: 16,
		color: "#666",
		fontFamily: "Lexend",
		fontWeight: "400",
		textAlign: "center",
	},
	featuresSection: {
		paddingHorizontal: 20,
		marginBottom: 40,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "600",
		fontFamily: "Lexend",
		marginBottom: 24,
	},
	feature: {
		flexDirection: "row",
		marginBottom: 24,
	},
	featureIcon: {
		fontSize: 32,
		marginRight: 16,
	},
	featureContent: {
		flex: 1,
	},
	featureTitle: {
		fontSize: 18,
		fontWeight: "600",
		fontFamily: "Lexend",
		marginBottom: 4,
	},
	featureDescription: {
		fontSize: 14,
		color: "#666",
		fontFamily: "Lexend",
		fontWeight: "400",
	},
	pricingSection: {
		flexDirection: "row",
		paddingHorizontal: 20,
		marginBottom: 30,
	},
	pricingOption: {
		flex: 1,
		backgroundColor: "#007fff",
		borderRadius: 12,
		padding: 20,
		marginRight: 12,
		alignItems: "center",
		position: "relative",
	},
	pricingOptionMonthly: {
		backgroundColor: "#f5f5f5",
		marginRight: 0,
		marginLeft: 12,
	},
	pricingBadge: {
		position: "absolute",
		top: -10,
		backgroundColor: "#ff6b6b",
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 12,
	},
	pricingBadgeText: {
		color: "#fff",
		fontSize: 12,
		fontWeight: "600",
		fontFamily: "Lexend",
	},
	pricingTitle: {
		fontSize: 18,
		fontWeight: "600",
		fontFamily: "Lexend",
		marginBottom: 8,
		color: "#fff",
	},
	pricingPrice: {
		fontSize: 28,
		fontWeight: "700",
		fontFamily: "Lexend",
		color: "#fff",
	},
	pricingPeriod: {
		fontSize: 14,
		color: "#fff",
		opacity: 0.8,
		marginBottom: 8,
	},
	pricingSavings: {
		fontSize: 14,
		color: "#fff",
		fontWeight: "600",
		fontFamily: "Lexend",
	},
	ctaButton: {
		backgroundColor: "#007fff",
		marginHorizontal: 20,
		paddingVertical: 20,
		borderRadius: 12,
		alignItems: "center",
		marginBottom: 20,
	},
	ctaButtonText: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "700",
		fontFamily: "Lexend",
		marginBottom: 4,
	},
	ctaSubtext: {
		color: "#fff",
		fontSize: 14,
		opacity: 0.9,
		fontFamily: "Lexend",
		fontWeight: "400",
	},
	terms: {
		textAlign: "center",
		fontSize: 12,
		color: "#999",
		fontFamily: "Lexend",
		fontWeight: "400",
		paddingHorizontal: 40,
		paddingBottom: 40,
	},
});
