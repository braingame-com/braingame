import type { Href } from "expo-router";
import type {
	StyleProp,
	TextProps as RNTextProps,
	TextStyle,
	ViewProps as RNViewProps,
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

// export type TextInputProps = {
// 	ref?: RefObject<TextInput>;
// 	placeholder?: string;
// 	placeholderTextColor?: string;
// 	value: string;
// 	onChangeText?: (text: string) => void;
// 	onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
// 	style?: StyleProp<TextStyle>;
// };

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

// Token types
export type SpacingToken = keyof typeof import("./Tokens").Tokens;
export type OpacityToken = keyof typeof import("./Tokens").Opacity;
export type ColorToken = keyof typeof import("./Colors").Colors.light;
export type BorderRadiusToken = keyof typeof import("./BorderRadius").BorderRadius;
export type AnimationDurationToken = keyof typeof import("./Animation").Animation.duration;
export type AnimationEasingToken = keyof typeof import("./Animation").Animation.easing;
export type ShadowToken = keyof typeof import("./Shadows").Shadows;
export type FontSizeToken = keyof typeof import("./Typography").Typography.fontSize;
export type FontWeightToken = keyof typeof import("./Typography").Typography.fontWeight;
export type LineHeightToken = keyof typeof import("./Typography").Typography.lineHeight;
export type LetterSpacingToken = keyof typeof import("./Typography").Typography.letterSpacing;

// Token value types
export type SpacingValue = number;
export type ColorValue = string;
export type OpacityValue = number;

// Theme type
export type Theme = {
	spacing: Record<SpacingToken, SpacingValue>;
	colors: {
		light: Record<ColorToken, ColorValue>;
		dark: Record<ColorToken, ColorValue>;
		universal: Record<string, ColorValue>;
	};
	opacity: Record<OpacityToken, OpacityValue>;
	borderRadius: Record<BorderRadiusToken, number>;
	animation: {
		duration: Record<AnimationDurationToken, number>;
		easing: Record<AnimationEasingToken, string>;
	};
	shadows: Record<ShadowToken, ViewStyle>;
	typography: {
		fontSize: Record<FontSizeToken, number>;
		fontWeight: Record<FontWeightToken, string>;
		lineHeight: Record<LineHeightToken, number>;
		letterSpacing: Record<LetterSpacingToken, number>;
	};
};

// Semantic token types
export type SemanticSpacingType = "none" | "tight" | "normal" | "loose" | "extra-loose";
export type SemanticSize = "tiny" | "small" | "medium" | "large" | "huge";
export type SemanticIntent = "primary" | "secondary" | "success" | "warning" | "danger" | "info";

// Platform-specific token override
export type PlatformTokens<T> = {
	default: T;
	ios?: Partial<T>;
	android?: Partial<T>;
	web?: Partial<T>;
};
