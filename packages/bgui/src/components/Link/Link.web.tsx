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
}: LinkProps) => {
	const label = external && ariaLabel ? `${ariaLabel} (opens in new window)` : ariaLabel;

	const handleClick = (e: React.MouseEvent) => {
		if (disabled) {
			e.preventDefault();
			return;
		}
		if (onPress) {
			e.preventDefault();
			onPress();
		}
	};

	const className = variant === "standalone" ? "link-standalone" : "link-inline";
	const style: React.CSSProperties = {
		fontSize: 16,
		color: "rgb(59, 115, 245)",
		textDecoration: "underline",
		opacity: disabled ? 0.5 : 1,
		cursor: disabled ? "not-allowed" : "pointer",
		...(variant === "standalone" ? { paddingTop: 8, paddingBottom: 8 } : {}),
	};

	return (
		<a
			href={href || "#"}
			onClick={handleClick}
			aria-label={label}
			className={className}
			style={style}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}
		>
			{children}
		</a>
	);
};
