import type { KeyboardEvent } from "react";
import type { View } from "react-native";

declare module "react-native" {
	interface PressableProps {
		onKeyDown?: (event: KeyboardEvent<View>) => void;
	}
}
