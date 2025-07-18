import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
	type AccessibilityRole,
	type AccessibilityState,
	ActivityIndicator,
	type GestureResponderEvent,
	Pressable,
	StyleSheet,
	View,
} from "react-native";
import { theme } from "../../theme";
import { Box } from "../Box";
import { Typography } from "../Typography";
import type { ButtonProps } from "./ButtonProps";

/**
 * Native implementation of Button component
 *
 * Replicates useButton behavior from Joy UI using React Native APIs.
 */

export const Button = forwardRef<View, ButtonProps>(
	(
		{
			children,
			color = "primary",
			disabled = false,
			endDecorator,
			fullWidth = false,
			size = "md",
			startDecorator,
			variant = "solid",
			loading = false,
			loadingIndicator,
			loadingPosition = "center",
			onClick,
			onPressIn,
			onPressOut,
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-pressed": ariaPressed,
			...props
		},
		ref,
	) => {
		const buttonRef = useRef<View>(null);
		const [isPressed, setIsPressed] = useState(false);

		// Merge refs
		useImperativeHandle(ref, () => buttonRef.current!);

		// Handle loading/disabled state
		const isDisabled = disabled || loading;

		// Get button variant style from theme
		const getButtonVariantStyle = () => {
			const variantKey = `${variant}-${color}` as keyof typeof theme.components.Button.variants;
			const variantStyle = theme.components.Button.variants[variantKey];

			if (!variantStyle) {
				// Fallback to solid primary if variant not found
				return theme.components.Button.variants["solid-primary"];
			}

			return variantStyle;
		};

		// Get size styles
		const getSizeStyles = () => {
			const sizeStyles = {
				sm: {
					paddingVertical: theme.spacing.xs,
					paddingHorizontal: theme.spacing.sm * 1.5,
					minHeight: 32,
				},
				md: {
					paddingVertical: theme.spacing.sm,
					paddingHorizontal: theme.spacing.md,
					minHeight: 40,
				},
				lg: {
					paddingVertical: theme.spacing.md,
					paddingHorizontal: theme.spacing.lg,
					minHeight: 48,
				},
			};

			return sizeStyles[size];
		};

		// Handle press events
		const handlePressIn = (event: GestureResponderEvent) => {
			setIsPressed(true);
			onPressIn?.(event);
		};

		const handlePressOut = (event: GestureResponderEvent) => {
			setIsPressed(false);
			onPressOut?.(event);
		};

		const handlePress = (event: GestureResponderEvent) => {
			if (!isDisabled && onClick) {
				onClick(event);
			}
		};

		// Render loading indicator
		const renderLoadingIndicator = () => {
			if (!loading) return null;

			if (loadingIndicator) {
				return loadingIndicator;
			}

			const indicatorColor = variant === "solid" ? "#ffffff" : theme.colors[color];
			const indicatorSize = size === "sm" ? "small" : "small";

			return <ActivityIndicator size={indicatorSize} color={indicatorColor} />;
		};

		// Build button content
		const renderContent = () => {
			const isContentHidden = loading && loadingPosition === "center";
			const contentOpacity = isContentHidden ? 0 : 1;

			return (
				<>
					{loading && loadingPosition === "start" && (
						<Box marginRight="xs">{renderLoadingIndicator()}</Box>
					)}

					{startDecorator && (
						<Box marginRight="xs" opacity={contentOpacity}>
							{startDecorator}
						</Box>
					)}

					<Typography
						level="body-sm"
						style={[
							{
								opacity: contentOpacity,
								textTransform: "uppercase",
								letterSpacing: 0.5,
								fontWeight: "600",
							},
							variant === "solid" && { color: "#ffffff" },
							variant !== "solid" && { color: theme.colors[color] },
						]}
					>
						{children}
					</Typography>

					{endDecorator && (
						<Box marginLeft="xs" opacity={contentOpacity}>
							{endDecorator}
						</Box>
					)}

					{loading && loadingPosition === "end" && (
						<Box marginLeft="xs">{renderLoadingIndicator()}</Box>
					)}
				</>
			);
		};

		// Get variant styles
		const variantStyle = getButtonVariantStyle();
		const sizeStyle = getSizeStyles();

		// Build accessibility props
		const accessibilityRole: AccessibilityRole = "button";
		const accessibilityState: AccessibilityState = {
			disabled: isDisabled,
			busy: loading,
		};

		if (ariaPressed !== undefined) {
			accessibilityState.selected = ariaPressed === true;
		}

		return (
			<Pressable
				ref={buttonRef}
				onPress={handlePress}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				disabled={isDisabled}
				testID={testID}
				accessibilityRole={accessibilityRole}
				accessibilityLabel={ariaLabel}
				accessibilityState={accessibilityState}
				style={({ pressed }) => [
					styles.base,
					variantStyle,
					sizeStyle,
					{
						opacity: isDisabled ? 0.6 : pressed || isPressed ? 0.8 : 1,
						transform: [{ scale: pressed || isPressed ? 0.97 : 1 }],
					},
					fullWidth && { width: "100%" },
					style,
				]}
				{...props}
			>
				<View style={styles.content}>
					{renderContent()}

					{loading && loadingPosition === "center" && (
						<View style={styles.centerLoader}>{renderLoadingIndicator()}</View>
					)}
				</View>
			</Pressable>
		);
	},
);

const styles = StyleSheet.create({
	base: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: theme.radii.md,
		borderWidth: 1,
		borderColor: "transparent",
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	centerLoader: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: "center",
		justifyContent: "center",
	},
});
