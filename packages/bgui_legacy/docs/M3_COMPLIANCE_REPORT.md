# Material 3 Compliance Master Report

**Date:** 15-07-2025  
**Contributors:** Claude & Gemini (AI Assistants)  
**Purpose:** Unified implementation roadmap for full Material 3 compliance

## Executive Summary

Brain Game has laid excellent M3 foundations with comprehensive documentation and partial implementation. This merged report combines insights from both Claude and Gemini's audits to provide a definitive path to full Material 3 compliance.

**Current Compliance:** ~40%  
**Estimated Effort:** 2-3 weeks  
**Critical Path:** Elevation → Motion → Core Components → Extended Components

### Key Findings
- ✅ **Complete**: M3 Colors, Typography (Text component), Icons, Fonts
- ❌ **Missing**: Elevation system, Motion system, Component patterns (30+ components)
- 🚧 **In Progress**: Component library (2 production, 30+ in wip/)

## Current State Analysis

### ✅ What's Already M3 Compliant

1. **Color System** (100%)
   - Full M3 semantic color implementation via theme provider
   - Light/dark mode support with proper color roles

2. **Typography** (100%)
   - **IMPORTANT**: Text component already implements all 15 M3 type roles
   - Correct font weights (400, 500) and letter spacing
   - Note: Gemini's report incorrectly identified this as non-compliant

3. **Icons** (100%)
   - Material Symbols Rounded via tree-shakeable SVG system
   - 84 icons in registry with consistent 24dp sizing

4. **Documentation** (100%)
   - Complete M3 guides for Typography, Elevation, Motion, Component Patterns
   - Praised by Gemini as "exemplary" and "exceptionally thorough"

### ❌ What Needs Implementation

1. **Elevation System** (0%)
   - No `getElevation()` utility function
   - No Surface component for elevation
   - Components use ad-hoc shadow values

2. **Motion System** (0%)
   - No motion tokens (durations, easings)
   - No reusable animation hooks
   - Inconsistent component animations

3. **Component Library** (~5% M3 compliant)
   - Only 2 components in production (Text, Icon)
   - 30+ components in wip/ using custom patterns
   - No M3 variant systems implemented

## Implementation Roadmap

### Phase 1: Foundation Systems (Days 1-3)

#### 1.1 Create Theme Directory Structure
```bash
mkdir -p packages/bgui/src/theme
touch packages/bgui/src/theme/{elevation,motion,tokens,index}.ts
```

#### 1.2 Implement Elevation System

**File:** `packages/bgui/src/theme/elevation.ts`
```typescript
import { Platform } from 'react-native';

// M3 Elevation levels for React Native
export const elevation = {
  level0: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  level1: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
  },
  level2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 3,
  },
  level3: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  level4: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  level5: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 5.46,
    elevation: 12,
  },
};

// Web elevation (box-shadow)
const webElevation = {
  level0: 'none',
  level1: '0px 1px 2px rgba(0, 0, 0, 0.15)',
  level2: '0px 1px 3px rgba(0, 0, 0, 0.20)',
  level3: '0px 3px 6px rgba(0, 0, 0, 0.25)',
  level4: '0px 4px 8px rgba(0, 0, 0, 0.30)',
  level5: '0px 6px 12px rgba(0, 0, 0, 0.35)',
};

// Utility function
export const getElevation = (level: 0 | 1 | 2 | 3 | 4 | 5) => {
  if (Platform.OS === 'web') {
    return { boxShadow: webElevation[`level${level}`] };
  }
  return elevation[`level${level}`];
};

// Surface tint for M3 (optional enhancement)
export const getSurfaceTint = (level: number, primaryColor: string) => {
  const opacity = level * 0.05;
  return `${primaryColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
};
```

#### 1.3 Create Surface Component

**File:** `packages/bgui/src/components/Surface/Surface.tsx`
```typescript
import React from 'react';
import { View, ViewProps } from 'react-native';
import { getElevation } from '../../theme/elevation';
import { useTheme } from '../../theme';

interface SurfaceProps extends ViewProps {
  level?: 0 | 1 | 2 | 3 | 4 | 5;
  variant?: 'surface' | 'surfaceVariant' | 'surfaceContainer';
  children: React.ReactNode;
}

