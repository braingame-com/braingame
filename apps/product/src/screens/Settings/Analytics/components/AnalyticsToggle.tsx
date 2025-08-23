import type React from "react";
import { useAnalyticsSettings } from "../../../../contexts/AnalyticsContext";
import {
	AccessibleThemedSwitch,
	AccessibleThemedText,
	AccessibleThemedView,
} from "../../../../theme/components/AccessibleThemedComponents";
import { useTheme } from "../../../../theme/ThemeContext";

export const AnalyticsToggle: React.FC = () => {
	const { theme } = useTheme();
	const { isAnalyticsEnabled, toggleAnalytics } = useAnalyticsSettings();

	return (
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
				variant="outlined"
				size="sm"
				style={{ marginTop: theme.sizes.spacingSM }}
			>
				Help us improve Brain Game by sharing anonymous usage data
			</AccessibleThemedText>
		</AccessibleThemedView>
	);
};
