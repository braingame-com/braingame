# Environment Configuration

Centralized configuration management for the Brain Game app.

## Architecture

```typescript
// Single source of truth
packages/config/
├── src/
│   ├── index.ts         Main config exports
│   ├── env.ts           Environment detection
│   ├── api.ts           API endpoints
│   ├── features.ts      Feature flags
│   └── constants.ts     App constants
```

## Usage

### Import Configuration

```typescript
import { config } from '@braingame/config';

// API endpoints
const apiUrl = config.api.baseUrl;
const authEndpoint = config.api.endpoints.auth;

// Feature flags
if (config.features.enablePremium) {
  // Show premium features
}

// App constants
const maxRetries = config.constants.MAX_RETRIES;
```

### Environment Detection

```typescript
import { env } from '@braingame/config';

if (env.isDevelopment) {
  console.log('Debug info');
}

if (env.isProduction) {
  enableAnalytics();
}
```

## Configuration Structure

### API Configuration

```typescript
export const api = {
  baseUrl: process.env.API_URL || 'https://api.braingame.app',
  timeout: 30000,
  endpoints: {
    auth: '/auth',
    users: '/users',
    tokens: '/tokens'
  }
};
```

### Feature Flags

```typescript
export const features = {
  enablePremium: process.env.ENABLE_PREMIUM === 'true',
  enableAnalytics: process.env.NODE_ENV === 'production',
  enableDebugMode: process.env.DEBUG === 'true',
  maxFreeExercises: 3
};
```

### Constants

```typescript
export const constants = {
  MAX_RETRIES: 3,
  TOKEN_REFRESH_INTERVAL: 3600000, // 1 hour
  CACHE_DURATION: 300000, // 5 minutes
  MIN_PASSWORD_LENGTH: 8
};
```

## Environment Variables

### Development (.env.development)

```env
NODE_ENV=development
API_URL=http://localhost:3001
ENABLE_PREMIUM=true
DEBUG=true
```

### Production (.env.production)

```env
NODE_ENV=production
API_URL=https://api.braingame.app
ENABLE_PREMIUM=true
DEBUG=false
```

## Platform-Specific Config

### iOS

```typescript
if (Platform.OS === 'ios') {
  config.ui.statusBarStyle = 'dark-content';
  config.ui.keyboardBehavior = 'padding';
}
```

### Android

```typescript
if (Platform.OS === 'android') {
  config.ui.statusBarStyle = 'light-content';
  config.ui.keyboardBehavior = 'height';
}
```

## Build-Time Configuration

### Metro Config

```javascript
// metro.config.js
module.exports = {
  resolver: {
    extraNodeModules: {
      '@braingame/config': path.resolve(__dirname, '../../packages/config')
    }
  }
};
```

### TypeScript Paths

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@braingame/config": ["../../packages/config/src"]
    }
  }
}
```

## Best Practices

1. **Never hardcode** - Always use config
2. **Type safety** - Export TypeScript interfaces
3. **Validation** - Validate env vars on startup
4. **Documentation** - Document each config option
5. **Secrets** - Never commit sensitive values

## Testing

```typescript
// Mock configuration for tests
jest.mock('@braingame/config', () => ({
  config: {
    api: { baseUrl: 'http://localhost:3000' },
    features: { enablePremium: false }
  }
}));
```