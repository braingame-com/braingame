# Joy UI Architecture Patterns (2025 Refresh)

> Lessons from Joy UI that inform BGUI's single-file universal component strategy.

## Overview

Joy UI emphasises predictable structure, strong typing, and theme-driven styling. BGUI keeps those principles but applies them through a **single-file React Native Web implementation** supported by an in-house theme engine. This document explains how we translate Joy concepts into our React Native environment.

## Component Layout

```
src/components/{primitives|compositions}/ComponentName/
├── ComponentName.tsx        # Universal component (RN + Web)
├── ComponentName.types.ts   # Props & JSDoc (self-documenting)
├── ComponentName.test.tsx   # RTL coverage with light/dark assertions
├── ComponentName.stories.tsx# Storybook stories consuming theme tokens
└── index.ts                 # Public exports
```

Generated via:
```
pnpm --filter @braingame/bgui generate:component primitives/MyComponent
```

## Joy UI Concepts → BGUI Implementation
| Joy Pattern | BGUI Equivalent |
| --- | --- |
| Variant-based styling | `generateComponentVariants()` + `useTheme()` in the component body |
| Type-centric APIs | `ComponentName.types.ts` with strict interfaces and JSDoc |
| Story-driven documentation | `.stories.tsx` collocated with the component, loaded by Storybook task graph |
| Testing per variant | RTL specs with tone/variant coverage and light vs dark comparisons |
| Shared utilities | Theme helpers (`theme/engine`, `theme/variants.ts`) instead of component-specific style modules |

## Authoring Guidelines
1. **Start with the generator** – ensures file layout and test/story scaffolds are correct.
2. **Keep logic cohesive** – use `StyleSheet` + `useMemo` inside the `.tsx`; introduce helper modules only when logic is reused across components.
3. **Consume tokens, not literals** – access `theme.colors`, `theme.spacing`, `theme.radii`; refer to `docs/COLORS.md` for semantic roles.
4. **Test both themes** – follow the pattern in `theme-coverage.test.tsx` for any visual component.
5. **Update docs** – reflect architectural changes here and in `README.md` when patterns evolve.

## Example Pattern
```tsx
// ComponentName.tsx
import { forwardRef, useMemo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../../theme";
import type { ComponentNameProps } from "./ComponentName.types";

type Tone = NonNullable<ComponentNameProps["tone"]>;

const toneMap = {
  surface: (theme) => ({ background: theme.colors.surface, foreground: theme.colors.onSurface }),
  primary: (theme) => ({ background: theme.colors.primary, foreground: theme.colors.onPrimary }),
};

export const ComponentName = forwardRef<Pressable, ComponentNameProps>(({ tone = "surface", children, ...rest }, ref) => {
  const theme = useTheme();
  const resolver = toneMap[tone];
  const palette = useMemo(() => resolver(theme), [theme, tone]);

  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      style={[styles.base, { backgroundColor: palette.background, padding: theme.spacing.md }]}
      {...rest}
    >
      <Text style={[styles.text, { color: palette.foreground }]}>{children}</Text>
    </Pressable>
  );
});
```

```tsx
// ComponentName.test.tsx
import { renderWithTheme } from "../../test-utils/render-with-theme";

it("respects tone across themes", () => {
  const { getByTestId } = renderWithTheme(<ComponentName tone="primary" testID="subject" />);
  const light = getByTestId("subject").props.style.backgroundColor;
  const dark = renderWithTheme(<ComponentName tone="primary" testID="subject" />, { theme: "dark" })
    .getByTestId("subject").props.style.backgroundColor;
  expect(light).not.toBe(dark);
});
```

Sticking to this pattern keeps our Joy UI inspiration alive while embracing React Native Web’s single-source philosophy.
