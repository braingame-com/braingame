import type { ReactNode } from "react";
import type { ImageProps as RNImageProps, StyleProp, ImageStyle } from "react-native";

// Enterprise-grade TypeScript interfaces
export interface ImageProps extends Omit<RNImageProps, "source"> {
    src: string;
    alt: string;
    placeholder?: ReactNode;
    fallback?: ReactNode;
    aspectRatio?: number;
    objectFit?: "cover" | "contain" | "fill";
    variant?: "responsive" | "fixed";
    style?: StyleProp<ImageStyle>;
}
