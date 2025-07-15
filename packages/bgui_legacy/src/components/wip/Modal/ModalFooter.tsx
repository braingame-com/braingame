import { Tokens } from "@braingame/utils";
import type { ReactNode } from "react";
import { View } from "react-native";
import { useTheme } from "../../theme";

interface ModalFooterProps {
	children: ReactNode;
}

export const ModalFooter = ({ children }: ModalFooterProps) => {
	const { colors } = useTheme();
	const borderColor = colors.outlineVariant;

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
