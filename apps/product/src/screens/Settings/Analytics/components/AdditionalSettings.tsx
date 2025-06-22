import React from "react";
import { View } from "react-native";
import { useAnalyticsSettings } from "../../../../contexts/AnalyticsContext";
import {
	AccessibleThemedSwitch,
	AccessibleThemedText,
	AccessibleThemedView,
} from "../../../../theme/components/AccessibleThemedComponents";
import { useTheme } from "../../../../theme/ThemeContext";

export const AdditionalSettings: React.FC = () => {
	const { theme } = useTheme();
	const {
		isAnalyticsEnabled,
		isPerformanceTrackingEnabled,
		togglePerformanceTracking,
		isCrashReportingEnabled,
		toggleCrashReporting,
	} = useAnalyticsSettings();

	return (
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
	);
};