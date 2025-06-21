/**
 * Performance optimizations for FlatList components
 */
export const listOptimizations = {
	keyExtractor: (item: { id: string }) => item.id,
	performanceConfig: {
		removeClippedSubviews: true,
		maxToRenderPerBatch: 10,
		windowSize: 10,
		initialNumToRender: 10,
		getItemLayout: undefined, // Can be added for fixed height items
	},
};

/**
 * A type-safe version of React.memo that preserves component types.
 * Re-export from withMemo for backward compatibility.
 */
export { withMemo } from "./withMemo";
