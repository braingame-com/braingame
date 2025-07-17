import type { TextProps as RestyleTextProps } from "@shopify/restyle";
import type { Theme } from "../../theme/theme";

/**
 * Shared props interface for Text component
 *
 * Text is the typography primitive that handles all text rendering.
 * It supports theme variants, responsive props, and color system.
 *
 * The native implementation uses Shopify Restyle's createText
 * The web implementation uses Joy UI's Typography component
 */
export type TextProps = RestyleTextProps<Theme>;
