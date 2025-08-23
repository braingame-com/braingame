import { createBox, createText, useTheme } from "@shopify/restyle";
import { Pressable } from "react-native";
import type { Theme } from "../../theme/theme";
import type { TabProps } from "./TabProps";

const Box = createBox<Theme>();
const ThemedText = createText<Theme>();

/**
 * Native implementation of Tab using Shopify Restyle
 *
 * TODO: Implement by replicating the behavioral logic from Joy UI's useTab hook
 * Focus on accessibility, state management, and event handling
 */
export function Tab({
	children,
	color: _color = "neutral",
	variant: _variant = "solid",
	size: _size = "md",
	disabled = false,
	onClick,
	"aria-label": ariaLabel,
}: TabProps) {
	const _theme = useTheme<Theme>();

	// TODO: Extract behavioral logic from web-bgui/Tab/useTab hook
	// TODO: Implement variant styles based on theme.components.BGUI_Tab
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
			<Box backgroundColor="primary" padding="md" borderRadius="md" opacity={disabled ? 0.5 : 1}>
				<ThemedText variant="button" color="onPrimary">
					{children}
				</ThemedText>
			</Box>
		</Pressable>
	);
}
