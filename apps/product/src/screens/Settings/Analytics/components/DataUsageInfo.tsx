import type React from "react";
import {
	AccessibleThemedText,
	AccessibleThemedView,
} from "../../../../theme/components/AccessibleThemedComponents";
import { useTheme } from "../../../../theme/ThemeContext";

export const DataUsageInfo: React.FC = () => {
	const { theme } = useTheme();

	return (
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
	);
};
