import type React from "react";
import { useState } from "react";
import { ScrollView, Switch, TouchableOpacity, View } from "react-native";
import type { Theme } from "../../theme";
import {
	ThemedCard,
	ThemedScreen,
	ThemedText,
	ThemedView,
	ThemeSelector,
	ThemeToggle,
	useTheme,
	useThemedStyles,
} from "../../theme";

export const ThemedSettingsScreen: React.FC = () => {
	const { theme } = useTheme();
	const styles = useThemedStyles((theme) => createStyles(theme));
	const [notifications, setNotifications] = useState(true);
	const [analytics, setAnalytics] = useState(false);
	const [biometrics, setBiometrics] = useState(true);
	const [themeSelectorVisible, setThemeSelectorVisible] = useState(false);

	const settingsSections = [
		{
			id: "appearance",
			title: "Appearance",
			items: [
				{
					id: "theme",
					icon: "🎨",
					title: "Theme",
					description: "Customize colors and appearance",
					action: () => setThemeSelectorVisible(true),
				},
				{
					id: "theme-toggle",
					icon: "🌓",
					title: "Quick Theme Toggle",
					description: "Switch between light and dark",
					customRight: <ThemeToggle />,
				},
			],
		},
		{
			id: "preferences",
			title: "Preferences",
			items: [
				{
					id: "notifications",
					icon: "🔔",
					title: "Notifications",
					description: "Receive alerts and reminders",
					toggle: notifications,
					onToggle: setNotifications,
				},
				{
					id: "analytics",
					icon: "📊",
					title: "Analytics",
					description: "Help us improve with usage data",
					toggle: analytics,
					onToggle: setAnalytics,
				},
				{
					id: "biometrics",
					icon: "🔐",
					title: "Biometric Login",
					description: "Use Face ID or Touch ID",
					toggle: biometrics,
					onToggle: setBiometrics,
				},
			],
		},
		{
			id: "about",
			title: "About",
			items: [
				{
					id: "version",
					icon: "📱",
					title: "Version",
					description: "1.0.0 (Build 100)",
					showArrow: false,
				},
				{
					id: "terms",
					icon: "📄",
					title: "Terms of Service",
					description: "Legal terms and conditions",
				},
				{
					id: "privacy",
					icon: "🔒",
					title: "Privacy Policy",
					description: "How we protect your data",
				},
				{
					icon: "💬",
					title: "Support",
					description: "Get help and contact us",
				},
			],
		},
	];

	return (
		<ThemedScreen>
			<ThemedView variant="surface" style={styles.header}>
				<ThemedText size="2xl" weight="bold">
					Settings
				</ThemedText>
			</ThemedView>

			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				{settingsSections.map((section) => (
					<View key={section.id} style={styles.section}>
						<ThemedText size="sm" variant="secondary" weight="semibold" style={styles.sectionTitle}>
							{section.title.toUpperCase()}
						</ThemedText>

						<ThemedCard elevation="low" padding="none">
							{section.items.map((item, itemIndex) => (
								<TouchableOpacity
									key={item.id}
									style={[
										styles.settingItem,
										itemIndex === section.items.length - 1 && styles.lastItem,
									]}
									onPress={item.action}
									disabled={!item.action && !item.toggle}
								>
									<View style={styles.settingLeft}>
										<ThemedText size="2xl">{item.icon}</ThemedText>
										<View style={styles.settingContent}>
											<ThemedText size="md" weight="medium">
												{item.title}
											</ThemedText>
											<ThemedText size="sm" variant="secondary">
												{item.description}
											</ThemedText>
										</View>
									</View>

									{item.customRight ? (
										item.customRight
									) : item.toggle !== undefined ? (
										<Switch
											value={item.toggle}
											onValueChange={item.onToggle}
											trackColor={{
												false: theme.colors.borderLight,
												true: theme.colors.primary,
											}}
											thumbColor="#fff"
										/>
									) : item.showArrow !== false ? (
										<ThemedText variant="secondary">→</ThemedText>
									) : null}
								</TouchableOpacity>
							))}
						</ThemedCard>
					</View>
				))}

				{/* Danger Zone */}
				<View style={[styles.section, { marginBottom: 40 }]}>
					<ThemedText size="sm" variant="secondary" weight="semibold" style={styles.sectionTitle}>
						DANGER ZONE
					</ThemedText>

					<ThemedCard elevation="low">
						<TouchableOpacity style={styles.dangerItem}>
							<ThemedText size="md" variant="error" weight="medium">
								Clear Cache
							</ThemedText>
							<ThemedText size="sm" variant="secondary">
								Free up storage space
							</ThemedText>
						</TouchableOpacity>

						<TouchableOpacity style={[styles.dangerItem, styles.lastItem]}>
							<ThemedText size="md" variant="error" weight="medium">
								Delete Account
							</ThemedText>
							<ThemedText size="sm" variant="secondary">
								Permanently remove your data
							</ThemedText>
						</TouchableOpacity>
					</ThemedCard>
				</View>
			</ScrollView>

			<ThemeSelector
				visible={themeSelectorVisible}
				onClose={() => setThemeSelectorVisible(false)}
			/>
		</ThemedScreen>
	);
};

const createStyles = (theme: Theme) => ({
	header: {
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.border,
	},
	content: {
		flex: 1,
	},
	section: {
		marginTop: 24,
		marginBottom: 8,
	},
	sectionTitle: {
		marginLeft: 20,
		marginBottom: 8,
	},
	settingItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.borderLight,
	},
	lastItem: {
		borderBottomWidth: 0,
	},
	settingLeft: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	settingContent: {
		marginLeft: 12,
		flex: 1,
	},
	dangerItem: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.borderLight,
	},
});
