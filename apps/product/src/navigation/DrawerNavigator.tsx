import { Text } from "@braingame/bgui";
import {
	createDrawerNavigator,
	type DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer";
import type React from "react";
import { TouchableOpacity, View } from "react-native";
import { SettingsScreen } from "../screens/Settings/SettingsScreen";
import { useAuth } from "./AuthContext";
import { TabNavigator } from "./TabNavigator";
import type { DrawerParamList } from "./types";

const Drawer = createDrawerNavigator<DrawerParamList>();

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
	const { user, logout } = useAuth();

	return (
		<DrawerContentScrollView {...props}>
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
						{user?.displayName?.charAt(0) || "U"}
					</Text>
				</View>
				<Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 4 }}>
					{user?.displayName || "User"}
				</Text>
				<Text style={{ fontSize: 14, color: "#666" }}>{user?.email || "user@example.com"}</Text>
			</View>

			{/* Navigation Items */}
			<DrawerItemList {...props} />

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
		</DrawerContentScrollView>
	);
};

export const DrawerNavigator: React.FC = () => {
	return (
		<Drawer.Navigator
			drawerContent={(props) => <CustomDrawerContent {...props} />}
			screenOptions={{
				drawerActiveTintColor: "#007fff",
				drawerInactiveTintColor: "#666",
				drawerLabelStyle: {
					fontFamily: "LexendRegular",
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
					drawerIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🏠</Text>,
				}}
			/>
			<Drawer.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					drawerLabel: "Settings",
					drawerIcon: ({ color }) => <Text style={{ fontSize: 20 }}>⚙️</Text>,
					headerShown: true,
					headerTitle: "Settings",
				}}
			/>
		</Drawer.Navigator>
	);
};
