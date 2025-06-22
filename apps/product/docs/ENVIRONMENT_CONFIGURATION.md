# Environment Configuration

This document describes the environment configuration system for the Brain Game product app.

## Overview

The Brain Game app uses a centralized environment configuration system that provides:

- Type-safe access to environment variables
- Validation using Zod schemas
- Clear separation between development, production, and test environments
- Centralized storage keys to avoid duplication
- Feature flags for controlling app behavior

## Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update the values in `.env.local` with your configuration

3. The environment is automatically validated when the app starts

## Configuration Structure

### Main Configuration File

All environment configuration is centralized in `src/config/env.ts`, which exports the following configuration objects:

#### APP_CONFIG
Basic app information and environment detection:
- `name`: Application name
- `version`: Application version
- `environment`: Current environment (development/production/test)
- `isProduction`, `isDevelopment`, `isTest`: Boolean flags for environment checks

#### API_CONFIG
API connection settings:
- `baseUrl`: Base URL for API requests
- `timeout`: Request timeout in milliseconds
- `retryAttempts`: Number of retry attempts for failed requests

#### AUTH_CONFIG
Authentication and security settings:
- `jwtSecret`: Secret key for JWT tokens
- `sessionTimeout`: Session timeout in milliseconds
- `encryptionKey`: Key for encrypting sensitive data
- `storageKeys`: AsyncStorage keys for auth data

#### ANALYTICS_CONFIG
Analytics service configuration:
- `enabled`: Whether analytics is enabled
- `debugMode`: Debug mode for analytics logging
- `providers`: API keys for analytics providers (Sentry, Amplitude, etc.)
- `storageKeys`: AsyncStorage keys for analytics data

#### ERROR_CONFIG
Error tracking configuration:
- `enabled`: Whether error reporting is enabled
- `sentryDsn`: Sentry DSN for error reporting
- `maxLocalLogs`: Maximum number of error logs to store locally
- `storageKeys`: AsyncStorage keys for error logs

#### PERFORMANCE_CONFIG
Performance monitoring settings:
- `enabled`: Whether performance monitoring is enabled
- `bundleAnalyzer`: Whether bundle analyzer is enabled
- Various timeout and limit settings

#### DEV_TOOLS_CONFIG
Development tool settings:
- `flipperEnabled`: Enable Flipper debugging
- `reactotronEnabled`: Enable Reactotron debugging
- `devMenuEnabled`: Enable developer menu
- `bundleAnalyzerEnabled`: Enable bundle size analysis

#### DEEP_LINKING_CONFIG
Deep linking URL configuration:
- `prefixes`: URL schemes the app responds to
- `webUrls`: Web URLs for different environments

#### STORAGE_KEYS
Centralized AsyncStorage keys organized by category:
- `auth`: Authentication-related keys
- `preferences`: User preference keys
- `analytics`: Analytics-related keys
- `errors`: Error tracking keys
- `app`: General app state keys
- `content`: Content-related keys

#### FIREBASE_CONFIG
Firebase service configuration:
- `functionUrl`: Firebase Cloud Functions URL
- `region`: Firebase region

#### FEATURE_FLAGS
Feature toggles for controlling app functionality:
- `analytics`: Enable/disable analytics
- `errorReporting`: Enable/disable error reporting
- `debugMode`: Enable/disable debug mode
- `performanceMonitoring`: Enable/disable performance monitoring
- Additional flags for new features

## Usage Examples

### Checking Environment

```typescript
import { APP_CONFIG } from '@/config/env';

if (APP_CONFIG.isProduction) {
  // Production-only code
} else if (APP_CONFIG.isDevelopment) {
  // Development-only code
}
```

### Using Storage Keys

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/config/env';

// Save user token
await AsyncStorage.setItem(STORAGE_KEYS.auth.token, userToken);

// Get user preferences
const theme = await AsyncStorage.getItem(STORAGE_KEYS.preferences.theme);
```

### Checking Feature Flags

```typescript
import { isFeatureEnabled } from '@/config/env';

if (isFeatureEnabled('analytics')) {
  // Track analytics event
}
```

### Using API Configuration

```typescript
import { API_CONFIG } from '@/config/env';

const response = await fetch(`${API_CONFIG.baseUrl}/users`, {
  timeout: API_CONFIG.timeout,
});
```

## Environment Variables

All environment variables are defined in the `.env.example` file. Key variables include:

### App Configuration
- `APP_NAME`: Application name
- `APP_VERSION`: Application version (semver format)
- `NODE_ENV`: Environment (development/production/test)

### API Configuration
- `API_BASE_URL`: Base URL for API requests
- `API_TIMEOUT`: Request timeout in milliseconds
- `API_RETRY_ATTEMPTS`: Number of retry attempts

### Security
- `JWT_SECRET`: Secret for JWT tokens (min 32 characters)
- `SESSION_TIMEOUT`: Session timeout in milliseconds
- `ENCRYPTION_KEY`: Encryption key (exactly 32 characters)

### Third-Party Services
- `ANALYTICS_KEY`: Analytics service API key
- `SENTRY_DSN`: Sentry error tracking DSN
- `AMPLITUDE_API_KEY`: Amplitude analytics API key

### Feature Flags
- `ENABLE_ANALYTICS`: Enable analytics tracking
- `ENABLE_ERROR_REPORTING`: Enable error reporting
- `ENABLE_DEBUG_MODE`: Enable debug mode
- `ENABLE_PERFORMANCE_MONITORING`: Enable performance monitoring

### Development Tools
- `FLIPPER_ENABLED`: Enable Flipper debugging
- `REACTOTRON_ENABLED`: Enable Reactotron debugging
- `DEV_MENU_ENABLED`: Enable developer menu

### Firebase
- `FIREBASE_FUNCTION_URL`: Firebase Cloud Functions URL
- `FIREBASE_REGION`: Firebase region

## Production Considerations

In production environments:

1. All sensitive values must be properly secured
2. Analytics and error reporting should be enabled
3. Debug tools must be disabled
4. JWT secrets must be at least 64 characters
5. Sentry DSN is required for error tracking

The `ProductionEnvSchema` enforces these requirements automatically.

## Adding New Configuration

To add new configuration values:

1. Add the environment variable to `.env.example`
2. Update the schema in `packages/utils/env/schemas.ts`
3. Add the configuration to `src/config/env.ts`
4. Update this documentation

## Best Practices

1. **Never commit real secrets** to version control
2. **Use environment-specific values** for URLs and API keys
3. **Validate all configuration** using the Zod schemas
4. **Centralize storage keys** to avoid duplication
5. **Use feature flags** for gradual rollouts
6. **Document all configuration** changes

## Troubleshooting

### Environment Validation Errors

If you see validation errors on startup:

1. Check that all required variables are set in `.env.local`
2. Ensure values match the expected format (e.g., URLs, numbers)
3. Check the error message for specific validation requirements

### Missing Configuration

If a configuration value is undefined:

1. Ensure the variable is defined in `.env.local`
2. Check that the variable name matches exactly
3. Restart the Metro bundler after changing environment variables

### Type Errors

The configuration system is fully typed. If you see type errors:

1. Ensure you're importing from the correct path
2. Check that the configuration object has the expected property
3. Update the TypeScript types if adding new configuration