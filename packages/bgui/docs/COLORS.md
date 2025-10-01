# BGUI Colors

This document provides guidelines for using the Brain Game User Interface (BGUI) colors. Our color system is built on Material 3 principles, ensuring a consistent, accessible, and aesthetically pleasing user experience across all applications.

## Core Concepts

Our theme is generated from a single seed color, which creates a full palette of tonal variations for light and dark modes. This ensures brand consistency while maintaining flexibility. The colors are categorized into several key roles.

It is critical to **use roles, not hex codes**. Always reference colors by their semantic role (e.g., `primary`, `surface`) instead of hard-coding hex values. This ensures that the UI will adapt correctly to theme changes (light/dark mode, high contrast).

---

## The Role of Tonal Palettes

In the theme file ([`bgui-theme.json`](../src/bgui-theme.json)), you will see a large section for `palettes`. These are the foundational **Tonal Palettes**.

A tonal palette consists of 13 tones of a single color, ranging from black to white (0 to 100). Our system uses tonal palettes for `primary`, `secondary`, `tertiary`, `neutral`, `neutral-variant`, and `error`.

**So, why do these exist if we use semantic roles?**

1.  **Foundation**: The semantic color roles (like `primary`, `onPrimary`, `primaryContainer`) are simply aliases that point to a specific tone in these palettes (e.g., in light mode, `primary` might be `primary40`, and in dark mode, it might be `primary80`). The Material 3 algorithm generates these mappings automatically.
2.  **Custom Components**: If you are building a new, complex component that needs more color variations than the standard roles provide, you can directly access the tonal palettes. This allows you to create a visually harmonious component that still adapts to theme changes. For example, a complex chart might need 5 different shades of blue; you could pick `primary30`, `primary40`, `primary50`, `primary60`, and `primary70` from the palette.
3.  **Consistency**: Using tones from the generated palettes ensures that even custom color selections are mathematically related to the core theme colors, maintaining visual consistency.

**In general, always prefer using the semantic roles. Only reach for the tonal palettes when the standard roles are insufficient.**

---

## Detailed Color Roles

Below is a comprehensive guide to every color role available in the theme.

### 1. Primary Colors

Primary colors are used for key UI elements, such as primary buttons, active states, and the most important calls-to-action.

-   **`primary`**: The main, most prominent brand color.
-   **`onPrimary`**: A color with high contrast against `primary`. For text and icons on a `primary` background.
-   **`primaryContainer`**: A lighter, less emphasized tone. For elements that need to stand out but less than `primary` elements (e.g., hero section background, highlighted form fields).
-   **`onPrimaryContainer`**: Contrasting color for text/icons on `primaryContainer`.

### 2. Secondary Colors

Secondary colors are for less prominent components and accents that complement the primary color.

-   **`secondary`**: For elements like secondary buttons, filters, or progress bars.
-   **`onSecondary`**: Contrasting color for text/icons on `secondary`.
-   **`secondaryContainer`**: Lighter tone for less emphasized accents.
-   **`onSecondaryContainer`**: Contrasting color for text/icons on `secondaryContainer`.

### 3. Tertiary Colors

Tertiary colors provide contrasting accents that can balance primary and secondary colors.

-   **`tertiary`**: For decorative elements, highlights, or to draw attention without the weight of a `primary` color.
-   **`onTertiary`**: Contrasting color for text/icons on `tertiary`.
-   **`tertiaryContainer`**: Lighter tone for subtle accents.
-   **`onTertiaryContainer`**: Contrasting color for text/icons on `tertiaryContainer`.

### 4. Semantic (Extended) Colors

These colors convey a specific meaning or application state.

