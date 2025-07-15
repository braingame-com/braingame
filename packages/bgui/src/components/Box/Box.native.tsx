import { createBox } from '@shopify/restyle';
import type { Theme } from '../../theme/theme';

/**
 * Native implementation of Box using Shopify Restyle
 * 
 * Box is the foundational primitive that all other components build upon.
 * It provides access to the theme and responsive styling capabilities.
 * 
 * @example
 * ```tsx
 * <Box backgroundColor="primary" padding="md" borderRadius="md">
 *   <Text>Content</Text>
 * </Box>
 * ```
 */
export const Box = createBox<Theme>();