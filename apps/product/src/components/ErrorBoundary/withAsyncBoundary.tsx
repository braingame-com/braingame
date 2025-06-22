/**
 * HOC for wrapping components with AsyncBoundary
 */

import React, { type ComponentType } from "react";
import { AsyncBoundary, type AsyncBoundaryProps } from "./AsyncBoundary";

export interface WithAsyncBoundaryOptions<T>
	extends Omit<AsyncBoundaryProps<T>, "children" | "asyncFn"> {
	/**
	 * The async function to execute
	 */
	asyncFn: () => Promise<T>;
}

/**
 * HOC to wrap a component with AsyncBoundary
 *
 * @example
 * ```tsx
 * const UserProfileWithData = withAsyncBoundary(UserProfile, {
 *   asyncFn: () => fetchUserProfile(),
 *   loadingFallback: <ProfileSkeleton />,
 *   errorFallback: (error, retry) => <ErrorCard error={error} onRetry={retry} />,
 * });
 * ```
 */
export function withAsyncBoundary<P extends { data: T }, T>(
	Component: ComponentType<P>,
	options: WithAsyncBoundaryOptions<T>,
): ComponentType<Omit<P, "data">> {
	const { asyncFn, ...boundaryProps } = options;

	const WrappedComponent = (props: Omit<P, "data">) => {
		return (
			<AsyncBoundary<T> asyncFn={asyncFn} {...boundaryProps}>
				{(data) => <Component {...(props as P)} data={data} />}
			</AsyncBoundary>
		);
	};

	WrappedComponent.displayName = `withAsyncBoundary(${Component.displayName || Component.name || "Component"})`;

	return WrappedComponent;
}
