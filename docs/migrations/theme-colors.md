# Theme Colors Migration

Converting hardcoded colors to ThemeColors constants.

## Import Statement

Add to all files using colors:
```typescript
import { ThemeColors } from '@braingame/bgui';
```

## Color Mapping

| Hex Code | ThemeColors Constant |
|----------|---------------------|
| `#007AFF` | `ThemeColors.primary` |
| `#34C759` | `ThemeColors.success` |
| `#FF3B30` | `ThemeColors.error` |
| `#FF9500` | `ThemeColors.warning` |
| `#000000` | `ThemeColors.textPrimary` |
| `#6B7280` | `ThemeColors.textSecondary` |
| `#F3F4F6` | `ThemeColors.backgroundSecondary` |
| `#FFFFFF` | `ThemeColors.backgroundPrimary` |

## Migration Examples

### Before
```typescript
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderColor: '#007AFF'
  },
  text: {
    color: '#000000'
  }
});
```

### After
```typescript
import { ThemeColors } from '@braingame/bgui';

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeColors.backgroundPrimary,
    borderColor: ThemeColors.primary
  },
  text: {
    color: ThemeColors.textPrimary
  }
});
```

## Custom Opacity

Use `withOpacity` helper for transparency:
```typescript
import { ThemeColors, withOpacity } from '@braingame/bgui';

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: withOpacity(ThemeColors.primary, 0.1)
  }
});
```

## Files to Update

### Priority Order
1. **Component files** in `packages/bgui/src/components/`
2. **Screen styles** in `apps/product/src/screens/`
3. **Navigation styles** in navigation config
4. **Modal styles** in modal components

### Search & Replace
```bash
# Find hardcoded colors
grep -r "#[0-9A-Fa-f]{6}" src/

# Find specific color
grep -r "#007AFF" src/
```

## Testing After Migration

1. **Visual regression**: Compare before/after screenshots
2. **Dark mode compatibility**: Verify theme switching works
3. **Build verification**: Ensure no import errors
4. **Component tests**: Update snapshots if needed

## Completion Checklist

- [ ] All hardcoded hex values replaced
- [ ] ThemeColors import added to all files
- [ ] Custom opacity values use `withOpacity`
- [ ] Visual testing completed
- [ ] Dark mode tested
- [ ] Build successful