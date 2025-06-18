import { forwardRef, memo, useCallback, useMemo } from "react";
import { Pressable, type View } from "react-native";
import { Text } from "../../../Text";
import { useTabsContext } from "./context";
import { styles } from "./styles";
import type { TabProps } from "./types";

const TabComponent = forwardRef<View, TabProps>(function Tab(
	{ children, value, disabled, tabRef },
	ref,
) {
	const { activeTab, onValueChange, variant } = useTabsContext();
	const isActive = activeTab === value;

	const handlePress = useCallback(() => {
		if (!disabled) {
			onValueChange(value);
		}
	}, [disabled, onValueChange, value]);

	const handleRef = useCallback(
		(node: View | null) => {
			if (typeof ref === "function") {
				ref(node);
			} else if (ref) {
				ref.current = node;
			}
			tabRef?.(node);
		},
		[ref, tabRef],
	);

	const tabStyle = useMemo(() => {
		const baseStyle = styles.tab;
		const additionalStyles: any[] = [];

		if (variant === "pills") {
			additionalStyles.push(styles.pill);
			if (isActive) additionalStyles.push(styles.pillActive);
		} else if (variant === "line" && isActive) {
			additionalStyles.push(styles.lineActive);
		} else if (variant === "enclosed" && isActive) {
			additionalStyles.push(styles.enclosedActive);
		}

		return [baseStyle, ...additionalStyles];
	}, [variant, isActive]);

	const accessibilityLabel = useMemo(
		() => (typeof children === "string" ? children : undefined),
		[children],
	);

	return (
		<Pressable
			ref={handleRef}
			accessibilityRole="tab"
			accessibilityState={{ selected: isActive, disabled }}
			accessibilityLabel={accessibilityLabel}
			nativeID={`tab-${value}`}
			aria-controls={`panel-${value}`}
			onPress={handlePress}
			style={tabStyle}
		>
			{typeof children === "string" ? <Text>{children}</Text> : children}
		</Pressable>
	);
});

// Wrap with memo for optimal performance
export const Tab = memo(TabComponent);
