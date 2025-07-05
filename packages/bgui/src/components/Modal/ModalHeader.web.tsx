import { Tokens, Typography, useThemeColor } from "@braingame/utils";
import type { ReactNode } from "react";
import { Icon } from "../Icon";

interface ModalHeaderProps {
	children: ReactNode;
	closable?: boolean;
	onClose?: () => void;
}

export const ModalHeader = ({ children, closable = true, onClose }: ModalHeaderProps) => {
	const borderColor = useThemeColor("border");

	const headerStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingBottom: Tokens.m,
		borderBottomWidth: 1,
		borderBottomStyle: "solid",
		borderBottomColor: borderColor,
		marginBottom: Tokens.m,
	};

	const titleStyle: React.CSSProperties = {
		fontSize: Typography.fontSize.lg,
		fontWeight: 600,
		margin: 0,
	};

	const closeButtonStyle: React.CSSProperties = {
		padding: Tokens.xs,
		borderRadius: Tokens.xs,
		background: "none",
		border: "none",
		cursor: "pointer",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};

	return (
		<div style={headerStyle}>
			<h2 style={titleStyle}>{children}</h2>
			{closable && onClose && (
				<button type="button" onClick={onClose} aria-label="Close modal" style={closeButtonStyle}>
					<Icon name="close" size="md" />
				</button>
			)}
		</div>
	);
};
