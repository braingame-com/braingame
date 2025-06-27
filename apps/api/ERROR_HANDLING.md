# Error Handling Security Guide

## Overview

This document outlines the secure error handling implementation for the Brain Game API, ensuring sensitive information like stack traces are never exposed in production.

## Security Features

### 1. **Environment-Based Error Responses**

Error responses are tailored based on the environment:

**Production:**
```json
{
  "error": {
    "message": "Internal Server Error",
    "errorId": "550e8400-e29b-41d4-a716-446655440000",
    "timestamp": "2024-01-20T10:30:00.000Z",
    "path": "/api/users/123",
    "method": "GET"
  }
}
```

**Development:**
```json
{
  "error": {
    "message": "User not found",
    "errorId": "550e8400-e29b-41d4-a716-446655440000",
    "details": { "userId": "123" },
    "stack": "Error: User not found\n    at UserService.findById...",
    "timestamp": "2024-01-20T10:30:00.000Z",
    "path": "/api/users/123",
    "method": "GET"
  }
}
```

### 2. **Error Message Sanitization**

Database error messages are sanitized to prevent schema information leakage:

- Column names are removed
- Table/relation names are removed
- Constraint names are removed
- Data types are removed

Example:
- Before: `column "user_password" does not exist`
- After: `Database operation failed`

### 3. **Error Correlation IDs**

Every error generates a unique UUID for tracking:
- Helps with debugging without exposing details
- Allows support to trace errors in logs
- Provides reference for users to report issues

### 4. **Secure Logging**

**Production Logging:**
- No stack traces in logs
- Only essential information logged
- Error IDs for correlation

**Development Logging:**
- Full stack traces
- Detailed error information
- All error properties

## Error Types

### ApiError
Custom error class for API-specific errors:
```typescript
throw new ApiError(404, "Resource not found", { resourceId: id });
```

### Standard Error Types
- `ValidationError` → 400 Bad Request
- `UnauthorizedError` → 401 Unauthorized
- `SequelizeDatabaseError` → 500 (sanitized)
- `MongoError` → 500 (sanitized)
- Default → 500 Internal Server Error

## Best Practices

### DO:
- ✅ Use `ApiError` for expected errors
- ✅ Include helpful error messages in development
- ✅ Log error IDs for debugging
- ✅ Sanitize all user-facing error messages in production
- ✅ Test error handling with production config

### DON'T:
- ❌ Include stack traces in production responses
- ❌ Expose database schema in error messages
- ❌ Log sensitive data (passwords, tokens)
- ❌ Return raw database errors to users
- ❌ Include system paths in error responses

## Testing

Run error handling tests:
```bash
pnpm test error.test.ts
```

## Environment Configuration

Ensure `NODE_ENV` is properly set:
- `development` - Full error details
- `production` - Sanitized errors only
- `test` - Configurable for testing

## Security Compliance

This implementation addresses:
- **OWASP Top 10** - A06:2021 Vulnerable and Outdated Components
- **CWE-209** - Information Exposure Through Error Messages
- **PCI DSS 6.5.5** - Improper error handling