import type React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAnalyticsSettings } from "../../../contexts/AnalyticsContext";
import { useScreenTracking } from "../../../hooks/useAnalytics";
import {
	AccessibleThemedText,
	AccessibleThemedView,
} from "../../../theme/components/AccessibleThemedComponents";
import { useTheme } from "../../../theme/ThemeContext";
import {
	ActionButtons,
	AdditionalSettings,
	AnalyticsToggle,
	DataUsageInfo,
	PrivacyLevelSelector,
} from "./components";

export const AnalyticsSettingsScreen: React.FC = () => {
	const { theme } = useTheme();
	const { isAnalyticsEnabled } = useAnalyticsSettings();

	// Track screen view
	useScreenTracking("AnalyticsSettings");

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
						variant="solid"
						size="3xl"
						weight="bold"
						style={{ marginBottom: theme.sizes.spacingSM }}
						isHeading
					>
						Analytics & Privacy
					</AccessibleThemedText>
					<AccessibleThemedText variant="outlined" size="md">
						Control how we collect and use your data
					</AccessibleThemedText>
				</AccessibleThemedView>

				{/* Master Analytics Toggle */}
				<AnalyticsToggle />

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
				<AdditionalSettings />

				{/* Data Usage Info */}
				<DataUsageInfo />

				{/* Actions */}
				<ActionButtons />

				{/* Footer Info */}
				<AccessibleThemedText
					variant="outlined"
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
