// @ts-nocheck
"use client";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { theme as restyleTheme } from "../../../theme";
import type { ButtonProps } from "./ButtonProps";

/**
 * Web implementation of Button component
 *
 * Provides an accessible button with multiple variants and states.
 * Based on Joy UI's Button implementation.
 */

// Add global style for spinner animation
if (typeof document !== "undefined" && !document.getElementById("bgui-button-styles")) {
	const style = document.createElement("style");
	style.id = "bgui-button-styles";
	style.textContent = `
    @keyframes bgui-spin {
      to { transform: rotate(360deg); }
    }
  `;
	document.head.appendChild(style);
}

// Loading spinner component
const LoadingSpinner: React.FC<{ size: string; color: string }> = ({ size, color }) => {
	const spinnerSize = size === "sm" ? 16 : size === "lg" ? 24 : 20;

	return (
		<svg
			width={spinnerSize}
			height={spinnerSize}
			viewBox="0 0 24 24"
			role="img"
			aria-label="Loading"
			style={{
				animation: "bgui-spin 1s linear infinite",
				color,
			}}
		>
			<title>Loading</title>
			<circle
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="3"
				fill="none"
				strokeDasharray="31.4 31.4"
				strokeLinecap="round"
				style={{ opacity: 0.3 }}
			/>
			<circle
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="3"
				fill="none"
				strokeDasharray="31.4 31.4"
				strokeDashoffset="23.55"
				strokeLinecap="round"
			/>
		</svg>
	);
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			color = "primary",
			disabled = false,
			endDecorator,
			fullWidth = false,
			size = "md",
			startDecorator,
			variant = "solid",
			loading = false,
			loadingIndicator,
			loadingPosition = "center",
			onClick,
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-pressed": ariaPressed,
			tabIndex,
			type = "button",
			...props
		},
		ref,
	) => {
		const buttonRef = useRef<HTMLButtonElement>(null);
		const [focusVisible, setFocusVisible] = React.useState(false);
		const [active, setActive] = React.useState(false);

		// Merge refs
		useImperativeHandle(ref, () => buttonRef.current || ({} as HTMLButtonElement));

		// Handle loading state
		const isDisabled = disabled || loading;

		// Get theme values
		const getColorValue = (colorKey: string) => {
			return restyleTheme.colors[colorKey as keyof typeof restyleTheme.colors] || colorKey;
		};

		// Build button styles based on variant and color
		const getButtonStyles = () => {
			const baseStyles: React.CSSProperties = {
				position: "relative",
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				gap: size === "sm" ? 4 : size === "lg" ? 8 : 6,
				fontFamily: restyleTheme.textVariants.button.fontFamily,
				fontSize: size === "sm" ? 14 : size === "lg" ? 16 : 15,
				fontWeight: restyleTheme.textVariants.button
					.fontWeight as React.CSSProperties["fontWeight"],
				lineHeight: 1.5,
				borderRadius: restyleTheme.radii[size],
				border: "1px solid transparent",
				cursor: isDisabled ? "not-allowed" : "pointer",
				userSelect: "none",
				transition: "all 0.2s ease",
				width: fullWidth ? "100%" : "auto",
				opacity: isDisabled ? 0.6 : 1,
				overflow: "hidden",
				...getPaddingStyles(),
				...getVariantStyles(),
				...style,
			};

			return baseStyles;
		};

		const getPaddingStyles = () => {
			const paddingMap = {
				sm: { paddingTop: 4, paddingBottom: 4, paddingLeft: 12, paddingRight: 12 },
				md: { paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16 },
				lg: { paddingTop: 12, paddingBottom: 12, paddingLeft: 20, paddingRight: 20 },
			};
			return paddingMap[size];
		};

		const getVariantStyles = () => {
			const colorValue = getColorValue(color);
			const _backgroundColor = restyleTheme.colors.surface;
			const _textColor = restyleTheme.colors.onSurface;

			const variantStyles: Record<string, React.CSSProperties> = {
				solid: {
					backgroundColor: colorValue,
					color: "#ffffff",
					borderColor: colorValue,
				},
				soft: {
					backgroundColor: `${colorValue}22`,
					color: colorValue,
					borderColor: "transparent",
				},
				outlined: {
					backgroundColor: "transparent",
					color: colorValue,
					borderColor: colorValue,
				},
				plain: {
					backgroundColor: "transparent",
					color: colorValue,
					borderColor: "transparent",
					padding: 0,
				},
			};

			return variantStyles[variant] || variantStyles.solid;
		};

		// Handle focus management
		const handleFocus = () => {
			setFocusVisible(true);
		};

		const handleBlur = () => {
			setFocusVisible(false);
		};

		const handleMouseDown = () => {
			setActive(true);
		};

		const handleMouseUp = () => {
			setActive(false);
		};

		const handleKeyDown = (e: React.KeyboardEvent) => {
			if (e.key === " " || e.key === "Enter") {
				setActive(true);
			}
		};

		const handleKeyUp = (e: React.KeyboardEvent) => {
			if (e.key === " " || e.key === "Enter") {
				setActive(false);
			}
		};

		// Render loading indicator
		const renderLoadingIndicator = () => {
			if (!loading) return null;

			const indicator = loadingIndicator || <LoadingSpinner size={size} color="currentColor" />;

			if (loadingPosition === "center") {
				return (
					<div
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					>
						{indicator}
					</div>
				);
			}

			return indicator;
		};

		const buttonStyles = getButtonStyles();

		// Add focus and active state styles
		if (focusVisible) {
			buttonStyles.outline = `2px solid ${getColorValue(color)}`;
			buttonStyles.outlineOffset = 2;
		}

		if (active && !isDisabled) {
			buttonStyles.transform = "scale(0.97)";
		}

		return (
			<button
				ref={buttonRef}
				type={type}
				disabled={isDisabled}
				onClick={onClick}
				style={buttonStyles}
				data-testid={testID}
				aria-label={ariaLabel}
				aria-pressed={ariaPressed}
				aria-busy={loading}
				tabIndex={tabIndex}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onKeyDown={handleKeyDown}
				onKeyUp={handleKeyUp}
				{...props}
			>
				{loading && loadingPosition === "start" && renderLoadingIndicator()}
				{startDecorator && (
					<span style={{ opacity: loading && loadingPosition === "center" ? 0 : 1 }}>
						{startDecorator}
					</span>
				)}
				<span style={{ opacity: loading && loadingPosition === "center" ? 0 : 1 }}>{children}</span>
				{endDecorator && (
					<span style={{ opacity: loading && loadingPosition === "center" ? 0 : 1 }}>
						{endDecorator}
					</span>
				)}
				{loading && loadingPosition === "end" && renderLoadingIndicator()}
				{loading && loadingPosition === "center" && renderLoadingIndicator()}
			</button>
		);
	},
);
