# BGUI Component Patterns

This document outlines the Material 3 component patterns and specifications for the Brain Game UI Kit (BGUI). Each component follows Google's M3 design system for consistency and usability.

## 1. Button Component

Material 3 defines 5 button types, each with specific use cases:

### Button Types

| Type | Description | Use Case | Elevation |
| :--- | :--- | :--- | :--- |
| **Filled** | High emphasis, primary actions | Submit, Save, Continue | Level 0 |
| **Outlined** | Medium emphasis, secondary actions | Cancel, Learn More | Level 0 |
| **Text** | Low emphasis, tertiary actions | Skip, Dismiss | Level 0 |
| **Elevated** | Filled button with shadow | Important actions needing prominence | Level 1 |
| **Tonal** | Filled with secondary color | Alternative to outlined | Level 0 |

### Implementation
```typescript
type M3ButtonVariant = "filled" | "outlined" | "text" | "elevated" | "tonal";

interface ButtonProps {
  variant?: M3ButtonVariant;
  size?: "small" | "medium" | "large";
  icon?: IconName;
  iconPosition?: "start" | "end";
  fullWidth?: boolean;
}
```

### Specifications
- **Height**: 40dp (medium), 32dp (small), 48dp (large)
- **Min width**: 64dp
- **Padding**: 24dp horizontal, 0dp vertical
- **Corner radius**: 20dp (pill shape)
- **Typography**: labelLarge
- **Icon size**: 18dp with 8dp gap

## 2. Card Component

Material 3 cards are containers for grouping related content:

### Card Types

| Type | Description | Elevation | Use Case |
| :--- | :--- | :--- | :--- |
| **Elevated** | Default card with shadow | Level 1 | Lists, grids |
| **Filled** | Colored background, no shadow | Level 0 | Emphasized content |
| **Outlined** | Border, no shadow | Level 0 | Secondary content |

### Implementation
```typescript
type M3CardVariant = "elevated" | "filled" | "outlined";

interface CardProps {
  variant?: M3CardVariant;
  interactive?: boolean; // Adds hover/press states
  media?: ReactNode; // Top media section
  headline?: string;
  subhead?: string;
  supportingText?: string;
  actions?: ReactNode;
}
```

### Specifications
- **Corner radius**: 12dp
- **Padding**: 16dp (all sides)
- **Media aspect ratio**: 16:9 (recommended)
- **Typography**: 
  - Headline: headlineSmall
  - Subhead: titleMedium
  - Body: bodyMedium

## 3. TextField Component

Material 3 text fields for user input:

### TextField Types

| Type | Description | Use Case |
| :--- | :--- | :--- |
| **Filled** | Solid background | Forms, emphasized inputs |
| **Outlined** | Border only | Dense forms, less emphasis |

### States
- **Enabled**: Default interactive state
- **Focused**: Active input state
- **Error**: Validation failed
- **Disabled**: Non-interactive

### Implementation
```typescript
type M3TextFieldVariant = "filled" | "outlined";

interface TextFieldProps {
  variant?: M3TextFieldVariant;
  label: string;
  helper?: string;
  error?: string;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  prefix?: string;
  suffix?: string;
}
```

### Specifications
- **Height**: 56dp
- **Corner radius**: 4dp (top only for filled)
- **Label typography**: bodyLarge (floating), bodySmall (focused)
- **Input typography**: bodyLarge
- **Helper typography**: bodySmall

## 4. Chip Component

Material 3 chips are compact elements representing input, attribute, or action:

### Chip Types

| Type | Description | Use Case |
| :--- | :--- | :--- |
| **Assist** | Suggests actions | Quick replies, smart suggestions |
| **Filter** | Toggleable filters | Category selection |
| **Input** | User-added items | Tags, recipients |
| **Suggestion** | Recommended options | Search suggestions |

### Implementation
```typescript
type M3ChipVariant = "assist" | "filter" | "input" | "suggestion";

interface ChipProps {
  variant?: M3ChipVariant;
  selected?: boolean; // For filter chips
  leadingIcon?: IconName;
  trailingIcon?: IconName; // Close icon for input chips
  onDelete?: () => void; // For input chips
}
```

### Specifications
- **Height**: 32dp
- **Corner radius**: 8dp
- **Padding**: 8dp start, 8dp end
- **Typography**: labelLarge
- **Icon size**: 18dp

## 5. FAB (Floating Action Button)

Material 3 FABs for primary screen actions:

### FAB Types

| Size | Description | Use Case | Dimensions |
| :--- | :--- | :--- | :--- |
| **Small** | Compact FAB | Secondary screens | 40dp |
| **Regular** | Standard FAB | Most screens | 56dp |
| **Large** | Prominent FAB | Key actions | 96dp |

