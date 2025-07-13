<<<<<<< HEAD
"use client";

import type React from "react";
import type { ButtonProps } from "./types";

const variantStyles = {
	primary: {
		backgroundColor: "#007bff",
		color: "#fff",
		border: "none",
	},
	secondary: {
		backgroundColor: "#6c757d",
		color: "#fff",
		border: "none",
	},
	danger: {
		backgroundColor: "#dc3545",
		color: "#fff",
		border: "none",
	},
	ghost: {
		backgroundColor: "transparent",
		color: "#007bff",
		border: "1px solid transparent",
	},
	outline: {
		backgroundColor: "transparent",
		color: "#007bff",
		border: "1px solid #007bff",
	},
};

const sizeStyles = {
	sm: {
		padding: "6px 12px",
		fontSize: 14,
		borderRadius: 4,
	},
	md: {
		padding: "8px 16px",
		fontSize: 16,
		borderRadius: 6,
	},
	lg: {
		padding: "10px 20px",
		fontSize: 18,
		borderRadius: 8,
	},
};

export function Button({
	children,
	onPress,
	variant = "primary",
	size = "md",
	disabled = false,
	loading = false,
	style,
	...props
}: ButtonProps) {
	const variantStyle = variantStyles[variant];
	const sizeStyle = sizeStyles[size];

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
=======
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
>>>>>>> origin/main
		if (!disabled && !loading && onPress) {
			onPress();
		}
	};

<<<<<<< HEAD
	return (
		<button
			onClick={handleClick}
			disabled={disabled || loading}
			style={{
				...variantStyle,
				...sizeStyle,
				cursor: disabled || loading ? "not-allowed" : "pointer",
				opacity: disabled || loading ? 0.6 : 1,
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				fontWeight: 600,
				transition: "all 0.2s",
				outline: "none",
				...style,
			}}
			{...props}
		>
			{loading ? <span style={{ marginRight: 8 }}>...</span> : null}
			{children}
		</button>
	);
}
=======
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
>>>>>>> origin/main
