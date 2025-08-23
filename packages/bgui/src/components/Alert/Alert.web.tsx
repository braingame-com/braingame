"use client";
import type React from "react";
import { forwardRef } from "react";
import { theme as restyleTheme } from "../../theme";
import type { AlertProps } from "./AlertProps";

/**
 * Web implementation of Alert component
 *
 * Alerts display brief messages for the user without interrupting their workflow.
 * Based on Joy UI's Alert implementation.
 */

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
	(
		{
			children,
			color = "neutral",
			variant = "soft",
			size = "md",
			startDecorator,
			endDecorator,
			invertedColors = false,
			role = "alert",
			style,
			testID,
			"aria-label": ariaLabel,
			...props
		},
		ref,
	) => {
		// Get theme values
		const getColorValue = (colorKey: string) => {
			return restyleTheme.colors[colorKey as keyof typeof restyleTheme.colors] || colorKey;
		};

		// Calculate padding based on size
		const getPadding = (): string => {
			switch (size) {
				case "sm":
					return "8px";
				case "lg":
					return "16px";
				default:
					return "12px";
			}
		};

		// Calculate border radius ensuring it's a string
		const getBorderRadius = (): string => {
			const radius = restyleTheme.radii.sm;
			if (typeof radius === "number") {
				return `${radius}px`;
			}
			if (typeof radius === "string") {
				return radius;
			}
			return "4px"; // fallback
		};

		// Calculate gap based on size
		const getGap = (): string => {
			switch (size) {
				case "sm":
					return "8px";
				case "lg":
					return "14px";
				default:
					return "10px";
			}
		};

		// Calculate font size based on size
		const getFontSize = (): string => {
			switch (size) {
				case "sm":
					return "14px";
				case "lg":
					return "16px";
				default:
					return "15px";
			}
		};

		// Build styles based on variant and color
		const getAlertStyles = (): React.CSSProperties => {
			const baseStyles = {
				display: "flex",
				alignItems: "center",
				gap: getGap(),
				padding: getPadding(),
				borderRadius: getBorderRadius(),
				fontSize: getFontSize(),
				fontFamily: restyleTheme.textVariants.body1.fontFamily,
				lineHeight: 1.5,
				position: "relative",
				...getVariantStyles(),
				...style,
			} as React.CSSProperties;

			return baseStyles;
		};

		const getVariantStyles = (): React.CSSProperties => {
			const variantKey = `${variant}-${color}`;
			const variantStyles = restyleTheme.components.Alert?.variants?.[variantKey];

			if (!variantStyles) {
				// Fallback styles
				return {
					backgroundColor: restyleTheme.colors.surface,
					color: restyleTheme.colors.onSurface,
				};
			}

			const styles: React.CSSProperties = {
				backgroundColor: getColorValue(variantStyles.backgroundColor),
				color: getColorValue(variantStyles.color),
			};

			if (variantStyles.borderColor) {
				styles.border = `1px solid ${getColorValue(variantStyles.borderColor)}`;
			}

			return styles;
		};

		return (
			<div ref={ref} role={role} style={getAlertStyles()} data-testid={testID} {...props}>
				{startDecorator && (
					<span style={{ display: "flex", alignItems: "center" }}>{startDecorator}</span>
				)}
				<span style={{ flex: 1 }}>{children}</span>
				{endDecorator && (
					<span style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
						{endDecorator}
					</span>
				)}
			</div>
		);
	},
);

Alert.displayName = "Alert";
