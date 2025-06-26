# API Service

REST API for Brain Game, handling authentication, user data, and business logic.

## Stack
- Express.js + TypeScript
- PostgreSQL + Prisma
- JWT authentication
- Docker containerization

## Quick Start

```bash
cd apps/api
npm install
npm run dev
```

Server runs at http://localhost:3001

## Environment Variables

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/braingame
JWT_SECRET=your-secret-key
NODE_ENV=development
PORT=3001
```

## Database

```bash
# Setup
npm run db:push

# Migrations
npm run db:migrate

# Studio
npm run db:studio
```

## API Endpoints

### Authentication
```
POST   /auth/register    Create account
POST   /auth/login       Login
POST   /auth/refresh     Refresh token
POST   /auth/logout      Logout
```

### Users
```
GET    /users/me         Current user
PATCH  /users/me         Update profile
DELETE /users/me         Delete account
```

### Tokens
```
GET    /tokens/balance    Current balance
POST   /tokens/purchase   Buy tokens
GET    /tokens/history    Transaction history
```

## Development

### Project Structure
```
apps/api/
├── src/
│   ├── controllers/     Request handlers
│   ├── services/        Business logic
│   ├── middleware/      Auth, validation
│   ├── routes/          API routes
│   └── utils/           Helpers
├── prisma/              Database schema
└── tests/               Test suites
```

### Testing

```bash
npm test              # Unit tests
npm run test:e2e      # Integration tests
npm run test:coverage # Coverage report
```

### Error Handling

We use standardized error responses:
```json
{
  "error": {
    "code": "AUTH_INVALID_TOKEN",
    "message": "Invalid authentication token"
  }
}
```

## Deployment

### Production Build
```bash
npm run build
npm start
```

### Docker
```bash
docker build -t braingame-api .
docker run -p 3001:3001 braingame-api
```

### Health Check
```
GET /health → {"status": "ok", "timestamp": "..."}
```

## Security

- Rate limiting: 100 req/min per IP
- CORS configured for known origins
- Input validation with Zod
- SQL injection prevention via Prisma
- JWT tokens expire in 7 days

## Monitoring

- Request logging with Winston
- Error tracking with Sentry
- Performance monitoring with New Relic
- Database query analysis

## Future Enhancements

1. WebSocket support for real-time features
2. GraphQL API layer
3. Redis caching layer
4. Horizontal scaling with load balancer