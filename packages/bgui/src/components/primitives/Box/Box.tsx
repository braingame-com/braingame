import { createBox } from "@shopify/restyle";
import type { Theme } from "../../../theme/theme";

/**
 * Lightweight universal Box primitive built on top of Restyle.
 * Works identically across native and web without platform-specific files.
 */
export const Box = createBox<Theme>();

export type BoxProps = React.ComponentProps<typeof Box>;
