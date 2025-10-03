import { memo, useMemo } from "react";
import { StyleSheet as RNStyleSheet, StyleSheet } from "react-native";
import type { IconName } from "../../../icons";
import { useTheme } from "../../../theme";
import { Box } from "../../primitives/Box";
import { Icon } from "../../primitives/Icon";
import { Stack } from "../../primitives/Stack";
import { Typography } from "../../primitives/Typography";
import { IconButton } from "../IconButton";
import type { ToastAriaRole, ToastProps, ToastTone, ToastVariant } from "./Toast.types";

const toneMap: Record<
	ToastTone,
	{
		color: string;
		onColor: string;
		container: string;
		onContainer: string;
		border?: string;
	}
> = {
	info: {
		color: "primary",
		onColor: "onPrimary",
		container: "primaryContainer",
		onContainer: "onPrimaryContainer",
	},
	success: {
		color: "success",
		onColor: "onSuccess",
		container: "successContainer",
		onContainer: "onSuccessContainer",
	},
	warning: {
		color: "warning",
		onColor: "onWarning",
		container: "warningContainer",
		onContainer: "onWarningContainer",
	},
	error: {
		color: "error",
		onColor: "onError",
		container: "errorContainer",
		onContainer: "onErrorContainer",
	},
	neutral: {
		color: "onSurface",
		onColor: "surface",
		container: "surfaceVariant",
		onContainer: "onSurfaceVariant",
		border: "outline",
	},
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 16,
		width: "100%",
	},
	contentRow: {
		alignItems: "center",
	},
});

const getVariantStyles = (
	themeColors: Record<string, string>,
	tone: ToastTone,
	variant: ToastVariant,
) => {
	const tokens = toneMap[tone] ?? toneMap.info;

	switch (variant) {
		case "solid":
			return {
				backgroundColor:
					tone === "neutral"
						? themeColors.surface
						: (themeColors[tokens.color as keyof typeof themeColors] ?? themeColors.primary),
				color:
					tone === "neutral"
						? themeColors.onSurface
						: (themeColors[tokens.onColor as keyof typeof themeColors] ?? themeColors.onPrimary),
			};
		case "outlined":
			return {
				backgroundColor: themeColors.surface,
				color:
					tone === "neutral"
						? themeColors.onSurface
						: (themeColors[tokens.color as keyof typeof themeColors] ?? themeColors.primary),
				borderColor:
					tone === "neutral"
						? (themeColors[tokens.border ?? "outline"] ?? themeColors.outline)
						: (themeColors[tokens.color as keyof typeof themeColors] ?? themeColors.primary),
				borderWidth: RNStyleSheet.hairlineWidth,
			};
		default:
			return {
				backgroundColor:
					tone === "neutral"
						? themeColors.surfaceVariant
						: (themeColors[tokens.container as keyof typeof themeColors] ??
							themeColors.primaryContainer),
				color:
					tone === "neutral"
						? themeColors.onSurfaceVariant
						: (themeColors[tokens.onContainer as keyof typeof themeColors] ??
							themeColors.onPrimaryContainer),
			};
	}
};

export const Toast = memo(function Toast({
	title,
	message,
	variant = "soft",
	tone = "info",
	icon,
	action,
	onDismiss,
	dismissLabel = "Dismiss notification",
	role = "none",
	liveRegion = "polite",
	style,
	testID,
}: ToastProps) {
	const theme = useTheme();
	const variantStyles = useMemo(
		() => getVariantStyles(theme.colors, tone, variant),
		[theme.colors, tone, variant],
	);

	const renderIcon = () => {
		if (!icon) return null;
		if (typeof icon === "string") {
			const iconName = icon as IconName;
			return (
				<Icon name={iconName} size={20} color={variantStyles.color ?? theme.colors.onSurface} />
			);
		}
		return icon;
	};

	const resolvedRole: ToastAriaRole = role;

	return (
		<Box
			style={StyleSheet.flatten([
				styles.container,
				{
					backgroundColor: variantStyles.backgroundColor ?? theme.colors.surface,
					borderColor: variantStyles.borderColor,
					borderWidth: variantStyles.borderWidth,
				},
				style,
			])}
			testID={testID}
			accessibilityRole={resolvedRole === "alert" ? "alert" : undefined}
			accessibilityLiveRegion={liveRegion}
		>
			<Stack direction="row" spacing="md" style={styles.contentRow}>
				{renderIcon()}
				<Stack spacing="xs" style={{ flex: 1 }}>
					{title ? (
						<Typography level="title-sm" style={{ color: variantStyles.color }}>
							{title}
						</Typography>
					) : null}
					<Typography level="body-sm" style={{ color: variantStyles.color }}>
						{message}
					</Typography>
				</Stack>
				{action ? <Box>{action}</Box> : null}
				{onDismiss ? (
					<IconButton
						iconName="close"
						variant="plain"
						size="sm"
						aria-label={dismissLabel}
						onClick={onDismiss}
					/>
				) : null}
			</Stack>
		</Box>
	);
});
