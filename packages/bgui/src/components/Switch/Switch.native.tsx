import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Animated, type GestureResponderEvent, Pressable, StyleSheet, View } from "react-native";
import { theme } from "../../theme";
import { Box } from "../Box";
import type { SwitchProps } from "./SwitchProps";

/**
 * Native implementation of Switch component
 *
 * Switches toggle the state of a single setting on or off.
 * This implementation replicates Joy UI's Switch behavior using React Native APIs.
 */

export const Switch = forwardRef<View, SwitchProps>(
	(
		{
			checked,
			defaultChecked = false,
			disabled = false,
			color = "neutral",
			variant = "solid",
			size = "md",
			startDecorator,
			endDecorator,
			trackChild,
			name,
			value,
			required = false,
			autoFocus = false,
			readOnly = false,
			onChange,
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-describedby": ariaDescribedby,
			"aria-labelledby": ariaLabelledby,
		},
		ref,
	) => {
		const switchRef = useRef<View>(null);
		const [internalChecked, setInternalChecked] = useState(defaultChecked);
		const animatedValue = useRef(new Animated.Value(defaultChecked ? 1 : 0)).current;

		// Determine if controlled or uncontrolled
		const isControlled = checked !== undefined;
		const checkedValue = isControlled ? checked : internalChecked;

		// Merge refs
		useImperativeHandle(ref, () => switchRef.current || null);

		// Get variant styles from theme
		const getVariantStyles = () => {
			const variantKey = `${variant}-${color}` as keyof typeof theme.components.Switch.variants;
			return (
				theme.components.Switch.variants[variantKey] ||
				theme.components.Switch.variants["solid-neutral"]
			);
		};

		// Get size configurations
		const getSizeConfig = () => {
			const sizeConfigs = {
				sm: {
					trackWidth: 32,
					trackHeight: 18,
					thumbSize: 14,
					thumbOffset: 2,
					gap: theme.spacing.xs,
				},
				md: {
					trackWidth: 40,
					trackHeight: 22,
					thumbSize: 18,
					thumbOffset: 2,
					gap: theme.spacing.sm,
				},
				lg: {
					trackWidth: 48,
					trackHeight: 26,
					thumbSize: 22,
					thumbOffset: 2,
					gap: theme.spacing.md,
				},
			};
			return sizeConfigs[size];
		};

		// Handle press events
		const handlePress = (_event: GestureResponderEvent) => {
			if (disabled || readOnly) return;

			const newChecked = !checkedValue;

			if (!isControlled) {
				setInternalChecked(newChecked);
			}

			// Animate the switch
			Animated.timing(animatedValue, {
				toValue: newChecked ? 1 : 0,
				duration: 200,
				useNativeDriver: false,
			}).start();

			// Create a mock event object
			const mockEvent = {
				target: {
					checked: newChecked,
					value: value || "",
					name: name || "",
				},
				currentTarget: {
					checked: newChecked,
					value: value || "",
					name: name || "",
				},
				preventDefault: () => {},
				stopPropagation: () => {},
			};

			onChange?.(mockEvent);
		};

		// Initialize animation value when checked prop changes
		React.useEffect(() => {
			Animated.timing(animatedValue, {
				toValue: checkedValue ? 1 : 0,
				duration: 200,
				useNativeDriver: false,
			}).start();
		}, [checkedValue, animatedValue]);

		const variantStyles = getVariantStyles();
		const sizeConfig = getSizeConfig();

		// Calculate thumb position
		const thumbTranslateX = animatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: [
				sizeConfig.thumbOffset,
				sizeConfig.trackWidth - sizeConfig.thumbSize - sizeConfig.thumbOffset,
			],
		});

		// Calculate track colors
		const trackBackgroundColor = animatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: [theme.colors.outline, variantStyles.backgroundColor || theme.colors.primary],
		});

		// Container styles
		const containerStyles = [
			styles.container,
			{
				gap: sizeConfig.gap,
				opacity: disabled ? 0.6 : 1,
			},
			style,
		];

		// Track styles
		const trackStyles = [
			styles.track,
			{
				width: sizeConfig.trackWidth,
				height: sizeConfig.trackHeight,
				borderRadius: sizeConfig.trackHeight / 2,
				backgroundColor: trackBackgroundColor,
			},
		];

		// Thumb styles
		const thumbStyles = [
			styles.thumb,
			{
				width: sizeConfig.thumbSize,
				height: sizeConfig.thumbSize,
				borderRadius: sizeConfig.thumbSize / 2,
				backgroundColor: variantStyles.color || theme.colors.onPrimary,
				transform: [{ translateX: thumbTranslateX }],
			},
		];

		return (
			<Pressable
				ref={switchRef}
				onPress={handlePress}
				disabled={disabled}
				testID={testID}
				accessibilityRole="switch"
				accessibilityLabel={ariaLabel}
				accessibilityHint={ariaDescribedby}
				accessibilityLabelledBy={ariaLabelledby}
				accessibilityState={{
					disabled: disabled,
					checked: checkedValue,
					busy: false,
				}}
				accessibilityRequired={required}
				style={({ pressed }) => [containerStyles, pressed && !disabled && { opacity: 0.7 }]}
			>
				<Box flexDirection="row" alignItems="center" gap={sizeConfig.gap}>
					{startDecorator}

					<View style={styles.switchContainer}>
						<Animated.View style={trackStyles}>
							{trackChild && <View style={styles.trackChild}>{trackChild}</View>}
						</Animated.View>
						<Animated.View style={thumbStyles} />
					</View>

					{endDecorator}
				</Box>
			</Pressable>
		);
	},
);

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	switchContainer: {
		position: "relative",
		justifyContent: "center",
	},
	track: {
		position: "relative",
		justifyContent: "center",
	},
	trackChild: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: "center",
		justifyContent: "center",
	},
	thumb: {
		position: "absolute",
		top: 0,
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
		elevation: 2,
	},
});