### Variants
- **Surface**: Matches surface color
- **Primary**: Uses primary color (default)
- **Secondary**: Uses secondary color
- **Tertiary**: Uses tertiary color

### Implementation
```typescript
type M3FABSize = "small" | "regular" | "large";
type M3FABColor = "surface" | "primary" | "secondary" | "tertiary";

interface FABProps {
  size?: M3FABSize;
  color?: M3FABColor;
  extended?: boolean; // Shows label
  icon: IconName;
  label?: string; // For extended FAB
}
```

### Specifications
- **Elevation**: Level 3 (default), Level 4 (pressed)
- **Corner radius**: 16dp (small), 16dp (regular), 28dp (large)
- **Icon size**: 24dp
- **Typography**: labelLarge (extended only)

## 6. Navigation Components

### Navigation Bar (Bottom)
For mobile navigation with 3-5 destinations:

```typescript
interface NavigationBarProps {
  destinations: Array<{
    icon: IconName;
    label: string;
    badge?: number | boolean;
  }>;
  activeIndex: number;
}
```

**Specifications**:
- **Height**: 80dp
- **Icon size**: 24dp
- **Typography**: labelMedium
- **Max destinations**: 5

### Navigation Rail (Side)
For tablet/desktop navigation:

```typescript
interface NavigationRailProps {
  destinations: Array<{
    icon: IconName;
    label: string;
  }>;
  fab?: ReactNode;
  header?: ReactNode;
  extended?: boolean;
}
```

**Specifications**:
- **Width**: 80dp (default), 360dp (extended)
- **Icon size**: 24dp
- **Typography**: labelMedium

### Navigation Drawer
For comprehensive navigation:

```typescript
type M3DrawerVariant = "modal" | "standard";

interface NavigationDrawerProps {
  variant?: M3DrawerVariant;
  header?: ReactNode;
  sections: Array<{
    title?: string;
    items: Array<{
      icon?: IconName;
      label: string;
      badge?: string;
    }>;
  }>;
}
```

## 7. Dialog Component

Material 3 dialogs for important interactions:

### Dialog Types
- **Basic**: Simple message with actions
- **Full-screen**: Complex forms or content
- **Alert**: Critical information requiring action

### Implementation
```typescript
interface DialogProps {
  variant?: "basic" | "fullscreen" | "alert";
  icon?: IconName;
  headline: string;
  supportingText?: string;
  actions: Array<{
    label: string;
    action: () => void;
  }>;
}
```

### Specifications
- **Max width**: 560dp
- **Corner radius**: 28dp
- **Padding**: 24dp
- **Typography**:
  - Headline: headlineSmall
  - Body: bodyMedium
  - Actions: labelLarge

## 8. Component Composition Patterns

### Consistent Spacing
Use M3 spacing tokens for consistent layouts:
```typescript
const spacing = {
  xs: 4,   // Tight spacing
  sm: 8,   // Related elements
  md: 16,  // Default spacing
  lg: 24,  // Section spacing
  xl: 32,  // Major sections
};
```

### Color Application
Follow M3 color mapping:
- **Primary actions**: Primary color
- **Secondary actions**: Secondary/outline
- **Surfaces**: Surface colors with elevation
- **Text**: OnSurface, OnSurfaceVariant

### State Management
All interactive components should handle:
- **Enabled**: Default state
- **Hovered**: Desktop only
- **Focused**: Keyboard navigation
- **Pressed**: Active interaction
- **Disabled**: Non-interactive

### Accessibility Requirements
- **Touch targets**: Minimum 48x48dp
- **Color contrast**: WCAG AA compliance
- **Focus indicators**: Visible keyboard focus
- **Screen reader**: Proper labels and hints

## 9. Migration Strategy

### From Current to M3

| Current Component | M3 Equivalent | Migration Notes |
| :--- | :--- | :--- |
| Button (primary) | Button (filled) | Update variant prop |
| Button (secondary) | Button (outlined) | Update variant prop |
| Button (ghost) | Button (text) | Update variant prop |
| Card (custom) | Card (elevated) | Add variant system |
| Input (custom) | TextField (outlined) | Significant refactor |

### Deprecation Timeline
1. **Phase 1**: Add M3 variants alongside existing
2. **Phase 2**: Mark old variants as deprecated
3. **Phase 3**: Remove old variants in v2.0

## 10. Component Creation Checklist

When creating new M3 components:

- [ ] Follow M3 naming conventions
- [ ] Implement all specified variants
- [ ] Use M3 color tokens
- [ ] Apply M3 typography scale
- [ ] Include elevation where specified
- [ ] Add motion from motion tokens
- [ ] Ensure accessibility compliance
- [ ] Create comprehensive documentation
- [ ] Add to component showcase
- [ ] Include migration guide if replacing existing component