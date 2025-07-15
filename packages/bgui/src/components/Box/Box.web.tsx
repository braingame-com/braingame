'use client';
import JoyBox from '../../web-bgui/Box';
import type { BoxProps } from './BoxProps';

/**
 * Web implementation of Box - re-exports Joy UI component
 * The Joy UI implementation is the source of truth for visual design
 */
export const Box = JoyBox as React.FC<BoxProps>;
