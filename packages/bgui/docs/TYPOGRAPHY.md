# BGUI Typography

This document outlines the typographic standards for the Brain Game UI Kit (BGUI), based on Google's Material 3 (M3) design system. Adhering to these standards ensures a consistent, accessible, and professional user interface across all applications.

## 1. The Material 3 Type System

Material 3 provides a comprehensive, standardized **type scale** that replaces custom, one-off text styles. It defines a set of 15 semantic "roles" (e.g., `displayLarge`, `headlineMedium`, `bodyLarge`) that have predefined values for font family, weight, size, line height, and letter spacing.

**Key Benefits:**
- **Consistency:** Creates a consistent visual hierarchy across the entire app.
- **Clarity & Readability:** Values are optimized by Google's designers for legibility on various screen sizes.
- **Maintainability:** Using semantic roles makes the code easier to read, understand, and maintain.
- **Professional Polish:** Adopting a complete design system adds a layer of refinement that is difficult to achieve with custom styles.

## 2. The Official M3 Type Scale

Your project uses the `Lexend` font. The M3 scale below is adapted for it. The font weights map to the numeric values required by the `Lexend` variable font.

| Role | Weight | Size (sp) | Line Height (sp) | Letter Spacing (px) |
| :--- | :--- | :--- | :--- | :--- |
| `displayLarge` | Regular (400) | 57 | 64 | -0.25 |
| `displayMedium` | Regular (400) | 45 | 52 | 0 |
| `displaySmall` | Regular (400) | 36 | 44 | 0 |
| `headlineLarge` | Regular (400) | 32 | 40 | 0 |
| `headlineMedium` | Regular (400) | 28 | 36 | 0 |
| `headlineSmall` | Regular (400) | 24 | 32 | 0 |
| `titleLarge` | Regular (400) | 22 | 28 | 0 |
| `titleMedium` | Medium (500) | 16 | 24 | 0.15 |
| `titleSmall` | Medium (500) | 14 | 20 | 0.1 |
| `bodyLarge` | Regular (400) | 16 | 24 | 0.5 |
| `bodyMedium` | Regular (400) | 14 | 20 | 0.25 |
| `bodySmall` | Regular (400) | 12 | 16 | 0.4 |
| `labelLarge` | Medium (500) | 14 | 20 | 0.1 |
| `labelMedium` | Medium (500) | 12 | 16 | 0.5 |
| `labelSmall` | Medium (500) | 11 | 16 | 0.5 |

*Note: `sp` (scale-independent pixels) is the standard unit for fonts on Android. In React Native, these can be treated as unitless numbers.*

## 3. Implementation Plan

To adopt the M3 type scale, the `Text` component and its related files need to be refactored.

### Step 1: Define the M3 Type Scale in Your Theme

Create a new file, `packages/bgui/src/theme/typography.ts`, to define the M3 type scale as a theme object. This keeps your typography definitions separate from your colors and easy to manage.

```typescript
// packages/bgui/src/theme/typography.ts

import { TextStyle } from "react-native";

export type M3TypeScale =
	| "displayLarge"
	| "displayMedium"
	| "displaySmall"
	| "headlineLarge"
	| "headlineMedium"
	| "headlineSmall"
	| "titleLarge"
	| "titleMedium"
	| "titleSmall"
	| "bodyLarge"
	| "bodyMedium"
	| "bodySmall"
	| "labelLarge"
	| "labelMedium"
	| "labelSmall";

export const typography: Record<M3TypeScale, TextStyle> = {
	displayLarge: { fontFamily: "Lexend", fontSize: 57, fontWeight: "400", lineHeight: 64, letterSpacing: -0.25 },
	displayMedium: { fontFamily: "Lexend", fontSize: 45, fontWeight: "400", lineHeight: 52, letterSpacing: 0 },
	displaySmall: { fontFamily: "Lexend", fontSize: 36, fontWeight: "400", lineHeight: 44, letterSpacing: 0 },
	headlineLarge: { fontFamily: "Lexend", fontSize: 32, fontWeight: "400", lineHeight: 40, letterSpacing: 0 },
	headlineMedium: { fontFamily: "Lexend", fontSize: 28, fontWeight: "400", lineHeight: 36, letterSpacing: 0 },
	headlineSmall: { fontFamily: "Lexend", fontSize: 24, fontWeight: "400", lineHeight: 32, letterSpacing: 0 },
	titleLarge: { fontFamily: "Lexend", fontSize: 22, fontWeight: "400", lineHeight: 28, letterSpacing: 0 },
	titleMedium: { fontFamily: "Lexend", fontSize: 16, fontWeight: "500", lineHeight: 24, letterSpacing: 0.15 },
	titleSmall: { fontFamily: "Lexend", fontSize: 14, fontWeight: "500", lineHeight: 20, letterSpacing: 0.1 },
	bodyLarge: { fontFamily: "Lexend", fontSize: 16, fontWeight: "400", lineHeight: 24, letterSpacing: 0.5 },
	bodyMedium: { fontFamily: "Lexend", fontSize: 14, fontWeight: "400", lineHeight: 20, letterSpacing: 0.25 },
	bodySmall: { fontFamily: "Lexend", fontSize: 12, fontWeight: "400", lineHeight: 16, letterSpacing: 0.4 },
	labelLarge: { fontFamily: "Lexend", fontSize: 14, fontWeight: "500", lineHeight: 20, letterSpacing: 0.1 },
	labelMedium: { fontFamily: "Lexend", fontSize: 12, fontWeight: "500", lineHeight: 16, letterSpacing: 0.5 },
	labelSmall: { fontFamily: "Lexend", fontSize: 11, fontWeight: "500", lineHeight: 16, letterSpacing: 0.5 },
};
```

