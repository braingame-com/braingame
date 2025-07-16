# Tooltip Component

A web implementation of the Tooltip component based on Joy UI's Tooltip with positioning and timing logic.

## Features

- ✅ **Core tooltip logic** copied from Joy UI including positioning
- ✅ **Show/hide states** with proper timing and hysteresis behavior
- ✅ **All props support** from TooltipProps interface
- ✅ **Accessibility** with proper ARIA attributes
- ✅ **Inline styles** using restyleTheme
- ✅ **Arrow positioning** and placement support
- ✅ **Trigger modes** (hover, focus, click/touch)
- ✅ **Portal rendering** for proper z-index stacking
- ✅ **Viewport collision detection** to keep tooltips visible
- ✅ **Animation support** with fade-in/fade-out effects

## Usage

```tsx
import { Tooltip } from '@braingame/bgui';

// Basic tooltip
<Tooltip title="This is a tooltip">
  <button>Hover me</button>
</Tooltip>

// With arrow
<Tooltip title="Tooltip with arrow" arrow>
  <button>Hover me</button>
</Tooltip>

// Different placements
<Tooltip title="Top tooltip" placement="top">
  <button>Top</button>
</Tooltip>

// Different variants and colors
<Tooltip title="Primary tooltip" variant="solid" color="primary">
  <button>Primary</button>
</Tooltip>

// Controlled tooltip
<Tooltip title="Always visible" open>
  <button>Always visible</button>
</Tooltip>

// With delays
<Tooltip title="Delayed tooltip" enterDelay={1000} leaveDelay={500}>
  <button>Delayed</button>
</Tooltip>

// Follow cursor
<Tooltip title="Follows cursor" followCursor>
  <button>Follow cursor</button>
</Tooltip>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | - | Tooltip content (required) |
| `children` | `ReactNode` | - | Trigger element (required) |
| `color` | `"primary" \| "neutral" \| "danger" \| "success" \| "warning"` | `"neutral"` | Color theme |
| `variant` | `"plain" \| "outlined" \| "soft" \| "solid"` | `"solid"` | Visual variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size of tooltip |
| `placement` | `"top" \| "top-start" \| "top-end" \| "right" \| "right-start" \| "right-end" \| "bottom" \| "bottom-start" \| "bottom-end" \| "left" \| "left-start" \| "left-end"` | `"bottom"` | Tooltip placement |
| `arrow` | `boolean` | `false` | Show arrow pointing to trigger |
| `open` | `boolean` | - | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Default open state |
| `enterDelay` | `number` | `0` | Delay before showing (ms) |
| `leaveDelay` | `number` | `0` | Delay before hiding (ms) |
| `enterTouchDelay` | `number` | `700` | Touch delay before showing (ms) |
| `leaveTouchDelay` | `number` | `1500` | Touch delay before hiding (ms) |
| `disableInteractive` | `boolean` | `false` | Disable hover over tooltip |
| `followCursor` | `boolean` | `false` | Follow mouse cursor |
| `disableHoverListener` | `boolean` | `false` | Disable hover trigger |
| `disableFocusListener` | `boolean` | `false` | Disable focus trigger |
| `disableTouchListener` | `boolean` | `false` | Disable touch trigger |
| `onOpen` | `(event: any) => void` | - | Callback when tooltip opens |
| `onClose` | `(event: any) => void` | - | Callback when tooltip closes |
| `style` | `CSSProperties` | - | Additional styles |
| `testID` | `string` | - | Test identifier |
| `id` | `string` | - | HTML id attribute |

## Implementation Details

### Positioning System

The tooltip uses a sophisticated positioning system that:

1. **Calculates optimal placement** based on the `placement` prop
2. **Detects viewport collisions** and adjusts position accordingly
3. **Supports all 12 placements** (top, top-start, top-end, right, right-start, right-end, bottom, bottom-start, bottom-end, left, left-start, left-end)
4. **Handles scrolling** by accounting for `window.scrollX` and `window.scrollY`

### Timing and Hysteresis

The component implements Joy UI's hysteresis behavior:

- **Enter delay**: Configurable delay before showing tooltip
- **Leave delay**: Configurable delay before hiding tooltip
- **Hysteresis**: Faster transitions between related tooltips
- **Touch support**: Longer delays for touch interactions

### Event Handling

The tooltip supports multiple trigger modes:

- **Hover**: Mouse enter/leave events
- **Focus**: Focus/blur events with focus-visible detection
- **Touch**: Touch start/end events with proper timing
- **Keyboard**: Escape key to close tooltip

### Portal Rendering

Tooltips are rendered in a portal to ensure:

- **Proper z-index stacking** above other content
- **No clipping** by parent containers
- **Consistent positioning** regardless of parent styles

### Accessibility

The component provides full accessibility support:

- **ARIA attributes**: `role="tooltip"`, `aria-describedby`
- **Keyboard navigation**: Escape key support
- **Focus management**: Focus-visible detection
- **Screen reader support**: Proper ARIA relationships

### Animation

Smooth animations are provided via:

- **CSS keyframes** for fade-in/fade-out
- **Transform scaling** for polished appearance
- **Configurable duration** and easing

### Theme Integration

The component uses the restyle theme system:

- **Color variants**: All theme colors supported
- **Visual variants**: Plain, outlined, soft, solid
- **Size variants**: Small, medium, large
- **Typography**: Uses theme typography scales
- **Spacing**: Uses theme spacing values

## Technical Architecture

### Core Classes

- **`Timeout`**: Custom timeout utility for managing delays
- **`calculatePosition`**: Positioning algorithm with viewport collision detection
- **`calculateArrowPosition`**: Arrow positioning for all placements
- **`composeEventHandler`**: Event handler composition utility

### State Management

- **Internal state**: Manages open/closed state when uncontrolled
- **Controlled state**: Supports external control via `open` prop
- **Position state**: Tracks tooltip position for smooth updates
- **Focus state**: Tracks focus-visible state for proper styling

### Performance Optimizations

- **Portal caching**: Reuses portal container across instances
- **Event delegation**: Efficient event handler composition
- **Timeout management**: Proper cleanup of all timeouts
- **Render optimization**: Conditional rendering based on state

## Browser Support

The component supports all modern browsers with:

- **Portal support**: Uses `ReactDOM.createPortal`
- **Focus-visible**: Graceful fallback for older browsers
- **CSS animations**: Uses standard CSS keyframes
- **Touch events**: Full touch device support

## Testing

The component includes comprehensive tests covering:

- **Basic functionality**: Rendering, showing, hiding
- **Event handling**: Hover, focus, touch interactions
- **Prop validation**: All props tested
- **Accessibility**: ARIA attributes and keyboard support
- **Edge cases**: Empty titles, disabled states, etc.

Run tests with:
```bash
npm test Tooltip.web.test.tsx
```

## Examples

See `example.tsx` for comprehensive usage examples including:

- Basic tooltips
- All placement variations
- All color and variant combinations
- Controlled and uncontrolled usage
- Interactive tooltips
- Delayed and cursor-following tooltips