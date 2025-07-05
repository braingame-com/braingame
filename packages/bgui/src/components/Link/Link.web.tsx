import type React from "react";
import type { LinkProps } from "./types";

export const Link = ({
	children,
	href,
	onPress,
	external = false,
	disabled = false,
	variant = "inline",
	"aria-label": ariaLabel,
	style,
}: LinkProps) => {
	const label = external && ariaLabel ? `${ariaLabel} (opens in new window)` : ariaLabel;

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (disabled) {
			e.preventDefault();
			return;
		}
		if (onPress) {
			e.preventDefault();
			onPress();
		}
	};

	const linkStyle: React.CSSProperties = {
		textDecoration: "underline",
		cursor: disabled ? "not-allowed" : "pointer",
		opacity: disabled ? 0.5 : 1,
		color: "#007AFF",
		fontWeight: variant === "standalone" ? 600 : 400,
		fontSize: "inherit",
		padding: variant === "standalone" ? "8px 16px" : 0,
		borderRadius: variant === "standalone" ? 8 : 0,
		display: variant === "standalone" ? "inline-block" : "inline",
		transition: "opacity 0.2s ease",
		...((style as React.CSSProperties) || {}),
	};

	return (
		<a
			href={disabled ? undefined : href}
			onClick={handleClick}
			aria-label={label}
			style={linkStyle}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}
		>
			{children}
		</a>
	);
};
