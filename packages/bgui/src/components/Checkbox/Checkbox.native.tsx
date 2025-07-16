import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { type GestureResponderEvent, Pressable, StyleSheet, View } from "react-native";
import { theme } from "../../theme";
import { Box } from "../Box";
import { Text } from "../Text";
import type { CheckboxProps } from "./CheckboxProps";

/**
 * Native implementation of Checkbox component
 *
 * Checkboxes allow users to select one or more items from a set.
 * This implementation replicates Joy UI's Checkbox behavior using React Native APIs.
 */

// Simple check mark icon component
const CheckIcon = ({ size = 16, color = "#fff" }) => (
	<View style={[styles.checkIcon, { width: size, height: size }]}>
		<View style={[styles.checkMark, { borderRightColor: color, borderBottomColor: color }]} />
	</View>
);

// Indeterminate icon component
const IndeterminateIcon = ({ size = 16, color = "#fff" }) => (
	<View style={[styles.indeterminateIcon, { width: size, height: size }]}>
		<View style={[styles.indeterminateMark, { backgroundColor: color }]} />
	</View>
);

export const Checkbox = forwardRef<View, CheckboxProps>(
	(
		{
			checked,
			defaultChecked = false,
			disabled = false,
			indeterminate = false,
			color = "neutral",
			variant = "solid",
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
			indeterminateIcon,
			onChange,
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-describedby": ariaDescribedby,
			"aria-labelledby": ariaLabelledby,
		},
		ref,
	) => {
		const checkboxRef = useRef<View>(null);
		const [internalChecked, setInternalChecked] = useState(defaultChecked);

		// Determine if controlled or uncontrolled
		const isControlled = checked !== undefined;
		const checkedValue = isControlled ? checked : internalChecked;

		// Merge refs
		useImperativeHandle(ref, () => checkboxRef.current!);

		// Get variant styles from theme
		const getVariantStyles = () => {
			const variantKey = `${variant}-${color}` as keyof typeof theme.components.Checkbox.variants;
			return theme.components.Checkbox.variants[variantKey] || theme.components.Checkbox.variants["solid-neutral"];
		};

		// Get size configurations
		const getSizeConfig = () => {
			const sizeConfigs = {
				sm: {
					checkboxSize: 16,
					iconSize: 12,
					fontSize: theme.fontSizes.sm,
					gap: theme.spacing.xs,
				},
				md: {
					checkboxSize: 20,
					iconSize: 14,
					fontSize: theme.fontSizes.md,
					gap: theme.spacing.sm,
				},
				lg: {
					checkboxSize: 24,
					iconSize: 16,
					fontSize: theme.fontSizes.lg,
					gap: theme.spacing.md,
				},
			};
			return sizeConfigs[size];
		};

		// Handle press events
		const handlePress = (event: GestureResponderEvent) => {
			if (disabled || readOnly) return;

			const newChecked = !checkedValue;
			
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

		// Determine the effective checked state (indeterminate takes precedence)
		const effectiveChecked = indeterminate ? false : checkedValue;
		const showIndeterminate = indeterminate;

		// Build checkbox styles
		const checkboxStyles = [
			styles.checkbox,
			{
				width: sizeConfig.checkboxSize,
				height: sizeConfig.checkboxSize,
				backgroundColor: effectiveChecked || showIndeterminate ? variantStyles.backgroundColor : theme.colors.surface,
				borderColor: effectiveChecked || showIndeterminate ? variantStyles.backgroundColor : theme.colors.outline,
				borderWidth: 1,
				borderRadius: theme.radii.xs,
				opacity: disabled ? 0.6 : 1,
			},
		];

		// Render the appropriate icon
		const renderIcon = () => {
			if (disableIcon) return null;

			if (showIndeterminate) {
				if (indeterminateIcon) return indeterminateIcon;
				return (
					<IndeterminateIcon 
						size={sizeConfig.iconSize} 
						color={variantStyles.color || "#fff"} 
					/>
				);
			}

			if (effectiveChecked) {
				if (checkedIcon) return checkedIcon;
				return (
					<CheckIcon 
						size={sizeConfig.iconSize} 
						color={variantStyles.color || "#fff"} 
					/>
				);
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
				ref={checkboxRef}
				onPress={handlePress}
				disabled={disabled}
				testID={testID}
				accessibilityRole="checkbox"
				accessibilityLabel={ariaLabel || (typeof label === 'string' ? label : undefined)}
				accessibilityHint={ariaDescribedby}
				accessibilityLabelledBy={ariaLabelledby}
				accessibilityState={{
					disabled: disabled,
					checked: effectiveChecked,
					busy: false,
				}}
				accessibilityRequired={required}
				style={({ pressed }) => [
					containerStyles,
					pressed && !disabled && { opacity: 0.7 },
				]}
			>
				<View style={checkboxStyles}>
					{renderIcon()}
				</View>

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
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 1,
	},
	checkbox: {
		alignItems: 'center',
		justifyContent: 'center',
		flexShrink: 0,
	},
	checkIcon: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	checkMark: {
		width: 3,
		height: 8,
		borderRightWidth: 2,
		borderBottomWidth: 2,
		borderRightColor: '#fff',
		borderBottomColor: '#fff',
		transform: [{ rotate: '45deg' }],
	},
	indeterminateIcon: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	indeterminateMark: {
		width: 10,
		height: 2,
		backgroundColor: '#fff',
	},
});