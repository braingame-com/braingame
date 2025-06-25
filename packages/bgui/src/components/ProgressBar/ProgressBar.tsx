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

export const ProgressBar = (props: ProgressBarProps) => {
	const Component = ProgressBarImplementation as React.FC<ProgressBarProps>;
	return <Component {...props} />;
};
