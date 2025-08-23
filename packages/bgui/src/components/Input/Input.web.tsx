"use client";
import React from "react";
import { theme as restyleTheme } from "../../theme";
import type { InputProps } from "./InputProps";

/**
 * Web implementation of Input component
 *
 * Text input fields allow users to enter and edit text.
 * Based on Joy UI's Input implementation.
 */

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			size = "md",
			variant = "outlined",
			color = "neutral",
			fullWidth = false,
			disabled = false,
			error = false,
			startDecorator,
			endDecorator,
			type = "text",
			placeholder,
			value,
			defaultValue,
			onChange,
			onFocus,
			onBlur,
			className,
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-describedby": ariaDescribedby,
			...props
		},
		ref,
	) => {
		const [focused, setFocused] = React.useState(false);

		const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
			setFocused(true);
			onFocus?.(event);
		};

		const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
			setFocused(false);
			onBlur?.(event);
		};

		// Use error color if error prop is true
		const effectiveColor = error ? "danger" : color;

		// Get variant styles
		const variantKey = `${variant}-${effectiveColor}`;
		const variantStyles = restyleTheme.components.Input?.variants?.[variantKey] || {};

		// Size configurations
		const sizeConfig = {
			sm: {
				minHeight: "32px",
				paddingInline: "8px",
				fontSize: "14px",
				gap: "6px",
			},
			md: {
				minHeight: "36px",
				paddingInline: "12px",
				fontSize: "16px",
				gap: "8px",
			},
			lg: {
				minHeight: "44px",
				paddingInline: "16px",
				fontSize: "18px",
				gap: "12px",
			},
		}[size];

		// Container styles
		const containerStyles: React.CSSProperties = {
			display: "inline-flex",
			alignItems: "center",
			position: "relative",
			minHeight: sizeConfig.minHeight,
			width: fullWidth ? "100%" : undefined,
			paddingInline: sizeConfig.paddingInline,
			gap: sizeConfig.gap,
			borderRadius: restyleTheme.radii.sm,
			backgroundColor: variantStyles.backgroundColor || restyleTheme.colors.surface,
			border: variantStyles.borderColor ? `1px solid ${variantStyles.borderColor}` : "none",
			boxShadow: variant !== "plain" ? restyleTheme.shadows.xs : undefined,
			cursor: disabled ? "not-allowed" : "text",
			opacity: disabled ? 0.6 : 1,
			transition: "all 0.2s",
			...((style as React.CSSProperties) || {}),
			...(focused && {
				outline: `2px solid ${restyleTheme.colors[effectiveColor === "neutral" ? "primary" : effectiveColor]}`,
				outlineOffset: "2px",
			}),
		};

		// Input styles
		const inputStyles: React.CSSProperties = {
			flex: 1,
			border: "none",
			outline: "none",
			padding: 0,
			minWidth: 0,
			backgroundColor: "transparent",
			fontFamily: "inherit",
			fontSize: sizeConfig.fontSize,
			color: variantStyles.color || restyleTheme.colors.onSurface,
			cursor: disabled ? "not-allowed" : undefined,
		};

		// Decorator styles
		const decoratorStyles: React.CSSProperties = {
			display: "flex",
			alignItems: "center",
			color: restyleTheme.colors.onSurfaceVariant,
		};

		return (
			<div className={className} style={containerStyles} data-testid={testID}>
				{startDecorator && (
					<span style={{ ...decoratorStyles, marginInlineEnd: "-4px" }}>{startDecorator}</span>
				)}
				<input
					ref={ref}
					type={type}
					placeholder={placeholder}
					value={value}
					defaultValue={defaultValue}
					disabled={disabled}
					onChange={onChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					style={inputStyles}
					aria-label={ariaLabel}
					aria-describedby={ariaDescribedby}
					aria-invalid={error || undefined}
					{...props}
				/>
				{endDecorator && (
					<span style={{ ...decoratorStyles, marginInlineStart: "-4px" }}>{endDecorator}</span>
				)}
			</div>
		);
	},
);

Input.displayName = "Input";
