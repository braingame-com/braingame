# Theme Colors Migration Guide

This guide helps migrate hardcoded color values to use the new `ThemeColors` constants.

## Import Statement

```typescript
import { ThemeColors } from '@/packages/utils/constants';
```

## Color Mapping Reference

### Primary Colors
- `#007fff` → `ThemeColors.brand.primary`
- `#4da3ff` → `ThemeColors.brand.primaryLight`
- `#0059b3` → `ThemeColors.brand.primaryDark`

### Neutral Colors
- `#fff` or `#ffffff` → `ThemeColors.neutral.white`
- `#000` or `#000000` → `ThemeColors.neutral.black`
- `#f5f5f5` → `ThemeColors.neutral.gray100`
- `#e1e1e1` → `ThemeColors.neutral.gray300`
- `#666` → `ThemeColors.neutral.gray600`
- `#101020` → `ThemeColors.neutral.darkGray950`
- `#202030` → `ThemeColors.neutral.darkGray400`
- `#505060` → `ThemeColors.neutral.darkGray50`

### Semantic Colors
- `#00a550` → `ThemeColors.semantic.successDark`
- `#ff3b30` → `ThemeColors.semantic.errorDark`
- `#28a745` → `ThemeColors.semantic.success`

### Accent Colors
- `#7712fa` → `ThemeColors.accent.purpleDark`
- `#7c3aed` → `ThemeColors.accent.purple`
- `#ff6d00` → `ThemeColors.accent.orange`

### Text Colors
- `#1a1a1a` → `ThemeColors.text.lightPrimary`
- `#666` → `ThemeColors.text.lightTertiary`
- `#aaa` → `ThemeColors.text.lightDisabled`

### Effect Colors
- `rgba(255, 255, 255, 0.05)` → `ThemeColors.effect.overlayLight`
- `rgba(255, 0, 0, 0.1)` → `ThemeColors.effect.errorOverlay`

## Migration Examples

### Before:
```typescript
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#007fff',
    borderColor: '#e1e1e1',
  },
  text: {
    color: '#666',
  }
});
```

### After:
```typescript
import { ThemeColors } from '@/packages/utils/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeColors.brand.primary,
    borderColor: ThemeColors.neutral.gray300,
  },
  text: {
    color: ThemeColors.text.lightTertiary,
  }
});
```

## Using the `withOpacity` Helper

For colors that need custom opacity:

```typescript
import { ThemeColors, withOpacity } from '@/packages/utils/constants';

// Before: rgba(59, 115, 245, 0.4)
// After:
const fadedPrimary = withOpacity(ThemeColors.brand.primary, 0.4);
```

## Files to Update (Priority Order)

1. **High Priority - Component Files with Inline Styles**
   - `/apps/product/src/screens/Mindset/components/Images.tsx`
   - `/apps/product/src/components/ErrorBoundary/ErrorBoundary.tsx`

2. **Screen Style Files**
   - `/apps/product/src/screens/Mindset/styles.ts`
   - `/apps/product/src/screens/Auth/styles.ts`
   - `/apps/product/src/screens/Dashboard/styles.ts`

3. **Navigation Components**
   - `/apps/product/src/navigation/TabNavigator.tsx`
   - `/apps/product/src/navigation/NavigationContainer.tsx`
   - `/apps/product/src/navigation/AuthNavigator.tsx`

4. **Modal Components**
   - `/apps/product/src/screens/Modals/PaymentModal.tsx`
   - `/apps/product/src/screens/Modals/OnboardingModal.tsx`
   - `/apps/product/src/screens/Modals/NotificationSettingsModal.tsx`

## Testing After Migration

1. Run type checking: `npm run typecheck`
2. Run linting: `npm run lint`
3. Test both light and dark themes
4. Verify color consistency across screens