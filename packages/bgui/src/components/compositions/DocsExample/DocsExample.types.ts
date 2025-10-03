import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export interface DocsExampleProps {
	title?: string;
	description?: ReactNode;
	code?: string;
	codeLanguage?: string;
	children: ReactNode;
	defaultExpanded?: boolean;
	allowToggle?: boolean;
	copyLabel?: string;
	copiedLabel?: string;
	style?: StyleProp<ViewStyle>;
	testID?: string;
}
