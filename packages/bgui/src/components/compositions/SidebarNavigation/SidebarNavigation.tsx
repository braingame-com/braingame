import { memo, useCallback } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "../../../theme";
import { Box } from "../../primitives/Box";
import { Icon } from "../../primitives/Icon";
import { Stack } from "../../primitives/Stack";
import { Typography } from "../../primitives/Typography";
import { List } from "../List";
import { ListItem } from "../ListItem";
import type { SidebarNavigationProps } from "./SidebarNavigation.types";

export const SidebarNavigation = memo(function SidebarNavigation({
	sections,
	activeItem,
	onItemPress,
	style,
	testID,
	ariaLabel,
}: SidebarNavigationProps) {
	const theme = useTheme();
	const resolvedTestID = testID ?? "bgui-sidebar-navigation";

	const handlePress = useCallback(
		(item: SidebarNavigationProps["sections"][number]["items"][number]) =>
			(event: Parameters<NonNullable<SidebarNavigationProps["onItemPress"]>>[1]) => {
				onItemPress?.(item, event);
			},
		[onItemPress],
	);

	return (
		<Box
			testID={resolvedTestID}
			style={StyleSheet.flatten([styles.container, style])}
			accessibilityLabel={ariaLabel}
		>
			<Stack spacing="lg">
				{sections.map((section) => (
					<Stack key={section.title} spacing="sm">
						<Typography
							level="body-sm"
							style={StyleSheet.flatten([
								styles.sectionTitle,
								{ color: theme.colors.onSurfaceVariant },
							])}
						>
							{section.title}
						</Typography>
						<List
							selectionMode="single"
							selectedValue={activeItem ?? null}
							color="neutral"
							variant="plain"
							style={StyleSheet.flatten([
								styles.list,
								{ rowGap: theme.spacing.xs, columnGap: theme.spacing.xs },
							])}
							accessibilityRole="list"
							aria-label={section.title}
						>
							{section.items.map((item) => {
								const isActive = activeItem === item.value;
								return (
									<ListItem
										key={item.value}
										value={item.value}
										button
										color={isActive ? "primary" : "neutral"}
										variant={isActive ? "soft" : "plain"}
										selected={isActive}
										onPress={handlePress(item)}
										accessibilityRole="link"
										aria-label={item.label}
										startAction={
											item.icon ? (
												<Icon name={item.icon} size={18} color={theme.colors.onSurfaceVariant} />
											) : undefined
										}
									>
										<Typography level="body-md">{item.label}</Typography>
									</ListItem>
								);
							})}
						</List>
					</Stack>
				))}
			</Stack>
		</Box>
	);
});

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
	sectionTitle: {
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},
	list: {
		flexGrow: 0,
	},
	modalContent: {
		width: "100%",
		maxWidth: 360,
	},
});
