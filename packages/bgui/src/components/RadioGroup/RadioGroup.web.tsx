"use client";
import React from "react";
import { theme as restyleTheme } from "../../theme";
import type { RadioGroupProps } from "./RadioGroupProps";

/**
 * Web implementation of RadioGroup component
 *
 * RadioGroup manages selection state for a group of radio buttons.
 * Based on Joy UI's RadioGroup implementation.
 */

// Context for radio group state
export const RadioGroupContext = React.createContext<{
	value: string | number | null;
	onChange: (value: string | number | null) => void;
	name: string;
	size: "sm" | "md" | "lg";
	color: string;
	variant: string;
	disabled?: boolean;
	disableIcon?: boolean;
	overlay?: boolean;
} | null>(null);

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
	(
		{
			children,
			name: nameProp,
			value: valueProp,
			defaultValue,
			onChange,
			orientation = "vertical",
			size = "md",
			color = "neutral",
			variant = "plain",
			disabled = false,
			disableIcon = false,
			overlay = false,
			className,
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-labelledby": ariaLabelledby,
			...props
		},
		ref,
	) => {
		const [internalValue, setInternalValue] = React.useState<string | number | null>(
			valueProp ?? defaultValue ?? null,
		);

		const isControlled = valueProp !== undefined;
		const value = isControlled ? valueProp : internalValue;

		// Generate unique name if not provided
		const name = nameProp || `radio-group-${React.useId()}`;

		const handleChange = (newValue: string | number | null) => {
			if (disabled) return;

			if (!isControlled) {
				setInternalValue(newValue);
			}
			onChange?.(newValue);
		};

		// Get variant styles
		const variantKey = `${variant}-${color}`;
		const variantStyles = restyleTheme.components.RadioGroup?.variants?.[variantKey] || {};

		// Size configurations
		const sizeConfig = {
			sm: { gap: "10px" },
			md: { gap: "14px" },
			lg: { gap: "20px" },
		}[size];

		// Build styles
		const radioGroupStyles: React.CSSProperties = {
			// Base styles
			display: "flex",
			flexDirection: orientation === "horizontal" ? "row" : "column",
			gap: sizeConfig.gap,
			borderRadius: restyleTheme.radii.sm,

			// Variant styles
			backgroundColor: variantStyles.backgroundColor || "transparent",
			color: variantStyles.color || restyleTheme.colors.onSurface,
			border: variantStyles.borderColor ? `1px solid ${variantStyles.borderColor}` : undefined,
			padding: variantStyles.padding || undefined,

			// Disabled state
			opacity: disabled ? 0.6 : 1,
			pointerEvents: disabled ? "none" : undefined,

			// Custom styles
			...style,
		};

		const contextValue = {
			value,
			onChange: handleChange,
			name,
			size,
			color,
			variant,
			disabled,
			disableIcon,
			overlay,
		};

		return (
			<RadioGroupContext.Provider value={contextValue}>
				<div
					ref={ref}
					className={className}
					style={radioGroupStyles}
					role="radiogroup"
					aria-label={ariaLabel}
					aria-labelledby={ariaLabelledby}
					aria-disabled={disabled}
					data-testid={testID}
					{...props}
				>
					{children}
				</div>
			</RadioGroupContext.Provider>
		);
	},
);

RadioGroup.displayName = "RadioGroup";
