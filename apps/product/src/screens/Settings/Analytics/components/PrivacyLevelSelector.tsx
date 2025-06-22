import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useAnalyticsSettings } from "../../../../contexts/AnalyticsContext";
import { useButtonTracking } from "../../../../hooks/useAnalytics";
import { AccessibleThemedText } from "../../../../theme/components/AccessibleThemedComponents";
import { useTheme } from "../../../../theme/ThemeContext";
import { withMemo } from "../../../../utils/performance";
import { privacyOptions } from "../constants";

export const PrivacyLevelSelector = withMemo(() => {
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
						{option.features.map((feature, index) => (
							<AccessibleThemedText
								key={index}
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
