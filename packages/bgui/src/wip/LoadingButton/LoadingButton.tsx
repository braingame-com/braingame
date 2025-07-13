/**
 * LoadingButton Component
 * Button with built-in loading state management
 */

import { Colors } from "@braingame/utils";
import {
	ActivityIndicator,
	Text,
	type TextStyle,
	TouchableOpacity,
	type TouchableOpacityProps,
	type ViewStyle,
} from "react-native";

export interface LoadingButtonProps extends TouchableOpacityProps {
	title: string;
	loading?: boolean;
	variant?: "primary" | "secondary" | "danger" | "ghost";
	size?: "small" | "medium" | "large";
	textStyle?: TextStyle;
	loadingColor?: string;
}

const variantStyles: Record<string, { button: ViewStyle; text: TextStyle }> = {
	primary: {
		button: {
			backgroundColor: Colors.universal.primary,
		},
		text: {
			color: "#fff",
		},
	},
	secondary: {
		button: {
			backgroundColor: Colors.universal.primaryFaded,
		},
		text: {
			color: Colors.light.text,
		},
	},
	danger: {
		button: {
			backgroundColor: Colors.universal.negative,
		},
		text: {
			color: "#fff",
		},
	},
	ghost: {
		button: {
			backgroundColor: "transparent",
			borderWidth: 1,
			borderColor: Colors.light.border,
		},
		text: {
			color: Colors.light.text,
		},
	},
};

const sizeStyles: Record<string, { button: ViewStyle; text: TextStyle }> = {
	small: {
		button: {
			height: 40,
			paddingHorizontal: 16,
		},
		text: {
			fontSize: 14,
		},
	},
	medium: {
		button: {
			height: 48,
			paddingHorizontal: 20,
		},
		text: {
			fontSize: 16,
		},
	},
	large: {
		button: {
			height: 56,
			paddingHorizontal: 24,
		},
		text: {
			fontSize: 18,
		},
	},
};

/**
 * Button component with loading state
 * Automatically disables interaction and shows spinner when loading
 *
 * @example
 * ```tsx
 * const [loading, setLoading] = useState(false);
 *
 * <LoadingButton
 *   title="Submit"
 *   loading={loading}
 *   onPress={handleSubmit}
 *   variant="primary"
 * />
 * ```
 */
export function LoadingButton({
	title,
	loading = false,
	variant = "primary",
	size = "medium",
	style,
	textStyle,
	loadingColor,
	disabled,
	...props
}: LoadingButtonProps) {
	const variantStyle = variantStyles[variant];
	const sizeStyle = sizeStyles[size];
	const isDisabled = disabled || loading;

	const buttonStyles: ViewStyle[] = [
		{
			borderRadius: 12,
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "row",
		},
		variantStyle.button,
		sizeStyle.button,
		style as ViewStyle,
	];

	if (isDisabled) {
		buttonStyles.push({ opacity: 0.6 });
	}

	const textStyles: TextStyle[] = [
		{
			fontWeight: "600",
		},
		variantStyle.text,
		sizeStyle.text,
		textStyle as TextStyle,
	];

	const spinnerColor = loadingColor || variantStyle.text.color;

	return (
		<TouchableOpacity style={buttonStyles} disabled={isDisabled} activeOpacity={0.8} {...props}>
			{loading ? (
				<ActivityIndicator size="small" color={spinnerColor} />
			) : (
				<Text style={textStyles}>{title}</Text>
			)}
		</TouchableOpacity>
	);
}
