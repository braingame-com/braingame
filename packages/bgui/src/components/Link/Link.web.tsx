import { textStyles } from "@braingame/utils";
import type { LinkProps } from "./types";

export const Link = ({
	children,
	href,
	onPress,
	external = false,
	disabled = false,
	variant = "inline",
	"aria-label": ariaLabel,
	style: customStyle,
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

	const style: React.CSSProperties = {
		fontSize: textStyles.link.fontSize,
		color: textStyles.link.color,
		cursor: "pointer",
		textDecoration: "underline",
		...(variant === "standalone" && {
			padding: "8px 16px",
			borderRadius: 4,
			backgroundColor: "#f0f0f0",
		}),
		...(disabled && {
			opacity: 0.5,
			cursor: "not-allowed",
		}),
		...((customStyle as React.CSSProperties) || {}),
	};

	return (
		<a
			href={disabled ? undefined : href}
			onClick={handleClick}
			aria-label={label}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}
			style={style}
		>
			{children}
		</a>
	);
};
