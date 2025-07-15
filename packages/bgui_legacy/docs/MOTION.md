# BGUI Motion System

This document outlines the motion and animation standards for the Brain Game UI Kit (BGUI), based on Google's Material 3 (M3) design system. Motion brings the interface to life while maintaining usability and accessibility.

## 1. Material 3 Motion Principles

Material 3 motion follows these core principles:
- **Informative**: Motion helps users understand what's happening
- **Focused**: Directs attention to what matters
- **Expressive**: Adds character and polish to interactions
- **Accessible**: Respects user preferences and system settings

## 2. Motion Tokens

### Duration Categories
Understanding motion duration categories helps create intuitive interactions:

1. **Micro (0-100ms)**
   - **Use for:** Instant feedback (ripples, icon color shifts)
   - **Feel:** Instantaneous; avoids drawing undue attention
   - **Examples:** Hover states, active states, micro-interactions

2. **Small (100-200ms)**
   - **Use for:** Hover/focus states, small popovers or tooltips
   - **Feel:** Quick but perceptible, guiding the eye without lag
   - **Examples:** Button press, checkbox toggle, icon transitions

3. **Medium (200-300ms)**
   - **Use for:** Menu open/close, tab switches, inline content reveals
   - **Feel:** Smooth spatial shifts; helps users follow state changes
   - **Examples:** Dropdown menus, accordion panels, tab transitions

4. **Large (300-500ms)**
   - **Use for:** Modals, dialogs, full-screen transitions, complex motions
   - **Feel:** Conveys larger context; avoids feeling too abrupt
   - **Examples:** Page transitions, modal overlays, complex choreography

### Duration Tokens
M3 defines standard durations for consistent timing across the UI:

| Token | Duration | Category | Use Cases |
| :--- | :--- | :--- | :--- |
| **short1** | 50ms | Micro | Instant feedback, selection |
| **short2** | 100ms | Small | Hover states, small transitions |
| **short3** | 150ms | Small | Icon transforms, small reveals |
| **short4** | 200ms | Medium | Bottom sheet peek, chips |
| **medium1** | 250ms | Medium | Card expansion, FAB morph |
| **medium2** | 300ms | Large | Bottom sheet full, nav drawer |
| **medium3** | 350ms | Large | Dialog appear, page transition |
| **medium4** | 400ms | Large | Complex choreography |
| **long1** | 450ms | Large | Stagger sequences start |
| **long2** | 500ms | Extra | Emphasis animations |
| **long3** | 550ms | Extra | Screen-to-screen transitions |
| **long4** | 600ms | Extra | Complex multi-element sequences |
| **extraLong1** | 700ms | Extra | Onboarding, first-run |
| **extraLong2** | 800ms | Extra | Celebrations, achievements |
| **extraLong3** | 900ms | Extra | Major state changes |
| **extraLong4** | 1000ms | Extra | Maximum duration |

### Easing Tokens
M3 uses specific easing curves for natural motion:

```typescript
export const easing = {
  // Emphasized easing - for user-initiated actions
  emphasized: {
    accelerate: 'cubic-bezier(0.3, 0.0, 0.8, 0.15)',
    decelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1.0)',
    standard: 'cubic-bezier(0.2, 0.0, 0.0, 1.0)',
  },
  
  // Standard easing - for system-initiated actions
  standard: {
    accelerate: 'cubic-bezier(0.3, 0.0, 1.0, 1.0)',
    decelerate: 'cubic-bezier(0.0, 0.0, 0.0, 1.0)',
    standard: 'cubic-bezier(0.2, 0.0, 0.0, 1.0)',
  },
  
  // Material Design 2 (legacy)
  material2: {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1.0)',
    sharp: 'cubic-bezier(0.4, 0.0, 1.0, 1.0)',      // Quick, aggressive
    complex: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',  // Multi-stage animations
  },
  
  // Legacy (for compatibility)
  legacy: {
    accelerate: 'cubic-bezier(0.4, 0.0, 1.0, 1.0)',
    decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1.0)',
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1.0)',
  },
};
```

### Material Motion Web
Specific timing recommendations for web implementations:

- **Hover ripple:** 100ms with sharp easing
- **Enter screen:** 225ms with standard easing  
- **Exit screen:** 195ms with standard easing
- **Complex motion:** 375ms with complex easing

## 3. Motion Patterns

