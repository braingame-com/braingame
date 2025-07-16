import { createBox, createText, useTheme } from "@shopify/restyle";
import React from "react";
import { Pressable, Text } from "react-native";
import type { Theme } from "../../theme/theme";
import type { RadioGroupProps } from "./RadioGroupProps";

const Box = createBox<Theme>();
const ThemedText = createText<Theme>();

/**
 * Native implementation of RadioGroup using Shopify Restyle
 *
 * TODO: Implement by replicating the behavioral logic from Joy UI's useRadioGroup hook
 * Focus on accessibility, state management, and event handling
 */
export function RadioGroup({
	children,
	color = "neutral",
	variant = "solid",
	size = "md",
	disabled = false,
	onClick,
	"aria-label": ariaLabel,
}: RadioGroupProps) {
	const theme = useTheme<Theme>();

	// TODO: Extract behavioral logic from web-bgui/RadioGroup/useRadioGroup hook
	// TODO: Implement variant styles based on theme.components.BGUI_RadioGroup
	// TODO: Implement size variants
	// TODO: Implement color palette support

	return (
		<Pressable
			onPress={disabled ? undefined : onClick}
			disabled={disabled}
			accessible
			accessibilityLabel={ariaLabel}
			accessibilityRole="button"
			accessibilityState={{ disabled }}
		>
			<Box backgroundColor="primary" padding="m" borderRadius="m" opacity={disabled ? 0.5 : 1}>
				<ThemedText variant="button" color="onPrimary">
					{children}
				</ThemedText>
			</Box>
		</Pressable>
	);
}
