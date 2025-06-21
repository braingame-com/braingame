import { Text } from "@braingame/bgui";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { AccessibilityInfo, FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAccessibility } from "../../contexts/AccessibilityContext";
import type { DashboardStackScreenProps } from "../../navigation/types";
import {
	getAccessibilityProps,
	getListItemLabel,
	getProgressLabel,
} from "../../utils/accessibility";
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

// Accessible Stat Card
const StatCard = withMemo<{ item: StatItem; index: number; total: number }>(
	({ item, index, total }) => {
		const label = `${item.label}: ${item.value}`;
		const hint = getListItemLabel(item.label, index, total);

		return (
			<View style={dashboardStyles.statCard} {...getAccessibilityProps(label, hint, "text")}>
				<Text style={dashboardStyles.statValue} importantForAccessibility="no">
					{item.value}
				</Text>
				<Text style={dashboardStyles.statLabel} importantForAccessibility="no">
					{item.label}
				</Text>
			</View>
		);
	},
	"StatCard",
);

// Accessible Action Card
const ActionCard = withMemo<{ item: ActionItem; index: number; total: number }>(
	({ item, index, total }) => {
		const label = item.title;
		const hint = `${item.description}. ${getListItemLabel(item.title, index, total)}. Double tap to activate`;

		return (
			<TouchableOpacity
				style={dashboardStyles.actionCard}
				onPress={item.onPress}
				{...getAccessibilityProps(label, hint, "button")}
			>
				<Text style={dashboardStyles.actionIcon} importantForAccessibility="no">
					{item.icon}
				</Text>
				<View style={dashboardStyles.actionContent}>
					<Text style={dashboardStyles.actionTitle} importantForAccessibility="no">
						{item.title}
					</Text>
					<Text style={dashboardStyles.actionDescription} importantForAccessibility="no">
						{item.description}
					</Text>
				</View>
				<Text style={dashboardStyles.actionArrow} importantForAccessibility="no">
					→
				</Text>
			</TouchableOpacity>
		);
	},
	"ActionCard",
);

// Accessible Activity Card
const ActivityCard = withMemo<{
	item: ActivityItem;
	onPress: (id: string) => void;
	index: number;
	total: number;
}>(({ item, onPress, index, total }) => {
	const label = `Completed ${item.task}, ${item.time}`;
	const hint = `${getListItemLabel(item.task, index, total)}. Double tap to view details`;

	return (
		<TouchableOpacity
			style={dashboardStyles.activityItem}
			onPress={() => onPress(item.id)}
			{...getAccessibilityProps(label, hint, "button")}
		>
			<View style={dashboardStyles.activityDot} />
			<Text style={dashboardStyles.activityText} importantForAccessibility="no">
				Completed {item.task}
			</Text>
			<Text style={dashboardStyles.activityTime} importantForAccessibility="no">
				{item.time}
			</Text>
		</TouchableOpacity>
	);
}, "ActivityCard");

// Accessible Header component
const DashboardHeader = withMemo(() => {
	const headerRef = useRef<View>(null);

	// Focus on header when screen loads for screen readers
	useEffect(() => {
		const timer = setTimeout(() => {
			if (headerRef.current) {
				// @ts-expect-error - _nativeTag is not typed in React Native
				AccessibilityInfo.setAccessibilityFocus(headerRef.current._nativeTag);
			}
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	return (
		<View ref={headerRef} style={dashboardStyles.header}>
			<Text
				style={dashboardStyles.title}
				{...getAccessibilityProps("Dashboard", "Your productivity hub", "header")}
			>
				Dashboard
			</Text>
			<Text style={dashboardStyles.subtitle} importantForAccessibility="no">
				Your productivity hub
			</Text>
		</View>
	);
}, "DashboardHeader");

// Accessible Section header component
const SectionHeader = withMemo<{ title: string }>(
	({ title }) => (
		<Text
			style={dashboardStyles.sectionTitle}
			{...getAccessibilityProps(title, undefined, "header")}
		>
			{title}
		</Text>
	),
	"SectionHeader",
);

export const DashboardScreenAccessible: React.FC<Props> = ({ navigation }) => {
	const { announce } = useAccessibility();

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
			announce(`Opening task ${taskId}`);
			// @ts-expect-error - Navigation typing issue
			navigation.navigate("TaskDetails", { taskId });
		},
		[navigation, announce],
	);

	const navigateToMindset = useCallback(() => {
		announce("Opening mindset training");
		console.log("Navigate to mindset training");
	}, [announce]);

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

	// Render functions with accessibility
	const renderStat = useCallback(
		({ item, index }: { item: StatItem; index: number }) => (
			<StatCard item={item} index={index} total={stats.length} />
		),
		[stats.length],
	);

	const renderAction = useCallback(
		({ item, index }: { item: ActionItem; index: number }) => (
			<ActionCard item={item} index={index} total={actions.length} />
		),
		[actions.length],
	);

	const renderActivity = useCallback(
		({ item, index }: { item: ActivityItem; index: number }) => (
			<ActivityCard item={item} onPress={handleTaskPress} index={index} total={activities.length} />
		),
		[handleTaskPress, activities.length],
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
							{...getAccessibilityProps("Statistics", "Your daily statistics")}
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
								{...getAccessibilityProps("Quick actions", "Available actions you can take")}
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
								{...getAccessibilityProps("Recent activity", "Your recently completed tasks")}
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

	// Announce screen change
	useEffect(() => {
		announce("Dashboard loaded");
		const progress = getProgressLabel(
			Object.values(activities).filter((a) => a.task.includes("completed")).length,
			Number.parseInt(stats[0].value, 10),
			"tasks",
		);
		announce(progress);
	}, [announce, activities, stats]);

	return (
		<SafeAreaView
			style={dashboardStyles.container}
			{...getAccessibilityProps("Dashboard", "Your productivity dashboard")}
		>
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
