import type { ComponentType } from "react";
import { memo } from "react";

/**
 * Enhanced memo wrapper with display name preservation
 */
export const withMemo = <P extends object>(
	Component: ComponentType<P>,
	displayName?: string,
): ComponentType<P> => {
	const MemoizedComponent = memo(Component);
	MemoizedComponent.displayName =
		displayName || Component.displayName || Component.name || "MemoizedComponent";
	return MemoizedComponent;
};

/**
 * List optimization utilities
 */
export const listOptimizations = {
	// Standard key extractor for items with id
	keyExtractor: (item: { id: string | number }) => String(item.id),

	// Standard list config for better performance
	performanceConfig: {
		removeClippedSubviews: true,
		maxToRenderPerBatch: 10,
		updateCellsBatchingPeriod: 50,
		initialNumToRender: 10,
		windowSize: 10,
	},

	// Get item layout for fixed height items
	getItemLayout: (height: number) => (_data: any, index: number) => ({
		length: height,
		offset: height * index,
		index,
	}),
};

/**
 * Image optimization config
 */
export const imageOptimizations = {
	// Placeholder while loading
	defaultPlaceholder: require("../assets/images/placeholder.png"),

	// Cache control
	cacheControl: "immutable",

	// Priority levels
	priority: {
		low: "low" as const,
		normal: "normal" as const,
		high: "high" as const,
	},
};

/**
 * Animation performance helpers
 */
export const animationOptimizations = {
	// Use native driver config
	nativeDriver: { useNativeDriver: true },

	// Interaction manager wrapper
	runAfterInteractions: (callback: () => void) => {
		const { InteractionManager } = require("react-native");
		InteractionManager.runAfterInteractions(callback);
	},
};
