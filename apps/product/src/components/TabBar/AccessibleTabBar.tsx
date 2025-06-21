import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import type { Route } from "@react-navigation/native";
import React, { useCallback, useMemo } from "react";
import { AccessibilityInfo, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAccessibility } from "../../contexts/AccessibilityContext";
import { useTheme } from "../../theme/ThemeContext";
import { getAccessibilityProps, getAccessibilityState } from "../../utils/accessibility";
import { withMemo } from "../../utils/performance";
import { tabBarStyles } from "./styles";

interface TabConfig {
	name: string;
	label: string;
	icon: string;
	accessibilityHint: string;
}

const tabConfigs: Record<string, TabConfig> = {
	Dashboard: {
		name: "Dashboard",
		label: "Dashboard",
		icon: "🏠",
		accessibilityHint: "Navigate to your dashboard",
	},
	Videos: {
		name: "Videos",
		label: "Videos",
		icon: "🎥",
		accessibilityHint: "Browse and watch videos",
	},
	Analytics: {
		name: "Analytics",
		label: "Analytics",
		icon: "📊",
		accessibilityHint: "View your analytics and progress",
	},
	Settings: {
		name: "Settings",
		label: "Settings",
		icon: "⚙️",
		accessibilityHint: "Adjust app settings and preferences",
	},
};

// Accessible Tab Item Component
const TabItem = withMemo<{
	route: Route<string>;
	index: number;
	focused: boolean;
	onPress: () => void;
	onLongPress: () => void;
}>(({ route, index: _index, focused, onPress, onLongPress }) => {
	const { theme } = useTheme();
	const { reduceMotionEnabled, announce } = useAccessibility();
	const scaleValue = useSharedValue(focused ? 1.1 : 1);

	const config = tabConfigs[route.name] || {
		name: route.name,
		label: route.name,
		icon: "📄",
		accessibilityHint: `Navigate to ${route.name}`,
	};

	// Animate scale when focused changes
	React.useEffect(() => {
		if (!reduceMotionEnabled) {
			scaleValue.value = withSpring(focused ? 1.1 : 1, {
				damping: 15,
				stiffness: 150,
			});
		}
	}, [focused, scaleValue, reduceMotionEnabled]);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: reduceMotionEnabled ? [] : [{ scale: scaleValue.value }],
	}));

	const handlePress = useCallback(() => {
		announce(`Navigating to ${config.label}`);
		onPress();
	}, [onPress, config.label, announce]);

	const accessibilityProps = {
		...getAccessibilityProps(config.label, config.accessibilityHint, "tab"),
		...getAccessibilityState({
			selected: focused,
		}),
		accessibilityElementsHidden: false,
		importantForAccessibility: "yes" as const,
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
			onLongPress={onLongPress}
			style={[tabBarStyles.tab, focused && tabBarStyles.activeTab]}
			{...accessibilityProps}
		>
			<Animated.View style={[tabBarStyles.tabContent, animatedStyle]}>
				<Text
					style={[
						tabBarStyles.tabIcon,
						{ color: focused ? theme.colors.primary : theme.colors.textSecondary },
					]}
					importantForAccessibility="no"
				>
					{config.icon}
				</Text>
				<Text
					style={[
						tabBarStyles.tabLabel,
						{
							color: focused ? theme.colors.primary : theme.colors.textSecondary,
							fontWeight: focused ? "600" : "400",
							fontFamily: focused ? "LexendSemibold" : "LexendRegular",
						},
					]}
					numberOfLines={1}
					importantForAccessibility="no"
				>
					{config.label}
				</Text>
			</Animated.View>
		</TouchableOpacity>
	);
}, "TabItem");

export const AccessibleTabBar: React.FC<BottomTabBarProps> = ({
	state,
	descriptors: _descriptors,
	navigation,
}) => {
	const { theme } = useTheme();
	const { keyboardNavigation } = useAccessibility();
	const insets = useSafeAreaInsets();

	// Focus management for keyboard navigation
	const tabRefs = useMemo(
		() => state.routes.map(() => React.createRef<TouchableOpacity>()),
		[state.routes],
	);

	// Handle keyboard navigation
	React.useEffect(() => {
		if (!keyboardNavigation) return;

		const _handleKeyPress = (event: KeyboardEvent) => {
			const key = event.key;
			const currentIndex = state.index;

			switch (key) {
				case "ArrowLeft":
				case "ArrowUp":
					if (currentIndex > 0) {
						navigation.navigate(state.routes[currentIndex - 1].name);
						tabRefs[currentIndex - 1].current?.focus();
					}
					break;
				case "ArrowRight":
				case "ArrowDown":
					if (currentIndex < state.routes.length - 1) {
						navigation.navigate(state.routes[currentIndex + 1].name);
						tabRefs[currentIndex + 1].current?.focus();
					}
					break;
				case "Home":
					navigation.navigate(state.routes[0].name);
					tabRefs[0].current?.focus();
					break;
				case "End":
					navigation.navigate(state.routes[state.routes.length - 1].name);
					tabRefs[state.routes.length - 1].current?.focus();
					break;
			}
		};

		// Add keyboard listener
		const subscription = { remove: () => {} }; // Placeholder for actual keyboard listener

		return () => subscription.remove();
	}, [keyboardNavigation, navigation, state, tabRefs]);

	// Announce tab changes for screen readers
	React.useEffect(() => {
		const currentRoute = state.routes[state.index];
		const config = tabConfigs[currentRoute.name];
		if (config) {
			AccessibilityInfo.announceForAccessibility(`${config.label} tab selected`);
		}
	}, [state.index, state.routes]);

	return (
		<View
			style={[
				tabBarStyles.container,
				{
					paddingBottom: insets.bottom,
					backgroundColor: theme.colors.surface,
					borderTopColor: theme.colors.border,
				},
			]}
			accessibilityRole="tablist"
			accessibilityLabel="Main navigation"
		>
			<View style={tabBarStyles.tabsContainer}>
				{state.routes.map((route, index) => {
					const isFocused = state.index === index;

					const onPress = () => {
						const event = navigation.emit({
							type: "tabPress",
							target: route.key,
							canPreventDefault: true,
						});

						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name);
						}
					};

					const onLongPress = () => {
						navigation.emit({
							type: "tabLongPress",
							target: route.key,
						});
					};

					return (
						<TabItem
							key={route.key}
							route={route}
							index={index}
							focused={isFocused}
							onPress={onPress}
							onLongPress={onLongPress}
						/>
					);
				})}
			</View>
		</View>
	);
};

// Export styles for consistency
export { tabBarStyles } from "./styles";
