import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type AlertVariant = "banner" | "inline" | "floating";
export type AlertType = "info" | "success" | "warning" | "error";

export interface AlertProps {
        variant?: AlertVariant;
        title?: string;
        message: string;
        type?: AlertType;
        actions?: ReactNode;
        dismissible?: boolean;
        onDismiss?: () => void;
        style?: StyleProp<ViewStyle>;
}
