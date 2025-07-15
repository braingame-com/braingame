'use client';
import React from 'react';
import type { TextProps } from './TextProps';
import { theme as restyleTheme } from '../../theme';

/**
 * Web implementation of Text component
 * 
 * This implementation maps Restyle text props to HTML elements and CSS.
 * It supports all theme variants, colors, and responsive typography.
 */
export const Text: React.FC<TextProps & { children?: React.ReactNode; testID?: string; style?: React.CSSProperties }> = (props) => {
  const {
    children,
    variant = 'body1',
    
    // Typography props
    color,
    fontSize,
    fontFamily,
    fontWeight,
    fontStyle,
    lineHeight,
    letterSpacing,
    textAlign,
    textDecorationLine,
    textDecorationStyle,
    textDecorationColor,
    textTransform,
    
    // Spacing props
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingHorizontal,
    paddingVertical,
    p,
    pt,
    pr,
    pb,
    pl,
    px,
    py,
    
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginHorizontal,
    marginVertical,
    m,
    mt,
    mr,
    mb,
    ml,
    mx,
    my,
    
    // Other style props
    opacity,
    
    style: customStyle,
    testID,
    ...rest
  } = props as any; // Type assertion to handle Restyle's complex type system

  // Get variant styles
  const variantKey = typeof variant === 'string' ? variant : 'body1';
  const variantStyles = restyleTheme.textVariants[variantKey as keyof typeof restyleTheme.textVariants] || restyleTheme.textVariants.body1;
  
  // Helper to get color value
  const getColorValue = (value: any): string | undefined => {
    if (!value) return undefined;
    if (typeof value === 'string') {
      // Check if it's a theme color key
      const themeValue = restyleTheme.colors[value as keyof typeof restyleTheme.colors];
      return themeValue || value;
    }
    return value;
  };

  // Helper to get spacing value
  const getSpacingValue = (value: any): string | number | undefined => {
    if (value === undefined || value === null) return undefined;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      // Check if it's a theme spacing key
      const themeValue = restyleTheme.spacing[value as keyof typeof restyleTheme.spacing];
      return themeValue || value;
    }
    return value;
  };

  // Build styles object
  const styles: React.CSSProperties = {
    // Apply variant styles first (can be overridden by props)
    fontFamily: fontFamily || variantStyles.fontFamily,
    fontSize: fontSize || variantStyles.fontSize,
    fontWeight: fontWeight || variantStyles.fontWeight,
    fontStyle,
    lineHeight: lineHeight || variantStyles.lineHeight,
    letterSpacing: letterSpacing ?? (variantStyles as any).letterSpacing,
    textAlign,
    textDecoration: textDecorationLine,
    textDecorationStyle: textDecorationStyle as any,
    textDecorationColor: getColorValue(textDecorationColor),
    textTransform: textTransform || (variantStyles as any).textTransform,
    color: getColorValue(color) || getColorValue(variantStyles.color),
    
    // Spacing - use shorthand props if provided
    padding: getSpacingValue(p ?? padding),
    paddingTop: getSpacingValue(pt ?? paddingTop ?? py ?? paddingVertical),
    paddingRight: getSpacingValue(pr ?? paddingRight ?? px ?? paddingHorizontal),
    paddingBottom: getSpacingValue(pb ?? paddingBottom ?? py ?? paddingVertical),
    paddingLeft: getSpacingValue(pl ?? paddingLeft ?? px ?? paddingHorizontal),
    
    margin: getSpacingValue(m ?? margin),
    marginTop: getSpacingValue(mt ?? marginTop ?? my ?? marginVertical),
    marginRight: getSpacingValue(mr ?? marginRight ?? mx ?? marginHorizontal),
    marginBottom: getSpacingValue(mb ?? marginBottom ?? my ?? marginVertical),
    marginLeft: getSpacingValue(ml ?? marginLeft ?? mx ?? marginHorizontal),
    
    // Other
    opacity,
    
    // Custom styles override
    ...customStyle,
  };

  // Remove undefined values
  const cleanStyles = Object.entries(styles).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key as keyof React.CSSProperties] = value;
    }
    return acc;
  }, {} as React.CSSProperties);

  // Choose the right HTML element based on variant
  const getComponent = () => {
    if (variantKey === 'h1') return 'h1';
    if (variantKey === 'h2') return 'h2';
    if (variantKey === 'h3') return 'h3';
    if (variantKey === 'h4') return 'h4';
    if (variantKey === 'code') return 'code';
    return 'span';
  };

  const Component = getComponent();

  return (
    <Component
      data-testid={testID}
      style={cleanStyles}
      {...rest}
    >
      {children}
    </Component>
  );
};