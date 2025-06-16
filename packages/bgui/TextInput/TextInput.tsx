import { TextInput as RNTextInput } from "react-native";
import { useThemeColor } from "../../utils/hooks/useThemeColor";
import type { TextInputProps } from "./types";

export const TextInput = ({ style, ...rest }: TextInputProps) => {
	const color = useThemeColor("text");
	const placeholderColor = useThemeColor("textSecondary");

	return (
		<RNTextInput
			style={[
				{
					color,
					borderColor: useThemeColor("border"),
					backgroundColor: useThemeColor("background"),
				},
				style,
			]}
			placeholderTextColor={placeholderColor}
			{...rest}
		/>
	);
};
