"use client";
import React, { forwardRef, useEffect, useRef } from "react";
import type { AnimatedGradientBackgroundProps } from "./AnimatedGradientBackgroundProps";

/**
 * Web implementation of AnimatedGradientBackground component
 *
 * Creates an animated gradient background with floating blobs
 */

const DEFAULT_COLORS = ["#FF4136", "#FF851B", "#FFDC00", "#2ECC40", "#0074D9", "#B10DC9"];

// Add global styles for animations
if (typeof document !== "undefined" && !document.getElementById("bgui-animated-gradient-styles")) {
	const style = document.createElement("style");
	style.id = "bgui-animated-gradient-styles";
	style.textContent = `
    @keyframes bgui-blob-float {
      0%, 100% { transform: translateY(0) scale(1); }
      33% { transform: translateY(-30px) scale(1.1); }
      66% { transform: translateY(30px) scale(0.9); }
    }
    @keyframes bgui-blob-drift {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(50px); }
    }
  `;
	document.head.appendChild(style);
}

interface BlobProps {
	color: string;
	size: number;
	left: string;
	top: string;
	animationDelay: number;
	animationDuration: number;
	opacity: number;
	blurRadius: number;
}

const Blob: React.FC<BlobProps> = ({
	color,
	size,
	left,
	top,
	animationDelay,
	animationDuration,
	opacity,
	blurRadius,
}) => (
	<div
		style={{
			position: "absolute",
			width: size,
			height: size,
			left,
			top,
			background: color,
			borderRadius: "50%",
			filter: `blur(${blurRadius}px)`,
			opacity,
			animation: `bgui-blob-float ${animationDuration}ms ease-in-out ${animationDelay}ms infinite, bgui-blob-drift ${animationDuration * 1.5}ms ease-in-out ${animationDelay}ms infinite`,
			willChange: "transform",
		}}
	/>
);

export const AnimatedGradientBackground = forwardRef<
	HTMLDivElement,
	AnimatedGradientBackgroundProps
>(
	(
		{
			colors = DEFAULT_COLORS,
			duration = 10000,
			animate = true,
			blobCount = 6,
			blobOpacity = 0.3,
			blurRadius = 100,
			children,
			style,
			testID,
			...props
		},
		ref,
	) => {
		const containerRef = useRef<HTMLDivElement>(null);

		// Generate blob configurations
		const blobs = Array.from({ length: blobCount }, (_, i) => ({
			id: i,
			color: colors[i % colors.length],
			size: 200 + Math.random() * 400,
			left: `${Math.random() * 100}%`,
			top: `${Math.random() * 100}%`,
			animationDelay: Math.random() * duration,
			animationDuration: duration + Math.random() * duration * 0.5,
		}));

		return (
			<div
				ref={ref || containerRef}
				data-testid={testID}
				style={{
					position: "relative",
					width: "100%",
					height: "100%",
					overflow: "hidden",
					background: "linear-gradient(to bottom right, #0f0f0f, #1a1a1a)",
					...style,
				}}
				{...props}
			>
				{/* Gradient blobs */}
				<div
					style={{
						position: "absolute",
						inset: 0,
						overflow: "hidden",
					}}
				>
					{animate &&
						blobs.map((blob) => (
							<Blob
								key={blob.id}
								color={blob.color}
								size={blob.size}
								left={blob.left}
								top={blob.top}
								animationDelay={blob.animationDelay}
								animationDuration={blob.animationDuration}
								opacity={blobOpacity}
								blurRadius={blurRadius}
							/>
						))}
				</div>

				{/* Content layer */}
				{children && (
					<div
						style={{
							position: "relative",
							zIndex: 1,
							width: "100%",
							height: "100%",
						}}
					>
						{children}
					</div>
				)}
			</div>
		);
	},
);

AnimatedGradientBackground.displayName = "AnimatedGradientBackground";