import React, { Children, forwardRef, useImperativeHandle, useRef, useState } from "react";
import { View } from "react-native";
import { theme } from "../../theme";
import { Box } from "../Box";
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
		useImperativeHandle(ref, () => radioGroupRef.current!);

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
			if (React.isValidElement(child) && child.type && (child.type as any).displayName === 'Radio') {
				return React.cloneElement(child, {
					...child.props,
					name: radioGroupName,
					checked: child.props.value === currentValue,
					onChange: handleRadioChange,
					disabled: disabled || child.props.disabled,
					color: child.props.color || color,
					variant: child.props.variant || variant,
					size: child.props.size || size,
					required: required || child.props.required,
					readOnly: readOnly || child.props.readOnly,
					disableIcon: disableIcon || child.props.disableIcon,
					overlay: overlay || child.props.overlay,
				});
			}
			return child;
		});

		// Container styles
		const containerStyles = [
			{
				flexDirection: orientation === "horizontal" ? "row" : "column",
				gap: theme.spacing.sm,
				opacity: disabled ? 0.6 : 1,
			},
			style,
		];

		return (
			<Box
				ref={radioGroupRef}
				style={containerStyles}
				testID={testID}
				accessibilityRole="radiogroup"
				accessibilityLabel={ariaLabel}
				accessibilityState={{
					disabled: disabled,
				}}
				accessibilityRequired={required}
			>
				{clonedChildren}
			</Box>
		);
	},
);

// Set display name for component identification
RadioGroup.displayName = 'RadioGroup';