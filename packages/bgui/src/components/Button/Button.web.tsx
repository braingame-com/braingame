"use client";

import { memo, useMemo } from "react";
import { useInteractiveState } from "../../hooks";
import { validateProps } from "../../utils/validation";
import { withErrorBoundary } from "../../utils/withErrorBoundary";
import { Icon } from "../Icon";
import { getPaddingForSize, VARIANT_COLORS, VARIANT_ICON_COLORS, validationRules } from "./styles";
import type { ButtonProps } from "./types";

/**
 * Button component for triggering actions in the app (Web version).
 * Uses HTML elements for Next.js compatibility.
 */
function ButtonComponent({
	children,
	onPress,
	icon,
	iconPosition = "left",
	size = "md",
	fullWidth,
	disabled,
	loading,
	variant = "primary",
	"aria-label": ariaLabel,
	"aria-describedby": ariaDescribedBy,
}: ButtonProps) {
	// Validate props only in development
	if (typeof __DEV__ !== "undefined" && __DEV__) {
		validateProps({ onPress, variant, size, iconPosition }, validationRules, "Button");
	}

	const { isHovered, handleHoverIn, handleHoverOut } = useInteractiveState();

	const { background, text } = VARIANT_COLORS[variant];
	const iconColor = VARIANT_ICON_COLORS[variant];

	// Memoize padding calculations
	const { paddingVertical, paddingHorizontal } = useMemo(() => getPaddingForSize(size), [size]);

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!disabled && !loading && onPress) {
			onPress();
		}
	};

	const buttonStyle: React.CSSProperties = {
		backgroundColor: background,
		paddingTop: paddingVertical,
		paddingBottom: paddingVertical,
		paddingLeft: paddingHorizontal,
		paddingRight: paddingHorizontal,
		opacity: disabled ? 0.5 : isHovered ? 0.9 : 1,
		width: fullWidth ? "100%" : undefined,
		flexDirection: iconPosition === "right" ? "row-reverse" : "row",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: variant === "icon" ? 0 : 8,
		border: "none",
		borderRadius: 8,
		cursor: disabled || loading ? "not-allowed" : "pointer",
		transition: "opacity 0.2s ease",
		fontFamily: "inherit",
		fontSize: "inherit",
		lineHeight: "inherit",
		textAlign: "center",
		textDecoration: "none",
		outline: "none",
		minWidth: variant === "icon" ? 44 : undefined,
		minHeight: variant === "icon" ? 44 : undefined,
		padding: variant === "icon" ? 8 : undefined,
	};

	const textStyle: React.CSSProperties = {
		color: text,
		margin: 0,
		fontWeight: 500,
	};

	return (
		<button
			type="button"
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedBy}
			disabled={disabled || loading}
			onClick={handleClick}
			onMouseEnter={handleHoverIn}
			onMouseLeave={handleHoverOut}
			style={buttonStyle}
		>
			{loading ? (
				<div
					style={{
						width: 20,
						height: 20,
						border: `2px solid ${text}`,
						borderRadius: "50%",
						borderTopColor: "transparent",
						animation: "spin 1s linear infinite",
					}}
				/>
			) : (
				<>
					{icon && <Icon name={icon} color={iconColor} />}
					{variant !== "icon" && children && <span style={textStyle}>{children}</span>}
				</>
			)}
			<style>{`
				@keyframes spin {
					0% { transform: rotate(0deg); }
					100% { transform: rotate(360deg); }
				}
			`}</style>
		</button>
	);
}

// Wrap with memo and error boundary for optimal performance
const MemoizedButton = memo(ButtonComponent);

/**
 * Button component with error boundary and performance optimization.
 * Web version for Next.js compatibility.
 */
export const Button = withErrorBoundary(MemoizedButton);
