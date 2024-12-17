import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Fonts } from "@/constants/Fonts";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [fontsLoaded] = useFonts(Fonts);

	useEffect(() => {
		if (fontsLoaded) SplashScreen.hideAsync();
	}, [fontsLoaded]);

	return fontsLoaded ? (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<Stack
					screenOptions={{
						headerTitleStyle: { fontFamily: "SohneBook" },
						headerShown: false,
					}}
				/>
				<StatusBar style="auto" />
			</ThemeProvider>
		</GestureHandlerRootView>
	) : null;
}
