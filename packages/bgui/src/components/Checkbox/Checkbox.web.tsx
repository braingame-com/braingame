"use client";
import React from "react";
import { theme as restyleTheme } from "../../theme";
import type { CheckboxProps } from "./CheckboxProps";

/**
 * Web implementation of Checkbox component
 *
 * Checkboxes allow users to select one or more items from a set.
 * Based on Joy UI's Checkbox implementation.
 */

interface CheckboxState {
	checked: boolean;
	focusVisible: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	(
		{
			checked: checkedProp,
			defaultChecked = false,
			disabled = false,
			disableIcon = false,
			indeterminate = false,
			label,
			name,
			value,
			size = "md",
			color = "neutral",
			variant = "outlined",
			onChange,
			onFocus,
			onBlur,
			checkedIcon,
			uncheckedIcon,
			indeterminateIcon,
			overlay = false,
			required = false,
			readOnly = false,
			className,
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-describedby": ariaDescribedBy,
		},
		ref,
	) => {
		const [state, setState] = React.useState<CheckboxState>({
			checked: defaultChecked,
			focusVisible: false,
		});

		const isControlled = checkedProp !== undefined;
		const checked = isControlled ? checkedProp : state.checked;
		const isCheckboxActive = checked || indeterminate;

		// Use appropriate variant and color based on state
		const activeVariant = variant === "outlined" ? "solid" : variant;
		const inactiveVariant = variant || "outlined";
		const currentVariant = isCheckboxActive ? activeVariant : inactiveVariant;

		const activeColor = color === "neutral" ? "primary" : color;
		const inactiveColor = color || "neutral";
		const currentColor = isCheckboxActive ? activeColor : inactiveColor;

		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			if (disabled || readOnly) return;

			const newChecked = event.target.checked;
			if (!isControlled) {
				setState((prev) => ({ ...prev, checked: newChecked }));
			}
			onChange?.(event);
		};

		const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
			onFocus?.(event);
			// Check for keyboard focus
			if (event.target.matches(":focus-visible")) {
				setState((prev) => ({ ...prev, focusVisible: true }));
			}
		};

		const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
			onBlur?.(event);
			setState((prev) => ({ ...prev, focusVisible: false }));
		};

		// Size configurations
		const sizeConfig = {
			sm: { checkboxSize: "1rem", fontSize: "14px", gap: "0.5rem" },
			md: { checkboxSize: "1.25rem", fontSize: "16px", gap: "0.625rem" },
			lg: { checkboxSize: "1.5rem", fontSize: "18px", gap: "0.75rem" },
		}[size];

		// Get theme variant styles
		const variantKey = `${currentVariant}-${currentColor}`;
		const variantStyles = restyleTheme.components.Checkbox?.variants?.[variantKey] || {};

		// Container styles
		const containerStyles: React.CSSProperties = {
			position: overlay ? "initial" : "relative",
			display: "inline-flex",
			alignItems: "center",
			gap: sizeConfig.gap,
			fontSize: sizeConfig.fontSize,
			lineHeight: sizeConfig.checkboxSize,
			fontFamily: restyleTheme.textVariants.body1.fontFamily,
			color: disabled ? restyleTheme.colors.onSurfaceVariant : restyleTheme.colors.onSurface,
			cursor: disabled ? "not-allowed" : "pointer",
			...((style as React.CSSProperties) || {}),
		};

		// Checkbox wrapper styles
		const checkboxStyles: React.CSSProperties = {
			position: "relative",
			boxSizing: "border-box",
			width: sizeConfig.checkboxSize,
			height: sizeConfig.checkboxSize,
			display: "inline-flex",
			justifyContent: "center",
			alignItems: "center",
			flexShrink: 0,
			borderRadius: "4px",
			backgroundColor: variantStyles.backgroundColor || restyleTheme.colors.surface,
			color: variantStyles.color || restyleTheme.colors.onSurface,
			border: variantStyles.borderColor ? `2px solid ${variantStyles.borderColor}` : undefined,
			transition: "all 0.2s",
			...(state.focusVisible && {
				outline: `2px solid ${restyleTheme.colors.primary}`,
				outlineOffset: "2px",
			}),
		};

		// Input styles
		const inputStyles: React.CSSProperties = {
			position: "absolute",
			opacity: 0,
			width: "100%",
			height: "100%",
			margin: 0,
			cursor: disabled ? "not-allowed" : "pointer",
		};

		// Icon selection
		let icon = uncheckedIcon || null;
		if (indeterminate) {
			icon = indeterminateIcon || <IndeterminateIcon />;
		} else if (checked) {
			icon = checkedIcon || <CheckIcon />;
		}

		return (
			<label
				className={className}
				style={containerStyles}
				data-testid={testID}
				aria-label={ariaLabel}
			>
				<span style={checkboxStyles}>
					<input
						ref={ref}
						type="checkbox"
						name={name}
						value={value}
						checked={checked}
						disabled={disabled}
						required={required}
						readOnly={readOnly}
						onChange={handleChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
						style={inputStyles}
						aria-checked={indeterminate ? "mixed" : checked}
						aria-describedby={ariaDescribedBy}
					/>
					{!disableIcon && icon && (
						<span
							style={{
								display: "flex",
								alignItems: "center",
								color: "currentColor",
								pointerEvents: "none",
							}}
						>
							{icon}
						</span>
					)}
				</span>
				{label && (
					<span
						style={{
							flex: 1,
							minWidth: 0,
							userSelect: "none",
							pointerEvents: disabled ? "none" : undefined,
						}}
					>
						{label}
					</span>
				)}
			</label>
		);
	},
);

// Default icons
const CheckIcon = () => (
	<svg
		width="1em"
		height="1em"
		viewBox="0 0 24 24"
		fill="currentColor"
		role="img"
		aria-label="Checked"
	>
		<title>Checked</title>
		<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
	</svg>
);

const IndeterminateIcon = () => (
	<svg
		width="1em"
		height="1em"
		viewBox="0 0 24 24"
		fill="currentColor"
		role="img"
		aria-label="Indeterminate"
	>
		<title>Indeterminate</title>
		<path d="M19 13H5v-2h14v2z" />
	</svg>
);

Checkbox.displayName = "Checkbox";
