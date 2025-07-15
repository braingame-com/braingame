import { Tokens, Typography } from "@braingame/utils";
import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { Icon } from "../../components/Icon";
import { useTheme } from "../../theme";

interface ModalHeaderProps {
	children: ReactNode;
	closable?: boolean;
	onClose?: () => void;
}

export const ModalHeader = ({ children, closable = true, onClose }: ModalHeaderProps) => {
	const { colors } = useTheme();
	const borderColor = colors.outlineVariant;

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
			<Text style={{ fontSize: Typography.fontSize.lg, fontWeight: "600" }}>{children}</Text>
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
					<Icon name="close" size="md" />
				</Pressable>
			)}
		</View>
	);
};
