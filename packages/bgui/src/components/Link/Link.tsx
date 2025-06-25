import { Platform } from "react-native";
import type { LinkProps } from "./types";

// Platform-specific imports and implementations
let LinkImplementation: React.ComponentType<LinkProps>;

if (Platform.OS === "web") {
	const WebLink = require("./Link.web").Link;
	LinkImplementation = WebLink;
} else {
	const NativeLink = require("./Link.native").Link;
	LinkImplementation = NativeLink;
}

export const Link = (props: LinkProps) => {
	const Component = LinkImplementation as React.FC<LinkProps>;
	return <Component {...props} />;
};
