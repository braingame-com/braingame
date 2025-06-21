import type React from "react";
import { Linking, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAnalyticsSettings } from "../../contexts/AnalyticsContext";
import { useButtonTracking, useScreenTracking } from "../../hooks/useAnalytics";
import {
	AccessibleThemedButton,
	AccessibleThemedSwitch,
	AccessibleThemedText,
	AccessibleThemedView,
} from "../../theme/components/AccessibleThemedComponents";
import { useTheme } from "../../theme/ThemeContext";
import { withMemo } from "../../utils/performance";

interface PrivacyOption {
	id: "minimal" | "balanced" | "full";
	label: string;
	description: string;
	features: string[];
}

const privacyOptions: PrivacyOption[] = [
	{
		id: "minimal",
		label: "Minimal",
		description: "Only essential data for app functionality",
		features: ["Basic app usage", "Crash reports", "Critical errors"],
	},
	{
		id: "balanced",
		label: "Balanced",
		description: "Help us improve while protecting your privacy",
		features: [
			"All minimal features",
			"Feature usage analytics",
			"Anonymous user journey",
			"Performance metrics",
		],
	},
	{
		id: "full",
		label: "Full",
		description: "Maximum insights to enhance your experience",
		features: [
			"All balanced features",
			"Detailed interaction tracking",
			"A/B testing participation",
			"Personalized recommendations",
		],
	},
];

// Privacy Level Selector Component
const PrivacyLevelSelector = withMemo(() => {
	const { theme } = useTheme();
	const { privacyLevel, setPrivacyLevel } = useAnalyticsSettings();
	const trackPrivacyChange = useButtonTracking("privacy_level_change");

	const handlePrivacyChange = (level: "minimal" | "balanced" | "full") => {
		trackPrivacyChange();
		setPrivacyLevel(level);
	};

	return (
		<View style={{ marginBottom: theme.sizes.spacingLG }}>
			<AccessibleThemedText
				variant="primary"
				size="lg"
				weight="semibold"
				style={{ marginBottom: theme.sizes.spacingMD }}
				isHeading
			>
				Privacy Level
			</AccessibleThemedText>

			{privacyOptions.map((option) => (
				<TouchableOpacity
					key={option.id}
					onPress={() => handlePrivacyChange(option.id)}
					style={{
						marginBottom: theme.sizes.spacingMD,
						padding: theme.sizes.spacingMD,
						borderRadius: theme.sizes.radiusLG,
						borderWidth: 2,
						borderColor: privacyLevel === option.id ? theme.colors.primary : theme.colors.border,
						backgroundColor:
							privacyLevel === option.id ? `${theme.colors.primary}10` : theme.colors.surface,
					}}
					accessibilityRole="radio"
					accessibilityState={{ selected: privacyLevel === option.id }}
					accessibilityLabel={`${option.label} privacy level`}
					accessibilityHint={option.description}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginBottom: theme.sizes.spacingSM,
						}}
					>
						<AccessibleThemedText variant="primary" size="md" weight="semibold" style={{ flex: 1 }}>
							{option.label}
						</AccessibleThemedText>
						{privacyLevel === option.id && (
							<AccessibleThemedText variant="primary" size="lg">
								✓
							</AccessibleThemedText>
						)}
					</View>

					<AccessibleThemedText
						variant="secondary"
						size="sm"
						style={{ marginBottom: theme.sizes.spacingSM }}
					>
						{option.description}
					</AccessibleThemedText>

					<View style={{ marginLeft: theme.sizes.spacingMD }}>
						{option.features.map((feature) => (
							<AccessibleThemedText
								key={`${option.id}-${feature}`}
								variant="secondary"
								size="xs"
								style={{ marginBottom: 2 }}
							>
								• {feature}
							</AccessibleThemedText>
						))}
					</View>
				</TouchableOpacity>
			))}
		</View>
	);
}, "PrivacyLevelSelector");

