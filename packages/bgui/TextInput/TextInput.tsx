import { TextInput as RNTextInput } from "react-native";
import { useThemeColor } from "../../utils/hooks/useThemeColor";
import type { TextInputProps } from "./types";

/**
 * Styled text input component that adapts to the current theme.
 */
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
