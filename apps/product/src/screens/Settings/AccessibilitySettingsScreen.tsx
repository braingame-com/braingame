import type React from "react";
import { useCallback, useEffect } from "react";
import { Alert, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAccessibility } from "../../contexts/AccessibilityContext";
import {
	AccessibleThemedButton,
	AccessibleThemedSwitch,
	AccessibleThemedText,
	AccessibleThemedView,
} from "../../theme/components/AccessibleThemedComponents";
import { useTheme } from "../../theme/ThemeContext";
import { announceForAccessibility } from "../../utils/accessibility";
import { withMemo } from "../../utils/performance";

interface FontSizeOption {
	id: string;
	label: string;
	value: "small" | "medium" | "large" | "extra-large";
	scale: number;
}

// Font size selector component
const FontSizeSelector = withMemo(() => {
	const { fontSize, updateFontSize } = useAccessibility();
	const { theme } = useTheme();

	const fontSizeOptions: FontSizeOption[] = [
		{ id: "small", label: "Small", value: "small", scale: 0.85 },
		{ id: "medium", label: "Medium", value: "medium", scale: 1 },
		{ id: "large", label: "Large", value: "large", scale: 1.15 },
		{ id: "extra-large", label: "Extra Large", value: "extra-large", scale: 1.3 },
	];

	const handleFontSizeChange = useCallback(
		(value: FontSizeOption["value"]) => {
			updateFontSize(value);
			announceForAccessibility(`Font size changed to ${value}`);
		},
		[updateFontSize],
	);

	return (
		<View style={{ marginBottom: theme.sizes.spacingLG }}>
			<AccessibleThemedText
				variant="solid"
				size="lg"
				weight="semibold"
				style={{ marginBottom: theme.sizes.spacingMD }}
				isHeading
			>
				Text Size
			</AccessibleThemedText>

			<View style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.sizes.spacingSM }}>
				{fontSizeOptions.map((option) => (
					<AccessibleThemedButton
						key={option.id}
						variant={fontSize === option.value ? "primary" : "outline"}
						size="medium"
						onClick={() => handleFontSizeChange(option.value)}
						accessibilityLabel={`${option.label} text size`}
						accessibilityHint={`Changes all text to ${option.scale * 100}% of normal size`}
						style={{ flex: 1, minWidth: 80 }}
					>
						{option.label}
					</AccessibleThemedButton>
				))}
			</View>

			<AccessibleThemedText
				variant="outlined"
				size="sm"
				style={{
					marginTop: theme.sizes.spacingMD,
					fontSize:
						16 *
						(fontSize === "small"
							? 0.85
							: fontSize === "large"
								? 1.15
								: fontSize === "extra-large"
									? 1.3
									: 1),
				}}
			>
				Preview: This is how text will appear with your selected size
			</AccessibleThemedText>
		</View>
	);
}, "FontSizeSelector");

