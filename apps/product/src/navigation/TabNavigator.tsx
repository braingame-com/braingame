/**
 * Tab Navigator
 * Main bottom tab navigation with custom tab bar
 * Optimized with lazy loading and performance enhancements
 */

import { type BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type React from "react";
import { useMemo } from "react";
import { ErrorBoundary } from "../components/ErrorBoundary/ErrorBoundary";
import { TabBar } from "../components/TabBar";
import { lazyScreen } from "../utils/lazyLoad";
import { withMemo } from "../utils/performance";
import type {
	AnalyticsStackParamList,
	AnalyticsStackScreenProps,
	DashboardStackParamList,
	DashboardStackScreenProps,
	MainTabParamList,
	SettingsStackParamList,
	SettingsStackScreenProps,
	VideosStackParamList,
	VideosStackScreenProps,
} from "./types";

// Lazy load all screens for better initial performance
const DashboardScreen = lazyScreen<DashboardStackScreenProps<"DashboardHome">>(() =>
	import("../screens/Dashboard/DashboardScreen").then((m) => ({ default: m.DashboardScreen })),
);
const TaskDetailsScreen = lazyScreen<DashboardStackScreenProps<"TaskDetails">>(() =>
	import("../screens/Dashboard/TaskDetailsScreen").then((m) => ({ default: m.TaskDetailsScreen })),
);
const VideosScreen = lazyScreen<VideosStackScreenProps<"VideosList">>(() =>
	import("../screens/Videos/VideosScreen").then((m) => ({ default: m.VideosScreen })),
);
const AnalyticsScreen = lazyScreen<AnalyticsStackScreenProps<"AnalyticsOverview">>(() =>
	import("../screens/Analytics/AnalyticsScreen").then((m) => ({ default: m.AnalyticsScreen })),
);
const SettingsScreen = lazyScreen<SettingsStackScreenProps<"SettingsHome">>(() =>
	import("../screens/Settings/ThemedSettingsScreen").then((m) => ({
		default: m.ThemedSettingsScreen,
	})),
);

const Tab = createBottomTabNavigator<MainTabParamList>();
const DashboardStack = createNativeStackNavigator<DashboardStackParamList>();
const VideosStack = createNativeStackNavigator<VideosStackParamList>();
const AnalyticsStack = createNativeStackNavigator<AnalyticsStackParamList>();
const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

// Dashboard Stack Navigator - Memoized
const DashboardNavigator = withMemo(
	() => (
		<ErrorBoundary
			level="component"
			onError={(error) => {
				console.error("Dashboard navigator error:", error);
			}}
		>
			<DashboardStack.Navigator
				screenOptions={{
					animation: "slide_from_right",
					animationDuration: 200,
				}}
			>
				<DashboardStack.Screen
					name="DashboardHome"
					component={DashboardScreen}
					options={{ headerShown: false }}
				/>
				<DashboardStack.Screen
					name="TaskDetails"
					component={TaskDetailsScreen}
					options={{
						headerTitle: "Task Details",
						headerTintColor: "#007fff",
					}}
				/>
			</DashboardStack.Navigator>
		</ErrorBoundary>
	),
	"DashboardNavigator",
);

// Videos Stack Navigator - Memoized
const VideosNavigator = withMemo(
	() => (
		<ErrorBoundary
			level="component"
			onError={(error) => {
				console.error("Videos navigator error:", error);
			}}
		>
			<VideosStack.Navigator
				screenOptions={{
					animation: "slide_from_right",
					animationDuration: 200,
				}}
			>
				<VideosStack.Screen
					name="VideosList"
					component={VideosScreen}
					options={{ headerShown: false }}
				/>
			</VideosStack.Navigator>
		</ErrorBoundary>
	),
	"VideosNavigator",
);

// Analytics Stack Navigator - Memoized
const AnalyticsNavigator = withMemo(
	() => (
		<ErrorBoundary
			level="component"
			onError={(error) => {
				console.error("Analytics navigator error:", error);
			}}
		>
			<AnalyticsStack.Navigator
				screenOptions={{
					animation: "slide_from_right",
					animationDuration: 200,
				}}
			>
				<AnalyticsStack.Screen
					name="AnalyticsOverview"
					component={AnalyticsScreen}
					options={{ headerShown: false }}
				/>
			</AnalyticsStack.Navigator>
		</ErrorBoundary>
	),
	"AnalyticsNavigator",
);

// Settings Stack Navigator - Memoized
const SettingsNavigator = withMemo(
	() => (
		<ErrorBoundary
			level="component"
			onError={(error) => {
				console.error("Settings navigator error:", error);
			}}
		>
			<SettingsStack.Navigator
				screenOptions={{
					animation: "slide_from_right",
					animationDuration: 200,
				}}
			>
				<SettingsStack.Screen
					name="SettingsHome"
					component={SettingsScreen}
					options={{ headerShown: false }}
				/>
			</SettingsStack.Navigator>
		</ErrorBoundary>
	),
	"SettingsNavigator",
);

export const TabNavigator: React.FC = () => {
	// Memoize screen options for better performance
	const screenOptions = useMemo(
		() => ({
			headerShown: false,
			lazy: true, // Enable lazy loading of tabs
			unmountOnBlur: false, // Keep tabs mounted for better performance
			freezeOnBlur: true, // Freeze inactive tabs to save resources
		}),
		[],
	);

	// Memoize tab bar component
	const renderTabBar = useMemo(() => (props: BottomTabBarProps) => <TabBar {...props} />, []);

	return (
		<ErrorBoundary
			level="screen"
			onError={(error) => {
				console.error("Tab navigator error:", error);
			}}
		>
			<Tab.Navigator tabBar={renderTabBar} screenOptions={screenOptions} backBehavior="history">
				<Tab.Screen
					name="Dashboard"
					component={DashboardNavigator}
					options={{
						tabBarLabel: "Dashboard",
					}}
				/>
				<Tab.Screen
					name="Videos"
					component={VideosNavigator}
					options={{
						tabBarLabel: "Videos",
					}}
				/>
				<Tab.Screen
					name="Analytics"
					component={AnalyticsNavigator}
					options={{
						tabBarLabel: "Analytics",
					}}
				/>
				<Tab.Screen
					name="Settings"
					component={SettingsNavigator}
					options={{
						tabBarLabel: "Settings",
					}}
				/>
			</Tab.Navigator>
		</ErrorBoundary>
	);
};
