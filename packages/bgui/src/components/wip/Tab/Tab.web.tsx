// @ts-nocheck
"use client";
import React from "react";
import { theme as restyleTheme } from "../../../theme";
import { TabsContext } from "../Tabs/Tabs.web";
import type { TabProps } from "./TabProps";

/**
 * Web implementation of Tab component
 *
 * Individual tab component that can be selected to show content.
 * Based on Joy UI's Tab implementation.
 */

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
	(
		{
			children,
			value,
			disabled = false,
			disableIndicator = false,
			indicatorPlacement = "bottom",
			indicatorInset = false,
			onClick,
			onFocus,
			onBlur,
			className,
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-controls": ariaControls,
			...props
		},
		ref,
	) => {
		const tabsContext = React.useContext(TabsContext);
		const [focusVisible, setFocusVisible] = React.useState(false);

		if (!tabsContext) {
			throw new Error("Tab must be used within a Tabs component");
		}

		const { value: selectedValue, onChange, orientation, size, color, variant } = tabsContext;

		const isSelected = selectedValue === value;
		const isVertical = orientation === "vertical";

		// Adjust indicator placement for vertical orientation
		const effectiveIndicatorPlacement = isVertical
			? indicatorPlacement === "bottom"
				? "right"
				: indicatorPlacement === "top"
					? "left"
					: indicatorPlacement
			: indicatorPlacement;

		const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
			if (disabled) return;
			onChange(value ?? null);
			onClick?.(event);
		};

		const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
			if (event.target.matches(":focus-visible")) {
				setFocusVisible(true);
			}
			onFocus?.(event);
		};

		const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
			setFocusVisible(false);
			onBlur?.(event);
		};

		// Get variant styles
		const variantKey = `${variant}-${color}`;
		const variantStyles = restyleTheme.components.Tab?.variants?.[variantKey] || {};

		// Size configurations
		const sizeConfig = {
			sm: { paddingX: "12px", paddingY: "6px", fontSize: "14px" },
			md: { paddingX: "16px", paddingY: "8px", fontSize: "16px" },
			lg: { paddingX: "20px", paddingY: "12px", fontSize: "18px" },
		}[size];

		// Build styles
		const tabStyles: React.CSSProperties = {
			// Base styles
			display: "flex",
			flex: "initial",
			alignItems: "center",
			justifyContent: "center",
			position: "relative",
			background: "none",
			border: "none",
			cursor: disabled ? "not-allowed" : "pointer",
			fontSize: sizeConfig.fontSize,
			fontFamily: "inherit",
			fontWeight: isSelected ? "bold" : "normal",
			color: isSelected
				? variantStyles.color || restyleTheme.colors.primary
				: variantStyles.color || restyleTheme.colors.onSurface,

			// Padding
			paddingLeft: sizeConfig.paddingX,
			paddingRight: sizeConfig.paddingX,
			paddingTop: sizeConfig.paddingY,
			paddingBottom: sizeConfig.paddingY,

			// Indicator spacing adjustments
			...(!disableIndicator &&
				effectiveIndicatorPlacement === "bottom" && {
					paddingBottom: `calc(${sizeConfig.paddingY} + var(--Tab-indicatorThickness) - 1px)`,
				}),
			...(!disableIndicator &&
				effectiveIndicatorPlacement === "top" && {
					paddingTop: `calc(${sizeConfig.paddingY} + var(--Tab-indicatorThickness) - 1px)`,
				}),
			...(!disableIndicator &&
				effectiveIndicatorPlacement === "right" && {
					paddingRight: `calc(${sizeConfig.paddingX} + var(--Tab-indicatorThickness) - 1px)`,
				}),
			...(!disableIndicator &&
				effectiveIndicatorPlacement === "left" && {
					paddingLeft: `calc(${sizeConfig.paddingX} + var(--Tab-indicatorThickness) - 1px)`,
				}),

			// Disabled state
			opacity: disabled ? 0.6 : 1,

			// Focus visible
			outline: focusVisible ? `2px solid ${restyleTheme.colors.primary}` : "none",
			outlineOffset: focusVisible ? "2px" : "0",

			// Transitions
			transition: "color 0.2s, opacity 0.2s, outline 0.2s",

			// Custom styles
			...style,
		};

		// Indicator styles
		const indicatorStyles: React.CSSProperties =
			!disableIndicator && isSelected
				? {
						content: '""',
						display: "block",
						position: "absolute",
						backgroundColor: "currentColor",
						borderRadius: "1px",
						...(effectiveIndicatorPlacement === "bottom" && {
							height: "var(--Tab-indicatorThickness)",
							width: indicatorInset ? "calc(100% - 2 * var(--ListItem-paddingX))" : "100%",
							left: indicatorInset ? "var(--ListItem-paddingX)" : "0",
							right: indicatorInset ? "var(--ListItem-paddingX)" : "0",
							bottom: "-1px",
						}),
						...(effectiveIndicatorPlacement === "top" && {
							height: "var(--Tab-indicatorThickness)",
							width: indicatorInset ? "calc(100% - 2 * var(--ListItem-paddingX))" : "100%",
							left: indicatorInset ? "var(--ListItem-paddingX)" : "0",
							right: indicatorInset ? "var(--ListItem-paddingX)" : "0",
							top: "-1px",
						}),
						...(effectiveIndicatorPlacement === "right" && {
							height: indicatorInset ? "calc(100% - 2 * var(--ListItem-paddingY))" : "100%",
							width: "var(--Tab-indicatorThickness)",
							top: indicatorInset ? "var(--ListItem-paddingY)" : "0",
							bottom: indicatorInset ? "var(--ListItem-paddingY)" : "0",
							right: "-1px",
						}),
						...(effectiveIndicatorPlacement === "left" && {
							height: indicatorInset ? "calc(100% - 2 * var(--ListItem-paddingY))" : "100%",
							width: "var(--Tab-indicatorThickness)",
							top: indicatorInset ? "var(--ListItem-paddingY)" : "0",
							bottom: indicatorInset ? "var(--ListItem-paddingY)" : "0",
							left: "-1px",
						}),
					}
				: {};

		return (
			<button
				ref={ref}
				className={className}
				style={tabStyles}
				disabled={disabled}
				onClick={handleClick}
				onFocus={handleFocus}
				onBlur={handleBlur}
				role="tab"
				aria-selected={isSelected}
				aria-controls={ariaControls}
				aria-label={ariaLabel}
				tabIndex={isSelected ? 0 : -1}
				data-testid={testID}
				{...props}
			>
				{children}
				{!disableIndicator && isSelected && <span style={indicatorStyles} aria-hidden="true" />}
			</button>
		);
	},
);

Tab.displayName = "Tab";
