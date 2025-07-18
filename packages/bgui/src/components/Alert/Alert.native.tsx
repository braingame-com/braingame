import { forwardRef, useImperativeHandle, useRef } from "react";
import { StyleSheet, type View } from "react-native";
import { theme } from "../../theme";
import { Box } from "../Box";
import { Typography } from "../Typography";
import type { AlertProps } from "./AlertProps";

/**
 * Native implementation of Alert component
 *
 * Alerts display brief messages for the user without interrupting their workflow.
 * This implementation provides contextual feedback with proper theming and accessibility.
 */

export const Alert = forwardRef<View, AlertProps>(
	(
		{
			children,
			color = "neutral",
			variant = "soft",
			size = "md",
			startDecorator,
			endDecorator,
			invertedColors = false,
			role = "alert",
			style,
			testID,
			"aria-label": ariaLabel,
		},
		ref,
	) => {
		const alertRef = useRef<View>(null);

		// Merge refs
		useImperativeHandle(ref, () => alertRef.current!);

		// Get variant styles from theme
		const getVariantStyles = () => {
			const variantKey = `${variant}-${color}` as keyof typeof theme.components.Alert.variants;
			return (
				theme.components.Alert.variants[variantKey] ||
				theme.components.Alert.variants["soft-neutral"]
			);
		};

		// Get size configurations
		const getSizeConfig = () => {
			const sizeConfigs = {
				sm: {
					paddingHorizontal: theme.spacing.sm,
					paddingVertical: theme.spacing.xs,
					borderRadius: theme.radii.xs,
					fontSize: theme.fontSizes.sm,
					gap: theme.spacing.xs,
				},
				md: {
					paddingHorizontal: theme.spacing.md,
					paddingVertical: theme.spacing.sm,
					borderRadius: theme.radii.sm,
					fontSize: theme.fontSizes.md,
					gap: theme.spacing.sm,
				},
				lg: {
					paddingHorizontal: theme.spacing.lg,
					paddingVertical: theme.spacing.md,
					borderRadius: theme.radii.md,
					fontSize: theme.fontSizes.lg,
					gap: theme.spacing.md,
				},
			};
			return sizeConfigs[size];
		};

		// Get icon color based on variant and color
		const getIconColor = () => {
			const colorMap = {
				primary: theme.colors.primary,
				neutral: theme.colors.onSurface,
				danger: theme.colors.error,
				success: theme.colors.success,
				warning: theme.colors.warning,
			};

			if (variant === "solid") {
				return invertedColors ? colorMap[color] : theme.colors.onPrimary;
			}

			return colorMap[color] || theme.colors.onSurface;
		};

		// Get text color based on variant and color
		const getTextColor = () => {
			if (variant === "solid") {
				return invertedColors ? theme.colors[color] : theme.colors.onPrimary;
			}

			const colorMap = {
				primary: theme.colors.primary,
				neutral: theme.colors.onSurface,
				danger: theme.colors.error,
				success: theme.colors.success,
				warning: theme.colors.warning,
			};

			return colorMap[color] || theme.colors.onSurface;
		};

		const variantStyles = getVariantStyles();
		const sizeConfig = getSizeConfig();
		const iconColor = getIconColor();
		const textColor = getTextColor();

		// Container styles
		const containerStyles = [
			styles.container,
			{
				backgroundColor: variantStyles.backgroundColor,
				borderColor: variantStyles.borderColor,
				borderWidth: variantStyles.borderWidth || 0,
				borderRadius: sizeConfig.borderRadius,
				paddingHorizontal: sizeConfig.paddingHorizontal,
				paddingVertical: sizeConfig.paddingVertical,
				gap: sizeConfig.gap,
			},
			style,
		];

		return (
			<Box
				ref={alertRef}
				style={containerStyles}
				testID={testID}
				accessibilityRole={role as any}
				accessibilityLabel={ariaLabel}
				accessibilityLiveRegion="polite"
				accessible={true}
			>
				<Box flexDirection="row" alignItems="flex-start" gap={sizeConfig.gap}>
					{startDecorator && <Box style={{ color: iconColor }}>{startDecorator}</Box>}

					<Box flex={1}>
						{typeof children === "string" ? (
							<Typography
								level="body-md"
								style={{
									fontSize: sizeConfig.fontSize,
									color: textColor,
									lineHeight: sizeConfig.fontSize * 1.5,
								}}
							>
								{children}
							</Typography>
						) : (
							children
						)}
					</Box>

					{endDecorator && <Box style={{ color: iconColor }}>{endDecorator}</Box>}
				</Box>
			</Box>
		);
	},
);

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		alignItems: "stretch",
		width: "100%",
	},
});
