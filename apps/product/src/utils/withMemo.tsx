import React from "react";

/**
 * A type-safe version of React.memo.
 *
 * This utility correctly infers the props of the wrapped component
 * and preserves its display name, making it easier to debug.
 *
 * @param Component The component to be memoized.
 * @param componentName The display name for the component.
 * @returns A memoized component with a proper display name.
 */
export const withMemo = <P extends object>(
	Component: React.ComponentType<P>,
	displayName: string,
): React.MemoExoticComponent<React.ComponentType<P>> => {
	const Memoized = React.memo(Component);
	Memoized.displayName = displayName;
	return Memoized;
};
