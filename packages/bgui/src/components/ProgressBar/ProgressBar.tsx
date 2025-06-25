import { Platform } from "react-native";
import type { ProgressBarProps } from "./types";

// Platform-specific imports and implementations
let ProgressBarImplementation: React.ComponentType<ProgressBarProps>;

if (Platform.OS === "web") {
	const WebProgressBar = require("./ProgressBar.web").ProgressBar;
	ProgressBarImplementation = WebProgressBar;
} else {
	const NativeProgressBar = require("./ProgressBar.native").ProgressBar;
	ProgressBarImplementation = NativeProgressBar;
}

/**
 * ProgressBar component for displaying progress indicators.
 * Supports both linear and circular variants with animations.
 *
 * @example
 * ```tsx
 * // Basic linear progress
 * <ProgressBar value={75} />
 *
 * // Circular progress
 * <ProgressBar
 *   variant="circular"
 *   value={60}
 *   size={100}
 * />
 *
 * // Custom colors
 * <ProgressBar
 *   value={45}
 *   color="#00ff00"
 *   backgroundColor="#cccccc"
 * />
 *
 * // Without animation
 * <ProgressBar
 *   value={progress}
 *   animated={false}
 * />
 *
 * // Small circular indicator
 * <ProgressBar
 *   variant="circular"
 *   value={25}
 *   size={24}
 *   color="red"
 * />
 * ```
 *
 * @component
 */
export const ProgressBar = (props: ProgressBarProps) => {
	const Component = ProgressBarImplementation as React.FC<ProgressBarProps>;
	return <Component {...props} />;
};