-   **`error`**: Indicates errors, failures, or destructive actions.
-   **`onError`**: For text/icons on an `error` background.
-   **`errorContainer`**: Lighter tone for less emphasized error states, like an error field's background.
-   **`onErrorContainer`**: Contrasting color for text/icons on `errorContainer`.
-   **`success`**: Indicates success or a positive state.
-   **`onSuccess`**: For text/icons on `success`.
-   **`successContainer`**: Lighter tone for success states.
-   **`onSuccessContainer`**: Contrasting color on `successContainer`.
-   **`warning`**: For warning messages that require user attention.
-   **`onWarning`**: For text/icons on `warning`.
-   **`warningContainer`**: Lighter tone for warning states.
-   **`onWarningContainer`**: Contrasting color on `warningContainer`.
-   **`info`**: For neutral, informational messages.
-   **`onInfo`**: For text/icons on `info`.
-   **`infoContainer`**: Lighter tone for info states.
-   **`onInfoContainer`**: Contrasting color on `infoContainer`.

### 5. Surface and Background Colors

These form the backbone of the UI, creating the surfaces on which components sit.

-   **`background`**: The base color for the entire application window or screen.
-   **`onBackground`**: Default color for all text and icons on `background`.
-   **`surface`**: The color for component surfaces like cards, sheets, and menus, which sit "on top" of the `background`.
-   **`onSurface`**: Default color for text and icons on a `surface`.
-   **`surfaceVariant`**: A variant of `surface` for differentiating components or sections.
-   **`onSurfaceVariant`**: Color for text and icons on `surfaceVariant`.
-   **`surfaceTint`**: A subtle tint color, often the same as `primary`, applied to surfaces to indicate elevation or state changes.
-   **`inverseSurface`**: A surface color with inverted brightness. In light mode, this is dark. In dark mode, it's light. Useful for snackbars or other temporary UI that needs to stand out.
-   **`inverseOnSurface`**: Contrasting color for text/icons on `inverseSurface`.
-   **`inversePrimary`**: The primary color as it would appear on an `inverseSurface`.

### 6. Surface Container Variations

These provide a standardized set of five surface colors with different levels of emphasis, allowing for more nuanced layouts. They are ordered from lowest to highest emphasis.

-   **`surfaceDim`**: The dimmest surface color in the set.
-   **`surfaceBright`**: The brightest surface color in the set.
-   **`surfaceContainerLowest`**: Lowest emphasis, for subtle grouping or backgrounds.
-   **`surfaceContainerLow`**: Low emphasis.
-   **`surfaceContainer`**: The default neutral surface color.
-   **`surfaceContainerHigh`**: High emphasis.
-   **`surfaceContainerHighest`**: Highest emphasis, for elements that need to stand out the most against the background.

### 7. Fixed Variant Colors

"Fixed" roles have a color that **does not change** between light and dark modes. They are useful for components that need to maintain a consistent look regardless of the theme, such as a brand logo element.

-   **`primaryFixed` / `secondaryFixed` / `tertiaryFixed`**: The fixed color role.
-   **`onPrimaryFixed` / `onSecondaryFixed` / `onTertiaryFixed`**: Contrasting color for the fixed role.
-   **`primaryFixedDim` / `secondaryFixedDim` / `tertiaryFixedDim`**: A dimmer version of the fixed color.
-   **`onPrimaryFixedVariant` / `onSecondaryFixedVariant` / `onTertiaryFixedVariant`**: A high-contrast color for content on the `FixedDim` roles.

### 8. Outlines and Dividers

-   **`outline`**: The primary color for component outlines, dividers, and decorative rules.
-   **`outlineVariant`**: A subtler variant for less prominent dividers or outlines.

### 9. Other Roles

-   **`shadow`**: The color used for shadows. Should always be black.
-   **`scrim`**: The color of a translucent overlay used to obscure content behind it, such as when a modal or drawer is open. This helps focus the user's attention on the foreground content.

---

## Light & Dark Modes

The color system is designed to work seamlessly in both light and dark themes. The role names remain the same, but their actual color values are swapped automatically based on the user's selected theme.

-   **Light Mode**: Uses a light background with dark text and vibrant accents.
-   **Dark Mode**: Uses a dark background with light text and desaturated accents to reduce eye strain.

## High Contrast Modes

Our theme file also includes `light-medium-contrast`, `light-high-contrast`, `dark-medium-contrast`, and `dark-high-contrast` schemes. These are automatically generated and should be used to satisfy accessibility requirements for users who need higher contrast between text and backgrounds. The system should ideally handle this automatically, but be aware that these specialized themes exist. 
