# Environment Configuration Guide

This guide covers environment variable management across the Brain Game monorepo.

## Overview

The monorepo uses a strict environment validation system powered by Zod schemas to ensure all required environment variables are properly set and validated before running applications.

## Environment Files

Each app uses different environment file names based on the framework:

- **Product App** (React Native): `.env`
- **Main Site** (Next.js): `.env.local`
- **Docs Site** (Next.js): `.env.local`
- **API** (Node.js): `.env`

## Environment Check Script

### Basic Usage

```bash
# Check all apps
pnpm check:env

# Check specific app
pnpm check:env product

# Auto-create missing .env files from .env.example
pnpm check:env --fix
```

### What It Does

1. **Validates environment files exist** - Checks for .env files in each app
2. **Validates variable format** - Ensures variables match expected patterns (URLs, semver, etc.)
3. **Checks required variables** - Confirms all required variables are present
4. **Production checks** - Additional validation for production environments
5. **Security warnings** - Alerts for potential security issues

### Example Output

```
🔍 Environment Configuration Check

Checking product...
✓ All 25 environment variables are valid

Checking main-site...
✗ Environment validation failed:
  NEXT_PUBLIC_API_BASE_URL: Invalid URL
  NEXT_PUBLIC_FIREBASE_API_KEY: Missing required variable

Missing variables:
  - NEXT_PUBLIC_FIREBASE_API_KEY
  - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
```

## Environment Schemas

Environment variables are validated using Zod schemas defined in `packages/utils/env/schemas.ts`:

### Product App Schema
- Base configuration (NODE_ENV, APP_NAME, APP_VERSION)
- API configuration (API_BASE_URL, API_TIMEOUT)
- Security (JWT_SECRET, ENCRYPTION_KEY)
- Analytics (SENTRY_DSN, AMPLITUDE_API_KEY)
- Feature flags (ENABLE_ANALYTICS, ENABLE_DEBUG_MODE)
- Firebase configuration

### Website Schema
- Next.js public variables (NEXT_PUBLIC_ prefix)
- Firebase configuration
- Analytics and monitoring
- API configuration

### Production Schema
- Stricter validation for production
- Requires analytics enabled
- Requires dev tools disabled
- Minimum secret lengths

## Setting Up Environment

### Development

1. Copy example files:
```bash
pnpm check:env --fix
```

2. Edit the created .env files with your values

3. Validate configuration:
```bash
pnpm check:env
```

### Production

1. Set all required variables in your deployment platform
2. Ensure secrets are properly encrypted
3. Enable all monitoring and analytics
4. Disable all development tools

### CI/CD

The simple validation script can be used in CI/CD:

```bash
# In your CI/CD pipeline
node scripts/validate-env.js
```

This exits with code 1 if any required variables are missing.

## Security Best Practices

1. **Never commit .env files** - They're in .gitignore
2. **Use strong secrets** - Minimum 32 characters for keys
3. **Rotate secrets regularly** - Especially in production
4. **Use different values per environment** - Don't reuse dev secrets in prod
5. **Encrypt sensitive values** - Use your platform's secret management

## Common Issues

### Missing Variables
```
✗ FIREBASE_API_KEY: Missing required variable
```
**Solution**: Add the variable to your .env file

### Invalid Format
```
✗ APP_VERSION: Version must be in semver format (x.y.z)
```
**Solution**: Use proper format (e.g., "1.0.0")

### Invalid URL
```
✗ API_BASE_URL: API base URL must be a valid URL
```
**Solution**: Include protocol (e.g., "https://api.example.com")

### Production Warnings
```
⚠ JWT_SECRET should be at least 64 characters in production
```
**Solution**: Generate stronger secrets for production

## Environment Variable Reference

### Common Variables
- `NODE_ENV` - Environment name (development/production/test)
- `APP_NAME` - Application name
- `APP_VERSION` - Semver version (x.y.z)

### API Configuration
- `API_BASE_URL` - Backend API URL
- `API_TIMEOUT` - Request timeout in ms (1000-60000)
- `API_RETRY_ATTEMPTS` - Number of retries (0-10)

### Security
- `JWT_SECRET` - JWT signing secret (min 32 chars, 64 for prod)
- `SESSION_TIMEOUT` - Session timeout in ms
- `ENCRYPTION_KEY` - Encryption key (exactly 32 chars)

### Firebase
- `FIREBASE_API_KEY` - Firebase API key
- `FIREBASE_AUTH_DOMAIN` - Auth domain (*.firebaseapp.com)
- `FIREBASE_PROJECT_ID` - Project identifier
- `FIREBASE_STORAGE_BUCKET` - Storage bucket (*.appspot.com)
- `FIREBASE_MESSAGING_SENDER_ID` - FCM sender ID
- `FIREBASE_APP_ID` - Firebase app ID

### Analytics & Monitoring
- `SENTRY_DSN` - Sentry error tracking URL
- `AMPLITUDE_API_KEY` - Amplitude analytics key
- `ANALYTICS_KEY` - Generic analytics key

### Feature Flags
- `ENABLE_ANALYTICS` - Enable analytics (boolean)
- `ENABLE_ERROR_REPORTING` - Enable error reporting (boolean)
- `ENABLE_DEBUG_MODE` - Enable debug mode (boolean)
- `ENABLE_PERFORMANCE_MONITORING` - Enable performance monitoring (boolean)

### Development Tools
- `FLIPPER_ENABLED` - Enable Flipper debugging (boolean)
- `REACTOTRON_ENABLED` - Enable Reactotron (boolean)
- `DEV_MENU_ENABLED` - Enable dev menu (boolean)
- `BUNDLE_ANALYZER_ENABLED` - Enable bundle analysis (boolean)

## Adding New Variables

1. Add to schema in `packages/utils/env/schemas.ts`
2. Update `.env.example` files
3. Document in this file
4. Run validation to ensure everything works

## Platform-Specific Notes

### Vercel (Next.js apps)
- Use Vercel dashboard for production secrets
- Environment variables are automatically loaded
- Use NEXT_PUBLIC_ prefix for client-side variables

### EAS Build (React Native)
- Configure in `eas.json`
- Use EAS Secrets for sensitive values
- Variables are injected at build time

### Local Development
- Use `.env` files
- Install dotenv if needed
- Never commit actual values