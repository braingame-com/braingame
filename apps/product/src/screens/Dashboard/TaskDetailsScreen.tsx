import { Text } from "@braingame/bgui";
import type React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { DashboardStackScreenProps } from "../../navigation/types";
import { dashboardStyles } from "./styles";

type Props = DashboardStackScreenProps<"TaskDetails">;

export const TaskDetailsScreen: React.FC<Props> = ({ route }) => {
	const { taskId } = route.params;

	return (
		<SafeAreaView style={dashboardStyles.container}>
			<ScrollView style={dashboardStyles.scrollView}>
				<View style={dashboardStyles.header}>
					<Text style={dashboardStyles.title}>Task Details</Text>
					<Text style={dashboardStyles.subtitle}>Task ID: {taskId}</Text>
				</View>

				<View style={dashboardStyles.section}>
					<Text style={dashboardStyles.sectionTitle}>Description</Text>
					<Text style={dashboardStyles.actionDescription}>
						This is a placeholder for task details. In a real app, this would show the full task
						information, status, assignees, due dates, etc.
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
