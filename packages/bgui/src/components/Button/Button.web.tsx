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
		if (!disabled && !loading && onPress) {
			onPress();
		}
	};

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
