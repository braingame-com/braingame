import { forwardRef } from "react";
import { Pressable } from "react-native";
import { Text } from "../../../Text";
import { useTabsContext } from "./context";
import { styles } from "./styles";
import type { TabProps } from "./types";

export const Tab = forwardRef<Pressable, TabProps>(function Tab(
	{ children, value, disabled, tabRef },
	ref,
) {
	const { activeTab, onValueChange, variant } = useTabsContext();
	const isActive = activeTab === value;

	const handlePress = () => {
		if (!disabled) {
			onValueChange(value);
		}
	};

	return (
		<Pressable
			ref={(node) => {
				if (typeof ref === "function") {
					ref(node);
				} else if (ref) {
					ref.current = node;
				}
				tabRef?.(node);
			}}
			accessibilityRole="tab"
			accessibilityState={{ selected: isActive, disabled }}
			accessibilityLabel={typeof children === "string" ? children : undefined}
			nativeID={`tab-${value}`}
			aria-controls={`panel-${value}`}
			onPress={handlePress}
			style={[
				styles.tab,
				variant === "pills" && styles.pill,
				variant === "line" && isActive && styles.lineActive,
				variant === "enclosed" && isActive && styles.enclosedActive,
				variant === "pills" && isActive && styles.pillActive,
			]}
		>
			{typeof children === "string" ? <Text>{children}</Text> : children}
		</Pressable>
	);
});