### Step 2: Refactor the Text Component

Update the `Text` component to use the new M3 roles and pull styles from the `typography` object.

**Delete `packages/bgui/src/components/Text/styles.ts`**. All its logic will be replaced.

**Update `packages/bgui/src/components/Text/Text.tsx`:**

```typescript
"use client";

import { Text as RNText } from "react-native";
import { useTheme } from "../../theme";
import { typography, type M3TypeScale } from "../../theme/typography";
import type { TextProps } from "./types"; // Update TextProps type

/**
 * A Text component that implements the Material 3 type scale.
 */
export const Text = ({
	variant = "bodyLarge", // Default to bodyLarge
	color,
	align = "left",
	style,
	children,
	...rest
}: TextProps) => {
	const { colors } = useTheme();

	// Resolve color from theme, with fallback to onSurface
	const textColor = color ? colors[color as keyof typeof colors] || colors.onSurface : colors.onSurface;

	// Get the complete style object from the typography scale
	const variantStyle = typography[variant as M3TypeScale] || typography.bodyLarge;

	return (
		<RNText
			style={[
				{ color: textColor, textAlign: align },
				variantStyle, // Apply all M3 type styles: fontFamily, fontSize, fontWeight, lineHeight, letterSpacing
				style,
			]}
			{...rest}
		>
			{children}
		</RNText>
	);
};
```

**Update `packages/bgui/src/components/Text/types.ts`:**
The `variant` prop should now accept the M3 type scale roles.

```typescript
import type { M3TypeScale } from "../../theme/typography";

export interface TextProps {
  children: React.ReactNode;
  variant?: M3TypeScale; // Use M3 roles
  color?: string; // Can be simplified to keyof M3ColorScheme
  align?: "left" | "center" | "right" | "justify";
  style?: any;
  numberOfLines?: number;
  // mono prop is no longer needed as font is defined by the scale
}
```

### Step 3: Migrate Your App

Now, you must update all instances of the `Text` component throughout your application. Use this table to map your old custom variants to the new, official M3 roles.

| Old Variant | Recommended M3 Role | Notes |
| :--- | :--- | :--- |
| `displayTitle` | `displayMedium` | Old: 48px/600. New: 45px/400. A close match for the largest text. |
| `title` | `headlineLarge` | Old: 32px/600. New: 32px/400. A good replacement for screen titles. |
| `heading` | `titleLarge` | Old: 20px/600. New: 22px/400. Serves a similar purpose for section headers. |
| `subtitle` | `titleMedium` | Old: 18px/500. New: 16px/500. Very close match in weight and usage. |
| `bold` | `bodyLarge` | Use `<Text variant="bodyLarge" style={{ fontWeight: '700' }}>` for bold body text. |
| `text` / `body` | `bodyLarge` | Old: 16px/400. New: 16px/400. An exact match for primary body content. |
| `secondaryText`| `bodyMedium` | Old: 14px/400. New: 14px/400. Perfect for less-emphasized body text. |
| `small` | `bodySmall` | Old: 12px/400. New: 12px/400. An exact match. |
| `caption` | `labelMedium` | Old: 12px/400. New: 12px/500. `labelMedium` is better for captions. |

By following this plan, you will have a fully M3-compliant typography system that is robust, maintainable, and visually polished. 