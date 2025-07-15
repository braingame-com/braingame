'use client';
import React from 'react';
import type { DividerProps } from './DividerProps';
import { theme as restyleTheme } from '../../theme';

/**
 * Web implementation of Divider component
 * 
 * This creates a visual separator that can be horizontal or vertical,
 * with optional content in the middle.
 */
export const Divider: React.FC<DividerProps> = ({
  children,
  orientation = 'horizontal',
  inset = 'none',
  thickness = 1,
  color = 'outline',
  style,
  testID,
}) => {
  // Get color value from theme or use as-is
  const getColorValue = (colorProp: string): string => {
    const themeColor = restyleTheme.colors[colorProp as keyof typeof restyleTheme.colors];
    return themeColor || colorProp;
  };

  const dividerColor = getColorValue(color);
  const isVertical = orientation === 'vertical';

  // Base styles for the divider
  const baseStyles: React.CSSProperties = {
    position: 'relative',
    alignSelf: 'stretch',
    flexShrink: 0,
    border: 'none',
    margin: 0,
    ...(inset === 'context' && {
      marginLeft: isVertical ? 0 : 'var(--divider-inset, 0)',
      marginRight: isVertical ? 0 : 'var(--divider-inset, 0)',
      marginTop: isVertical ? 'var(--divider-inset, 0)' : 0,
      marginBottom: isVertical ? 'var(--divider-inset, 0)' : 0,
    }),
  };

  // If there are children, render a more complex divider with content
  if (children) {
    const containerStyles: React.CSSProperties = {
      ...baseStyles,
      display: 'flex',
      flexDirection: isVertical ? 'column' : 'row',
      alignItems: 'center',
      gap: restyleTheme.spacing.sm,
      color: restyleTheme.colors.onSurfaceVariant,
      fontSize: restyleTheme.textVariants.caption.fontSize,
      fontFamily: restyleTheme.textVariants.caption.fontFamily,
      ...(style as React.CSSProperties || {}),
    };

    const lineStyles: React.CSSProperties = {
      flex: 1,
      height: isVertical ? 'auto' : thickness,
      width: isVertical ? thickness : 'auto',
      backgroundColor: dividerColor,
    };

    return (
      <div data-testid={testID} style={containerStyles} role="separator">
        <div style={lineStyles} />
        <div>{children}</div>
        <div style={lineStyles} />
      </div>
    );
  }

  // Simple divider without children
  const simpleStyles: React.CSSProperties = {
    ...baseStyles,
    backgroundColor: dividerColor,
    height: isVertical ? '100%' : thickness,
    width: isVertical ? thickness : '100%',
    ...style,
  };

  return (
    <hr
      data-testid={testID}
      style={simpleStyles}
      role="separator"
      aria-orientation={isVertical ? 'vertical' : 'horizontal'}
    />
  );
};