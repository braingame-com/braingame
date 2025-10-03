import { memo, useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "../../../theme";
import { Box } from "../../primitives/Box";
import { Icon } from "../../primitives/Icon";
import { Stack } from "../../primitives/Stack";
import { Typography } from "../../primitives/Typography";
import type { TabBarItem, TabBarProps, TabBarSize, TabBarTone } from "./TabBar.types";

const createSizeConfig = (theme: ReturnType<typeof useTheme>) => ({
	sm: {
		height: 48,
		iconSize: 18,
		paddingHorizontal: theme.spacing.sm,
		labelLevel: "body-xs" as const,
		gap: theme.spacing.xs,
	},
	md: {
		height: 56,
		iconSize: 20,
		paddingHorizontal: theme.spacing.md,
		labelLevel: "body-sm" as const,
		gap: theme.spacing.xs,
	},
	lg: {
		height: 64,
		iconSize: 22,
		paddingHorizontal: theme.spacing.lg,
		labelLevel: "body-md" as const,
		gap: theme.spacing.sm,
	},
});

const toneColors: Record<TabBarTone, { active: string; inactive: string; indicator: string }> = {
	primary: {
		active: "primary",
		inactive: "onSurfaceVariant",
		indicator: "primary",
	},
	neutral: {
		active: "onSurface",
		inactive: "onSurfaceVariant",
		indicator: "outlineVariant",
	},
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
	track: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	itemBase: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	pressable: {
		flex: 1,
	},
	indicator: {
		height: 3,
		borderRadius: 999,
		marginTop: 4,
	},
});

const isItemActive = (item: TabBarItem, activeValue: string) => item.value === activeValue;

export const TabBar = memo(function TabBar({
	items,
	activeValue,
	onChange,
	size = "md",
	tone = "primary",
	showIndicators = true,
	style,
	testID,
}: TabBarProps) {
	const theme = useTheme();
	const sizeConfig = useMemo(() => createSizeConfig(theme), [theme]);
	const palette = toneColors[tone] ?? toneColors.primary;
	const itemConfig = sizeConfig[size as TabBarSize] ?? sizeConfig.md;

	return (
		<Box
			style={StyleSheet.flatten([
				styles.container,
				{ backgroundColor: theme.colors.surfaceContainerLow },
				style,
			])}
			testID={testID}
			accessibilityRole="tablist"
		>
			<Stack direction="row" spacing="none" style={styles.track}>
				{items.map((item) => {
					const active = isItemActive(item, activeValue);
					const iconColorToken = active ? palette.active : palette.inactive;
					const labelColorToken = active ? palette.active : palette.inactive;
					const indicatorColorToken = palette.indicator;

					const handlePress = () => {
						if (item.disabled) return;
						onChange?.(item.value);
					};

					return (
						<Pressable
							key={item.value}
							disabled={item.disabled}
							onPress={handlePress}
							style={styles.pressable}
							accessibilityRole="tab"
							accessibilityLabel={item.label}
							accessibilityState={{ selected: active, disabled: Boolean(item.disabled) }}
						>
							<Box
								style={[
									styles.itemBase,
									{ height: itemConfig.height, paddingHorizontal: itemConfig.paddingHorizontal },
								]}
							>
								<Stack direction="column" spacing={itemConfig.gap} style={{ alignItems: "center" }}>
									{item.icon ? (
										<Icon
											name={item.icon}
											size={itemConfig.iconSize}
											color={
												theme.colors[iconColorToken as keyof typeof theme.colors] ?? iconColorToken
											}
										/>
									) : null}
									<Typography
										level={itemConfig.labelLevel}
										style={{
											color:
												theme.colors[labelColorToken as keyof typeof theme.colors] ??
												labelColorToken,
										}}
									>
										{item.label}
									</Typography>
									{item.notificationBadge}
								</Stack>
								{showIndicators ? (
									<Box
										style={StyleSheet.flatten([
											styles.indicator,
											{
												width: itemConfig.iconSize,
												opacity: active ? 1 : 0,
												backgroundColor:
													theme.colors[indicatorColorToken as keyof typeof theme.colors] ??
													indicatorColorToken,
											},
										])}
										accessibilityElementsHidden={!active}
									/>
								) : null}
							</Box>
						</Pressable>
					);
				})}
			</Stack>
		</Box>
	);
});
