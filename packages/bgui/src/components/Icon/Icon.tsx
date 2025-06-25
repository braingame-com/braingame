import { Platform } from "react-native";
import type { IconProps } from "./types";

// Platform-specific imports and implementations
let IconImplementation: React.ComponentType<IconProps>;

if (Platform.OS === "web") {
	const WebIcon = require("./Icon.web").Icon;
	IconImplementation = WebIcon;
} else {
	const NativeIcon = require("./Icon.native").Icon;
	IconImplementation = NativeIcon;
}

export function Icon(props: IconProps) {
	const Component = IconImplementation as React.FC<IconProps>;
	return <Component {...props} />;
}
