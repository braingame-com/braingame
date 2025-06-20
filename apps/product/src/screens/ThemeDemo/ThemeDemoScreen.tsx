import type React from "react";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	ThemedButton,
	ThemedCard,
	ThemedInput,
	ThemedText,
	ThemedView,
} from "../../theme/components/ThemedComponents";
import { ThemeSelector, ThemeToggle } from "../../theme/components/ThemeSelector";
import { useAnimatedTheme, useTheme } from "../../theme/ThemeContext";

export const ThemeDemoScreen: React.FC = () => {
	const { theme } = useTheme();
	const { animatedBackgroundStyle } = useAnimatedTheme();
	const [themeSelectorVisible, setThemeSelectorVisible] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [errorInput, setErrorInput] = useState("");

	return (
		<Animated.View style={[{ flex: 1 }, animatedBackgroundStyle]}>
			<SafeAreaView style={{ flex: 1 }}>
				<ThemedView variant="background" style={{ flex: 1 }}>
					{/* Header */}
					<ThemedView variant="surface" style={styles.header}>
						<ThemedText size="2xl" weight="bold">
							Theme Demo
						</ThemedText>
						<ThemeToggle />
					</ThemedView>

					<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
						{/* Typography Section */}
						<ThemedCard elevation="low" style={styles.section}>
							<ThemedText size="xl" weight="semibold" style={styles.sectionTitle}>
								Typography
							</ThemedText>

							<ThemedText size="4xl" weight="bold">
								Heading 4XL Bold
							</ThemedText>
							<ThemedText size="3xl" weight="semibold">
								Heading 3XL Semibold
							</ThemedText>
							<ThemedText size="2xl" weight="medium">
								Heading 2XL Medium
							</ThemedText>
							<ThemedText size="xl">Heading XL Regular</ThemedText>
							<ThemedText size="lg" variant="secondary">
								Body Large Secondary
							</ThemedText>
							<ThemedText size="md">Body Medium Primary</ThemedText>
							<ThemedText size="sm" variant="disabled">
								Body Small Disabled
							</ThemedText>
							<ThemedText size="xs" variant="error">
								Caption XS Error
							</ThemedText>
							<ThemedText size="md" variant="success">
								Body Success Message
							</ThemedText>
						</ThemedCard>

						{/* Color Palette Section */}
						<ThemedCard elevation="medium" style={styles.section}>
							<ThemedText size="xl" weight="semibold" style={styles.sectionTitle}>
								Color Palette
							</ThemedText>

							<View style={styles.colorGrid}>
								{[
									{ name: "Primary", color: theme.colors.primary },
									{ name: "Secondary", color: theme.colors.secondary },
									{ name: "Accent", color: theme.colors.accent },
									{ name: "Success", color: theme.colors.success },
									{ name: "Warning", color: theme.colors.warning },
									{ name: "Error", color: theme.colors.error },
								].map((item) => (
									<View key={item.name} style={styles.colorItem}>
										<View style={[styles.colorSwatch, { backgroundColor: item.color }]} />
										<ThemedText size="sm">{item.name}</ThemedText>
									</View>
								))}
							</View>
						</ThemedCard>

						{/* Buttons Section */}
						<ThemedCard elevation="low" style={styles.section}>
							<ThemedText size="xl" weight="semibold" style={styles.sectionTitle}>
								Buttons
							</ThemedText>

							<View style={styles.buttonRow}>
								<ThemedButton variant="primary" size="small">
									Primary Small
								</ThemedButton>
								<ThemedButton variant="secondary" size="small">
									Secondary
								</ThemedButton>
							</View>

							<View style={styles.buttonRow}>
								<ThemedButton variant="outline" size="medium">
									Outline Medium
								</ThemedButton>
								<ThemedButton variant="ghost" size="medium">
									Ghost
								</ThemedButton>
							</View>

							<ThemedButton variant="primary" size="large" fullWidth>
								Full Width Large
							</ThemedButton>

							<ThemedButton variant="primary" disabled fullWidth>
								Disabled Button
							</ThemedButton>
						</ThemedCard>

						{/* Input Section */}
						<ThemedCard elevation="low" style={styles.section}>
							<ThemedText size="xl" weight="semibold" style={styles.sectionTitle}>
								Form Inputs
							</ThemedText>

							<ThemedInput
								label="Normal Input"
								placeholder="Enter some text..."
								value={inputValue}
								onChangeText={setInputValue}
							/>

							<View style={{ height: 16 }} />

							<ThemedInput
								label="Error Input"
								placeholder="This has an error"
								value={errorInput}
								onChangeText={setErrorInput}
								error
							/>
						</ThemedCard>

						{/* Cards Section */}
						<ThemedCard elevation="low" style={styles.section}>
							<ThemedText size="xl" weight="semibold" style={styles.sectionTitle}>
								Card Elevations
							</ThemedText>

							<ThemedCard elevation="none" style={styles.demoCard}>
								<ThemedText>No Elevation</ThemedText>
							</ThemedCard>

							<ThemedCard elevation="low" style={styles.demoCard}>
								<ThemedText>Low Elevation</ThemedText>
							</ThemedCard>

							<ThemedCard elevation="medium" style={styles.demoCard}>
								<ThemedText>Medium Elevation</ThemedText>
							</ThemedCard>

							<ThemedCard elevation="high" style={styles.demoCard}>
								<ThemedText>High Elevation</ThemedText>
							</ThemedCard>
						</ThemedCard>

						{/* Theme Customization */}
						<ThemedCard elevation="medium" style={[styles.section, { marginBottom: 40 }]}>
							<ThemedText size="xl" weight="semibold" style={styles.sectionTitle}>
								Theme Customization
							</ThemedText>

							<ThemedText variant="secondary" style={{ marginBottom: 16 }}>
								Customize the app's appearance with different theme modes and color schemes.
							</ThemedText>

							<ThemedButton
								variant="primary"
								size="large"
								fullWidth
								onPress={() => setThemeSelectorVisible(true)}
							>
								Open Theme Selector
							</ThemedButton>
						</ThemedCard>
					</ScrollView>
				</ThemedView>

				<ThemeSelector
					visible={themeSelectorVisible}
					onClose={() => setThemeSelectorVisible(false)}
				/>
			</SafeAreaView>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#e1e1e1",
	},
	content: {
		flex: 1,
		padding: 20,
	},
	section: {
		marginBottom: 20,
	},
	sectionTitle: {
		marginBottom: 16,
	},
	colorGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 16,
	},
	colorItem: {
		alignItems: "center",
		gap: 8,
	},
	colorSwatch: {
		width: 60,
		height: 60,
		borderRadius: 12,
	},
	buttonRow: {
		flexDirection: "row",
		gap: 12,
		marginBottom: 12,
	},
	demoCard: {
		marginBottom: 12,
	},
});
