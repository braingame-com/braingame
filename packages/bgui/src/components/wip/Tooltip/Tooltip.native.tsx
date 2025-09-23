// @ts-nocheck
import { createBox, createText, useTheme } from "@shopify/restyle";
import { Pressable } from "react-native";
import type { Theme } from "../../../theme/theme";
import type { TooltipProps } from "./TooltipProps";

const Box = createBox<Theme>();
const ThemedText = createText<Theme>();

/**
 * Native implementation of Tooltip using Shopify Restyle
 *
 * TODO: Implement by replicating the behavioral logic from Joy UI's useTooltip hook
 * Focus on accessibility, state management, and event handling
 */
export function Tooltip({
	children,
	color: _color = "neutral",
	variant: _variant = "solid",
	size: _size = "md",
	disabled = false,
	onClick,
	"aria-label": ariaLabel,
}: TooltipProps) {
	const _theme = useTheme<Theme>();

	// TODO: Extract behavioral logic from web-bgui/Tooltip/useTooltip hook
	// TODO: Implement variant styles based on theme.components.BGUI_Tooltip
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
