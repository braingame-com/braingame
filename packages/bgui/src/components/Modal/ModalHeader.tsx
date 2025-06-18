import { Tokens, useThemeColor } from "@braingame/utils";
import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { Icon } from "../Icon";

interface ModalHeaderProps {
	children: ReactNode;
	closable?: boolean;
	onClose?: () => void;
}

export const ModalHeader = ({ children, closable = true, onClose }: ModalHeaderProps) => {
	const borderColor = useThemeColor("border");

	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				paddingBottom: Tokens.m,
				borderBottomWidth: 1,
				borderBottomColor: borderColor,
				marginBottom: Tokens.m,
			}}
		>
			<Text style={{ fontSize: 18, fontWeight: "600" }}>{children}</Text>
			{closable && onClose && (
				<Pressable
					onPress={onClose}
					accessibilityRole="button"
					accessibilityLabel="Close modal"
					style={{
						padding: Tokens.xs,
						borderRadius: Tokens.xs,
					}}
				>
					<Icon name="x" size="md" />
				</Pressable>
			)}
		</View>
	);
};
