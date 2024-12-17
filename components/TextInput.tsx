// import type { forwardRef } from "react";
// import type { TextInput as RNTextInput } from "react-native";
// import { styles } from "@/constants/styles";
// import type { TextInputProps } from "@/constants/types";
// import { useThemeColor } from "@/hooks/useThemeColor";

// export const TextInput: typeof forwardRef<RNTextInput, TextInputProps> = ({
// 	placeholder,
// 	placeholderTextColor,
// 	value,
// 	onChangeText,
// 	onKeyPress,
// 	style,
// }: TextInputProps, ref) => {
// 	const color = useThemeColor("text");

// 	return (
// 		<TextInput
// 			ref={ref}
// 			placeholder={placeholder}
// 			placeholderTextColor={placeholderTextColor}
// 			value={value}
// 			onChangeText={onChangeText}
// 			onKeyPress={onKeyPress}
// 			style={{
// 				...styles.textInput,
// 				color,
// 				outline: "none",
// 				...(typeof style === "object" && style),
// 			}}
// 		/>
// 	);
// };
