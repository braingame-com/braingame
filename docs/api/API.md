# Brain Game API

Express.js REST API deployed at https://api.braingame.dev

## Tech Stack
- Express.js + TypeScript
- Firebase Functions
- Zod validation
- Winston logging

## Endpoints

### Base
```
GET  /api/         → API info
GET  /api/health   → Health check
GET  /api/ready    → Readiness probe
```

### Future Endpoints
```
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/users/me
POST   /api/sessions
GET    /api/analytics/events
```

## Development

```bash
cd apps/api
npm install
npm run dev
```

Runs at http://localhost:3001

## Client Integration

### Expo App
```typescript
import { config } from '@braingame/config';

const response = await fetch(`${config.api.baseUrl}/health`);
```

### Next.js
```typescript
// Server component
const res = await fetch('https://api.braingame.dev/health', {
  next: { revalidate: 60 }
});

// Client component
const { data } = useSWR('/api/health', fetcher);
```

## Security

- HTTPS enforced
- CORS configured for known origins
- Helmet.js security headers
- Firebase Auth integration (planned)
- Rate limiting per IP (planned)

## Error Handling

Standardized error responses:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": {...}
  }
}
```

## Monitoring

- Request logging with Winston
- Error tracking with Sentry
- Health endpoint monitoring
- Response time metrics

## Deployment

```bash
# Deploy to Firebase Functions
npm run deploy

# Deploy specific function
firebase deploy --only functions:api
```