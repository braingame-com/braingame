# Accessibility Audit Report

## Overview
This report evaluates the current repository against WCAG 2.2 AA. Areas reviewed include colour contrast, motion preferences, keyboard navigation, screen‑reader semantics, localisation, and edge cases for diverse impairments.

## Issues Found
- **Low colour contrast on tasks page link**: `#007AFF` on a white background yields a contrast ratio of 4.02:1 which is below the required 4.5:1 for normal text.
- **Missing prefers-reduced-motion handling**: No hooks or CSS queries for `prefers-reduced-motion` were found.
- **Keyboard navigation**: Custom focus management is implemented, but some TextInput components lack associated Label elements for better accessibility.
- **Screen reader semantics**: Components generally expose roles and ARIA labels; however, TextInput uses placeholder text as a label which is not sufficient for screen readers.
- **Internationalisation**: Only English and Spanish locales are present. Right‑to‑left (RTL) languages are not supported.

## Code Snippets
```tsx
// Button with ARIA support
<Pressable
  accessibilityRole="button"
  accessibilityLabel={ariaLabel}
  accessibilityHint={ariaDescribedBy}
  disabled={disabled || loading}
>
```
Source: `packages/bgui/src/components/Button/Button.tsx` lines 32‑57.

```tsx
<View>
  {leftIcon && <Icon name={leftIcon} style={styles.icon} />}
  <RNTextInput
    style={styles.input}
    value={value}
    onChangeText={onValueChange}
    {...rest}
  />
</View>
```
Source: `packages/bgui/src/components/TextInput/TextInput.tsx` lines 16‑31 – lacks a paired label element.

```ts
export const supportedLanguages = ["en", "es"] as const;
```
Source: `packages/i18n/src/index.ts` lines 7‑8 – only LTR languages included.

```ts
linkText: {
  fontSize: 18,
  color: "#007AFF", // Contrast fails on white background
  textDecorationLine: "underline",
}
```
Source: `apps/product/app/tasks.tsx` lines 32‑38.

## Fix Checklist
- [ ] Increase link colour contrast on the tasks page (e.g., darker blue or bolder weight).
- [ ] Implement CSS/JS checks for `prefers-reduced-motion` to disable animations when requested.
- [ ] Ensure every TextInput has an associated label element or ARIA label.
- [ ] Audit all pages for keyboard focus order and visible focus indicators.
- [ ] Add RTL support and additional locales where possible.

*Screenshots could not be captured in the current environment.*
