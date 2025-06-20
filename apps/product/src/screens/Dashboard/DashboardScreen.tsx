import { Text } from "@braingame/bgui";
import { useNavigation } from "@react-navigation/native";
import type React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { DashboardStackScreenProps } from "../../navigation/types";
import { dashboardStyles } from "./styles";

type Props = DashboardStackScreenProps<"DashboardHome">;

export const DashboardScreen: React.FC<Props> = () => {
	const navigation = useNavigation<Props["navigation"]>();

	const handleTaskPress = (taskId: string) => {
		navigation.navigate("TaskDetails", { taskId });
	};

	const navigateToMindset = () => {
		// This would navigate to mindset screen once integrated
		console.log("Navigate to mindset training");
	};

	return (
		<SafeAreaView style={dashboardStyles.container}>
			<ScrollView
				style={dashboardStyles.scrollView}
				contentContainerStyle={dashboardStyles.scrollContent}
			>
				{/* Header */}
				<View style={dashboardStyles.header}>
					<Text style={dashboardStyles.title}>Dashboard</Text>
					<Text style={dashboardStyles.subtitle}>Your productivity hub</Text>
				</View>

				{/* Quick Stats */}
				<View style={dashboardStyles.statsContainer}>
					<View style={dashboardStyles.statCard}>
						<Text style={dashboardStyles.statValue}>12</Text>
						<Text style={dashboardStyles.statLabel}>Tasks Today</Text>
					</View>
					<View style={dashboardStyles.statCard}>
						<Text style={dashboardStyles.statValue}>85%</Text>
						<Text style={dashboardStyles.statLabel}>Completion</Text>
					</View>
					<View style={dashboardStyles.statCard}>
						<Text style={dashboardStyles.statValue}>7</Text>
						<Text style={dashboardStyles.statLabel}>Day Streak</Text>
					</View>
				</View>

				{/* Quick Actions */}
				<View style={dashboardStyles.section}>
					<Text style={dashboardStyles.sectionTitle}>Quick Actions</Text>

					<TouchableOpacity style={dashboardStyles.actionCard} onPress={navigateToMindset}>
						<Text style={dashboardStyles.actionIcon}>🧠</Text>
						<View style={dashboardStyles.actionContent}>
							<Text style={dashboardStyles.actionTitle}>Mindset Training</Text>
							<Text style={dashboardStyles.actionDescription}>
								Daily practice for peak performance
							</Text>
						</View>
						<Text style={dashboardStyles.actionArrow}>→</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={dashboardStyles.actionCard}
						onPress={() => handleTaskPress("task-1")}
					>
						<Text style={dashboardStyles.actionIcon}>✅</Text>
						<View style={dashboardStyles.actionContent}>
							<Text style={dashboardStyles.actionTitle}>Today's Tasks</Text>
							<Text style={dashboardStyles.actionDescription}>12 tasks remaining</Text>
						</View>
						<Text style={dashboardStyles.actionArrow}>→</Text>
					</TouchableOpacity>
				</View>

				{/* Recent Activity */}
				<View style={dashboardStyles.section}>
					<Text style={dashboardStyles.sectionTitle}>Recent Activity</Text>

					{["Task 1", "Task 2", "Task 3"].map((task, index) => (
						<TouchableOpacity
							key={index}
							style={dashboardStyles.activityItem}
							onPress={() => handleTaskPress(`task-${index + 1}`)}
						>
							<View style={dashboardStyles.activityDot} />
							<Text style={dashboardStyles.activityText}>Completed {task}</Text>
							<Text style={dashboardStyles.activityTime}>2h ago</Text>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
