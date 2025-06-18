import { TextInput as RNTextInput, StyleSheet, View } from "react-native";
import { Colors } from "../../utils/constants/Colors";
import { Tokens } from "../../utils/constants/Tokens";
import { useThemeColor } from "../../utils/hooks/useThemeColor";
import { Icon } from "../Icon";
import type { TextInputProps } from "./types";

/**
 * Styled text input component with variants and accessibility features.
 */
export const TextInput = ({
	style,
	containerStyle,
	leftIcon,
	rightIcon,
	variant = "standard",
	onValueChange,
	value,
	"aria-label": ariaLabel,
	"aria-describedby": ariaDescribedBy,
	editable = true,
	...rest
}: TextInputProps) => {
	const textColor = useThemeColor("text");
	const placeholderColor = useThemeColor("textSecondary");
	const backgroundColor = variant === "flat" ? "transparent" : useThemeColor("background");
	const baseBorderColor = useThemeColor("border");
	const borderColor = variant === "error" ? Colors.universal.negative : baseBorderColor;

	return (
		<View
			style={[
				styles.container,
				variant === "standard" && { borderWidth: 1 },
				variant === "flat" && { borderBottomWidth: 1 },
				variant === "error" && { borderWidth: 1 },
				{ borderColor, backgroundColor },
				!editable && styles.disabled,
				containerStyle,
			]}
			accessible
			accessibilityLabel={ariaLabel}
			accessibilityHint={ariaDescribedBy}
		>
			{leftIcon && (
				<Icon name={leftIcon} size={"secondary"} color={textColor} style={styles.icon} />
			)}
			<RNTextInput
				value={value}
				onChangeText={onValueChange}
				placeholderTextColor={placeholderColor}
				editable={editable}
				style={[styles.input, { color: textColor }]}
				accessibilityLabel={ariaLabel}
				accessibilityHint={ariaDescribedBy}
				{...rest}
			/>
			{rightIcon && (
				<Icon name={rightIcon} size={"secondary"} color={textColor} style={styles.icon} />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: Tokens.s,
		paddingVertical: Tokens.xs,
		borderRadius: Tokens.xs,
	},
	input: {
		flex: 1,
		fontSize: Tokens.m,
		padding: 0,
	},
	icon: {
		marginHorizontal: Tokens.xs,
	},
	disabled: {
		opacity: 0.5,
	},
});
