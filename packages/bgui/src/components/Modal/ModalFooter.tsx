import { Tokens, useThemeColor } from "@braingame/utils";
import type { ReactNode } from "react";
import { View } from "react-native";

interface ModalFooterProps {
	children: ReactNode;
}

export const ModalFooter = ({ children }: ModalFooterProps) => {
	const borderColor = useThemeColor("border");

	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "flex-end",
				alignItems: "center",
				gap: Tokens.s,
				paddingTop: Tokens.m,
				borderTopWidth: 1,
				borderTopColor: borderColor,
				marginTop: Tokens.m,
			}}
		>
			{children}
		</View>
	);
};
