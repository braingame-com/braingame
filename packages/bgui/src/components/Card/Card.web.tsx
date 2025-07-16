"use client";
import type React from "react";
import { forwardRef } from "react";
import { theme as restyleTheme } from "../../theme";
import type { CardProps } from "./CardProps";

/**
 * Web implementation of Card component
 *
 * Cards contain content and actions about a single subject.
 * Based on Joy UI's Card implementation.
 */

export const Card = forwardRef<HTMLDivElement, CardProps>(
	(
		{
			children,
			color = "neutral",
			variant = "outlined",
			size = "md",
			orientation = "vertical",
			invertedColors = false,
			onClick,
			style,
			testID,
			"aria-label": ariaLabel,
			...props
		},
		ref,
	) => {
		// Get color value from theme
		const getColorValue = (colorKey: string) => {
			return restyleTheme.colors[colorKey as keyof typeof restyleTheme.colors] || colorKey;
		};

		// Get padding based on size
		const getPaddingStyles = () => {
			const paddingMap = {
				sm: { padding: "0.625rem" }, // 10px
				md: { padding: "1rem" }, // 16px
				lg: { padding: "1.5rem" }, // 24px
			};
			return paddingMap[size];
		};

		// Get border radius based on size
		const getBorderRadius = () => {
			const radiusMap = {
				sm: restyleTheme.radii.sm,
				md: restyleTheme.radii.md,
				lg: restyleTheme.radii.lg,
			};
			return radiusMap[size];
		};

		// Get variant styles
		const getVariantStyles = () => {
			const colorValue = getColorValue(color);
			const surfaceColor = restyleTheme.colors.surface;
			const onSurfaceColor = restyleTheme.colors.onSurface;

			const variantStyles: Record<string, React.CSSProperties> = {
				plain: {
					backgroundColor: "transparent",
					color: onSurfaceColor,
					border: "none",
				},
				outlined: {
					backgroundColor: surfaceColor,
					color: onSurfaceColor,
					border: `1px solid ${restyleTheme.colors.outline}`,
				},
				soft: {
					backgroundColor: `${colorValue}22`,
					color: colorValue,
					border: "none",
				},
				solid: {
					backgroundColor: colorValue,
					color: "#ffffff",
					border: "none",
				},
			};

			return variantStyles[variant] || variantStyles.outlined;
		};

		// Build card styles
		const cardStyles: React.CSSProperties = {
			display: "flex",
			flexDirection: orientation === "horizontal" ? "row" : "column",
			borderRadius: getBorderRadius(),
			cursor: onClick ? "pointer" : "default",
			transition: "all 0.2s ease",
			overflow: "hidden",
			position: "relative",
			...getPaddingStyles(),
			...getVariantStyles(),
			...style,
		};

		// Add hover effects for clickable cards
		const handleMouseEnter = (e: React.MouseEvent) => {
			if (onClick) {
				e.currentTarget.style.transform = "translateY(-2px)";
				e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
			}
		};

		const handleMouseLeave = (e: React.MouseEvent) => {
			if (onClick) {
				e.currentTarget.style.transform = "translateY(0)";
				e.currentTarget.style.boxShadow = "none";
			}
		};

		// Add subtle shadow for outlined variant
		if (variant === "outlined") {
			cardStyles.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
		}

		return (
			<div
				ref={ref}
				onClick={onClick}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				style={cardStyles}
				data-testid={testID}
				aria-label={ariaLabel}
				role={onClick ? "button" : undefined}
				tabIndex={onClick ? 0 : undefined}
				{...props}
			>
				{children}
			</div>
		);
	},
);
