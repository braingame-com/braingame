// @ts-nocheck
"use client";
import React from "react";
import { theme as restyleTheme } from "../../../theme";
import type { TabsProps } from "./TabsProps";

/**
 * Web implementation of Tabs component
 *
 * Tabs organize content across different screens and views.
 * Based on Joy UI's Tabs implementation.
 */

// Context for tabs state management
export const TabsContext = React.createContext<{
	value: string | number | null;
	onChange: (value: string | number | null) => void;
	orientation: "horizontal" | "vertical";
	size: "sm" | "md" | "lg";
	color: string;
	variant: string;
} | null>(null);

// Size context for child components
export const SizeTabsContext = React.createContext<"sm" | "md" | "lg">("md");

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
	(
		{
			children,
			value: valueProp,
			defaultValue,
			orientation = "horizontal",
			size = "md",
			color = "neutral",
			variant = "plain",
			onChange,
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

		const handleChange = (newValue: string | number | null, event?: any) => {
			if (!isControlled) {
				setInternalValue(newValue);
			}
			onChange?.(event, newValue);
		};

		// Get variant styles
		const variantKey = `${variant}-${color}`;
		const variantStyles = restyleTheme.components.Tabs?.variants?.[variantKey] || {};

		// Build styles based on orientation and size
		const tabsStyles: React.CSSProperties = {
			// Base styles
			display: "flex",
			flexDirection: orientation === "vertical" ? "row" : "column",
			position: "relative",
			backgroundColor: restyleTheme.colors.surface,

			// Size-specific spacing
			"--Tabs-spacing": size === "sm" ? "12px" : size === "lg" ? "20px" : "16px",
			"--Tab-indicatorThickness": "2px",

			// Typography
			...((restyleTheme.textVariants as any)[`body-${size}`] ||
				(restyleTheme.textVariants as any)["body-md"] ||
				{}),

			// Variant styles
			...variantStyles,

			// Icon color
			"--Icon-color":
				color !== "neutral" || variant === "solid"
					? "currentColor"
					: restyleTheme.colors.onSurfaceVariant,

			// Sticky background for TabList
			"--TabList-stickyBackground": variantStyles.backgroundColor || restyleTheme.colors.surface,

			// Custom styles
			...style,
		};

		const contextValue = {
			value,
			onChange: handleChange,
			orientation,
			size,
			color,
			variant,
		};

		return (
			<TabsContext.Provider value={contextValue}>
				<SizeTabsContext.Provider value={size}>
					<div
						ref={ref}
						className={className}
						style={tabsStyles}
						data-testid={testID}
						aria-label={ariaLabel}
						aria-labelledby={ariaLabelledby}
						{...props}
					>
						{children}
					</div>
				</SizeTabsContext.Provider>
			</TabsContext.Provider>
		);
	},
);

Tabs.displayName = "Tabs";
