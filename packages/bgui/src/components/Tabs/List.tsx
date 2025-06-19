import { Children, cloneElement, isValidElement, useRef } from "react";
import { type NativeSyntheticEvent, ScrollView, View } from "react-native";
import { useTabsContext } from "./context";
import { styles } from "./styles";
import type { TabProps, TabsListProps } from "./types";

export const List = ({ children }: TabsListProps) => {
	const { scrollable } = useTabsContext();
	const containerRef = useRef<ScrollView | View | null>(null);
	const tabRefs = useRef<(View | null)[]>([]);

	const _handleKeyDown = (e: NativeSyntheticEvent<{ key: string }>) => {
		const key = e.nativeEvent.key;
		const currentIndex = tabRefs.current.findIndex(
			(ref) => ref && ref === (e.target as unknown as View),
		);
		if (key === "ArrowRight") {
			const next = (currentIndex + 1) % tabRefs.current.length;
			tabRefs.current[next]?.focus?.();
		}
		if (key === "ArrowLeft") {
			const prev = currentIndex - 1 < 0 ? tabRefs.current.length - 1 : currentIndex - 1;
			tabRefs.current[prev]?.focus?.();
		}
	};

	const childrenWithRefs = Children.map(children, (child, index) => {
		if (isValidElement(child)) {
			return cloneElement(child as React.ReactElement<TabProps>, {
				tabRef: (node: View | null) => {
					tabRefs.current[index] = node;
				},
			});
		}
		return child;
	});

	const Container = scrollable ? ScrollView : View;

	return (
		<Container
			ref={containerRef}
			horizontal={scrollable}
			accessibilityRole="tablist"
			style={[styles.list, scrollable && styles.scrollable]}
			// onKeyDown={handleKeyDown} // Not supported in React Native
		>
			{childrenWithRefs}
		</Container>
	);
};
