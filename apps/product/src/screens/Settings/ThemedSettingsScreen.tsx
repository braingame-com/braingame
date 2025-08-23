import type React from "react";
import { type ReactNode, useState } from "react";
import { ScrollView, StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import type { Theme } from "../../theme";
import {
	ThemedCard,
	ThemedScreen,
	ThemedText,
	ThemedView,
	ThemeSelector,
	ThemeToggle,
	useTheme,
} from "../../theme";

type BaseSettingItem = {
	id?: string;
	icon: string;
	title: string;
	description: string;
};

type ActionSettingItem = BaseSettingItem & {
	action: () => void;
	customRight?: never;
	toggle?: never;
	onToggle?: never;
	showArrow?: never;
};

type CustomRightSettingItem = BaseSettingItem & {
	customRight: ReactNode;
	action?: never;
	toggle?: never;
	onToggle?: never;
	showArrow?: never;
};

type ToggleSettingItem = BaseSettingItem & {
	toggle: boolean;
	onToggle: (value: boolean) => void;
	action?: never;
	customRight?: never;
	showArrow?: never;
};

type InfoSettingItem = BaseSettingItem & {
	showArrow: false;
	action?: never;
	customRight?: never;
	toggle?: never;
	onToggle?: never;
};

type SettingItem = ActionSettingItem | CustomRightSettingItem | ToggleSettingItem | InfoSettingItem;

type SettingsSection = {
	id: string;
	title: string;
	items: SettingItem[];
};

export const ThemedSettingsScreen: React.FC = () => {
	const { theme } = useTheme();
	const styles = createStyles(theme);
	const [notifications, setNotifications] = useState(true);
	const [analytics, setAnalytics] = useState(false);
	const [biometrics, setBiometrics] = useState(true);
	const [themeSelectorVisible, setThemeSelectorVisible] = useState(false);

	const settingsSections: SettingsSection[] = [
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
					action: () => {},
				},
				{
					id: "privacy",
					icon: "🔒",
					title: "Privacy Policy",
					description: "How we protect your data",
					action: () => {},
				},
				{
					id: "support",
					icon: "💬",
					title: "Support",
					description: "Get help and contact us",
					action: () => {},
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
						<ThemedText size="sm" variant="outlined" weight="semibold" style={styles.sectionTitle}>
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
									onClick={item.action || (() => {})}
									disabled={!item.action && !item.onToggle}
								>
									<View style={styles.settingLeft}>
										<ThemedText size="2xl">{item.icon}</ThemedText>
										<View style={styles.settingContent}>
											<ThemedText size="md" weight="medium">
												{item.title}
											</ThemedText>
											<ThemedText size="sm" variant="outlined">
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
										<ThemedText variant="outlined">→</ThemedText>
									) : null}
								</TouchableOpacity>
							))}
						</ThemedCard>
					</View>
				))}

				{/* Danger Zone */}
				<View style={[styles.section, { marginBottom: 40 }]}>
					<ThemedText size="sm" variant="outlined" weight="semibold" style={styles.sectionTitle}>
						DANGER ZONE
					</ThemedText>

					<ThemedCard elevation="low">
						<TouchableOpacity style={styles.dangerItem}>
							<ThemedText size="md" variant="error" weight="medium">
								Clear Cache
							</ThemedText>
							<ThemedText size="sm" variant="outlined">
								Free up storage space
							</ThemedText>
						</TouchableOpacity>

						<TouchableOpacity style={[styles.dangerItem, styles.lastItem]}>
							<ThemedText size="md" variant="error" weight="medium">
								Delete Account
							</ThemedText>
							<ThemedText size="sm" variant="outlined">
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

const createStyles = (theme: Theme) =>
	StyleSheet.create({
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
