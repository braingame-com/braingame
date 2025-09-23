// @ts-nocheck
import React, { Children, forwardRef, useImperativeHandle, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../../theme";
import { Box } from "../Box";
import type { RadioProps } from "../Radio/RadioProps";
import type { RadioGroupProps } from "./RadioGroupProps";

/**
 * Native implementation of RadioGroup component
 *
 * RadioGroup is a wrapper used to group multiple Radio components.
 * It manages the selection state and ensures only one radio can be selected at a time.
 */

export const RadioGroup = forwardRef<View, RadioGroupProps>(
	(
		{
			children,
			value,
			defaultValue,
			name,
			disabled = false,
			color = "neutral",
			variant = "plain",
			size = "md",
			orientation = "vertical",
			required = false,
			readOnly = false,
			disableIcon = false,
			overlay = false,
			onChange,
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-describedby": ariaDescribedby,
			"aria-labelledby": ariaLabelledby,
		},
		ref,
	) => {
		const radioGroupRef = useRef<View>(null);
		const [internalValue, setInternalValue] = useState(defaultValue);

		// Determine if controlled or uncontrolled
		const isControlled = value !== undefined;
		const currentValue = isControlled ? value : internalValue;

		// Generate a unique name for the radio group if not provided
		const radioGroupName = name || `radio-group-${Math.random().toString(36).substr(2, 9)}`;

		// Merge refs
		useImperativeHandle(ref, () => radioGroupRef.current || ({} as any));

		// Handle radio selection
		const handleRadioChange = (event: any) => {
			const newValue = event.target.value;

			if (!isControlled) {
				setInternalValue(newValue);
			}

			// Create a mock event for the RadioGroup
			const mockEvent = {
				target: {
					value: newValue,
					name: radioGroupName,
				},
				currentTarget: {
					value: newValue,
					name: radioGroupName,
				},
				preventDefault: () => {},
				stopPropagation: () => {},
			};

			onChange?.(mockEvent);
		};

		// Clone radio children with shared props
		const clonedChildren = Children.map(children, (child) => {
			if (
				React.isValidElement<RadioProps>(child) &&
				child.type &&
				(child.type as any).displayName === "Radio"
			) {
				const childProps = child.props as RadioProps;
				return React.cloneElement(child, {
					...childProps,
					name: radioGroupName,
					checked: childProps.value === currentValue,
					onChange: handleRadioChange,
					disabled: disabled || childProps.disabled,
					color: childProps.color || color,
					variant: childProps.variant || variant,
					size: childProps.size || size,
					required: required || childProps.required,
					readOnly: readOnly || childProps.readOnly,
					disableIcon: disableIcon || childProps.disableIcon,
					overlay: overlay || childProps.overlay,
				});
			}
			return child;
		});

		// Container styles - React Native compatible only
		const baseContainerStyle = {
			flexDirection: orientation === "horizontal" ? ("row" as const) : ("column" as const),
			gap: theme.spacing.sm,
			opacity: disabled ? 0.6 : 1,
		};

		const containerStyles = [baseContainerStyle];

		return (
			<View
				ref={radioGroupRef}
				style={StyleSheet.flatten(containerStyles)}
				testID={testID}
				accessibilityRole="radiogroup"
				accessibilityLabel={ariaLabel}
				accessibilityState={{
					disabled: disabled,
				}}
			>
				{clonedChildren}
			</View>
		);
	},
);

// Set display name for component identification
RadioGroup.displayName = "RadioGroup";
