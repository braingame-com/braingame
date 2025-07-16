"use client";
import React from "react";
import { theme as restyleTheme } from "../../theme";
import { TabsContext } from "../Tabs/Tabs.web";
import type { TabListProps } from "./TabListProps";

/**
 * Web implementation of TabList component
 *
 * TabList is a container for Tab components that provides navigation.
 * Based on Joy UI's TabList implementation.
 */

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>(
	(
		{
			children,
			size: sizeProp,
			color: colorProp,
			variant: variantProp,
			sticky,
			disableUnderline = false,
			underlinePlacement = "bottom",
			className,
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-labelledby": ariaLabelledby,
			...props
		},
		ref,
	) => {
		const tabsContext = React.useContext(TabsContext);

		// Use values from Tabs context or fallback to props
		const size = sizeProp || tabsContext?.size || "md";
		const color = colorProp || tabsContext?.color || "neutral";
		const variant = variantProp || tabsContext?.variant || "plain";
		const orientation = tabsContext?.orientation || "horizontal";

		// Get variant styles
		const variantKey = `${variant}-${color}`;
		const variantStyles = restyleTheme.components.TabList?.variants?.[variantKey] || {};

		// Determine underline placement based on orientation
		const effectiveUnderlinePlacement =
			underlinePlacement === "bottom" && orientation === "vertical"
				? "right"
				: underlinePlacement === "top" && orientation === "vertical"
					? "left"
					: underlinePlacement;

		// Build styles
		const tabListStyles: React.CSSProperties = {
			// Base styles
			display: "flex",
			flexDirection: orientation === "vertical" ? "column" : "row",
			flexGrow: 0,
			borderRadius: 0,
			padding: 0,
			zIndex: 1,

			// List-specific variables
			"--List-gap": "0px",
			"--ListDivider-gap": "0px",
			"--ListItem-paddingX": "var(--Tabs-spacing)",
			"--ListItem-gap": "6px",

			// Variant styles
			...variantStyles,

			// Sticky positioning
			...(sticky && {
				position: "sticky",
				top: sticky === "top" ? "calc(-1 * var(--Tabs-padding, 0px))" : "initial",
				bottom: sticky === "bottom" ? "calc(-1 * var(--Tabs-padding, 0px))" : "initial",
				backgroundColor: variantStyles.backgroundColor || "var(--TabList-stickyBackground)",
			}),

			// Underline styles
			...(!disableUnderline && {
				...(effectiveUnderlinePlacement === "bottom" && {
					paddingBottom: "1px",
					boxShadow: `inset 0 -1px ${restyleTheme.colors.outline}`,
				}),
				...(effectiveUnderlinePlacement === "top" && {
					paddingTop: "1px",
					boxShadow: `inset 0 1px ${restyleTheme.colors.outline}`,
				}),
				...(effectiveUnderlinePlacement === "right" && {
					paddingRight: "1px",
					boxShadow: `inset -1px 0 ${restyleTheme.colors.outline}`,
				}),
				...(effectiveUnderlinePlacement === "left" && {
					paddingLeft: "1px",
					boxShadow: `inset 1px 0 ${restyleTheme.colors.outline}`,
				}),
			}),

			// Custom styles
			...style,
		};

		return (
			<div
				ref={ref}
				className={className}
				style={tabListStyles}
				role="tablist"
				aria-label={ariaLabel}
				aria-labelledby={ariaLabelledby}
				aria-orientation={orientation}
				data-testid={testID}
				{...props}
			>
				{children}
			</div>
		);
	},
);

TabList.displayName = "TabList";
