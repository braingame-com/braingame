# API Security Guide

## Overview

This document outlines the security measures implemented in the API to prevent common vulnerabilities, with a focus on NoSQL injection prevention.

## Security Middleware

The API uses multiple layers of security middleware applied in `src/middleware/security.ts`:

1. **Helmet.js** - Sets various HTTP headers for security
2. **Request Sanitization** - Removes potentially malicious operators from request bodies
3. **Security Headers** - Additional headers for XSS, clickjacking, and other attack prevention

## NoSQL Injection Prevention

### Input Sanitization

All request bodies are automatically sanitized to remove MongoDB operators (keys starting with `$`):

```typescript
// Malicious input
{
  "username": "admin",
  "$ne": null,
  "password": { "$regex": ".*" }
}

// After sanitization
{
  "username": "admin",
  "password": {}
}
```

### Input Validation

Use Zod schemas with the `validateRequest` middleware:

```typescript
import { validateRequest, commonSchemas } from '../utils/security';

const schema = z.object({
  body: z.object({
    email: commonSchemas.email,
    username: commonSchemas.username,
  }),
});

router.post('/users', validateRequest(schema), handler);
```

### ObjectId Validation

Always validate MongoDB ObjectIds:

```typescript
import { isValidObjectId } from '../utils/security';

if (!isValidObjectId(req.params.id)) {
  return res.status(400).json({ error: 'Invalid ID format' });
}
```

## Best Practices

### DO:
- ✅ Use parameterized queries with ORMs/ODMs
- ✅ Validate all user input with Zod schemas
- ✅ Use the provided security utilities
- ✅ Set request size limits
- ✅ Use TypeScript for type safety

### DON'T:
- ❌ Pass raw user input to database queries
- ❌ Use string concatenation for queries
- ❌ Trust client-side validation alone
- ❌ Use `eval()` or similar dynamic code execution
- ❌ Expose stack traces in production

## Common Schemas

Pre-built schemas are available in `commonSchemas`:

- `objectId` - MongoDB ObjectId format
- `email` - Valid email address
- `username` - Alphanumeric with underscores/hyphens (3-30 chars)
- `password` - Minimum 8 characters
- `pagination` - Page number and limit

## Example Implementation

See `src/routes/example-secure.ts` for a complete example of secure API endpoints.

## Testing

Run security tests:
```bash
pnpm test security.test.ts
```

## Additional Resources

- [OWASP NoSQL Injection](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/05.6-Testing_for_NoSQL_Injection)
- [Helmet.js Documentation](https://helmetjs.github.io/)
- [Zod Documentation](https://zod.dev/)