### Fade
Simple opacity transitions for appearing/disappearing elements:
```typescript
// Fade in
duration: tokens.short2 (100ms)
easing: easing.standard.decelerate
from: { opacity: 0 }
to: { opacity: 1 }

// Fade out
duration: tokens.short1 (50ms)
easing: easing.standard.accelerate
from: { opacity: 1 }
to: { opacity: 0 }
```

### Scale
Growing/shrinking for emphasis and hierarchy:
```typescript
// Scale up (appear)
duration: tokens.medium1 (250ms)
easing: easing.emphasized.decelerate
from: { scale: 0.8, opacity: 0 }
to: { scale: 1, opacity: 1 }

// Scale down (disappear)
duration: tokens.short4 (200ms)
easing: easing.emphasized.accelerate
from: { scale: 1, opacity: 1 }
to: { scale: 0.8, opacity: 0 }
```

### Slide
Directional movement for navigation and reveals:
```typescript
// Slide in from right
duration: tokens.medium2 (300ms)
easing: easing.emphasized.decelerate
from: { translateX: screenWidth, opacity: 0 }
to: { translateX: 0, opacity: 1 }

// Slide out to left
duration: tokens.medium1 (250ms)
easing: easing.emphasized.accelerate
from: { translateX: 0, opacity: 1 }
to: { translateX: -screenWidth, opacity: 0 }
```

### Shared Axis
For navigating between peer elements:
```typescript
// Forward navigation
duration: tokens.medium2 (300ms)
easing: easing.emphasized.standard
outgoing: { translateX: '-30%', opacity: 0 }
incoming: { translateX: '0%', opacity: 1 }

// Backward navigation
duration: tokens.medium2 (300ms)
easing: easing.emphasized.standard
outgoing: { translateX: '30%', opacity: 0 }
incoming: { translateX: '0%', opacity: 1 }
```

## 4. Choreography

### Sequential
Elements animate one after another:
```typescript
const staggerDelay = 50; // ms between each element
items.forEach((item, index) => {
  item.animate({
    delay: index * staggerDelay,
    duration: tokens.short3,
    ...fadeInAnimation
  });
});
```

### Parallel
Multiple elements animate together:
```typescript
Animated.parallel([
  Animated.timing(scaleValue, scaleConfig),
  Animated.timing(opacityValue, fadeConfig),
]).start();
```

## 5. Component-Specific Motion

### Buttons
- **Press**: Scale down to 0.95 (50ms)
- **Release**: Scale up to 1.0 (100ms)
- **Ripple**: Radial expansion (300ms)

### Cards
- **Hover**: Elevate with scale 1.02 (200ms)
- **Press**: Scale 0.98 (100ms)
- **Expand**: Height animation (300ms)

### FAB (Floating Action Button)
- **Enter**: Scale + fade (250ms, overshoot)
- **Exit**: Scale + fade (200ms)
- **Morph**: Transform to sheet (400ms)

### Bottom Sheet
- **Peek**: Slide up 20% (200ms)
- **Expand**: Slide to full (300ms)
- **Dismiss**: Slide down (250ms)

### Navigation Drawer
- **Open**: Slide in + fade scrim (300ms)
- **Close**: Slide out + fade scrim (250ms)

## 6. Implementation in React Native

### Using Animated API
```typescript
import { Animated, Easing } from 'react-native';

const fadeIn = (value: Animated.Value) => {
  Animated.timing(value, {
    toValue: 1,
    duration: durations.short2,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: true,
  }).start();
};
```

### Using Reanimated 2
```typescript
import Animated, { 
  withTiming, 
  withSpring,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

const animatedStyle = useAnimatedStyle(() => {
  return {
    transform: [{
      scale: withTiming(scale.value, {
        duration: durations.medium1,
        easing: Easing.out(Easing.cubic),
      }),
    }],
  };
});
```

### Spring Physics
For natural, physics-based motions (draggables, fling gestures):

