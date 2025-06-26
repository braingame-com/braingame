# Storybook Component Library

## Overview

Brain Game uses Storybook to showcase and document all BGUI components. This provides an interactive playground for developers to explore components, test different prop combinations, and understand usage patterns.

## Getting Started

### Running Storybook

```bash
# From root directory
pnpm storybook

# Storybook will open at http://localhost:6006
```

### Building Storybook

```bash
# Build static Storybook site
pnpm build-storybook

# Output will be in storybook-static/
```

## Component Stories

All BGUI components have corresponding story files located at:
```
packages/bgui/src/components/[ComponentName]/[ComponentName].stories.tsx
```

### Story Structure

Each story file follows this pattern:

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "./ComponentName";

const meta: Meta<typeof ComponentName> = {
  title: "Components/ComponentName",
  component: ComponentName,
  parameters: {
    layout: "centered", // or "padded", "fullscreen"
  },
  tags: ["autodocs"], // Enables auto-generated docs
  argTypes: {
    // Define controls for props
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story
export const Default: Story = {
  args: {
    // Default props
  },
};

// Story with render function for complex examples
export const Complex: Story = {
  render: (args) => (
    <div>
      <ComponentName {...args} />
    </div>
  ),
};
```

## Available Components

### Core Components
- **Text** - Typography component with variants and sizes
- **Button** - Interactive button with multiple variants
- **Card** - Container component with shadow and press effects
- **View** - Basic container with theme-aware styling

### Form Components
- **TextInput** - Text input with validation states
- **Checkbox** - Checkbox with label support
- **Switch** - Toggle switch component
- **RadioGroup** - Radio button group
- **Select** - Dropdown selection component
- **Slider** - Range slider component

### Feedback Components
- **Alert** - Alert messages with different types
- **Toast** - Temporary notification messages
- **Modal** - Dialog/popup component
- **Tooltip** - Hover/press tooltips
- **ProgressBar** - Progress indication
- **Spinner** - Loading spinner

### Navigation Components
- **Tabs** - Tab navigation
- **Breadcrumb** - Breadcrumb navigation
- **Menu** - Dropdown menu
- **ActionList** - List of actions

### Display Components
- **Avatar** - User avatar display
- **Badge** - Status badges
- **Icon** - Icon component
- **Image** - Enhanced image component
- **Divider** - Visual separator
- **GlowingLogo** - Animated logo

### Layout Components
- **PageWrapper** - Page container with safe areas
- **KeyboardAvoidingContainer** - Keyboard-aware container
- **Accordion** - Collapsible content

### Utility Components
- **Label** - Form field labels
- **Link** - Navigation links
- **LoadingButton** - Button with loading state
- **ErrorBoundary** - Error handling wrapper

## Best Practices

### 1. Story Naming
- Use descriptive names that explain the variation
- Group related stories (e.g., `Sizes`, `Variants`, `States`)
- Include edge cases and error states

### 2. Controls
- Define appropriate controls for interactive props
- Use the correct control type (select, boolean, text, etc.)
- Set sensible defaults

### 3. Documentation
- Add JSDoc comments to components
- Use the `tags: ["autodocs"]` to generate documentation
- Include usage examples in stories

### 4. Composition
- Create stories that show components working together
- Demonstrate real-world usage patterns
- Show responsive behavior

## Adding New Stories

1. **Generate initial story**:
   ```bash
   node scripts/generate-storybook-stories.js
   ```

2. **Enhance the generated story**:
   - Add proper argTypes for all props
   - Create multiple story variations
   - Add interactive examples
   - Include edge cases

3. **Test the story**:
   - Run Storybook locally
   - Test all controls
   - Verify responsive behavior
   - Check accessibility

## Story Examples

### Simple Component
```typescript
export const Default: Story = {
  args: {
    children: "Click me",
    variant: "primary",
  },
};
```

### Interactive Component
```typescript
export const Interactive: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    return (
      <Button onPress={() => setCount(count + 1)}>
        Clicked {count} times
      </Button>
    );
  },
};
```

### Multiple Variations
```typescript
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};
```

## Deployment

Storybook can be deployed to GitHub Pages or any static hosting service:

```bash
# Build static files
pnpm build-storybook

# Deploy to GitHub Pages
npx gh-pages -d storybook-static
```

## Troubleshooting

### Common Issues

1. **Component not showing**: Check import paths and ensure component is exported
2. **Controls not working**: Verify argTypes match actual prop names
3. **Styling issues**: Some RN styles may not work in web context
4. **Build errors**: Clear cache with `rm -rf node_modules/.cache`

### Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Writing Stories](https://storybook.js.org/docs/react/writing-stories/introduction)
- [Controls](https://storybook.js.org/docs/react/essentials/controls)
- [Autodocs](https://storybook.js.org/docs/react/writing-docs/autodocs)