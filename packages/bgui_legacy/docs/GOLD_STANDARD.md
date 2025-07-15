# BGUI Gold Standard Components

This document defines what makes a component "gold standard" in the Brain Game UI Kit (BGUI). All components must meet these criteria before being moved from `wip/` to `components/`.

## Gold Standard Definition

A gold standard component is one that achieves excellence in every aspect: design compliance, code quality, performance, accessibility, and developer experience.

### Current Gold Standard Components
1. **Text** - Full M3 typography implementation
2. **Icon** - Material Symbols Rounded with tree-shaking
3. **Button** - All 5 M3 variants with proper motion

## The Gold Standard Checklist

Every component MUST satisfy ALL of these requirements:

### 1. Material 3 Compliance ✓
- [ ] Uses official M3 specifications (sizing, spacing, corner radius)
- [ ] Implements all required variants from M3 docs
- [ ] Uses theme colors exclusively (no hardcoded values)
- [ ] Applies proper elevation using Surface component
- [ ] Follows M3 motion principles with theme tokens

### 2. TypeScript Excellence ✓
- [ ] Full type safety with no `any` types
- [ ] Comprehensive JSDoc comments on all exports
- [ ] Proper interface definitions with descriptions
- [ ] Extends appropriate React Native types
- [ ] Exports all necessary types from index.ts

### 3. Component Architecture ✓
- [ ] Single responsibility (does one thing well)
- [ ] Composition-friendly (works well with others)
- [ ] No side effects or external dependencies
- [ ] Uses hooks appropriately (useTheme, etc.)
- [ ] Clean file structure:
  ```
  components/ComponentName/
  ├── ComponentName.tsx      # Main component
  ├── types.ts              # TypeScript interfaces
  ├── index.ts              # Public exports
  ├── ComponentName.test.tsx # Unit tests
  └── ComponentName.stories.tsx # Storybook stories
  ```

### 4. Styling Standards ✓
- [ ] No inline style objects (use StyleSheet or themed styles)
- [ ] Responsive to theme changes (light/dark mode)
- [ ] Platform-specific optimizations where needed
- [ ] Consistent spacing using theme tokens
- [ ] No magic numbers - all values from theme

### 5. Animation & Interaction ✓
- [ ] Uses motion tokens for all animations
- [ ] Implements platform-specific feedback:
  - Android: Ripple effects
  - iOS: Scale/opacity animations
  - Web: Hover states
- [ ] Smooth 60 FPS animations
- [ ] Respects `prefers-reduced-motion`
- [ ] Loading and disabled states

### 6. Accessibility ✓
- [ ] Minimum touch targets (48x48dp)
- [ ] Proper ARIA labels and roles
- [ ] Keyboard navigation support (web)
- [ ] Screen reader compatibility
- [ ] High contrast mode support
- [ ] Focus indicators

### 7. Testing Coverage ✓
- [ ] Unit tests with >90% coverage
- [ ] Tests for all props and variants
- [ ] Interaction tests (press, focus, etc.)
- [ ] Accessibility tests
- [ ] Snapshot tests for visual regression

### 8. Documentation ✓
- [ ] Comprehensive Storybook stories
- [ ] All variants demonstrated
- [ ] Interactive controls for all props
- [ ] Usage examples and patterns
- [ ] Performance considerations noted

### 9. Performance ✓
- [ ] Memoization where appropriate
- [ ] No unnecessary re-renders
- [ ] Lazy loading for heavy components
- [ ] Optimized for bundle size
- [ ] Native driver for animations

### 10. Developer Experience ✓
- [ ] Intuitive API matching M3 patterns
- [ ] Helpful error messages in dev mode
- [ ] Sensible defaults
- [ ] Forward refs where needed
- [ ] Works with React DevTools

## Code Examples

### Example: Gold Standard Button

```typescript
// types.ts - Clear, documented interfaces
export interface ButtonProps extends Omit<PressableProps, "style"> {
  /**
   * Material 3 button variant
   * @default "filled"
   */
  variant?: M3ButtonVariant;
  // ... rest of props with JSDoc
}

// Button.tsx - Clean implementation
export function Button({ variant = "filled", ...props }: ButtonProps) {
  const { colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  // Platform-specific feedback
  const rippleConfig = Platform.select({
    android: { android_ripple: { color: colors.onPrimary + "33" } },
    default: {},
  });
  
  // M3 compliant styling
  const buttonStyle = getButtonStyle(variant, colors);
  
  // Proper animation handling
  const handlePressIn = () => {
    animations.buttonPress(scaleAnim).start();
  };
  
  // ... rest of implementation
}
```

### Example: Using Theme Systems

```typescript
// ✅ CORRECT - Using theme systems
import { getElevation } from "../../theme/elevation";
import { durations, animations } from "../../theme/motion";
import { useTheme } from "../../theme";

const { colors } = useTheme();
const elevationStyle = getElevation(1);
const fadeIn = animations.fadeIn(opacity, durations.short2);

// ❌ WRONG - Hardcoded values
const style = {
  shadowOffset: { width: 0, height: 2 }, // Use getElevation()
  backgroundColor: "#6750A4",             // Use colors.primary
  animationDuration: 200,                 // Use durations.short4
};
```

## Migration Process

### Step 1: Audit
Review the component against this checklist. Document all gaps.

### Step 2: Refactor
Update the component to meet all requirements. This may involve:
- Rewriting to use M3 patterns
- Adding missing variants
- Implementing proper animations
- Adding comprehensive tests

### Step 3: Review
Have another developer verify all checklist items.

### Step 4: Move
Once approved, move from `wip/` to `components/`:
```bash
git mv packages/bgui/src/wip/ComponentName packages/bgui/src/components/
```

### Step 5: Export
Add to the main package exports:
```typescript
// packages/bgui/src/index.ts
export * from "./components/ComponentName";
```

## Common Pitfalls to Avoid

1. **Skipping animations** - Every interaction needs feedback
2. **Hardcoding colors** - Always use theme colors
3. **Forgetting platform differences** - Test on iOS, Android, and web
4. **Incomplete variants** - Implement ALL M3 variants
5. **Poor TypeScript** - No `any` types or missing JSDoc
6. **Accessibility afterthought** - Build it in from the start
7. **No tests** - Tests are not optional
8. **Bad file structure** - Follow the standard exactly

## Benefits of Gold Standard

1. **Consistency** - All components work the same way
2. **Quality** - No bugs or edge cases
3. **Performance** - Optimized and fast
4. **Accessibility** - Usable by everyone
5. **Maintainability** - Easy to update and extend
6. **Developer Joy** - Pleasant to use and understand

## Conclusion

Gold standard components are an investment in quality. They take more time upfront but save countless hours in maintenance, bug fixes, and user complaints. When in doubt, refer to the three exemplar components: Text, Icon, and Button.

**Remember**: It's better to have 3 perfect components than 30 mediocre ones.