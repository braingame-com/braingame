"use client";
import React, { forwardRef } from "react";
import type { GlowingLogoProps } from "./GlowingLogoProps";

/**
 * Web implementation of GlowingLogo component
 *
 * Creates a logo with an animated glow effect
 */

const DEFAULT_SIZE = 120;
const DEFAULT_GLOW_COLOR = "#007fff";

const glowIntensityMap = {
	low: { blur: 20, scale: 1.1, opacity: 0.6 },
	medium: { blur: 30, scale: 1.2, opacity: 0.8 },
	high: { blur: 40, scale: 1.3, opacity: 1 },
};

// Add global styles for animations
if (typeof document !== "undefined" && !document.getElementById("bgui-glowing-logo-styles")) {
	const style = document.createElement("style");
	style.id = "bgui-glowing-logo-styles";
	style.textContent = `
    @keyframes bgui-logo-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes bgui-logo-glow {
      0%, 100% { opacity: 0.7; }
      50% { opacity: 1; }
    }
  `;
	document.head.appendChild(style);
}

// Default logo SVG component
const DefaultLogo: React.FC<{ size: number; color: string }> = ({ size, color }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 120 120"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="60" cy="60" r="50" fill={color} />
		<path
			d="M60 20 L80 50 L70 50 L70 80 L50 80 L50 50 L40 50 Z"
			fill="white"
			opacity="0.9"
		/>
	</svg>
);

export const GlowingLogo = forwardRef<HTMLDivElement, GlowingLogoProps>(
	(
		{
			size = DEFAULT_SIZE,
			glowColor = DEFAULT_GLOW_COLOR,
			glowIntensity = "medium",
			animate = true,
			source,
			onPress,
			children,
			style,
			testID,
			"aria-label": ariaLabel,
			...props
		},
		ref,
	) => {
		const { blur, scale, opacity } = glowIntensityMap[glowIntensity];
		const isClickable = !!onPress;

		const containerStyle: React.CSSProperties = {
			position: "relative",
			width: size,
			height: size,
			cursor: isClickable ? "pointer" : "default",
			...style,
		};

		const glowStyle: React.CSSProperties = {
			position: "absolute",
			top: "50%",
			left: "50%",
			width: size * scale,
			height: size * scale,
			transform: "translate(-50%, -50%)",
			background: glowColor,
			borderRadius: "50%",
			filter: `blur(${blur}px)`,
			opacity: opacity,
			animation: animate ? `bgui-logo-glow 3s ease-in-out infinite` : "none",
			pointerEvents: "none",
		};

		const logoStyle: React.CSSProperties = {
			position: "relative",
			width: size,
			height: size,
			borderRadius: "50%",
			overflow: "hidden",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			animation: animate ? `bgui-logo-pulse 4s ease-in-out infinite` : "none",
			backgroundColor: children ? "transparent" : "#1a1a1a",
		};

		const handleClick = () => {
			if (onPress) {
				onPress();
			}
		};

		const handleKeyDown = (e: React.KeyboardEvent) => {
			if (onPress && (e.key === "Enter" || e.key === " ")) {
				e.preventDefault();
				onPress();
			}
		};

		return (
			<div
				ref={ref}
				style={containerStyle}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				role={isClickable ? "button" : undefined}
				tabIndex={isClickable ? 0 : undefined}
				aria-label={ariaLabel || "Logo"}
				data-testid={testID}
				{...props}
			>
				{/* Glow effect */}
				<div style={glowStyle} />

				{/* Logo content */}
				<div style={logoStyle}>
					{children ? (
						children
					) : source ? (
						typeof source === "string" ? (
							<img
								src={source}
								alt={ariaLabel || "Logo"}
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
								}}
							/>
						) : (
							<img
								src={source.uri}
								alt={ariaLabel || "Logo"}
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
								}}
							/>
						)
					) : (
						<DefaultLogo size={size * 0.8} color={glowColor} />
					)}
				</div>
			</div>
		);
	},
);

GlowingLogo.displayName = "GlowingLogo";