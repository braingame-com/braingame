import { TextInput as RNTextInput, View } from "react-native";
import { Icon } from "../../components/Icon";
import { useTheme } from "../../theme";
import { getInputStyles } from "./styles";
import type { TextInputProps } from "./types";

export function TextInput({
	value,
	onValueChange,
	leftIcon,
	rightIcon,
	variant = "standard",
	style,
	...rest
}: TextInputProps) {
	const { colors } = useTheme();
	const styles = getInputStyles(colors);

	return (
		<View
			style={[
				styles.container,
				variant === "flat" && styles.flat,
				variant === "error" && styles.error,
				style,
			]}
		>
			{leftIcon && <Icon name={leftIcon} style={styles.icon} />}
			<RNTextInput style={styles.input} value={value} onChangeText={onValueChange} {...rest} />
			{rightIcon && <Icon name={rightIcon} style={styles.icon} />}
		</View>
	);
}
