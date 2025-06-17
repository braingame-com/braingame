# BGUI Component Plan

This document outlines the proposed set of enterprise‑grade components for the Brain Game UI library (`@brain-game/bgui`). Each component lists the key props and supported variants to ensure a consistent developer experience across web and native platforms.

## Core Components

### Button
- **Props**
  - `label: string` – text content
  - `onPress: () => void` – callback when tapped
  - `icon?: string` – optional icon name
  - `disabled?: boolean`
  - `loading?: boolean`
- **Variants**
  - `primary` – default action style
  - `secondary` – subtle alternative
  - `ghost` – text‑only appearance
  - `danger` – destructive action

### TextInput
- **Props**
  - `value: string`
  - `onChangeText: (value: string) => void`
  - `placeholder?: string`
  - `secureTextEntry?: boolean`
  - `disabled?: boolean`
- **Variants**
  - `standard` – bordered input
  - `flat` – borderless style
  - `error` – shows validation state

### Icon
- **Props**
  - `name: string`
  - `size?: number`
  - `color?: string`
- **Variants**
  - `solid` – filled glyph
  - `regular` – outlined glyph
  - `brand` – brand color

### Card
- **Props**
  - `children: ReactNode`
  - `elevation?: number`
  - `onPress?: () => void`
- **Variants**
  - `basic` – plain container
  - `interactive` – hoverable / pressable

### Modal
- **Props**
  - `visible: boolean`
  - `onClose: () => void`
  - `title?: string`
  - `actions?: ReactNode`
- **Variants**
  - `center` – default centered modal
  - `bottom-sheet` – slides from bottom on mobile

### Toast
- **Props**
  - `message: string`
  - `type?: 'success' | 'warning' | 'error' | 'info'`
  - `duration?: number`
- **Variants**
  - `simple` – text only
  - `with-action` – includes an optional button

### Spinner
- **Props**
  - `size?: 'small' | 'medium' | 'large'`
  - `color?: string`
- **Variants**
  - `inline` – fits within content flow
  - `overlay` – centered overlay loader

## Component Development Checklist

- [ ] **Button**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **TextInput**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **Icon**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **Card**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **Modal**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **Toast**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **Spinner**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples

*Last updated: 2025‑06‑17*
