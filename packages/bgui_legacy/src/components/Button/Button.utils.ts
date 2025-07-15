import { useRef } from "react";
import { Animated } from "react-native";
import { animations } from "../../theme/motion";

/**
 * Create button press animation handlers
 */
export function useButtonAnimation() {
	const scaleAnim = useRef(new Animated.Value(1)).current;

	const handlePressIn = () => {
		animations.buttonPress(scaleAnim).start();
	};

	const handlePressOut = () => {
		animations.buttonRelease(scaleAnim).start();
	};

	return {
		scaleAnim,
		handlePressIn,
		handlePressOut,
	};
}

/**
 * Validate button props for accessibility
 */
export function validateButtonProps(props: {
	label?: string;
	children?: React.ReactNode;
	accessibilityLabel?: string;
}) {
	if (!props.label && !props.children && !props.accessibilityLabel) {
		console.warn(
			"Button: Must provide either 'label', 'children', or 'accessibilityLabel' for accessibility",
		);
	}
}

/**
 * Get accessibility props for button
 */
export function getButtonAccessibilityProps(props: {
	label?: string;
	disabled?: boolean;
	loading?: boolean;
	accessibilityLabel?: string;
	accessibilityHint?: string;
}) {
	return {
		accessible: true,
		accessibilityRole: "button" as const,
		accessibilityLabel: props.accessibilityLabel || props.label,
		accessibilityHint: props.accessibilityHint,
		accessibilityState: {
			disabled: props.disabled || props.loading,
			busy: props.loading,
		},
	};
}
