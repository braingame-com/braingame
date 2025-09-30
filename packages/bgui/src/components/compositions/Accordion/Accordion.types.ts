import type { ReactNode } from "react";

export type AccordionValue = string;

export interface AccordionProps {
	children: ReactNode;
	defaultValue?: AccordionValue | AccordionValue[];
	value?: AccordionValue | AccordionValue[];
	onValueChange?: (value: AccordionValue[]) => void;
	multiple?: boolean;
	disabled?: boolean;
	allowCollapseAll?: boolean;
	style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
}

export interface AccordionItemProps {
	value: AccordionValue;
	title: string;
	description?: string;
	children?: ReactNode;
	disabled?: boolean;
	style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
}
