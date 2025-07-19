import { Typography } from "@braingame/bgui";
import { useNavigation } from "@react-navigation/native";
import type React from "react";
import { useState } from "react";
import { ScrollView, StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface NotificationSetting {
	id: string;
	title: string;
	description: string;
	enabled: boolean;
}

export const NotificationSettingsModal: React.FC = () => {
	const navigation = useNavigation();
	const [settings, setSettings] = useState<NotificationSetting[]>([
		{
			id: "daily_reminder",
			title: "Daily Training Reminder",
			description: "Get reminded to complete your daily brain training",
			enabled: true,
		},
		{
			id: "weekly_report",
			title: "Weekly Progress Report",
			description: "Receive a summary of your weekly achievements",
			enabled: true,
		},
		{
			id: "new_content",
			title: "New Content",
			description: "Be notified when new exercises or videos are available",
			enabled: false,
		},
		{
			id: "achievements",
			title: "Achievements & Milestones",
			description: "Celebrate when you reach new milestones",
			enabled: true,
		},
		{
			id: "community",
			title: "Community Updates",
			description: "Stay connected with community challenges and events",
			enabled: false,
		},
	]);

	const toggleSetting = (id: string) => {
		setSettings((prev) =>
			prev.map((setting) =>
				setting.id === id ? { ...setting, enabled: !setting.enabled } : setting,
			),
		);
	};

	const handleSave = () => {
		// Save settings to backend/storage
		navigation.goBack();
	};

	return (
		<SafeAreaView style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Typography style={styles.cancelButton}>Cancel</Typography>
				</TouchableOpacity>
				<Typography style={styles.headerTitle}>Notifications</Typography>
				<TouchableOpacity onPress={handleSave}>
					<Typography style={styles.saveButton}>Save</Typography>
				</TouchableOpacity>
			</View>

			<ScrollView style={styles.content}>
				{/* Master Toggle */}
				<View style={styles.masterToggle}>
					<View style={{ flex: 1 }}>
						<Typography style={styles.masterTitle}>Allow Notifications</Typography>
						<Typography style={styles.masterDescription}>
							Receive notifications about your training and progress
						</Typography>
					</View>
					<Switch
						value={settings.some((s) => s.enabled)}
						onValueChange={(value) => {
							setSettings((prev) => prev.map((setting) => ({ ...setting, enabled: value })));
						}}
						trackColor={{ false: "#e1e1e1", true: "#007fff" }}
						thumbColor="#fff"
					/>
				</View>

				{/* Individual Settings */}
				<View style={styles.settingsSection}>
					<Typography style={styles.sectionTitle}>Notification Types</Typography>
					{settings.map((setting) => (
						<View key={setting.id} style={styles.settingItem}>
							<View style={{ flex: 1 }}>
								<Typography style={styles.settingTitle}>{setting.title}</Typography>
								<Typography style={styles.settingDescription}>{setting.description}</Typography>
							</View>
							<Switch
								value={setting.enabled}
								onValueChange={() => toggleSetting(setting.id)}
								trackColor={{ false: "#e1e1e1", true: "#007fff" }}
								thumbColor="#fff"
							/>
						</View>
					))}
				</View>

				{/* Quiet Hours */}
				<View style={styles.quietHours}>
					<Typography style={styles.sectionTitle}>Quiet Hours</Typography>
					<TouchableOpacity style={styles.quietHoursButton}>
						<Typography style={styles.quietHoursLabel}>From</Typography>
						<Typography style={styles.quietHoursTime}>10:00 PM</Typography>
					</TouchableOpacity>
					<TouchableOpacity style={styles.quietHoursButton}>
						<Typography style={styles.quietHoursLabel}>To</Typography>
						<Typography style={styles.quietHoursTime}>7:00 AM</Typography>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 16,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#e1e1e1",
	},
	cancelButton: {
		fontSize: 16,
		color: "#666",
		fontFamily: "Lexend",
		fontWeight: "400",
	},
	saveButton: {
		fontSize: 16,
		color: "#007fff",
		fontFamily: "Lexend",
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "600",
		fontFamily: "Lexend",
	},
	content: {
		flex: 1,
	},
	masterToggle: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		padding: 20,
		marginBottom: 20,
	},
	masterTitle: {
		fontSize: 18,
		fontWeight: "600",
		fontFamily: "Lexend",
		marginBottom: 4,
	},
	masterDescription: {
		fontSize: 14,
		color: "#666",
		fontFamily: "Lexend",
		fontWeight: "400",
	},
	settingsSection: {
		backgroundColor: "#fff",
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: "600",
		fontFamily: "Lexend",
		color: "#666",
		paddingHorizontal: 20,
		paddingTop: 20,
		paddingBottom: 12,
		textTransform: "uppercase",
	},
	settingItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#f0f0f0",
	},
	settingTitle: {
		fontSize: 16,
		fontFamily: "Lexend",
		fontWeight: "400",
		marginBottom: 2,
	},
	settingDescription: {
		fontSize: 12,
		color: "#999",
		fontFamily: "Lexend",
		fontWeight: "400",
	},
	quietHours: {
		backgroundColor: "#fff",
		paddingBottom: 20,
	},
	quietHoursButton: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#f0f0f0",
	},
	quietHoursLabel: {
		fontSize: 16,
		fontFamily: "Lexend",
		fontWeight: "400",
	},
	quietHoursTime: {
		fontSize: 16,
		color: "#007fff",
		fontFamily: "Lexend",
		fontWeight: "400",
	},
});
