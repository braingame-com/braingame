import { createBox, createText, useTheme } from "@shopify/restyle";
import { Pressable } from "react-native";
import type { Theme } from "../../theme/theme";
import type { TabListProps } from "./TabListProps";

const Box = createBox<Theme>();
const ThemedText = createText<Theme>();

/**
 * Native implementation of TabList using Shopify Restyle
 *
 * TODO: Implement by replicating the behavioral logic from Joy UI's useTabList hook
 * Focus on accessibility, state management, and event handling
 */
export function TabList({
	children,
	color = "neutral",
	variant = "solid",
	size = "md",
	disabled = false,
	onClick,
	"aria-label": ariaLabel,
}: TabListProps) {
	const _theme = useTheme<Theme>();

	// TODO: Extract behavioral logic from web-bgui/TabList/useTabList hook
	// TODO: Implement variant styles based on theme.components.BGUI_TabList
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
