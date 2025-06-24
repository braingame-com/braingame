# API Documentation

## Overview

The Brain Game API provides REST endpoints for the universal client and web applications. It's built with Express.js and TypeScript, deployed via Firebase Functions.

**Production URL**: `https://api.braingame.dev`

## Architecture

The API follows these principles:

- **RESTful design** - Standard HTTP methods and status codes
- **Type safety** - Full TypeScript with runtime validation via Zod
- **Security first** - Helmet, CORS, and planned authentication
- **Scalability** - Stateless design, ready for horizontal scaling
- **Monitoring** - Structured logging and health checks

## Key Features

### Current
- Health and readiness checks
- CORS configuration for Brain Game domains
- Error handling with consistent response format
- Request logging and monitoring
- TypeScript for type safety

### Planned
- Firebase Authentication integration
- Firestore database operations
- Rate limiting and API keys
- Analytics data collection
- Real-time features via WebSockets

## Development

See [apps/api/README.md](../apps/api/README.md) for detailed development instructions.

### Quick Start

```bash
# Start API in development mode
pnpm dev --filter api

# Run tests
pnpm test --filter api

# Build for production
pnpm build --filter api
```

## Deployment

The API is automatically deployed via GitHub Actions when changes are merged to `main`. It's hosted on Firebase Functions and accessible at `https://api.braingame.dev`.

## API Endpoints

### Base Endpoints

- `GET /api/` - API information
- `GET /api/health` - Health check
- `GET /api/ready` - Readiness probe

### Future Endpoints

- `/api/v1/auth/*` - Authentication
- `/api/v1/users/*` - User management
- `/api/v1/sessions/*` - Session tracking
- `/api/v1/analytics/*` - Analytics data

## Security Considerations

1. **CORS** - Only configured Brain Game domains allowed
2. **HTTPS** - All traffic encrypted in transit
3. **Headers** - Security headers via Helmet
4. **Authentication** - Firebase Auth integration (planned)
5. **Rate Limiting** - Request throttling (planned)

## Integration Guide

### For Universal Client (Expo)

```typescript
const API_BASE = __DEV__ 
  ? 'http://localhost:8080' 
  : 'https://api.braingame.dev';

const response = await fetch(`${API_BASE}/api/health`);
const data = await response.json();
```

### For Website (Next.js)

```typescript
// Use environment variables
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/health`);
const data = await response.json();
```

## Monitoring

- Health checks available at `/api/health`
- Structured logging with configurable levels
- Firebase Functions monitoring dashboard
- Custom alerts for error rates (planned)