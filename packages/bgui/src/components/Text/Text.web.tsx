'use client';
import JoyTypography from '../../web-bgui/Typography';
import type { TextProps } from './TextProps';

/**
 * Web implementation of Text - re-exports Joy UI Typography component
 * 
 * Maps Restyle Text props to Joy UI Typography props where possible.
 * The Joy UI implementation is the source of truth for visual design.
 */
export const Text = JoyTypography as React.FC<TextProps>;