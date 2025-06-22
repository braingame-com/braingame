import type { Href } from "expo-router";
import type {
	TextProps as RNTextProps,
	ViewProps as RNViewProps,
	StyleProp,
	TextStyle,
	ViewStyle,
} from "react-native";
import type {
	HandlerStateChangeEvent,
	PanGestureHandlerEventPayload,
	PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import type { SharedValue } from "react-native-reanimated";

// View types
export type ViewProps = RNViewProps & {
	type?: "background" | "card" | "mini-card";
	transparent?: boolean;
	rounded?: boolean;
	border?: boolean;
	hoverable?: boolean;
	grabbable?: boolean;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
};

// Text types
export type TextProps = RNTextProps & {
	type?: "display" | "title" | "subtitle" | "default" | "small" | "link";
};

export type LinkProps = {
	text: string;
	href: Href;
	style?: StyleProp<TextStyle>;
};

// Button types
export type ButtonProps = {
	text?: string;
	icon?: string;
	iconColor?: string;
	iconType?: string;
	onPress: () => void;
	disabled?: boolean;
};

// Icon types
export type IconSizeProps = "primary" | "secondary" | "small";

export type IconPrefix = "far" | "fas" | "fab";

export type IconProps = {
	name: string;
	color?: string;
	size?: IconSizeProps | number;
	type?: string;
	style?: StyleProp<ViewStyle>;
};

// tasks.tsx types
export type DraggableTaskItemProps = {
	text: string;
	index: number;
	onGestureEvent: (event: PanGestureHandlerGestureEvent) => void;
	onHandlerStateChange: (event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => void;
	translateY: SharedValue<number>;
	isDragging: SharedValue<boolean>;
	targetIndex: number | null;
	itemHeight: number;
};

export type DraggableTaskHandlersProps = {
	initialIndex: number;
	itemHeight: number;
	swapTasks: (fromIndex: number, toIndex: number) => void;
	setTargetIndex: (index: number | null) => void;
	taskOrder: string[];
	setTaskOrder: (prev: string[]) => void;
};
