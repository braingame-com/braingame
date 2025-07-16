import type { BoxProps as RestyleBoxProps } from "@shopify/restyle";
import type { Theme } from "../../theme/theme";

/**
 * Shared props interface for Box component
 *
 * Box is the foundational primitive component that provides:
 * - Theme-aware styling
 * - Responsive props
 * - Spacing, colors, and layout utilities
 *
 * The native implementation uses Shopify Restyle's createBox
 * The web implementation uses Joy UI's Box
 */
export type BoxProps = RestyleBoxProps<Theme>;
