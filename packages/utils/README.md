# @braingame/utils

> Shared utilities, hooks, and constants for Brain Game applications

## Installation

```bash
pnpm add @braingame/utils
```

## What's Included

### Design System
- **Colors** - Theme colors for light/dark modes
- **Tokens** - Spacing scale (xs through xxxxl)
- **Typography** - Font families and text styles
- **Shadows, Opacity, ZIndex** - Visual constants

### Hooks
- Theme and color scheme management
- State management utilities
- Focus and keyboard navigation
- Task-specific helpers

### Helpers
- Icon sizing utilities
- Task management functions

### Feature Flags
Use LaunchDarkly to control experimental features across apps.

```env
REACT_APP_LD_CLIENT_ID="your-client-id"
REACT_APP_LD_USER_KEY="anonymous-user"
```

```ts
import { ldClient } from "@braingame/utils/featureFlags";

await ldClient.waitForInitialization();
if (ldClient.variation("new-ui", false)) {
    // feature-specific logic
}
```

## Documentation

- [Architecture](../../docs/ARCHITECTURE.md) - System design
- [Development Guide](../../docs/DEVELOPMENT.md) - Setup and workflow

---

MIT © Brain Game