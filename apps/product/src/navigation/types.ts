import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

// Root Stack
export type RootStackParamList = {
	Auth: NavigatorScreenParams<AuthStackParamList>;
	Main: NavigatorScreenParams<DrawerParamList>;
	VideoPlayer: { videoId: string; title: string };
};

// Auth Stack
export type AuthStackParamList = {
	Welcome: undefined;
	Login: undefined;
	Register: undefined;
	ForgotPassword: undefined;
};

// Drawer
export type DrawerParamList = {
	HomeTabs: NavigatorScreenParams<TabParamList>;
	Settings: undefined;
};

// Tab Navigator
export type TabParamList = {
	Dashboard: NavigatorScreenParams<DashboardStackParamList>;
	Mindset: undefined;
	Videos: NavigatorScreenParams<VideosStackParamList>;
	Analytics: NavigatorScreenParams<AnalyticsStackParamList>;
	Settings: NavigatorScreenParams<SettingsStackParamList>;
	Profile: undefined;
};

// Alias for backward compatibility
export type MainTabParamList = TabParamList;

// Dashboard Stack
export type DashboardStackParamList = {
	DashboardHome: { initialTab?: "overview" | "performance" };
	TaskDetails: { taskId: string };
};

// Videos Stack
export type VideosStackParamList = {
	VideosList: { categoryId?: string };
	VideoPlayer: { videoId: string; title: string };
};

// Analytics Stack
export type AnalyticsStackParamList = {
	AnalyticsOverview: { metric?: "performance" | "mindset" | "videos" };
};

// Settings Stack
export type SettingsStackParamList = {
	SettingsHome: undefined;
	SettingsMain: undefined;
	AccessibilitySettings: undefined;
	AnalyticsSettings: undefined;
};

// Screen Props Types
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
	RootStackParamList,
	T
>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = CompositeScreenProps<
	NativeStackScreenProps<AuthStackParamList, T>,
	RootStackScreenProps<"Auth">
>;

export type DrawerScreenProps<T extends keyof DrawerParamList> = CompositeScreenProps<
	NativeStackScreenProps<DrawerParamList, T>,
	RootStackScreenProps<"Main">
>;

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
	BottomTabScreenProps<TabParamList, T>,
	DrawerScreenProps<"HomeTabs">
>;

export type DashboardStackScreenProps<T extends keyof DashboardStackParamList> =
	CompositeScreenProps<
		NativeStackScreenProps<DashboardStackParamList, T>,
		TabScreenProps<"Dashboard">
	>;

export type VideosStackScreenProps<T extends keyof VideosStackParamList> = CompositeScreenProps<
	NativeStackScreenProps<VideosStackParamList, T>,
	TabScreenProps<"Videos">
>;

export type AnalyticsStackScreenProps<T extends keyof AnalyticsStackParamList> =
	CompositeScreenProps<
		NativeStackScreenProps<AnalyticsStackParamList, T>,
		TabScreenProps<"Analytics">
	>;

export type SettingsStackScreenProps<T extends keyof SettingsStackParamList> = CompositeScreenProps<
	NativeStackScreenProps<SettingsStackParamList, T>,
	TabScreenProps<"Settings">
>;

// Complex navigation parameter types for deep navigation
export type DeepNavigationParams = {
	screen: "HomeTabs";
	params: {
		screen: "Dashboard";
		params: {
			screen: "DashboardHome";
			params: Record<string, unknown>;
		};
	};
};
