import { createText } from '@shopify/restyle';
import type { Theme } from '../../theme/theme';

/**
 * Native implementation of Text using Shopify Restyle
 * 
 * Text is the typography primitive that provides:
 * - Theme-aware text styling
 * - Typography variants (h1, h2, body1, body2, etc.)
 * - Responsive text properties
 * 
 * @example
 * ```tsx
 * <Text variant="h1" color="primary">Heading</Text>
 * <Text variant="body1">Body text</Text>
 * <Text variant="caption" color="onSurfaceVariant">Caption</Text>
 * ```
 */
export const Text = createText<Theme>();