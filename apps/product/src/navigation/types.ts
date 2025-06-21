import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

// Root Stack
export type RootStackParamList = {
	Auth: NavigatorScreenParams<AuthStackParamList>;
	Main: NavigatorScreenParams<DrawerParamList>;
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
	Analytics: { metric?: "performance" | "mindset" | "videos" };
	Profile: undefined;
};

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
	DrawerScreenProps<DrawerParamList, T>,
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
