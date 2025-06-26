# Brain Game API

The REST API service for Brain Game, providing backend functionality for the universal client and web applications.

## Overview

This API serves as the backend for Brain Game applications, handling:
- User authentication and session management
- Analytics data collection and retrieval
- Application configuration
- Future expansion for additional features

**Base URL**: `https://api.braingame.dev`

## Architecture

Built with:
- **Express.js** - Web framework
- **TypeScript** - Type safety and better developer experience
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Zod** - Runtime type validation
- **Morgan** - HTTP request logging

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9+

### Installation

From the monorepo root:

```bash
# Install all dependencies
pnpm install

# Start the API in development mode
pnpm dev --filter api

# Or start all apps
pnpm dev
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Node environment
NODE_ENV=development

# Server configuration
PORT=8080

# CORS configuration (comma-separated list)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8081

# API Security
API_KEY=your-api-key-here

# Logging
LOG_LEVEL=info
```

## API Endpoints

### Health Check

```bash
GET /api/health
```

Returns the health status of the API:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-22T12:00:00.000Z",
  "environment": "development",
  "version": "1.0.0",
  "uptime": 123.456
}
```

### Readiness Check

```bash
GET /api/ready
```

Returns whether the API is ready to accept requests:

```json
{
  "ready": true
}
```

### Root Endpoint

```bash
GET /api/
```

Returns API information and available endpoints:

```json
{
  "message": "Brain Game API",
  "version": "v1",
  "endpoints": {
    "health": "/api/health",
    "ready": "/api/ready"
  },
  "documentation": "https://api.braingame.dev/docs"
}
```

### Placeholder Endpoints (Coming Soon)

- `GET /api/v1/users` - User management
- `GET /api/v1/sessions` - Session tracking
- `GET /api/v1/analytics` - Analytics data

## Development

### Running Tests

```bash
# Run tests
pnpm test --filter api

# Run tests in watch mode
pnpm test:watch --filter api

# Run tests with coverage
pnpm test:coverage --filter api
```

### Linting and Type Checking

```bash
# Lint code
pnpm lint --filter api

# Fix lint issues
pnpm lint:fix --filter api

# Type check
pnpm typecheck --filter api
```

### Building

```bash
# Build for production
pnpm build --filter api

# Start production server
pnpm start --filter api
```

## Project Structure

```
apps/api/
├── src/
│   ├── config/          # Configuration management
│   ├── middleware/      # Express middleware
│   │   ├── cors.ts     # CORS configuration
│   │   ├── error.ts    # Error handling
│   │   └── logger.ts   # Request logging
│   ├── routes/          # API routes
│   │   ├── health.ts   # Health check endpoints
│   │   └── index.ts    # Route aggregation
│   ├── types/           # TypeScript type definitions
│   └── index.ts         # Application entry point
├── .env.example         # Environment variables template
├── package.json         # Package configuration
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## Error Handling

The API uses a centralized error handling middleware that returns consistent error responses:

```json
{
  "error": {
    "message": "Error description",
    "timestamp": "2024-01-22T12:00:00.000Z",
    "path": "/api/endpoint",
    "method": "GET"
  }
}
```

In development mode, additional error details are included for debugging.

## Security

- **Helmet** for security headers
- **CORS** configured for allowed origins only
- **Rate limiting** (planned)
- **API key authentication** (planned)
- Environment-based configuration

## Deployment

The API is deployed to Firebase Functions via the monorepo CI/CD pipeline:

1. Push to `main` branch
2. GitHub Actions builds and tests
3. Deploys to Firebase Functions
4. Available at `https://api.braingame.dev`

### Manual Deployment

```bash
# Build the API
pnpm build --filter api

# Deploy to Firebase
firebase deploy --only functions:api
```

## Future Enhancements

- [ ] Database integration (Firestore)
- [ ] Authentication middleware
- [ ] Rate limiting
- [ ] API versioning strategy
- [ ] OpenAPI/Swagger documentation
- [ ] Webhook support
- [ ] GraphQL endpoint
- [ ] WebSocket support for real-time features

## Contributing

See the main [DEVELOPMENT.md](../../docs/DEVELOPMENT.md) for contribution guidelines.

## License

Part of the Brain Game monorepo. See root LICENSE file.