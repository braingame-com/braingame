// @ts-nocheck
"use client";
import type React from "react";
import { forwardRef, useState } from "react";
import { theme as restyleTheme } from "../../../theme";
import type { AvatarProps } from "./AvatarProps";

/**
 * Web implementation of Avatar component
 *
 * Avatars are used to represent people or entities.
 */

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
	(
		{
			children,
			color = "neutral",
			variant = "soft",
			size = "md",
			src,
			alt,
			srcSet,
			onClick,
			style,
			testID,
			"aria-label": ariaLabel,
			...props
		},
		ref,
	) => {
		const [imgError, setImgError] = useState(false);
		const [imgLoaded, setImgLoaded] = useState(false);

		// Get color value from theme
		const getColorValue = (colorKey: string) => {
			return restyleTheme.colors[colorKey as keyof typeof restyleTheme.colors] || colorKey;
		};

		// Get size dimensions
		const getSizeStyles = () => {
			const sizeMap = {
				sm: { width: 32, height: 32, fontSize: 14 },
				md: { width: 40, height: 40, fontSize: 16 },
				lg: { width: 48, height: 48, fontSize: 20 },
			};
			return sizeMap[size];
		};

		// Get variant styles
		const getVariantStyles = () => {
			const colorValue = getColorValue(color);
			const surfaceColor = restyleTheme.colors.surface;
			const _onSurfaceColor = restyleTheme.colors.onSurface;

			const variantStyles: Record<string, React.CSSProperties> = {
				plain: {
					backgroundColor: "transparent",
					color: colorValue,
					border: "none",
				},
				outlined: {
					backgroundColor: surfaceColor,
					color: colorValue,
					border: `1px solid ${colorValue}`,
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

			return variantStyles[variant] || variantStyles.soft;
		};

		const sizeStyles = getSizeStyles();
		const variantStyles = getVariantStyles();

		// Build avatar styles
		const avatarStyles: React.CSSProperties = {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			borderRadius: "50%",
			position: "relative",
			overflow: "hidden",
			userSelect: "none",
			cursor: onClick ? "pointer" : "default",
			fontWeight: 500,
			textTransform: "uppercase",
			transition: "all 0.2s ease",
			...sizeStyles,
			...variantStyles,
			...style,
		};

		// Handle image load error
		const handleImgError = () => {
			setImgError(true);
		};

		const handleImgLoad = () => {
			setImgLoaded(true);
		};

		// Render content
		const renderContent = () => {
			// If image is provided and hasn't errored, show image
			if (src && !imgError) {
				return (
					<img
						src={src}
						srcSet={srcSet}
						alt={alt}
						onError={handleImgError}
						onLoad={handleImgLoad}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							opacity: imgLoaded ? 1 : 0,
							transition: "opacity 0.2s ease",
						}}
					/>
				);
			}

			// Show children (initials, icon, etc.)
			return children;
		};

		return (
			<div
				ref={ref}
				style={avatarStyles}
				role={onClick ? "button" : "img"}
				onClick={onClick as React.MouseEventHandler<HTMLDivElement>}
				data-testid={testID}
				aria-label={onClick ? ariaLabel || alt : ariaLabel || alt}
				tabIndex={onClick ? 0 : undefined}
				onKeyDown={
					onClick
						? (e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									(onClick as React.MouseEventHandler<HTMLDivElement>)(
										e as unknown as React.MouseEvent<HTMLDivElement>,
									);
								}
							}
						: undefined
				}
				{...props}
			>
				{renderContent()}
			</div>
		);
	},
);