export const AnalyticsSettingsScreen: React.FC = () => {
	const { theme } = useTheme();
	const {
		isAnalyticsEnabled,
		toggleAnalytics,
		isPerformanceTrackingEnabled,
		togglePerformanceTracking,
		isCrashReportingEnabled,
		toggleCrashReporting,
	} = useAnalyticsSettings();

	// Track screen view
	useScreenTracking("AnalyticsSettings");

	// Track button clicks
	const trackPrivacyPolicy = useButtonTracking("privacy_policy_link");
	const trackDataDeletion = useButtonTracking("request_data_deletion");

	const handlePrivacyPolicy = () => {
		trackPrivacyPolicy();
		Linking.openURL("https://braingame.dev/privacy");
	};

	const handleDataDeletion = () => {
		trackDataDeletion();
		Linking.openURL("https://braingame.dev/data-deletion");
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
			<ScrollView
				contentContainerStyle={{
					padding: theme.sizes.spacingMD,
				}}
				showsVerticalScrollIndicator={false}
			>
				<AccessibleThemedView variant="background" style={{ marginBottom: theme.sizes.spacingXL }}>
					<AccessibleThemedText
						variant="primary"
						size="3xl"
						weight="bold"
						style={{ marginBottom: theme.sizes.spacingSM }}
						isHeading
					>
						Analytics & Privacy
					</AccessibleThemedText>
					<AccessibleThemedText variant="secondary" size="md">
						Control how we collect and use your data
					</AccessibleThemedText>
				</AccessibleThemedView>

				{/* Master Analytics Toggle */}
				<AccessibleThemedView
					variant="card"
					style={{
						padding: theme.sizes.spacingMD,
						marginBottom: theme.sizes.spacingMD,
						borderRadius: theme.sizes.radiusLG,
					}}
				>
					<AccessibleThemedSwitch
						label="Analytics"
						value={isAnalyticsEnabled}
						onValueChange={toggleAnalytics}
						accessibilityLabel="Enable analytics"
					/>
					<AccessibleThemedText
						variant="secondary"
						size="sm"
						style={{ marginTop: theme.sizes.spacingSM }}
					>
						Help us improve Brain Game by sharing anonymous usage data
					</AccessibleThemedText>
				</AccessibleThemedView>

				{/* Privacy Level Selection */}
				{isAnalyticsEnabled && (
					<AccessibleThemedView
						variant="card"
						style={{
							padding: theme.sizes.spacingMD,
							marginBottom: theme.sizes.spacingMD,
							borderRadius: theme.sizes.radiusLG,
						}}
					>
						<PrivacyLevelSelector />
					</AccessibleThemedView>
				)}

				{/* Additional Settings */}
				<AccessibleThemedView
					variant="card"
					style={{
						padding: theme.sizes.spacingMD,
						marginBottom: theme.sizes.spacingMD,
						borderRadius: theme.sizes.radiusLG,
					}}
				>
					<AccessibleThemedText
						variant="primary"
						size="lg"
						weight="semibold"
						style={{ marginBottom: theme.sizes.spacingMD }}
						isHeading
					>
						Additional Settings
					</AccessibleThemedText>

					<View style={{ gap: theme.sizes.spacingMD }}>
						<AccessibleThemedSwitch
							label="Performance Tracking"
							value={isPerformanceTrackingEnabled}
							onValueChange={togglePerformanceTracking}
							accessibilityLabel="Enable performance tracking"
							error={!isAnalyticsEnabled}
						/>

						<AccessibleThemedSwitch
							label="Crash Reporting"
							value={isCrashReportingEnabled}
							onValueChange={toggleCrashReporting}
							accessibilityLabel="Enable crash reporting"
						/>
					</View>

					{!isAnalyticsEnabled && (
						<AccessibleThemedText
							variant="secondary"
							size="sm"
							style={{ marginTop: theme.sizes.spacingMD }}
						>
							Note: Some features require analytics to be enabled
						</AccessibleThemedText>
					)}
				</AccessibleThemedView>

				{/* Data Usage Info */}
				<AccessibleThemedView
					variant="surface"
					style={{
						padding: theme.sizes.spacingMD,
						marginBottom: theme.sizes.spacingMD,
						borderRadius: theme.sizes.radiusMD,
					}}
				>
					<AccessibleThemedText
						variant="primary"
						size="md"
						weight="semibold"
						style={{ marginBottom: theme.sizes.spacingSM }}
						isHeading
					>
						How We Use Your Data
					</AccessibleThemedText>

					<AccessibleThemedText
						variant="secondary"
						size="sm"
						style={{ marginBottom: theme.sizes.spacingSM }}
					>
						• Improve app performance and fix bugs
					</AccessibleThemedText>
					<AccessibleThemedText
						variant="secondary"
						size="sm"
						style={{ marginBottom: theme.sizes.spacingSM }}
					>
						• Understand feature usage to guide development
					</AccessibleThemedText>
					<AccessibleThemedText
						variant="secondary"
						size="sm"
						style={{ marginBottom: theme.sizes.spacingSM }}
					>
						• Personalize your experience (with permission)
					</AccessibleThemedText>
					<AccessibleThemedText variant="secondary" size="sm">
						• Never sell or share your personal data
					</AccessibleThemedText>
				</AccessibleThemedView>

				{/* Actions */}
				<View style={{ gap: theme.sizes.spacingMD }}>
					<AccessibleThemedButton
						variant="outline"
						size="medium"
						fullWidth
						onPress={handlePrivacyPolicy}
						accessibilityLabel="View Privacy Policy"
						accessibilityHint="Opens privacy policy in your browser"
					>
						View Privacy Policy
					</AccessibleThemedButton>

					<AccessibleThemedButton
						variant="ghost"
						size="medium"
						fullWidth
						onPress={handleDataDeletion}
						accessibilityLabel="Request Data Deletion"
						accessibilityHint="Opens data deletion request form in your browser"
					>
						Request Data Deletion
					</AccessibleThemedButton>
				</View>

				{/* Footer Info */}
				<AccessibleThemedText
					variant="secondary"
					size="xs"
					style={{
						marginTop: theme.sizes.spacingXL,
						textAlign: "center",
					}}
				>
					Your privacy is important to us. Changes take effect immediately.
				</AccessibleThemedText>
			</ScrollView>
		</SafeAreaView>
	);
};
