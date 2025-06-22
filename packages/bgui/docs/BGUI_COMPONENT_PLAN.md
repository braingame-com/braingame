# BGUI Component Plan

This document outlines the proposed set of enterprise‑grade components for the Brain Game UI library (`@brain-game/bgui`). Each component lists the key props and supported variants to ensure a consistent developer experience across web and native platforms.

> **Implementation Status**: 25 of 28 components implemented. Missing: Alert, Breadcrumb, and TextInput (apps use React Native's built-in TextInput).

## Design Principles

### API Consistency
- **Event Handlers**: Use `onPress` for all click/tap actions, `onValueChange` for value updates
- **Content**: Prefer `children` over `label` props for maximum flexibility
- **Theming**: Use design token keys instead of arbitrary strings for colors/spacing

### Accessibility (A11y)
All components support:
- ARIA attributes (`aria-label`, `aria-describedby`, `aria-hidden`, etc.)
- Keyboard navigation with proper focus management
- Screen reader compatibility with semantic markup
- Focus trapping for overlays (Modal, Menu, etc.)

### Internationalization (i18n)
All user facing strings and ARIA labels should come from translation files managed by the shared `@braingame/i18n` package. Components reference translation keys so content can be localized without code changes.
See [I18N_WORKFLOW.md](./I18N_WORKFLOW.md) for steps to add a new language.

### Theming Strategy
Components consume design tokens from a central theme:
```typescript
// Theme token examples
colors: 'primary' | 'secondary' | 'danger' | 'neutral'
spacing: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
typography: 'h1' | 'h2' | 'h3' | 'body' | 'caption'
```

## Core Components

### Button
- **Props**
  - `children: ReactNode` – button content
  - `onPress: () => void` – callback when pressed
  - `icon?: string` – optional icon name
  - `iconPosition?: 'left' | 'right'` – icon placement
  - `size?: 'sm' | 'md' | 'lg'` – button size
  - `fullWidth?: boolean` – expand to container width
  - `disabled?: boolean`
  - `loading?: boolean`
  - `aria-label?: string` – accessibility label
  - `aria-describedby?: string` – accessibility description
- **Variants**
  - `primary` – default action style
  - `secondary` – subtle alternative
  - `ghost` – text‑only appearance
  - `danger` – destructive action
  - `icon` – icon-only button (requires aria-label)
- **Accessibility**
  - Keyboard: Space/Enter to activate
  - Screen readers: Announces role, state, and label
  - Icon-only buttons require `aria-label` for context

### TextInput
- **Props**
  - `value: string`
  - `onValueChange: (value: string) => void`
  - `placeholder?: string`
  - `secureTextEntry?: boolean`
  - `multiline?: boolean` – multi-line text area
  - `autoComplete?: string` – browser autocomplete hint
  - `maxLength?: number` – character limit
  - `leftIcon?: string` – icon on left side
  - `rightIcon?: string` – icon on right side
  - `disabled?: boolean`
  - `aria-label?: string` – accessibility label
  - `aria-describedby?: string` – error/help text association
- **Variants**
  - `standard` – bordered input
  - `flat` – borderless style
  - `error` – shows validation state
- **Accessibility**
  - Must be associated with a Label component
  - Error states announced to screen readers
  - Keyboard navigation support

### Icon
- **Props**
  - `name: string`
  - `size?: 'sm' | 'md' | 'lg'`
  - `color?: ThemeColor`
  - `decorative?: boolean` – hides from screen readers
  - `aria-label?: string` – accessibility label for semantic icons
- **Variants**
  - `solid` – filled glyph
  - `regular` – outlined glyph
  - `brand` – brand color
- **Accessibility**
  - Decorative icons: `aria-hidden="true"`
  - Semantic icons: require `aria-label`

### Card
- **Props**
  - `children: ReactNode`
  - `elevation?: number`
  - `padding?: 'none' | 'small' | 'medium' | 'large'` – internal spacing
  - `shadow?: boolean` – drop shadow effect
  - `onPress?: () => void`
- **Variants**
  - `basic` – plain container
  - `interactive` – hoverable / pressable

### Modal
- **Props**
  - `visible: boolean`
  - `onClose: () => void`
  - `children: ReactNode` – modal content
  - `size?: 'sm' | 'md' | 'lg' | 'fullscreen'` – modal dimensions
  - `closable?: boolean` – show close button
  - `backdrop?: boolean` – show background overlay
  - `aria-label?: string` – accessibility label
- **Variants**
  - `center` – default centered modal
  - `bottom-sheet` – slides from bottom on mobile
- **Accessibility**
  - Focus trapping within modal
  - Keyboard: Escape to close
  - Screen readers: Proper ARIA dialog role
  - Focus returns to trigger element on close
- **Composition**
  ```jsx
  <Modal visible={open} onClose={() => setOpen(false)}>
    <Modal.Header>
      <Modal.Title>Modal Title</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Modal content goes here
    </Modal.Body>
    <Modal.Footer>
      <Button onPress={() => setOpen(false)}>Close</Button>
    </Modal.Footer>
  </Modal>
  ```

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
  - `size?: 'sm' | 'md' | 'lg'`
  - `color?: ThemeColor`
  - `aria-label?: string` – accessibility label
- **Variants**
  - `inline` – fits within content flow
  - `overlay` – centered overlay loader
- **Accessibility**
  - Announces loading state to screen readers
  - Focus management for overlay variant

### Label
- **Props**
  - `children: ReactNode` – label content
  - `htmlFor?: string` – associates with form control
  - `required?: boolean` – shows required indicator
  - `size?: 'sm' | 'md' | 'lg'`
- **Variants**
  - `standard` – default label
  - `floating` – floating label for inputs
- **Accessibility**
  - Programmatically associates with form controls
  - Required state announced to screen readers

### Link
- **Props**
  - `children: ReactNode` – link content
  - `href?: string` – navigation URL
  - `onPress?: () => void` – custom navigation handler
  - `external?: boolean` – opens in new tab
  - `disabled?: boolean`
  - `aria-label?: string` – accessibility label
- **Variants**
  - `inline` – text link within content
  - `standalone` – standalone navigation link
- **Accessibility**
  - Keyboard: Enter to activate
  - External links announce "opens in new window"
  - Proper focus indicators

### Image
- **Props**
  - `src: string` – image source
  - `alt: string` – accessibility description
  - `placeholder?: ReactNode` – loading placeholder
  - `fallback?: ReactNode` – error fallback
  - `aspectRatio?: number` – maintain aspect ratio
  - `objectFit?: 'cover' | 'contain' | 'fill'`
- **Variants**
  - `responsive` – scales with container
  - `fixed` – fixed dimensions
- **Accessibility**
  - Always requires meaningful alt text
  - Decorative images use alt=\"\"

### Text
- **Props**
  - `children: ReactNode` – text content
  - `color?: ThemeColor` – text color
  - `align?: 'left' | 'center' | 'right'` – text alignment
  - `numberOfLines?: number` – truncate after lines
- **Variants**
  - `h1` – large heading
  - `h2` – medium heading
  - `h3` – small heading
  - `body` – default body text
  - `caption` – small secondary text

### Avatar
- **Props**
  - `src?: string` – image source
  - `name?: string` – fallback initials
  - `size?: 'small' | 'medium' | 'large'`
  - `onPress?: () => void`
- **Variants**
  - `circle` – circular avatar
  - `square` – rounded square avatar

### Badge
- **Props**
  - `count?: number` – numeric badge
  - `text?: string` – text badge
  - `dot?: boolean` – small dot indicator
  - `color?: ThemeColor` – badge color
- **Variants**
  - `notification` – red notification badge
  - `status` – colored status indicator
  - `count` – numeric counter

### Checkbox
- **Props**
  - `checked: boolean`
  - `onValueChange: (value: boolean) => void`
  - `children?: ReactNode` – checkbox label
  - `indeterminate?: boolean` – partial selection state
  - `disabled?: boolean`
  - `aria-label?: string` – accessibility label if no children
  - `aria-describedby?: string` – error/help text association
- **Variants**
  - `standard` – default checkbox
  - `card` – card-style selection
- **Accessibility**
  - Keyboard: Space to toggle
  - Screen readers: Announces checked/unchecked/indeterminate state
  - Proper focus indicators

### Switch
- **Props**
  - `value: boolean`
  - `onValueChange: (value: boolean) => void`
  - `disabled?: boolean`
- **Variants**
  - `standard` – default toggle switch
  - `compact` – smaller switch

### RadioGroup
- **Props**
  - `children: ReactNode` – RadioGroup.Item components
  - `value: string` – value of the selected radio item
  - `onValueChange: (value: string) => void` – callback when selection changes
  - `defaultValue?: string` – initially selected value (uncontrolled)
  - `disabled?: boolean`
  - `aria-label?: string` – accessibility label
- **Variants**
  - `standard` – default vertical radio group
  - `card` – card-style selection group
- **Accessibility**
  - Keyboard: Arrow keys for navigation, Space to select
  - Screen readers: Announced as group with item count and selection state
  - Each radio item is associated with the group label
- **Composition**
  ```jsx
  <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
    <RadioGroup.Item value="item1">Item 1</RadioGroup.Item>
    <RadioGroup.Item value="item2">Item 2</RadioGroup.Item>
  </RadioGroup>
  ```

### Select
- **Props**
  - `children: ReactNode` - Select.Item components
  - `value?: string | string[]`
  - `onValueChange: (value: string | string[]) => void`
  - `placeholder?: string`
  - `searchable?: boolean`
  - `multiple?: boolean`
  - `disabled?: boolean`
  - `aria-label?: string` – accessibility label
- **Variants**
  - `dropdown` – traditional dropdown
  - `modal` – modal selection on mobile
- **Accessibility**
  - Keyboard: Arrow keys for navigation, Enter/Space to select/open
  - Screen readers: Proper ARIA listbox role and state announcement
  - Focus management for dropdown/modal
- **Composition**
  ```jsx
  <Select value={value} onValueChange={setValue}>
    <Select.Item value="option1">Option 1</Select.Item>
    <Select.Item value="option2">Option 2</Select.Item>
    <Select.Item value="option3">Option 3</Select.Item>
  </Select>
  ```

### ProgressBar
- **Props**
  - `value: number` – progress value (0-100)
  - `color?: ThemeColor` – progress color
  - `backgroundColor?: ThemeColor` – track color
  - `animated?: boolean`
- **Variants**
  - `linear` – horizontal progress bar
  - `circular` – circular progress indicator

### Divider
- **Props**
  - `orientation?: 'horizontal' | 'vertical'`
  - `color?: ThemeColor`
  - `thickness?: number`
- **Variants**
  - `solid` – solid line
  - `dashed` – dashed line

### Alert
- **Props**
  - `title?: string`
  - `message: string`
  - `type?: 'info' | 'success' | 'warning' | 'error'`
  - `actions?: ReactNode`
  - `dismissible?: boolean`
  - `onDismiss?: () => void`
- **Variants**
  - `banner` – full-width alert
  - `inline` – embedded alert
  - `floating` – positioned alert

### ActionList
- **Props**
  - `children: ReactNode` – ActionList.Item components
  - `selectable?: boolean` – allow item selection
  - `selectedItems?: string[]` – controlled selection
  - `onSelectionChange?: (items: string[]) => void`
  - `aria-label?: string` – accessibility label
- **Variants**
  - `menu` – dropdown menu style
  - `list` – vertical list layout
  - `compact` – condensed spacing
- **Accessibility**
  - Keyboard: Arrow keys for navigation, Enter/Space to select
  - Screen readers: Announced as list with item count
  - Focus management and selection state
- **Composition**
  ```jsx
  <ActionList>
    <ActionList.Item onPress={() => {}} icon="edit">
      Edit Item
    </ActionList.Item>
    <ActionList.Divider />
    <ActionList.Item onPress={() => {}} disabled>
      Disabled Item
    </ActionList.Item>
  </ActionList>
  ```

### Tooltip
- **Props**
  - `content: string | ReactNode` – tooltip content
  - `children: ReactNode` – element to attach tooltip to
  - `placement?: 'top' | 'bottom' | 'left' | 'right'` – tooltip position
  - `delay?: number` – show delay in ms
  - `disabled?: boolean`
- **Variants**
  - `dark` – dark background tooltip
  - `light` – light background tooltip
  - `info` – informational styling

### Tabs
- **Props**
  - `children: ReactNode` – Tabs.List and Tabs.Panels
  - `activeTab: string`
  - `onValueChange: (value: string) => void`
  - `scrollable?: boolean` – allow horizontal scrolling
- **Variants**
  - `line` – underline indicator
  - `enclosed` – enclosed tab design
  - `pills` – pill-shaped tabs
- **Accessibility**
  - Keyboard: Arrow keys for tab navigation, Tab to move to panel
  - Screen readers: Proper ARIA tablist/tab/tabpanel relationships
  - Focus management between tabs and panels
- **Composition**
  ```jsx
  <Tabs activeTab="tab1" onValueChange={setValue}>
    <Tabs.List>
      <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
      <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panels>
      <Tabs.Panel value="tab1">Panel 1 content</Tabs.Panel>
      <Tabs.Panel value="tab2">Panel 2 content</Tabs.Panel>
    </Tabs.Panels>
  </Tabs>
  ```

### Accordion
- **Props**
  - `children: ReactNode` – Accordion.Item components
  - `value?: string | string[]` – controlled expanded item(s)
  - `onValueChange?: (value: string | string[]) => void` – callback for controlled expansion
  - `defaultValue?: string | string[]` – initially expanded item(s) (uncontrolled)
  - `allowMultiple?: boolean` – multiple panels open
- **Variants**
  - `standard` – default accordion
  - `flush` – no borders/padding
  - `card` – card-style panels
- **Accessibility**
  - Keyboard: Enter/Space to toggle, Arrow keys for navigation
  - Screen readers: Proper ARIA expanded/collapsed states
  - Focus management between panels
- **Composition**
  ```jsx
  <Accordion value={expanded} onValueChange={setExpanded}>
    <Accordion.Item title="Panel 1" value="panel1">
      Content for panel 1
    </Accordion.Item>
    <Accordion.Item title="Panel 2" value="panel2">
      Content for panel 2
    </Accordion.Item>
  </Accordion>
  ```

### Breadcrumb
- **Props**
  - `children: ReactNode` – Breadcrumb.Item components
  - `separator?: ReactNode` – custom separator
  - `maxItems?: number` – collapse after limit
- **Variants**
  - `standard` – default breadcrumb
  - `compact` – condensed spacing
- **Accessibility**
  - Keyboard: Tab to navigate between items
  - Screen readers: Announced as a navigation landmark with item count
- **Composition**
  ```jsx
  <Breadcrumb>
    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
    <Breadcrumb.Item href="/category">Category</Breadcrumb.Item>
    <Breadcrumb.Item>Current Page</Breadcrumb.Item>
  </Breadcrumb>
  ```

### Menu
- **Props**
  - `trigger: ReactNode` – element that opens menu
  - `children: ReactNode` – menu content
  - `placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'`
  - `closeOnSelect?: boolean`
  - `aria-label?: string` – accessibility label
- **Variants**
  - `dropdown` – dropdown menu
  - `context` – right-click context menu
- **Accessibility**
  - Focus trapping when open
  - Keyboard: Escape to close, Arrow keys for navigation
  - Screen readers: Announced as menu with item count
- **Composition**
  ```jsx
  <Menu trigger={<Button>Actions</Button>}>
    <Menu.Item onPress={() => {}}>Edit</Menu.Item>
    <Menu.Item onPress={() => {}}>Delete</Menu.Item>
  </Menu>
  ```

### Slider
- **Props**
  - `value: number | [number, number]` – current value(s)
  - `onValueChange: (value: number | [number, number]) => void`
  - `min?: number` – minimum value
  - `max?: number` – maximum value
  - `step?: number` – increment step
  - `disabled?: boolean`
- **Variants**
  - `single` – single thumb slider
  - `range` – dual thumb range slider

## Implementation Priority

### Phase 1: Foundation (MVP)
Essential components for basic UI functionality:
- Button, Icon, Text, Link
- TextInput, Label, Checkbox, Switch
- Card, Divider, Spinner

### Phase 2: Layout & Navigation
Components for app structure:
- Modal, Toast, Alert
- Tabs, Breadcrumb, ActionList
- Avatar, Badge

### Phase 3: Advanced Interactions  
Complex interactive components:
- Menu, Tooltip, Accordion
- Select, RadioGroup, ProgressBar
- Slider, Image

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
- [ ] **Text**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **Avatar**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **Badge**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **Checkbox**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **Switch**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **RadioGroup**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **Select**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **ProgressBar**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **Divider**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **Alert**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **ActionList**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **Tooltip**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **Tabs**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **Accordion**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **Breadcrumb**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **Menu**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **Slider**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **Label**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **Link**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples
- [ ] **Image**
  - [ ] Implement props and variants
  - [ ] Write unit tests
  - [ ] Add Storybook examples

## TypeScript Definitions

```typescript
// Theme tokens
type ThemeColor = 'primary' | 'secondary' | 'danger' | 'neutral' | 'success' | 'warning';
type ThemeSpacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ThemeSize = 'sm' | 'md' | 'lg';

// Common props
interface BaseProps {
  children?: ReactNode;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

interface InteractiveProps extends BaseProps {
  onPress?: () => void;
  disabled?: boolean;
}
```

*Last updated: 2025‑06‑17*
