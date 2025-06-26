import type React from "react";
import { Platform, Text as RNText } from "react-native";
import { getBaseStyle, getFloatingStyle, requiredStyle } from "./styles";
import type { LabelProps } from "./types";

/**
 * Label component for form field descriptions.
 * Provides accessible labels with size variants and required indicators.
 *
 * @example
 * ```tsx
 * // Basic label
 * <Label htmlFor="email-input">Email Address</Label>
 * <TextInput id="email-input" />
 *
 * // Required field label
 * <Label htmlFor="password" required>
 *   Password
 * </Label>
 * <TextInput id="password" type="password" />
 *
 * // Different sizes
 * <Label size="sm">Small Label</Label>
 * <Label size="md">Medium Label</Label>
 * <Label size="lg">Large Label</Label>
 *
 * // Floating variant (for Material-style inputs)
 * <View>
 *   <Label variant="floating" htmlFor="username">
 *     Username
 *   </Label>
 *   <TextInput id="username" />
 * </View>
 *
 * // Custom styled label
 * <Label
 *   htmlFor="bio"
 *   style={{ color: '#666', fontWeight: '600' }}
 * >
 *   Biography
 * </Label>
 * <TextInput id="bio" multiline />
 * ```
 *
 * @component
 */
export const Label = ({
	children,
	htmlFor,
	required = false,
	size = "md",
	variant = "standard",
	style,
}: LabelProps) => {
	const baseStyle = getBaseStyle(size);
	const floatingStyle = variant === "floating" ? getFloatingStyle() : {};

	if (Platform.OS === "web") {
		return (
			<label htmlFor={htmlFor} style={style as React.CSSProperties}>
				<RNText style={[baseStyle, floatingStyle]}>
					{children}
					{required && (
						<RNText accessibilityElementsHidden accessibilityRole="none" style={requiredStyle}>
							*
						</RNText>
					)}
				</RNText>
			</label>
		);
	}

	return (
		<RNText
			style={[baseStyle, floatingStyle, style]}
			nativeID={htmlFor ? `${htmlFor}-label` : undefined}
		>
			{children}
			{required && (
				<RNText accessibilityElementsHidden accessibilityRole="none" style={requiredStyle}>
					*
				</RNText>
			)}
		</RNText>
	);
};
