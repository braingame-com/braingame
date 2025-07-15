import { Text } from "@braingame/bgui";
// TODO: Install @react-navigation/drawer
// import {
// 	createDrawerNavigator,
// 	type DrawerContentComponentProps,
// 	DrawerContentScrollView,
// 	DrawerItemList,
// } from "@react-navigation/drawer";
import type React from "react";
import { TouchableOpacity, View } from "react-native";
import { ComponentShowcase } from "../screens/ComponentShowcase";
import { ThemedSettingsScreen } from "../screens/Settings/ThemedSettingsScreen";
import { useAuth } from "./AuthContext";
import { TabNavigator } from "./TabNavigator";

// const Drawer = createDrawerNavigator<DrawerParamList>();

// Temporary stub until @react-navigation/drawer is installed
const Drawer = {
	Navigator: View as unknown as React.ComponentType<{
		drawerContent?: (props: DrawerContentComponentProps) => React.ReactNode;
		screenOptions?: Record<string, unknown>;
		children?: React.ReactNode;
	}>,
	Screen: View as unknown as React.ComponentType<{
		name: string;
		component: React.ComponentType;
		options?: Record<string, unknown>;
	}>,
};

type DrawerContentComponentProps = {
	navigation?: unknown;
	state?: unknown;
	descriptors?: unknown;
	progress?: unknown;
};

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (_props) => {
	const { user, logout } = useAuth();

	return (
		<View style={{ flex: 1 }}>
			{/* User Profile Section */}
			<View
				style={{
					padding: 20,
					borderBottomWidth: 1,
					borderBottomColor: "#e1e1e1",
					marginBottom: 20,
				}}
			>
				<View
					style={{
						width: 60,
						height: 60,
						borderRadius: 30,
						backgroundColor: "#007fff",
						justifyContent: "center",
						alignItems: "center",
						marginBottom: 12,
					}}
				>
					<Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
						{user ? user.displayName?.charAt(0) || user.email.charAt(0).toUpperCase() : "?"}
					</Text>
				</View>
				<Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 4 }}>
					{user ? user.displayName || user.email.split("@")[0] : "Not signed in"}
				</Text>
				<Text style={{ fontSize: 14, color: "#666" }}>
					{user ? user.email : "Please sign in to continue"}
				</Text>
			</View>

			{/* Navigation Items */}
			{/* <DrawerItemList {...props} /> */}

			{/* Logout Button */}
			<View style={{ marginTop: "auto", padding: 20, paddingTop: 40 }}>
				<TouchableOpacity
					onPress={logout}
					style={{
						backgroundColor: "#ff3b30",
						paddingVertical: 12,
						paddingHorizontal: 20,
						borderRadius: 8,
						alignItems: "center",
					}}
				>
					<Text style={{ color: "#fff", fontWeight: "600" }}>Logout</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export const DrawerNavigator: React.FC = () => {
	return (
		<Drawer.Navigator
			drawerContent={(props: DrawerContentComponentProps) => <CustomDrawerContent {...props} />}
			screenOptions={{
				drawerActiveTintColor: "#007fff",
				drawerInactiveTintColor: "#666",
				drawerLabelStyle: {
					fontFamily: "Lexend",
					fontWeight: "400",
					fontSize: 16,
				},
				headerShown: false,
			}}
		>
			<Drawer.Screen
				name="HomeTabs"
				component={TabNavigator}
				options={{
					drawerLabel: "Home",
					drawerIcon: ({ color: _color }: { color: string }) => (
						<Text style={{ fontSize: 20 }}>🏠</Text>
					),
				}}
			/>
			<Drawer.Screen
				name="ComponentShowcase"
				component={ComponentShowcase}
				options={{
					drawerLabel: "UI Components",
					drawerIcon: ({ color: _color }: { color: string }) => (
						<Text style={{ fontSize: 20 }}>🎨</Text>
					),
					headerShown: true,
					headerTitle: "Component Showcase",
				}}
			/>
			<Drawer.Screen
				name="Settings"
				component={ThemedSettingsScreen}
				options={{
					drawerLabel: "Settings",
					drawerIcon: ({ color: _color }: { color: string }) => (
						<Text style={{ fontSize: 20 }}>⚙️</Text>
					),
					headerShown: true,
					headerTitle: "Settings",
				}}
			/>
		</Drawer.Navigator>
	);
};
