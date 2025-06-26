/**
 * KeyboardAvoidingContainer Component
 * Provides consistent keyboard avoiding behavior across platforms
 */

import type React from "react";
import { KeyboardAvoidingView, Platform, type ViewProps } from "react-native";

export interface KeyboardAvoidingContainerProps extends ViewProps {
	children: React.ReactNode;
	behavior?: "height" | "position" | "padding";
}

/**
 * Container that automatically adjusts when keyboard appears
 * Uses platform-appropriate behavior (padding for iOS, height for Android)
 *
 * @example
 * ```tsx
 * <KeyboardAvoidingContainer>
 *   <ScrollView>
 *     <TextInput />
 *   </ScrollView>
 * </KeyboardAvoidingContainer>
 * ```
 */
export function KeyboardAvoidingContainer({
	children,
	behavior,
	style,
	...props
}: KeyboardAvoidingContainerProps) {
	return (
		<KeyboardAvoidingView
			behavior={behavior || (Platform.OS === "ios" ? "padding" : "height")}
			style={[{ flex: 1 }, style]}
			{...props}
		>
			{children}
		</KeyboardAvoidingView>
	);
}