```typescript
// React Native Animated
const springConfig = {
  stiffness: 120,      // Tension (higher = stiffer)
  damping: 15,         // Friction (higher = less bouncy)
  mass: 1,             // Weight (higher = slower)
  useNativeDriver: true,
};

// Reanimated 2
const springStyle = useAnimatedStyle(() => {
  return {
    transform: [{
      scale: withSpring(scale.value, {
        stiffness: 120,
        damping: 15,
        mass: 1,
      }),
    }],
  };
});

// Common spring presets
export const springPresets = {
  // Gentle - for large UI elements
  gentle: { stiffness: 100, damping: 15, mass: 1 },
  
  // Standard - for most interactions
  standard: { stiffness: 120, damping: 15, mass: 1 },
  
  // Snappy - for small, quick interactions
  snappy: { stiffness: 180, damping: 20, mass: 0.8 },
  
  // Bouncy - for playful interactions
  bouncy: { stiffness: 200, damping: 10, mass: 1 },
  
  // Stiff - for precise, no-nonsense interactions
  stiff: { stiffness: 300, damping: 30, mass: 1 },
};
```

## 7. Accessibility Considerations

### Respect System Settings
```typescript
import { AccessibilityInfo } from 'react-native';

const [reduceMotion, setReduceMotion] = useState(false);

useEffect(() => {
  AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
}, []);

// Adjust or skip animations when reduceMotion is true
const duration = reduceMotion ? 0 : durations.medium2;
```

### Motion Preferences
- **Reduce Motion**: Skip or minimize animations
- **Prefer Cross-Fade**: Replace slides with fades
- **Auto-Play**: Respect user's auto-play settings

## 8. Performance Guidelines

1. **Use Native Driver**: Enable `useNativeDriver: true` when possible
2. **Avoid Layout Animations**: Prefer transforms over layout changes
3. **Batch Updates**: Group related animations
4. **Test on Device**: Simulators don't reflect real performance
5. **60 FPS Target**: Ensure smooth 60fps animations

## 9. Best Practices

### Do's
- ✅ Keep animations under 400ms for common interactions
- ✅ Use consistent timing for similar actions
- ✅ Make motion meaningful, not decorative
- ✅ Test with reduced motion enabled
- ✅ Use spring animations for playful interactions

### Don'ts
- ❌ Don't animate everything
- ❌ Avoid linear easing (looks mechanical)
- ❌ Don't block user interaction during animation
- ❌ Avoid overly complex choreography
- ❌ Don't use motion as the only feedback

## 10. Animation Tokens (Legacy)

For projects still using the legacy token system:

```typescript
// Legacy animation duration tokens
export const Animation = {
  duration: {
    instant: 0,      // No animation
    fast: 100,       // Very quick
    normal: 200,     // Standard
    slow: 300,       // Deliberate
    verySlow: 500,   // Emphasis
  },
  easing: {
    linear: [0, 0, 1, 1],
    ease: [0.25, 0.1, 0.25, 1],
    easeIn: [0.42, 0, 1, 1],
    easeOut: [0, 0, 0.58, 1],
    easeInOut: [0.42, 0, 0.58, 1],
    smooth: [0.4, 0, 0.2, 1],  // Material standard
  },
};

// Semantic animation tokens
export const SemanticAnimation = {
  hover: 150,        // Quick hover response
  press: 100,        // Button press
  interaction: 200,  // User interactions
  transition: 300,   // Page transitions
  emphasis: 500,     // Important animations
};
```

## 11. Motion Utilities

```typescript
// packages/bgui/src/utils/motion.ts

export const createFadeInAnimation = (delay = 0) => ({
  from: { opacity: 0 },
  to: { opacity: 1 },
  delay,
  config: {
    duration: durations.short2,
    easing: easing.standard.decelerate,
  },
});

export const createScaleAnimation = (
  fromScale = 0.8,
  toScale = 1,
  duration = durations.medium1
) => ({
  from: { scale: fromScale },
  to: { scale: toScale },
  config: {
    duration,
    easing: easing.emphasized.decelerate,
  },
});

// Create animation with legacy tokens
export const createAnimation = (
  duration: keyof typeof Animation.duration,
  easingType: keyof typeof Animation.easing
) => ({
  duration: Animation.duration[duration],
  easing: Animation.easing[easingType],
});

// Animation composition helpers
export const combinedAnimation = (
  animations: Array<Animated.CompositeAnimation>
): Animated.CompositeAnimation => {
  return Animated.parallel(animations);
};

export const sequenceAnimation = (
  animations: Array<Animated.CompositeAnimation>,
  delay = 0
): Animated.CompositeAnimation => {
  return Animated.sequence([
    Animated.delay(delay),
    ...animations,
  ]);
};
```