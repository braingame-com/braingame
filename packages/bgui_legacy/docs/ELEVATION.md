# BGUI Elevation System

This document outlines the elevation standards for the Brain Game UI Kit (BGUI), based on Google's Material 3 (M3) design system. Elevation creates visual hierarchy through shadows and surface tints.

## 1. Material 3 Elevation Principles

Material 3 uses elevation to:
- **Create hierarchy**: Higher elevation indicates more important or active elements
- **Show interaction**: Elements can change elevation in response to user actions
- **Group content**: Similar elevation levels group related content
- **Focus attention**: Elevated elements naturally draw the eye

## 2. The Official M3 Elevation Scale

Material 3 defines 6 elevation levels (0-5), each with specific use cases:

| Level | Elevation | Use Cases | Shadow Values |
| :--- | :--- | :--- | :--- |
| **Level 0** | 0dp | Default surface, no elevation | No shadow |
| **Level 1** | 1dp | Elevated surface, cards at rest | Subtle shadow |
| **Level 2** | 3dp | Elevated cards, raised buttons | Light shadow |
| **Level 3** | 6dp | FABs at rest, modal sheets | Medium shadow |
| **Level 4** | 8dp | Picked up state, app bars | Strong shadow |
| **Level 5** | 12dp | FAB pressed, highest priority | Strongest shadow |

## 3. Platform-Specific Implementation

### React Native (iOS/Android)
```typescript
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
```

### Web (React Native Web)
```typescript
export const webElevation = {
  level0: 'none',
  level1: '0px 1px 2px rgba(0, 0, 0, 0.15)',
  level2: '0px 1px 3px rgba(0, 0, 0, 0.20)',
  level3: '0px 3px 6px rgba(0, 0, 0, 0.25)',
  level4: '0px 4px 8px rgba(0, 0, 0, 0.30)',
  level5: '0px 6px 12px rgba(0, 0, 0, 0.35)',
};
```

## 4. Component Elevation Guidelines

### Cards
- **Default**: Level 1
- **Hover/Focus**: Level 2
- **Dragging**: Level 4

### Buttons
- **Text/Outlined**: Level 0
- **Filled**: Level 0
- **Elevated**: Level 1 (Level 2 on hover)
- **FAB**: Level 3 (Level 4 on press)

### App Bars
- **Surface**: Level 0
- **Elevated**: Level 2
- **On scroll**: Level 4

### Dialogs & Sheets
- **Dialog**: Level 3
- **Modal bottom sheet**: Level 3
- **Standard bottom sheet**: Level 1

### Menus & Tooltips
- **Menu**: Level 2
- **Tooltip**: Level 0 (uses surface tint instead)

## 5. Surface Tints in M3

Material 3 introduces surface tints as an alternative to shadows:
- Light surfaces use the primary color at low opacity
- Creates depth without harsh shadows
- Better for accessibility and dark themes

```typescript
// Surface tint implementation
export const surfaceTint = (level: number, primaryColor: string) => {
  const opacity = level * 0.05; // 5% per level
  return `${primaryColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
};
```

## 6. Implementation Strategy

### Step 1: Create Elevation Utilities
```typescript
// packages/bgui/src/theme/elevation.ts
import { Platform } from 'react-native';

export const getElevation = (level: 0 | 1 | 2 | 3 | 4 | 5) => {
  if (Platform.OS === 'web') {
    return { boxShadow: webElevation[`level${level}`] };
  }
  return elevation[`level${level}`];
};
```

### Step 2: Create Elevated Surface Component
```typescript
// packages/bgui/src/components/Surface/Surface.tsx
export const Surface = ({ level = 1, children, style }) => {
  const elevationStyle = getElevation(level);
  return (
    <View style={[elevationStyle, style]}>
      {children}
    </View>
  );
};
```

### Step 3: Update Components
Apply elevation to all relevant components following M3 guidelines.

## 7. Best Practices

1. **Use sparingly**: Not every element needs elevation
2. **Be consistent**: Similar components should have similar elevation
3. **Respect hierarchy**: Higher importance = higher elevation
4. **Smooth transitions**: Animate elevation changes
5. **Test on device**: Shadows render differently on actual devices

## 8. Accessibility Considerations

- Don't rely solely on shadows for meaning
- Ensure sufficient contrast without shadows
- Consider users with vision impairments
- Test with reduced motion settings

## 9. Dark Theme Adjustments

In dark themes:
- Shadows are less visible
- Use surface tints more prominently
- Lighter surfaces indicate higher elevation
- Reduce shadow opacity by 20%