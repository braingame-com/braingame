import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export interface PropsTableRow {
	name: string;
	type: string;
	defaultValue?: string;
	required?: boolean;
	description?: ReactNode;
}

export interface PropsTableProps {
	rows: PropsTableRow[];
	title?: string;
	subtitle?: string;
	emptyState?: ReactNode;
	style?: StyleProp<ViewStyle>;
	testID?: string;
}
