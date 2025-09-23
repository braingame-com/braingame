// @ts-nocheck
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
	ActivityIndicator,
	Pressable,
	type StyleProp,
	StyleSheet,
	type View,
	type ViewStyle,
} from "react-native";
import { theme } from "../../../theme";
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
			// onKeyDown, - unused on native
			// onKeyUp, - unused on native
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-describedby": ariaDescribedby,
			"aria-pressed": ariaPressed,
			"aria-expanded": ariaExpanded,
			"aria-checked": ariaChecked,
		},
		ref,
	) => {
		const buttonRef = useRef<View>(null);
		const [pressed, setPressed] = useState(false);
		const [focused, setFocused] = useState(false);

		// Merge refs
		useImperativeHandle(ref, () => buttonRef.current || ({} as View));

		// Get variant styles from theme
		const getVariantStyles = () => {
			const variantKey = `${variant}-${color}` as keyof typeof theme.components.Button.variants;
			return (
				(theme.components.Button.variants as Record<string, ViewStyle>)[variantKey] ||
				(theme.components.Button.variants as Record<string, ViewStyle>)["plain-neutral"]
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

		const handlePress = (event: import("react-native").GestureResponderEvent) => {
			if (!disabled && !loading && onClick) {
				onClick(event);
			}
		};

		const handleFocus = (
			event: import("react-native").NativeSyntheticEvent<import("react-native").TargetedEvent>,
		) => {
			setFocused(true);
			// Convert to GestureResponderEvent format for consistency with prop expectations
			const gestureEvent = {
				...event,
				nativeEvent: {
					...event.nativeEvent,
					changedTouches: [],
					identifier: 0,
					locationX: 0,
					locationY: 0,
					pageX: 0,
					pageY: 0,
					touches: [],
					force: 0,
				},
			} as unknown as import("react-native").GestureResponderEvent;
			onFocus?.(gestureEvent);
		};

		const handleBlur = (
			event: import("react-native").NativeSyntheticEvent<import("react-native").TargetedEvent>,
		) => {
			setFocused(false);
			// Convert to GestureResponderEvent format for consistency with prop expectations
			const gestureEvent = {
				...event,
				nativeEvent: {
					...event.nativeEvent,
					changedTouches: [],
					identifier: 0,
					locationX: 0,
					locationY: 0,
					pageX: 0,
					pageY: 0,
					touches: [],
					force: 0,
				},
			} as unknown as import("react-native").GestureResponderEvent;
			onBlur?.(gestureEvent);
		};

		const variantStyles = getVariantStyles();
		const sizeConfig = getSizeConfig();
		const isDisabled = disabled || loading;

		// Container styles - filter out web-only CSS properties for React Native
		const nativeStyle =
			style && typeof style === "object" && !Array.isArray(style)
				? (Object.fromEntries(
						Object.entries(style as Record<string, unknown>).filter(
							([key]) =>
								// Keep only React Native compatible style properties
								(!key.includes("-") && !["gap", "gridGap"].includes(key)) ||
								// Allow gap since React Native supports it in newer versions
								key === "gap",
						),
					) as StyleProp<ViewStyle>)
				: (style as StyleProp<ViewStyle>);

		const containerStyles: StyleProp<ViewStyle> = [
			styles.container,
			{
				backgroundColor:
					((variantStyles as Record<string, unknown>)?.backgroundColor as string) || "transparent",
				borderColor:
					((variantStyles as Record<string, unknown>)?.borderColor as string) || "transparent",
				borderWidth: ((variantStyles as Record<string, unknown>)?.borderWidth as number) || 0,
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
			nativeStyle,
		];

		// Loading indicator
		const renderLoadingIndicator = () => {
			if (!loading) return null;

			const indicator = loadingIndicator || (
				<ActivityIndicator
					size="small"
					color={
						((variantStyles as Record<string, unknown>)?.color as string) || theme.colors.onSurface
					}
				/>
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
						? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
								size: sizeConfig.iconSize,
								color:
									((variantStyles as Record<string, unknown>)?.color as string) ||
									theme.colors.onSurface,
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
