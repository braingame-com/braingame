import type React from "react";
import { useState } from "react";
import { Dimensions, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useTheme } from "../ThemeContext";
import type { ColorScheme, ThemeMode } from "../types";
import { ThemedButton, ThemedCard, ThemedText, ThemedView } from "./ThemedComponents";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface ThemeSelectorProps {
	visible: boolean;
	onClose: () => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ visible, onClose }) => {
	const { theme, themeMode, colorScheme, setThemeMode, setColorScheme } = useTheme();
	const [selectedTab, setSelectedTab] = useState<"mode" | "color">("mode");

	const tabIndicatorPosition = useSharedValue(0);

	const handleTabChange = (tab: "mode" | "color") => {
		setSelectedTab(tab);
		tabIndicatorPosition.value = withSpring(tab === "mode" ? 0 : 1);
	};

	const animatedIndicatorStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: tabIndicatorPosition.value * (SCREEN_WIDTH / 2 - 40),
				},
			],
		};
	});

	const themeModes: { mode: ThemeMode; label: string; icon: string }[] = [
		{ mode: "light", label: "Light", icon: "☀️" },
		{ mode: "dark", label: "Dark", icon: "🌙" },
		{ mode: "system", label: "System", icon: "📱" },
	];

	const colorSchemes: { scheme: ColorScheme; label: string; colors: string[] }[] = [
		{ scheme: "default", label: "Default", colors: ["#007fff", "#4da3ff", "#0059b3"] },
		{ scheme: "ocean", label: "Ocean", colors: ["#006994", "#00838f", "#00acc1"] },
		{ scheme: "forest", label: "Forest", colors: ["#2e7d32", "#558b2f", "#8bc34a"] },
		{ scheme: "sunset", label: "Sunset", colors: ["#ff6f00", "#f57c00", "#ff5722"] },
		{ scheme: "midnight", label: "Midnight", colors: ["#3f51b5", "#7c4dff", "#536dfe"] },
	];

	return (
		<Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
			<View style={styles.modalOverlay}>
				<ThemedView variant="surface" style={styles.modalContent}>
					{/* Header */}
					<View style={styles.header}>
						<ThemedText size="xl" weight="bold">
							Customize Theme
						</ThemedText>
						<TouchableOpacity onPress={onClose}>
							<ThemedText size="2xl">✕</ThemedText>
						</TouchableOpacity>
					</View>

					{/* Tab Selector */}
					<View style={styles.tabContainer}>
						<TouchableOpacity style={styles.tab} onPress={() => handleTabChange("mode")}>
							<ThemedText
								variant={selectedTab === "mode" ? "primary" : "secondary"}
								weight={selectedTab === "mode" ? "semibold" : "regular"}
							>
								Theme Mode
							</ThemedText>
						</TouchableOpacity>
						<TouchableOpacity style={styles.tab} onPress={() => handleTabChange("color")}>
							<ThemedText
								variant={selectedTab === "color" ? "primary" : "secondary"}
								weight={selectedTab === "color" ? "semibold" : "regular"}
							>
								Color Scheme
							</ThemedText>
						</TouchableOpacity>
						<Animated.View
							style={[
								styles.tabIndicator,
								{ backgroundColor: theme.colors.primary },
								animatedIndicatorStyle,
							]}
						/>
					</View>

					{/* Content */}
					<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
						{selectedTab === "mode" ? (
							<View style={styles.optionGrid}>
								{themeModes.map((item) => (
									<TouchableOpacity
										key={item.mode}
										style={[
											styles.modeOption,
											themeMode === item.mode && {
												borderColor: theme.colors.primary,
												borderWidth: 2,
											},
										]}
										onPress={() => setThemeMode(item.mode)}
									>
										<ThemedCard elevation="low" padding="medium" style={styles.modeCard}>
											<ThemedText size="4xl">{item.icon}</ThemedText>
											<ThemedText
												size="md"
												weight={themeMode === item.mode ? "semibold" : "regular"}
												style={{ marginTop: 8 }}
											>
												{item.label}
											</ThemedText>
										</ThemedCard>
									</TouchableOpacity>
								))}
							</View>
						) : (
							<View style={styles.colorList}>
								{colorSchemes.map((item) => (
									<TouchableOpacity
										key={item.scheme}
										style={[
											styles.colorOption,
											colorScheme === item.scheme && {
												borderColor: theme.colors.primary,
												borderWidth: 2,
											},
										]}
										onPress={() => setColorScheme(item.scheme)}
									>
										<ThemedCard elevation="low" padding="medium" style={styles.colorCard}>
											<View style={styles.colorPreview}>
												{item.colors.map((color, colorIndex) => (
													<View
														key={`${item.scheme}-color-${colorIndex}`}
														style={[styles.colorSwatch, { backgroundColor: color }]}
													/>
												))}
											</View>
											<ThemedText
												size="md"
												weight={colorScheme === item.scheme ? "semibold" : "regular"}
												style={{ marginTop: 12 }}
											>
												{item.label}
											</ThemedText>
										</ThemedCard>
									</TouchableOpacity>
								))}
							</View>
						)}
					</ScrollView>

					{/* Footer */}
					<View style={styles.footer}>
						<ThemedButton variant="primary" size="large" fullWidth onPress={onClose}>
							Done
						</ThemedButton>
					</View>
				</ThemedView>
			</View>
		</Modal>
	);
};

// Mini theme toggle for navigation bars
export const ThemeToggle: React.FC = () => {
	const { theme, toggleTheme, themeMode } = useTheme();
	const rotationValue = useSharedValue(0);

	const handleToggle = () => {
		toggleTheme();
		rotationValue.value = withSpring(rotationValue.value + 180);
	};

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: `${rotationValue.value}deg` }],
		};
	});

	return (
		<TouchableOpacity onPress={handleToggle} style={styles.themeToggle}>
			<Animated.View style={animatedStyle}>
				<ThemedText size="xl">{themeMode === "dark" ? "🌙" : "☀️"}</ThemedText>
			</Animated.View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "flex-end",
	},
	modalContent: {
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		paddingTop: 24,
		maxHeight: "80%",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		marginBottom: 24,
	},
	tabContainer: {
		flexDirection: "row",
		marginHorizontal: 20,
		marginBottom: 20,
		position: "relative",
	},
	tab: {
		flex: 1,
		paddingVertical: 12,
		alignItems: "center",
	},
	tabIndicator: {
		position: "absolute",
		bottom: 0,
		left: 0,
		width: (SCREEN_WIDTH - 40) / 2,
		height: 3,
		borderRadius: 2,
	},
	content: {
		flex: 1,
		paddingHorizontal: 20,
	},
	optionGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
		paddingBottom: 20,
	},
	modeOption: {
		width: (SCREEN_WIDTH - 64) / 3,
		borderRadius: 12,
		overflow: "hidden",
	},
	modeCard: {
		alignItems: "center",
		paddingVertical: 20,
	},
	colorList: {
		gap: 12,
		paddingBottom: 20,
	},
	colorOption: {
		borderRadius: 12,
		overflow: "hidden",
	},
	colorCard: {
		flexDirection: "row",
		alignItems: "center",
	},
	colorPreview: {
		flexDirection: "row",
		gap: 8,
	},
	colorSwatch: {
		width: 24,
		height: 24,
		borderRadius: 12,
	},
	footer: {
		padding: 20,
		paddingBottom: 40,
	},
	themeToggle: {
		padding: 8,
	},
});
