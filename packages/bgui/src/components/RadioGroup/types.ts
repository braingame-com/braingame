import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export interface RadioGroupProps {
    children: ReactNode;
    value?: string;
    onValueChange?: (value: string) => void;
    defaultValue?: string;
    disabled?: boolean;
    variant?: "standard" | "card";
    "aria-label"?: string;
    style?: StyleProp<ViewStyle>;
}

export interface RadioGroupItemProps {
    value: string;
    children: ReactNode;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