export function Surface({ 
  level = 0, 
  variant = 'surface',
  style,
  children,
  ...props 
}: SurfaceProps) {
  const { colors } = useTheme();
  const elevationStyle = getElevation(level);
  const backgroundColor = colors[variant];
  
  return (
    <View 
      style={[
        { backgroundColor },
        elevationStyle,
        style
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
```

#### 1.4 Implement Motion System

**File:** `packages/bgui/src/theme/motion.ts`
```typescript
// M3 Duration tokens
export const durations = {
  short1: 50,
  short2: 100,
  short3: 150,
  short4: 200,
  medium1: 250,
  medium2: 300,
  medium3: 350,
  medium4: 400,
  long1: 450,
  long2: 500,
  long3: 550,
  long4: 600,
  extraLong1: 700,
  extraLong2: 800,
  extraLong3: 900,
  extraLong4: 1000,
} as const;

// M3 Easing curves
export const easing = {
  emphasized: {
    accelerate: 'cubic-bezier(0.3, 0.0, 0.8, 0.15)',
    decelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1.0)',
    standard: 'cubic-bezier(0.2, 0.0, 0.0, 1.0)',
  },
  standard: {
    accelerate: 'cubic-bezier(0.3, 0.0, 1.0, 1.0)',
    decelerate: 'cubic-bezier(0.0, 0.0, 0.0, 1.0)',
    standard: 'cubic-bezier(0.2, 0.0, 0.0, 1.0)',
  },
};

// React Native Animated helpers
import { Animated, Easing as RNEasing } from 'react-native';

export const createFadeIn = (
  animatedValue: Animated.Value,
  duration = durations.short2
) => {
  return Animated.timing(animatedValue, {
    toValue: 1,
    duration,
    easing: RNEasing.out(RNEasing.ease),
    useNativeDriver: true,
  });
};

export const createScalePress = (
  animatedValue: Animated.Value,
  toValue = 0.95
) => {
  return Animated.timing(animatedValue, {
    toValue,
    duration: durations.short1,
    easing: RNEasing.out(RNEasing.ease),
    useNativeDriver: true,
  });
};
```

### Phase 2: Core Component Migration (Days 4-7)

#### 2.1 Button Component M3 Migration

**Current State:** Custom variants (primary, secondary, ghost, danger)  
**Target State:** M3 variants (filled, outlined, text, elevated, tonal)

**Step 1: Update Types**
```typescript
// packages/bgui/src/components/Button/types.ts
export type M3ButtonVariant = 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';
export type LegacyButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export interface ButtonProps {
  variant?: M3ButtonVariant | LegacyButtonVariant;
  size?: 'small' | 'medium' | 'large';
  // ... rest of props
}

// Mapping for backward compatibility
export const legacyVariantMap: Record<LegacyButtonVariant, M3ButtonVariant> = {
  primary: 'filled',
  secondary: 'outlined',
  ghost: 'text',
  danger: 'filled', // Will use error color
};
```

**Step 2: Update Styles**
```typescript
// packages/bgui/src/components/Button/Button.tsx
import { Surface } from '../Surface';
import { Text } from '../Text';
import { getElevation } from '../../theme/elevation';
import { createScalePress } from '../../theme/motion';

const getButtonStyle = (variant: M3ButtonVariant, size: ButtonSize) => {
  const heights = { small: 32, medium: 40, large: 48 };
  const paddings = { small: 16, medium: 24, large: 32 };
  
  const baseStyle = {
    height: heights[size],
    paddingHorizontal: paddings[size],
    borderRadius: 20, // M3 pill shape
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const variantStyles = {
    filled: {
      backgroundColor: colors.primary,
    },
    outlined: {
      borderWidth: 1,
      borderColor: colors.outline,
      backgroundColor: 'transparent',
    },
    text: {
      backgroundColor: 'transparent',
      paddingHorizontal: 12, // Less padding for text buttons
    },
    elevated: {
      backgroundColor: colors.surface,
      ...getElevation(1),
    },
    tonal: {
      backgroundColor: colors.secondaryContainer,
    },
  };

  return { ...baseStyle, ...variantStyles[variant] };
};

// Add ripple effect for Android and scale animation
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({ variant = 'filled', children, onPress, ...props }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  // Handle legacy variants
  const mappedVariant = legacyVariantMap[variant] || variant;
  
  if (variant !== mappedVariant && __DEV__) {
    console.warn(`Button: "${variant}" variant is deprecated. Use "${mappedVariant}" instead.`);
  }

  return (
    <AnimatedPressable
      onPressIn={() => createScalePress(scaleAnim, 0.95).start()}
      onPressOut={() => createScalePress(scaleAnim, 1).start()}
      onPress={onPress}
      android_ripple={{ color: colors.onPrimary + '20' }}
      style={[
        getButtonStyle(mappedVariant, size),
        { transform: [{ scale: scaleAnim }] }
      ]}
    >
      <Text variant="labelLarge" color={getTextColor(mappedVariant)}>
        {children}
      </Text>
    </AnimatedPressable>
  );
}
```

#### 2.2 Quick Wins - Immediate Changes

These can be implemented TODAY:

1. **Fix Border Radii**
   ```typescript
   // Button: 20dp (pill shape)
   // Card: 12dp
   // Chip: 8dp
   // Dialog/Modal: 28dp
   // TextField: 4dp (top only for filled variant)
   ```

2. **Update Component Heights**
   ```typescript
   // Button: 40dp (medium)
   // TextField: 56dp
   // Chip: 32dp
   // NavigationBar: 80dp
   ```

3. **Typography Usage**
   ```typescript
   // Button text: <Text variant="labelLarge">
   // Card title: <Text variant="headlineSmall">
   // Card body: <Text variant="bodyMedium">
   // Dialog title: <Text variant="headlineSmall">
   ```

### Phase 3: Extended Components (Days 8-10)

Components to implement from scratch:
- **FAB**: 3 sizes (40dp, 56dp, 96dp) with elevation level 3
- **NavigationBar**: 80dp height with M3 indicators
- **NavigationRail**: Collapsible side navigation
- **BottomSheet**: With handle and drag gestures
- **Chip**: 4 types with 32dp height

### Phase 4: Polish & Testing (Days 11-14)

1. **Interaction States**
   - Ripple effects on Android
   - Hover states for web
   - Focus indicators
   - Disabled states with reduced opacity

2. **Accessibility**
   - ARIA labels
   - Touch target minimums (48x48dp)
   - Keyboard navigation
   - Screen reader support

3. **Performance Optimization**
   - Use native drivers for animations
   - Profile on low-end devices
   - Optimize bundle size

## Migration Strategy

### Gradual Rollout Plan
1. **v1.9-beta**: Release with both old and new APIs
2. **v1.9**: Add deprecation warnings
3. **v2.0**: Remove legacy APIs

### Component Migration Priority
1. **Immediate**: Button, Card, TextField (most used)
2. **High**: Modal, Select, Tabs
3. **Medium**: Chip, Badge, Switch
4. **Low**: Specialized components

## Success Metrics

- ✅ 100% components use M3 variants
- ✅ All elevations use 6-level system
- ✅ All animations use motion tokens
- ✅ 60 FPS animation performance
- ✅ <10% bundle size increase
- ✅ WCAG AA accessibility compliance

## File Structure After Implementation

```
packages/bgui/src/
├── components/         # Production components
│   ├── Button/
│   ├── Card/
│   ├── Icon/          ✅ Already M3
│   ├── Surface/       # New
│   ├── Text/          ✅ Already M3
│   └── ...
├── theme/             # M3 theme system
│   ├── colors.ts      ✅ Already done
│   ├── elevation.ts   # New
│   ├── index.ts
│   ├── motion.ts      # New
│   ├── tokens.ts      # New
│   └── typography.ts  ✅ Already done
└── wip/              # Components being migrated
```

## Next Steps

1. **Today**: Create theme structure and implement elevation/motion systems
2. **This Week**: Migrate Button component as template for others
3. **Next Week**: Complete core component migrations
4. **Testing**: Continuous testing on all platforms

## Conclusion

With excellent M3 documentation already in place and clear implementation examples, achieving full compliance is straightforward. The 2-3 week timeline is realistic with focused effort. The key is systematic implementation starting with foundational systems (elevation, motion) before tackling individual components.

**Most Critical First Step**: Implement the elevation system and Surface component, as nearly every other component will depend on these foundations.