import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, type View } from "react-native";
import { theme } from "../../theme";
import { Box } from "../Box";
import type { IconButtonProps } from "./IconButtonProps";

/**
 * Native implementation of IconButton component
 *
 * IconButtons allow users to take actions and make choices with a single tap.
 * This implementation replicates Joy UI's useButton behavior for icon-only buttons.
 */

export const IconButton = forwardRef<View, IconButtonProps>(
	(
		{
			children,
			color = "neutral",
			variant = "plain",
			size = "md",
			disabled = false,
			loading = false,
			loadingPosition = "center",
			loadingIndicator,
			fullWidth = false,
			onClick,
			onBlur,
			onFocus,
			onKeyDown: _onKeyDown,
			onKeyUp: _onKeyUp,
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-describedby": ariaDescribedby,
			"aria-labelledby": _ariaLabelledby,
			"aria-pressed": ariaPressed,
			"aria-expanded": ariaExpanded,
			"aria-controls": _ariaControls,
			"aria-checked": ariaChecked,
		},
		ref,
	) => {
		const buttonRef = useRef<View>(null);
		const [pressed, setPressed] = useState(false);
		const [focused, setFocused] = useState(false);

		// Merge refs
		useImperativeHandle(ref, () => buttonRef.current || null);

		// Get variant styles from theme
		const getVariantStyles = () => {
			const variantKey = `${variant}-${color}` as keyof typeof theme.components.Button.variants;
			return (
				theme.components.Button.variants[variantKey] ||
				theme.components.Button.variants["plain-neutral"]
			);
		};

		// Get size configurations
		const getSizeConfig = () => {
			const sizeConfigs = {
				sm: {
					size: 32,
					iconSize: 16,
					borderRadius: theme.radii.sm,
				},
				md: {
					size: 40,
					iconSize: 20,
					borderRadius: theme.radii.md,
				},
				lg: {
					size: 48,
					iconSize: 24,
					borderRadius: theme.radii.lg,
				},
			};
			return sizeConfigs[size];
		};

		// Handle press events
		const handlePressIn = () => {
			if (!disabled && !loading) {
				setPressed(true);
			}
		};

		const handlePressOut = () => {
			setPressed(false);
		};

		const handlePress = (event: any) => {
			if (!disabled && !loading && onClick) {
				onClick(event);
			}
		};

		const handleFocus = (event: any) => {
			setFocused(true);
			onFocus?.(event);
		};

		const handleBlur = (event: any) => {
			setFocused(false);
			onBlur?.(event);
		};

		const variantStyles = getVariantStyles();
		const sizeConfig = getSizeConfig();
		const isDisabled = disabled || loading;

		// Container styles
		const containerStyles = [
			styles.container,
			{
				backgroundColor: variantStyles.backgroundColor,
				borderColor: variantStyles.borderColor,
				borderWidth: variantStyles.borderWidth || 0,
				width: fullWidth ? "100%" : sizeConfig.size,
				height: sizeConfig.size,
				borderRadius: sizeConfig.borderRadius,
				opacity: isDisabled ? 0.4 : 1,
			},
			pressed &&
				!isDisabled && {
					transform: [{ scale: 0.95 }],
				},
			focused &&
				!isDisabled && {
					borderColor: theme.colors.primary,
					borderWidth: 2,
				},
			style,
		];

		// Loading indicator
		const renderLoadingIndicator = () => {
			if (!loading) return null;

			const indicator = loadingIndicator || (
				<ActivityIndicator size="small" color={variantStyles.color || theme.colors.onSurface} />
			);

			return indicator;
		};

		// Content rendering based on loading state
		const renderContent = () => {
			if (loading && loadingPosition === "center") {
				return renderLoadingIndicator();
			}

			return (
				<Box
					flexDirection="row"
					alignItems="center"
					justifyContent="center"
					style={styles.contentContainer}
				>
					{loading && loadingPosition === "start" && (
						<Box marginRight="xs">{renderLoadingIndicator()}</Box>
					)}

					{React.isValidElement(children)
						? React.cloneElement(children as React.ReactElement<any>, {
								size: sizeConfig.iconSize,
								color: variantStyles.color || theme.colors.onSurface,
							})
						: children}

					{loading && loadingPosition === "end" && (
						<Box marginLeft="xs">{renderLoadingIndicator()}</Box>
					)}
				</Box>
			);
		};

		return (
			<Pressable
				ref={buttonRef}
				onPress={handlePress}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				onFocus={handleFocus}
				onBlur={handleBlur}
				disabled={isDisabled}
				style={containerStyles}
				testID={testID}
				accessible={true}
				accessibilityLabel={ariaLabel}
				accessibilityRole="button"
				accessibilityState={{
					disabled: isDisabled,
					selected: ariaPressed,
					expanded: ariaExpanded,
					checked: ariaChecked,
				}}
				accessibilityHint={ariaDescribedby}
			>
				{renderContent()}
			</Pressable>
		);
	},
);

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
	},
	contentContainer: {
		width: "100%",
		height: "100%",
	},
});