export const AccessibilitySettingsScreen: React.FC = () => {
	const { theme } = useTheme();
	const {
		screenReaderEnabled,
		reduceMotionEnabled,
		boldTextEnabled,
		grayscaleEnabled,
		invertColorsEnabled,
		highContrastEnabled,
		announcements,
		toggleAnnouncements,
		keyboardNavigation,
		toggleKeyboardNavigation,
		announce,
	} = useAccessibility();

	// Announce screen on mount
	useEffect(() => {
		announce("Accessibility settings loaded");
	}, [announce]);

	const handleResetSettings = useCallback(() => {
		Alert.alert(
			"Reset Accessibility Settings",
			"This will reset all accessibility preferences to their default values. Continue?",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Reset",
					style: "destructive",
					onClick: () => {
						// Reset logic would go here
						announce("Settings reset to defaults");
					},
				},
			],
			{
				cancelable: true,
			},
		);
	}, [announce]);

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
						Accessibility
					</AccessibleThemedText>
					<AccessibleThemedText variant="outlined" size="md">
						Customize your experience for better accessibility
					</AccessibleThemedText>
				</AccessibleThemedView>

				{/* Font Size Section */}
				<AccessibleThemedView
					variant="card"
					style={{
						padding: theme.sizes.spacingMD,
						marginBottom: theme.sizes.spacingMD,
						borderRadius: theme.sizes.radiusLG,
					}}
				>
					<FontSizeSelector />
				</AccessibleThemedView>

				{/* App Settings Section */}
				<AccessibleThemedView
					variant="card"
					style={{
						padding: theme.sizes.spacingMD,
						marginBottom: theme.sizes.spacingMD,
						borderRadius: theme.sizes.radiusLG,
					}}
				>
					<AccessibleThemedText
						variant="solid"
						size="lg"
						weight="semibold"
						style={{ marginBottom: theme.sizes.spacingMD }}
						isHeading
					>
						App Settings
					</AccessibleThemedText>

					<View style={{ gap: theme.sizes.spacingMD }}>
						<AccessibleThemedSwitch
							label="Screen Reader Announcements"
							value={announcements}
							onValueChange={toggleAnnouncements}
							accessibilityLabel="Screen reader announcements"
						/>

						<AccessibleThemedSwitch
							label="Keyboard Navigation"
							value={keyboardNavigation}
							onValueChange={toggleKeyboardNavigation}
							accessibilityLabel="Keyboard navigation support"
						/>
					</View>
				</AccessibleThemedView>

				{/* System Settings Info */}
				<AccessibleThemedView
					variant="card"
					style={{
						padding: theme.sizes.spacingMD,
						marginBottom: theme.sizes.spacingMD,
						borderRadius: theme.sizes.radiusLG,
					}}
				>
					<AccessibleThemedText
						variant="solid"
						size="lg"
						weight="semibold"
						style={{ marginBottom: theme.sizes.spacingMD }}
						isHeading
					>
						System Settings
					</AccessibleThemedText>

					<View style={{ gap: theme.sizes.spacingSM }}>
						<StatusRow label="Screen Reader" enabled={screenReaderEnabled} platform="all" />
						<StatusRow label="Reduce Motion" enabled={reduceMotionEnabled} platform="ios" />
						<StatusRow label="Bold Text" enabled={boldTextEnabled} platform="ios" />
						<StatusRow label="Grayscale" enabled={grayscaleEnabled} platform="ios" />
						<StatusRow label="Invert Colors" enabled={invertColorsEnabled} platform="ios" />
						{Platform.OS === "windows" && (
							<StatusRow label="High Contrast" enabled={highContrastEnabled} platform="windows" />
						)}
					</View>

					<AccessibleThemedText
						variant="outlined"
						size="sm"
						style={{ marginTop: theme.sizes.spacingMD }}
					>
						These settings are controlled by your device's system settings
					</AccessibleThemedText>
				</AccessibleThemedView>

				{/* Actions */}
				<View style={{ marginTop: theme.sizes.spacingLG }}>
					<AccessibleThemedButton
						variant="outline"
						size="large"
						fullWidth
						onClick={handleResetSettings}
						accessibilityLabel="Reset all settings"
						accessibilityHint="Resets all accessibility preferences to default values"
					>
						Reset All Settings
					</AccessibleThemedButton>
				</View>

				{/* Tips Section */}
				<AccessibleThemedView
					variant="surface"
					style={{
						padding: theme.sizes.spacingMD,
						marginTop: theme.sizes.spacingXL,
						borderRadius: theme.sizes.radiusMD,
					}}
				>
					<AccessibleThemedText
						variant="solid"
						size="md"
						weight="semibold"
						style={{ marginBottom: theme.sizes.spacingSM }}
						isHeading
					>
						Accessibility Tips
					</AccessibleThemedText>

					<AccessibleThemedText variant="outlined" size="sm">
						• Use VoiceOver (iOS) or TalkBack (Android) for screen reading{"\n"}• Enable Reduce
						Motion to minimize animations{"\n"}• Increase text size for better readability{"\n"}•
						Use high contrast mode for better visibility
					</AccessibleThemedText>
				</AccessibleThemedView>
			</ScrollView>
		</SafeAreaView>
	);
};

// Status row component
const StatusRow = withMemo<{
	label: string;
	enabled: boolean;
	platform: "all" | "ios" | "android" | "windows";
}>(({ label, enabled, platform }) => {
	const { theme } = useTheme();

	if (platform !== "all" && Platform.OS !== platform) {
		return null;
	}

	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				paddingVertical: theme.sizes.spacingXS,
			}}
			accessibilityRole="text"
			accessibilityLabel={`${label}: ${enabled ? "Enabled" : "Disabled"}`}
		>
			<AccessibleThemedText variant="solid" size="md">
				{label}
			</AccessibleThemedText>
			<AccessibleThemedText variant={enabled ? "success" : "secondary"} size="sm" weight="medium">
				{enabled ? "Enabled" : "Disabled"}
			</AccessibleThemedText>
		</View>
	);
}, "StatusRow");
