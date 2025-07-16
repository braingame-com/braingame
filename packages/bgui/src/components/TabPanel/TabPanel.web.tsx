"use client";
import React from "react";
import { theme as restyleTheme } from "../../theme";
import { TabsContext } from "../Tabs/Tabs.web";
import type { TabPanelProps } from "./TabPanelProps";

/**
 * Web implementation of TabPanel component
 *
 * TabPanel displays content associated with a specific tab.
 * Based on Joy UI's TabPanel implementation.
 */

export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
	(
		{
			children,
			value,
			keepMounted = false,
			size: sizeProp,
			color: colorProp,
			variant: variantProp,
			className,
			style,
			testID,
			"aria-labelledby": ariaLabelledby,
			...props
		},
		ref,
	) => {
		const tabsContext = React.useContext(TabsContext);

		if (!tabsContext) {
			throw new Error("TabPanel must be used within a Tabs component");
		}

		const {
			value: selectedValue,
			size: contextSize,
			color: contextColor,
			variant: contextVariant,
		} = tabsContext;

		const isSelected = selectedValue === value;
		const size = sizeProp || contextSize;
		const color = colorProp || contextColor;
		const variant = variantProp || contextVariant;

		// Don't render if not selected and not keeping mounted
		if (!isSelected && !keepMounted) {
			return null;
		}

		// Get variant styles
		const variantKey = `${variant}-${color}`;
		const variantStyles = restyleTheme.components.TabPanel?.variants?.[variantKey] || {};

		// Size configurations
		const sizeConfig = {
			sm: { padding: "12px" },
			md: { padding: "16px" },
			lg: { padding: "20px" },
		}[size];

		// Build styles
		const tabPanelStyles: React.CSSProperties = {
			// Base styles
			display: isSelected ? "block" : "none",
			width: "100%",
			padding: sizeConfig.padding,

			// Variant styles
			backgroundColor: variantStyles.backgroundColor || "transparent",
			color: variantStyles.color || restyleTheme.colors.onSurface,
			border: variantStyles.borderColor ? `1px solid ${variantStyles.borderColor}` : undefined,
			borderRadius: variantStyles.borderRadius || restyleTheme.radii.sm,

			// Typography
			fontFamily: restyleTheme.textVariants.body1.fontFamily,
			fontSize: restyleTheme.textVariants[`body-${size}`]?.fontSize || "16px",
			lineHeight: restyleTheme.textVariants[`body-${size}`]?.lineHeight || 1.5,

			// Custom styles
			...style,
		};

		return (
			<div
				ref={ref}
				className={className}
				style={tabPanelStyles}
				role="tabpanel"
				aria-labelledby={ariaLabelledby}
				aria-hidden={!isSelected}
				tabIndex={isSelected ? 0 : -1}
				data-testid={testID}
				{...props}
			>
				{children}
			</div>
		);
	},
);

TabPanel.displayName = "TabPanel";
