import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export interface CodeSnippetProps {
	code: string;
	language?: string;
	caption?: ReactNode;
	style?: StyleProp<ViewStyle>;
	testID?: string;
}
