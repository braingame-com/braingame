import type { ReactNode } from "react";
import { Children, forwardRef, isValidElement, useEffect, useMemo, useRef } from "react";
import {
	AccessibilityInfo,
	findNodeHandle,
	type GestureResponderEvent,
	Platform,
	Pressable,
	type PressableStateCallbackType,
	StyleSheet,
	type View,
	type ViewStyle,
} from "react-native";
import { theme } from "../../../theme";
import type { VariantStyle } from "../../../theme/variants";
import { Box } from "../../primitives/Box";
import { Icon } from "../../primitives/Icon";
import { Stack } from "../../primitives/Stack";
import { Typography } from "../../primitives/Typography";
import type { AlertProps, AlertSize, AlertStatus } from "./Alert.types";

const STATUS_COLOR_MAP: Record<
	AlertStatus,
	"primary" | "success" | "warning" | "danger" | "neutral"
> = {
	info: "primary",
	success: "success",
	warning: "warning",
	error: "danger",
	neutral: "neutral",
};

const STATUS_ICON_MAP = {
	info: "info",
	success: "check_circle",
	warning: "warning",
	error: "error",
	neutral: "info",
} as const;

const sizeConfig: Record<
	AlertSize,
	{
		paddingHorizontal: number;
		paddingVertical: number;
		gap: number;
		iconSize: number;
		titleLevel: "title-sm" | "title-md" | "title-lg";
		descriptionLevel: "body-sm" | "body-md" | "body-lg";
		actionsSpacing: number;
		descriptionSpacing: number;
	}
> = {
	sm: {
		paddingHorizontal: theme.spacing.sm,
		paddingVertical: theme.spacing.xs,
		gap: theme.spacing.xs,
		iconSize: 18,
		titleLevel: "title-sm",
		descriptionLevel: "body-sm",
		actionsSpacing: theme.spacing.xs,
		descriptionSpacing: 4,
	},
	md: {
		paddingHorizontal: theme.spacing.md,
		paddingVertical: theme.spacing.sm,
		gap: theme.spacing.sm,
		iconSize: 20,
		titleLevel: "title-md",
		descriptionLevel: "body-md",
		actionsSpacing: theme.spacing.sm,
		descriptionSpacing: 6,
	},
	lg: {
		paddingHorizontal: theme.spacing.lg,
		paddingVertical: theme.spacing.md,
		gap: theme.spacing.sm,
		iconSize: 24,
		titleLevel: "title-lg",
		descriptionLevel: "body-lg",
		actionsSpacing: theme.spacing.md,
		descriptionSpacing: 8,
	},
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
	contentRow: {
		alignItems: "flex-start",
	},
	iconWrapper: {
		justifyContent: "flex-start",
		alignItems: "center",
	},
	actionsRow: {
		marginTop: theme.spacing.xs,
	},
	dismissButton: {
		justifyContent: "center",
		alignItems: "center",
	},
});

