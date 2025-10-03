import { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, StyleSheet, type ViewStyle } from "react-native";
import { useTheme } from "../../../theme";
import { Modal } from "../Modal";
import type { DrawerPlacement, DrawerProps } from "./Drawer.types";

const sizeMap = {
	sm: 280,
	md: 320,
	lg: 360,
} as const;

const styles = StyleSheet.create({
	container: {
		height: "100%",
		margin: 0,
		justifyContent: "flex-start",
	},
});

const getDrawerWidth = (size: DrawerProps["size"]): number => {
	if (typeof size === "number") {
		return size;
	}
	return sizeMap[size as keyof typeof sizeMap] ?? sizeMap.md;
};

const getHiddenOffset = (placement: DrawerPlacement, width: number) =>
	placement === "left" ? -width - 24 : width + 24;

export function Drawer({
	children,
	open,
	onClose,
	placement = "left",
	size = "md",
	hideBackdrop,
	keepMounted = true,
	disablePortal,
	ariaLabel,
	testID,
	style,
}: DrawerProps) {
	const theme = useTheme();
	const drawerWidth = useMemo(() => getDrawerWidth(size), [size]);
	const translate = useRef(new Animated.Value(open ? 0 : 1)).current;

	useEffect(() => {
		Animated.timing(translate, {
			toValue: open ? 0 : 1,
			duration: 220,
			easing: Easing.out(Easing.cubic),
			useNativeDriver: true,
		}).start();
	}, [open, translate]);

	const hiddenOffset = useMemo(
		() => getHiddenOffset(placement, drawerWidth),
		[placement, drawerWidth],
	);

	const animatedStyle = useMemo(
		() => ({
			transform: [
				{
					translateX: translate.interpolate({
						inputRange: [0, 1],
						outputRange: [0, hiddenOffset],
					}),
				},
			],
		}),
		[hiddenOffset, translate],
	);

	const surfaceStyle = useMemo<ViewStyle>(
		() => ({
			alignSelf: placement === "left" ? "flex-start" : "flex-end",
			width: drawerWidth,
			height: "100%",
			backgroundColor: theme.colors.surface,
			paddingHorizontal: theme.spacing.lg,
			paddingVertical: theme.spacing.lg,
			borderColor: theme.colors.outlineVariant,
			borderRightWidth: placement === "left" ? StyleSheet.hairlineWidth : 0,
			borderLeftWidth: placement === "right" ? StyleSheet.hairlineWidth : 0,
			shadowColor: "#000",
			shadowOpacity: 0.12,
			shadowRadius: 12,
			shadowOffset: { width: 0, height: 4 },
			elevation: 6,
		}),
		[placement, drawerWidth, theme.colors.outlineVariant, theme.colors.surface, theme.spacing.lg],
	);

	return (
		<Modal
			testID={testID}
			open={open}
			onClose={onClose}
			hideBackdrop={hideBackdrop}
			keepMounted={keepMounted}
			disablePortal={disablePortal}
			aria-label={ariaLabel}
			style={{
				justifyContent: placement === "left" ? "flex-start" : "flex-end",
				alignItems: "stretch",
			}}
		>
			<Animated.View style={[styles.container, surfaceStyle, style, animatedStyle]}>
				{children}
			</Animated.View>
		</Modal>
	);
}
