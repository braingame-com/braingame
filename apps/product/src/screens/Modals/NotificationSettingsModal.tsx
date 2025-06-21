import { Text } from "@braingame/bgui";
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
					<Text style={styles.cancelButton}>Cancel</Text>
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Notifications</Text>
				<TouchableOpacity onPress={handleSave}>
					<Text style={styles.saveButton}>Save</Text>
				</TouchableOpacity>
			</View>

			<ScrollView style={styles.content}>
				{/* Master Toggle */}
				<View style={styles.masterToggle}>
					<View style={{ flex: 1 }}>
						<Text style={styles.masterTitle}>Allow Notifications</Text>
						<Text style={styles.masterDescription}>
							Receive notifications about your training and progress
						</Text>
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
					<Text style={styles.sectionTitle}>Notification Types</Text>
					{settings.map((setting) => (
						<View key={setting.id} style={styles.settingItem}>
							<View style={{ flex: 1 }}>
								<Text style={styles.settingTitle}>{setting.title}</Text>
								<Text style={styles.settingDescription}>{setting.description}</Text>
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
					<Text style={styles.sectionTitle}>Quiet Hours</Text>
					<TouchableOpacity style={styles.quietHoursButton}>
						<Text style={styles.quietHoursLabel}>From</Text>
						<Text style={styles.quietHoursTime}>10:00 PM</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.quietHoursButton}>
						<Text style={styles.quietHoursLabel}>To</Text>
						<Text style={styles.quietHoursTime}>7:00 AM</Text>
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
		fontFamily: "LexendRegular",
	},
	saveButton: {
		fontSize: 16,
		color: "#007fff",
		fontFamily: "LexendSemiBold",
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "600",
		fontFamily: "LexendSemiBold",
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
		fontFamily: "LexendSemiBold",
		marginBottom: 4,
	},
	masterDescription: {
		fontSize: 14,
		color: "#666",
		fontFamily: "LexendRegular",
	},
	settingsSection: {
		backgroundColor: "#fff",
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: "600",
		fontFamily: "LexendSemiBold",
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
		fontFamily: "LexendRegular",
		marginBottom: 2,
	},
	settingDescription: {
		fontSize: 12,
		color: "#999",
		fontFamily: "LexendRegular",
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
		fontFamily: "LexendRegular",
	},
	quietHoursTime: {
		fontSize: 16,
		color: "#007fff",
		fontFamily: "LexendRegular",
	},
});
