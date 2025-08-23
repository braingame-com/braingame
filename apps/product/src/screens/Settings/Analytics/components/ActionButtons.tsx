import type React from "react";
import { Linking, View } from "react-native";
import { useButtonTracking } from "../../../../hooks/useAnalytics";
import { AccessibleThemedButton } from "../../../../theme/components/AccessibleThemedComponents";
import { useTheme } from "../../../../theme/ThemeContext";

export const ActionButtons: React.FC = () => {
	const { theme } = useTheme();
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
		<View style={{ gap: theme.sizes.spacingMD }}>
			<AccessibleThemedButton
				variant="outline"
				size="medium"
				fullWidth
				onClick={handlePrivacyPolicy}
				accessibilityLabel="View Privacy Policy"
				accessibilityHint="Opens privacy policy in your browser"
			>
				View Privacy Policy
			</AccessibleThemedButton>

			<AccessibleThemedButton
				variant="plain"
				size="medium"
				fullWidth
				onClick={handleDataDeletion}
				accessibilityLabel="Request Data Deletion"
				accessibilityHint="Opens data deletion request form in your browser"
			>
				Request Data Deletion
			</AccessibleThemedButton>
		</View>
	);
};
