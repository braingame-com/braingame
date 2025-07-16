import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { type GestureResponderEvent, Pressable, StyleSheet, View } from "react-native";
import { theme } from "../../theme";
import { Box } from "../Box";
import { Text } from "../Text";
import type { RadioProps } from "./RadioProps";

/**
 * Native implementation of Radio component
 *
 * Radio buttons allow users to select a single option from a set.
 * This implementation replicates Joy UI's Radio behavior using React Native APIs.
 */

// Simple radio dot component
const RadioDot = ({ size = 8, color = "#fff" }) => (
	<View
		style={[
			styles.radioDot,
			{ width: size, height: size, backgroundColor: color, borderRadius: size / 2 },
		]}
	/>
);

export const Radio = forwardRef<View, RadioProps>(
	(
		{
			checked,
			defaultChecked = false,
			disabled = false,
			color = "neutral",
			variant = "outlined",
			size = "md",
			label,
			name,
			value,
			disableIcon = false,
			overlay = false,
			required = false,
			autoFocus = false,
			readOnly = false,
			checkedIcon,
			uncheckedIcon,
			onChange,
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-describedby": ariaDescribedby,
			"aria-labelledby": ariaLabelledby,
		},
		ref,
	) => {
		const radioRef = useRef<View>(null);
		const [internalChecked, setInternalChecked] = useState(defaultChecked);

		// Determine if controlled or uncontrolled
		const isControlled = checked !== undefined;
		const checkedValue = isControlled ? checked : internalChecked;

		// Merge refs
		useImperativeHandle(ref, () => radioRef.current!);

		// Get variant styles from theme
		const getVariantStyles = () => {
			const variantKey = `${variant}-${color}` as keyof typeof theme.components.Radio.variants;
			return (
				theme.components.Radio.variants[variantKey] ||
				theme.components.Radio.variants["outlined-neutral"]
			);
		};

		// Get size configurations
		const getSizeConfig = () => {
			const sizeConfigs = {
				sm: {
					radioSize: 16,
					dotSize: 6,
					fontSize: theme.fontSizes.sm,
					gap: theme.spacing.xs,
				},
				md: {
					radioSize: 20,
					dotSize: 8,
					fontSize: theme.fontSizes.md,
					gap: theme.spacing.sm,
				},
				lg: {
					radioSize: 24,
					dotSize: 10,
					fontSize: theme.fontSizes.lg,
					gap: theme.spacing.md,
				},
			};
			return sizeConfigs[size];
		};

		// Handle press events
		const handlePress = (event: GestureResponderEvent) => {
			if (disabled || readOnly) return;

			// Radio buttons should not be unchecked when clicked if already checked
			if (checkedValue) return;

			const newChecked = true;

			if (!isControlled) {
				setInternalChecked(newChecked);
			}

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

		const variantStyles = getVariantStyles();
		const sizeConfig = getSizeConfig();

		// Build radio styles
		const radioStyles = [
			styles.radio,
			{
				width: sizeConfig.radioSize,
				height: sizeConfig.radioSize,
				borderRadius: sizeConfig.radioSize / 2,
				backgroundColor: checkedValue ? variantStyles.backgroundColor : theme.colors.surface,
				borderColor: checkedValue ? variantStyles.backgroundColor : theme.colors.outline,
				borderWidth: 1,
				opacity: disabled ? 0.6 : 1,
			},
		];

		// Render the appropriate icon
		const renderIcon = () => {
			if (disableIcon) return null;

			if (checkedValue) {
				if (checkedIcon) return checkedIcon;
				return <RadioDot size={sizeConfig.dotSize} color={variantStyles.color || "#fff"} />;
			}

			return uncheckedIcon || null;
		};

		// Container styles
		const containerStyles = [
			styles.container,
			{
				gap: sizeConfig.gap,
				opacity: disabled ? 0.6 : 1,
			},
			overlay && styles.overlay,
			style,
		];

		return (
			<Pressable
				ref={radioRef}
				onPress={handlePress}
				disabled={disabled}
				testID={testID}
				accessibilityRole="radio"
				accessibilityLabel={ariaLabel || (typeof label === "string" ? label : undefined)}
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
				<View style={radioStyles}>{renderIcon()}</View>

				{label && (
					<Text
						variant="body1"
						style={{
							fontSize: sizeConfig.fontSize,
							color: disabled ? theme.colors.onSurfaceVariant : theme.colors.onSurface,
						}}
					>
						{label}
					</Text>
				)}
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
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 1,
	},
	radio: {
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
	},
	radioDot: {
		// Dot styling handled inline
	},
});

// Set display name for component identification
Radio.displayName = "Radio";