export const Alert = forwardRef<View, AlertProps>(
	(
		{
			status = "info",
			variant = "soft",
			size = "md",
			title,
			description,
			actions,
			icon,
			showIcon = true,
			onDismiss,
			dismissLabel = "Dismiss alert",
			autoFocusDismiss = true,
			children,
			style,
			testID,
			role = "alert",
			"aria-label": ariaLabel,
		},
		ref,
	) => {
		const dismissRef = useRef<View>(null);
		const colorKey = STATUS_COLOR_MAP[status] ?? "primary";
		const variantKey = `${variant}-${colorKey}` as keyof typeof theme.components.Alert.variants;
		const variantStyles = (theme.components.Alert.variants[variantKey] ??
			theme.components.Alert.variants["soft-neutral"]) as VariantStyle;

		const resolvedBackground =
			theme.colors[variantStyles.backgroundColor as keyof typeof theme.colors] ??
			variantStyles.backgroundColor ??
			theme.colors.surface;
		const resolvedBorderColor = variantStyles.borderColor
			? (theme.colors[variantStyles.borderColor as keyof typeof theme.colors] ??
				variantStyles.borderColor)
			: undefined;
		const resolvedBorderWidth = variantStyles.borderWidth ?? (variant === "outlined" ? 1 : 0);
		const resolvedTextColor =
			theme.colors[variantStyles.color as keyof typeof theme.colors] ??
			variantStyles.color ??
			theme.colors.onSurface;

		const sizeStyles = sizeConfig[size];

		const descriptionContent = description ?? children;
		const actionItems = useMemo(() => {
			if (!actions) return [] as Array<{ key: string; node: ReactNode }>;

			const nodes = Array.isArray(actions) ? actions : [actions];
			const flattened = Children.toArray(nodes).filter(Boolean) as ReactNode[];

			return flattened.map((node, index) => ({
				key: isValidElement(node) && node.key != null ? String(node.key) : `alert-action-${index}`,
				node,
			}));
		}, [actions]);

		useEffect(() => {
			if (!onDismiss || !autoFocusDismiss) return;

			const timeout = setTimeout(() => {
				if (Platform.OS === "web") {
					const focusable = dismissRef.current as unknown as { focus?: () => void } | null;
					focusable?.focus?.();
					return;
				}

				const node = dismissRef.current ? findNodeHandle(dismissRef.current) : null;
				if (node) {
					AccessibilityInfo.setAccessibilityFocus(node);
				}
			}, 60);

			return () => clearTimeout(timeout);
		}, [autoFocusDismiss, onDismiss]);

		const containerStyle = useMemo<ViewStyle>(
			() =>
				StyleSheet.flatten([
					styles.container,
					{
						backgroundColor: resolvedBackground,
						borderColor: resolvedBorderColor,
						borderWidth: resolvedBorderWidth,
						paddingHorizontal: sizeStyles.paddingHorizontal,
						paddingVertical: sizeStyles.paddingVertical,
						borderRadius: theme.radii.sm,
					},
					style,
				]) as ViewStyle,
			[
				resolvedBackground,
				resolvedBorderColor,
				resolvedBorderWidth,
				sizeStyles.paddingHorizontal,
				sizeStyles.paddingVertical,
				style,
			],
		);

		const dismissButtonStyle = ({ pressed }: PressableStateCallbackType) =>
			StyleSheet.flatten<ViewStyle>([styles.dismissButton, { opacity: pressed ? 0.7 : 1 }]);

		const iconColor = resolvedTextColor;
		const statusIconName = STATUS_ICON_MAP[status] ?? STATUS_ICON_MAP.info;
		const accessibilityRoleValue = (
			role === "alert" ? "alert" : "text"
		) as View["props"]["accessibilityRole"];
		const liveRegion = (
			role === "alert" ? "assertive" : "polite"
		) as View["props"]["accessibilityLiveRegion"];

		return (
			<Box
				ref={ref}
				style={containerStyle}
				testID={testID}
				accessibilityRole={accessibilityRoleValue}
				accessibilityLabel={ariaLabel}
				accessibilityLiveRegion={liveRegion}
			>
				<Stack direction="row" spacing={sizeStyles.gap} style={styles.contentRow}>
					{showIcon ? (
						<Box style={styles.iconWrapper}>
							{icon ?? <Icon name={statusIconName} size={sizeStyles.iconSize} color={iconColor} />}
						</Box>
					) : null}
					<Box flex={1}>
						{title ? (
							typeof title === "string" ? (
								<Typography level={sizeStyles.titleLevel} style={{ color: resolvedTextColor }}>
									{title}
								</Typography>
							) : (
								<Box>{title}</Box>
							)
						) : null}
						{descriptionContent ? (
							typeof descriptionContent === "string" ? (
								<Typography
									level={sizeStyles.descriptionLevel}
									style={{
										color: resolvedTextColor,
										marginTop: title ? sizeStyles.descriptionSpacing : 0,
									}}
								>
									{descriptionContent}
								</Typography>
							) : (
								<Box
									style={{
										marginTop: title ? sizeStyles.descriptionSpacing : 0,
									}}
								>
									{descriptionContent}
								</Box>
							)
						) : null}
						{actionItems.length > 0 ? (
							<Stack
								direction="row"
								spacing={sizeStyles.actionsSpacing}
								useFlexGap={false}
								style={StyleSheet.flatten([
									styles.actionsRow,
									{ marginTop: sizeStyles.actionsSpacing },
								])}
							>
								{actionItems.map((action) => (
									<Box key={action.key}>{action.node}</Box>
								))}
							</Stack>
						) : null}
					</Box>
					{onDismiss ? (
						<Pressable
							ref={dismissRef}
							accessibilityRole="button"
							accessibilityLabel={dismissLabel}
							hitSlop={8}
							onPress={(event: GestureResponderEvent) => {
								event.stopPropagation?.();
								onDismiss?.();
							}}
							style={dismissButtonStyle}
						>
							<Icon name="close" size={sizeStyles.iconSize} color={iconColor} />
						</Pressable>
					) : null}
				</Stack>
			</Box>
		);
	},
);

Alert.displayName = "Alert";
