"use client";
import React from "react";
import { theme as restyleTheme } from "../../theme";
import type { CircularProgressProps } from "./CircularProgressProps";

/**
 * Web implementation of CircularProgress component
 *
 * Circular progress indicators express an unspecified wait time or display the length of a process.
 * Based on Joy UI's CircularProgress implementation.
 */

// Keyframes for indeterminate animation
const circulate = `
  @keyframes circulate {
    0% {
      transform: rotate(-90deg);
    }
    100% {
      transform: rotate(270deg);
    }
  }
`;

export const CircularProgress = React.forwardRef<HTMLSpanElement, CircularProgressProps>(
	(
		{
			size = "md",
			color = "primary",
			variant = "soft",
			thickness,
			value = 25,
			determinate = false,
			children,
			className,
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-labelledby": ariaLabelledby,
			"aria-valuetext": ariaValuetext,
		},
		ref,
	) => {
		// Inject keyframes once
		React.useEffect(() => {
			if (!determinate && typeof document !== "undefined") {
				const styleId = "bgui-circular-progress-keyframes";
				if (!document.getElementById(styleId)) {
					const styleElement = document.createElement("style");
					styleElement.id = styleId;
					styleElement.textContent = circulate;
					document.head.appendChild(styleElement);
				}
			}
		}, [determinate]);

		// Size configurations
		const sizeConfig = {
			sm: {
				rootSize: "24px",
				trackThickness: thickness || 3,
				progressThickness: thickness || 3,
				fontSize: "0.2em",
			},
			md: {
				rootSize: "40px",
				trackThickness: thickness || 6,
				progressThickness: thickness || 6,
				fontSize: "0.2em",
			},
			lg: {
				rootSize: "64px",
				trackThickness: thickness || 8,
				progressThickness: thickness || 8,
				fontSize: "0.2em",
			},
		}[size];

		// Get variant colors
		const variantKey = `${variant}-${color}`;
		const variantStyles = restyleTheme.components.CircularProgress?.variants?.[variantKey] || {};

		// Determine track and progress colors based on variant
		let trackColor: string;
		let progressColor: string;

		if (variant === "soft") {
			trackColor = restyleTheme.colors.neutral || "#e0e0e0";
			progressColor =
				variantStyles.color || restyleTheme.colors[color] || restyleTheme.colors.primary;
		} else if (variant === "solid") {
			trackColor = (restyleTheme.colors as Record<string, string>)[`${color}_soft`] || "#e0e0e0";
			progressColor =
				variantStyles.backgroundColor || restyleTheme.colors[color] || restyleTheme.colors.primary;
		} else {
			trackColor = variantStyles.backgroundColor || "#e0e0e0";
			progressColor =
				variantStyles.color || restyleTheme.colors[color] || restyleTheme.colors.primary;
		}

		// Calculate dimensions
		const rootSizeNum = Number.parseInt(sizeConfig.rootSize);
		const innerSize = rootSizeNum;
		const radius = (innerSize - sizeConfig.trackThickness) / 2;
		const circumference = 2 * Math.PI * radius;
		const strokeDashoffset =
			circumference - (determinate ? (value / 100) * circumference : circumference * 0.75);

		// Root styles
		const rootStyles: React.CSSProperties = {
			display: "inline-flex",
			justifyContent: "center",
			alignItems: "center",
			position: "relative",
			width: sizeConfig.rootSize,
			height: sizeConfig.rootSize,
			fontSize: sizeConfig.rootSize,
			color: progressColor,
			...((style as React.CSSProperties) || {}),
		};

		// SVG styles
		const svgStyles: React.CSSProperties = {
			width: "inherit",
			height: "inherit",
			display: "inherit",
			position: "absolute",
			top: 0,
			left: 0,
		};

		// Track styles
		const trackStyles: React.CSSProperties = {
			fill: "transparent",
			stroke: trackColor,
			strokeWidth: sizeConfig.trackThickness,
		};

		// Progress styles
		const progressStyles: React.CSSProperties = {
			fill: "transparent",
			stroke: progressColor,
			strokeWidth: sizeConfig.progressThickness,
			strokeLinecap: "round",
			strokeDasharray: circumference,
			strokeDashoffset,
			transformOrigin: "center",
			transform: "rotate(-90deg)",
			transition: determinate ? "stroke-dashoffset 0.3s ease" : undefined,
			animation: !determinate ? "circulate 0.8s linear infinite" : undefined,
		};

		return (
			<span
				ref={ref}
				className={className}
				style={rootStyles}
				role="progressbar"
				aria-valuenow={determinate ? Math.round(value) : undefined}
				aria-valuemin={determinate ? 0 : undefined}
				aria-valuemax={determinate ? 100 : undefined}
				aria-label={ariaLabel}
				aria-labelledby={ariaLabelledby}
				aria-valuetext={ariaValuetext}
				data-testid={testID}
			>
				<svg style={svgStyles} role="img" aria-label={`Progress ${Math.round(value)}%`}>
					<title>Progress indicator</title>
					<circle cx="50%" cy="50%" r={radius} style={trackStyles} />
					<circle cx="50%" cy="50%" r={radius} style={progressStyles} />
				</svg>
				{children && (
					<span
						style={{
							fontFamily: restyleTheme.textVariants.body1.fontFamily,
							fontWeight: restyleTheme.textVariants.body1.fontWeight,
							fontSize: sizeConfig.fontSize,
						}}
					>
						{children}
					</span>
				)}
			</span>
		);
	},
);

CircularProgress.displayName = "CircularProgress";
