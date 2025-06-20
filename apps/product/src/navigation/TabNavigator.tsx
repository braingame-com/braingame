/**
 * Tab Navigator
 * Main bottom tab navigation with custom tab bar
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type React from "react";
import { TabBar } from "../components/TabBar";
import { AnalyticsScreen } from "../screens/Analytics/AnalyticsScreen";
import { DashboardScreen } from "../screens/Dashboard/DashboardScreen";
import { TaskDetailsScreen } from "../screens/Dashboard/TaskDetailsScreen";
import { SettingsScreen } from "../screens/Settings/SettingsScreen";
import { VideosScreen } from "../screens/Videos/VideosScreen";
import type {
	AnalyticsStackParamList,
	DashboardStackParamList,
	MainTabParamList,
	SettingsStackParamList,
	VideosStackParamList,
} from "./types";

const Tab = createBottomTabNavigator<MainTabParamList>();
const DashboardStack = createNativeStackNavigator<DashboardStackParamList>();
const VideosStack = createNativeStackNavigator<VideosStackParamList>();
const AnalyticsStack = createNativeStackNavigator<AnalyticsStackParamList>();
const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

// Dashboard Stack Navigator
const DashboardNavigator = () => (
	<DashboardStack.Navigator>
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
);

// Videos Stack Navigator
const VideosNavigator = () => (
	<VideosStack.Navigator>
		<VideosStack.Screen
			name="VideosList"
			component={VideosScreen}
			options={{ headerShown: false }}
		/>
	</VideosStack.Navigator>
);

// Analytics Stack Navigator
const AnalyticsNavigator = () => (
	<AnalyticsStack.Navigator>
		<AnalyticsStack.Screen
			name="AnalyticsHome"
			component={AnalyticsScreen}
			options={{ headerShown: false }}
		/>
	</AnalyticsStack.Navigator>
);

// Settings Stack Navigator
const SettingsNavigator = () => (
	<SettingsStack.Navigator>
		<SettingsStack.Screen
			name="SettingsHome"
			component={SettingsScreen}
			options={{ headerShown: false }}
		/>
	</SettingsStack.Navigator>
);

export const TabNavigator: React.FC = () => {
	return (
		<Tab.Navigator
			tabBar={(props) => <TabBar {...props} />}
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tab.Screen name="Dashboard" component={DashboardNavigator} />
			<Tab.Screen name="Videos" component={VideosNavigator} />
			<Tab.Screen name="Analytics" component={AnalyticsNavigator} />
			<Tab.Screen name="Settings" component={SettingsNavigator} />
		</Tab.Navigator>
	);
};
