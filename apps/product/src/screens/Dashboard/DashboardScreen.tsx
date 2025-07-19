import { Typography } from "@braingame/bgui";
import type React from "react";
import { useCallback, useMemo } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { DashboardStackScreenProps } from "../../navigation/types";
import { listOptimizations, withMemo } from "../../utils/performance";
import { dashboardStyles } from "./styles";

type Props = DashboardStackScreenProps<"DashboardHome">;

// Types for our data
interface StatItem {
	id: string;
	value: string;
	label: string;
}

interface ActionItem {
	id: string;
	icon: string;
	title: string;
	description: string;
	onPress: () => void;
}

interface ActivityItem {
	id: string;
	task: string;
	time: string;
}

// Memoized components
const StatCard = withMemo<{ item: StatItem }>(
	({ item }) => (
		<View style={dashboardStyles.statCard}>
			<Typography style={dashboardStyles.statValue}>{item.value}</Typography>
			<Typography style={dashboardStyles.statLabel}>{item.label}</Typography>
		</View>
	),
	"StatCard",
);

const ActionCard = withMemo<{ item: ActionItem }>(
	({ item }) => (
		<TouchableOpacity style={dashboardStyles.actionCard} onPress={item.onPress}>
			<Typography style={dashboardStyles.actionIcon}>{item.icon}</Typography>
			<View style={dashboardStyles.actionContent}>
				<Typography style={dashboardStyles.actionTitle}>{item.title}</Typography>
				<Typography style={dashboardStyles.actionDescription}>{item.description}</Typography>
			</View>
			<Typography style={dashboardStyles.actionArrow}>→</Typography>
		</TouchableOpacity>
	),
	"ActionCard",
);

const ActivityCard = withMemo<{ item: ActivityItem; onPress: (id: string) => void }>(
	({ item, onPress }) => (
		<TouchableOpacity style={dashboardStyles.activityItem} onPress={() => onPress(item.id)}>
			<View style={dashboardStyles.activityDot} />
			<Typography style={dashboardStyles.activityText}>Completed {item.task}</Typography>
			<Typography style={dashboardStyles.activityTime}>{item.time}</Typography>
		</TouchableOpacity>
	),
	"ActivityCard",
);

// Header component
const DashboardHeader = withMemo(
	() => (
		<>
			<View style={dashboardStyles.header}>
				<Typography style={dashboardStyles.title}>Dashboard</Typography>
				<Typography style={dashboardStyles.subtitle}>Your productivity hub</Typography>
			</View>
		</>
	),
	"DashboardHeader",
);

// Section header component
const SectionHeader = withMemo<{ title: string }>(
	({ title }) => <Typography style={dashboardStyles.sectionTitle}>{title}</Typography>,
	"SectionHeader",
);

export const DashboardScreen: React.FC<Props> = ({ navigation }) => {
	// Memoized data
	const stats = useMemo<StatItem[]>(
		() => [
			{ id: "tasks", value: "12", label: "Tasks Today" },
			{ id: "completion", value: "85%", label: "Completion" },
			{ id: "streak", value: "7", label: "Day Streak" },
		],
		[],
	);

	const activities = useMemo<ActivityItem[]>(
		() => [
			{ id: "task-1", task: "Task 1", time: "2h ago" },
			{ id: "task-2", task: "Task 2", time: "3h ago" },
			{ id: "task-3", task: "Task 3", time: "4h ago" },
		],
		[],
	);

	// Memoized callbacks
	const handleTaskPress = useCallback(
		(taskId: string) => {
			// @ts-expect-error - Navigation typing issue
			navigation.navigate("TaskDetails", { taskId });
		},
		[navigation],
	);

	const navigateToMindset = useCallback(() => {
		// This would navigate to mindset screen once integrated
		// Navigate to mindset training functionality not yet implemented
	}, []);

	const actions = useMemo<ActionItem[]>(
		() => [
			{
				id: "mindset",
				icon: "🧠",
				title: "Mindset Training",
				description: "Daily practice for peak performance",
				onPress: navigateToMindset,
			},
			{
				id: "tasks",
				icon: "✅",
				title: "Today's Tasks",
				description: "12 tasks remaining",
				onPress: () => handleTaskPress("task-1"),
			},
		],
		[navigateToMindset, handleTaskPress],
	);

	// Render functions
	const renderStat = useCallback(({ item }: { item: StatItem }) => <StatCard item={item} />, []);

	const renderAction = useCallback(
		({ item }: { item: ActionItem }) => <ActionCard item={item} />,
		[],
	);

	const renderActivity = useCallback(
		({ item }: { item: ActivityItem }) => <ActivityCard item={item} onPress={handleTaskPress} />,
		[handleTaskPress],
	);

	// Main sections data for FlatList
	const sections = useMemo(
		() => [
			{ id: "header", type: "header" },
			{ id: "stats", type: "stats" },
			{ id: "actions-header", type: "section-header", title: "Quick Actions" },
			{ id: "actions", type: "actions" },
			{ id: "activity-header", type: "section-header", title: "Recent Activity" },
			{ id: "activities", type: "activities" },
		],
		[],
	);

	// Main render function for sections
	const renderSection = useCallback(
		({ item }: { item: (typeof sections)[0] }) => {
			switch (item.type) {
				case "header":
					return <DashboardHeader />;
				case "stats":
					return (
						<FlatList
							horizontal
							data={stats}
							renderItem={renderStat}
							keyExtractor={listOptimizations.keyExtractor}
							style={dashboardStyles.statsContainer}
							showsHorizontalScrollIndicator={false}
							{...listOptimizations.performanceConfig}
						/>
					);
				case "section-header":
					return (
						<View style={dashboardStyles.section}>
							<SectionHeader title={item.title || ""} />
						</View>
					);
				case "actions":
					return (
						<View style={dashboardStyles.section}>
							<FlatList
								data={actions}
								renderItem={renderAction}
								keyExtractor={listOptimizations.keyExtractor}
								scrollEnabled={false}
								{...listOptimizations.performanceConfig}
							/>
						</View>
					);
				case "activities":
					return (
						<View style={dashboardStyles.section}>
							<FlatList
								data={activities}
								renderItem={renderActivity}
								keyExtractor={listOptimizations.keyExtractor}
								scrollEnabled={false}
								{...listOptimizations.performanceConfig}
							/>
						</View>
					);
				default:
					return null;
			}
		},
		[stats, actions, activities, renderStat, renderAction, renderActivity],
	);

	return (
		<SafeAreaView style={dashboardStyles.container}>
			<FlatList
				data={sections}
				renderItem={renderSection}
				keyExtractor={listOptimizations.keyExtractor}
				contentContainerStyle={dashboardStyles.scrollContent}
				showsVerticalScrollIndicator={false}
				{...listOptimizations.performanceConfig}
			/>
		</SafeAreaView>
	);
};
