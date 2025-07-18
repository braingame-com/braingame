import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import { Linking, Pressable, StyleSheet, View } from "react-native";
import { theme } from "../../theme";
import { Box } from "../Box";
import { Typography } from "../Typography";
import type { LinkProps } from "./LinkProps";

/**
 * Native implementation of Link component
 *
 * Links allow users to click to navigate to another page or resource.
 * This implementation handles external URLs via React Native's Linking API.
 */

export const Link = forwardRef<View, LinkProps>(
	(
		{
			children,
			href,
			disabled = false,
			color = "primary",
			variant = "plain",
			underline = "hover",
			startDecorator,
			endDecorator,
			level = "body-md",
			overlay = false,
			target = "_self",
			rel,
			onClick,
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-describedby": ariaDescribedby,
			"aria-labelledby": ariaLabelledby,
		},
		ref,
	) => {
		const linkRef = useRef<View>(null);
		const [hovered, setHovered] = useState(false);
		const [pressed, setPressed] = useState(false);
		const [focused, setFocused] = useState(false);

		// Merge refs
		useImperativeHandle(ref, () => linkRef.current!);

		// Handle link press
		const handlePress = useCallback(
			async (event: any) => {
				if (disabled) return;

				// Call onClick if provided
				if (onClick) {
					onClick(event);
				}

				// Handle external URLs
				if (href) {
					try {
						// Check if URL can be handled
						const supported = await Linking.canOpenURL(href);
						if (supported) {
							await Linking.openURL(href);
						} else {
							console.warn(`Don't know how to open URL: ${href}`);
						}
					} catch (error) {
						console.error("Failed to open URL:", error);
					}
				}
			},
			[href, onClick, disabled],
		);

		// Get color styles
		const getColorStyles = () => {
			const colorMap = {
				primary: theme.colors.primary,
				neutral: theme.colors.onSurface,
				danger: theme.colors.error,
				success: theme.colors.success,
				warning: theme.colors.warning,
			};

			return colorMap[color] || theme.colors.primary;
		};

		// Get variant styles
		const getVariantStyles = () => {
			const linkColor = getColorStyles();

			switch (variant) {
				case "plain":
					return {
						color: linkColor,
						backgroundColor: "transparent",
					};
				case "outlined":
					return {
						color: linkColor,
						backgroundColor: "transparent",
						borderWidth: 1,
						borderColor: linkColor,
						paddingHorizontal: theme.spacing.sm,
						paddingVertical: theme.spacing.xs,
						borderRadius: theme.radii.xs,
					};
				case "soft":
					return {
						color: linkColor,
						backgroundColor: theme.colors.surfaceVariant,
						paddingHorizontal: theme.spacing.sm,
						paddingVertical: theme.spacing.xs,
						borderRadius: theme.radii.xs,
					};
				case "solid":
					return {
						color: theme.colors.onPrimary,
						backgroundColor: linkColor,
						paddingHorizontal: theme.spacing.sm,
						paddingVertical: theme.spacing.xs,
						borderRadius: theme.radii.xs,
					};
				default:
					return {
						color: linkColor,
						backgroundColor: "transparent",
					};
			}
		};

		// Get underline styles
		const getUnderlineStyle = () => {
			if (underline === "none") return {};
			if (underline === "always") return { textDecorationLine: "underline" as const };
			if (underline === "hover" && (hovered || pressed))
				return { textDecorationLine: "underline" as const };
			return {};
		};

		const variantStyles = getVariantStyles();
		const underlineStyle = getUnderlineStyle();

		// Container styles
		const containerStyles = [
			styles.container,
			variantStyles,
			{
				opacity: disabled ? 0.4 : 1,
			},
			overlay && styles.overlay,
			style,
		];

		// Text styles
		const textStyles = [
			{
				color: variantStyles.color,
				...underlineStyle,
			},
		];

		// Handle press states
		const handlePressIn = () => {
			if (!disabled) {
				setPressed(true);
			}
		};

		const handlePressOut = () => {
			setPressed(false);
		};

		const handleFocus = () => {
			if (!disabled) {
				setFocused(true);
			}
		};

		const handleBlur = () => {
			setFocused(false);
		};

		// For React Native, we can't truly hover, but we can simulate on focus
		React.useEffect(() => {
			if (focused) {
				setHovered(true);
			} else {
				setHovered(false);
			}
		}, [focused]);

		return (
			<Pressable
				ref={linkRef}
				onPress={handlePress}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				onFocus={handleFocus}
				onBlur={handleBlur}
				disabled={disabled}
				style={containerStyles}
				testID={testID}
				accessible={true}
				accessibilityLabel={ariaLabel}
				accessibilityRole="link"
				accessibilityState={{
					disabled,
				}}
				accessibilityHint={href ? `Opens ${href}` : undefined}
			>
				<Box flexDirection="row" alignItems="center">
					{startDecorator && <Box marginRight="xs">{startDecorator}</Box>}

					{typeof children === "string" ? (
						<Typography level={level} style={textStyles}>
							{children}
						</Typography>
					) : (
						<View style={textStyles}>{children}</View>
					)}

					{endDecorator && <Box marginLeft="xs">{endDecorator}</Box>}
				</Box>
			</Pressable>
		);
	},
);

const styles = StyleSheet.create({
	container: {
		alignSelf: "flex-start",
	},
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 1,
	},
});
