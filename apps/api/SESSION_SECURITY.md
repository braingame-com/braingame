# Session Security Configuration

## Overview

This document outlines the secure session management implementation for the Brain Game API, addressing the security audit finding about insecure session cookies.

## Security Features Implemented

### 1. **Secure Cookie Configuration**

All session cookies are configured with the following security attributes:

```typescript
cookie: {
  httpOnly: true,      // Prevents XSS attacks - cookies not accessible via JavaScript
  secure: true,        // HTTPS only in production
  sameSite: 'strict',  // CSRF protection
  maxAge: 3600000,     // 1 hour expiry
  path: '/',
  domain: '.braingame.com' // Production only
}
```

### 2. **Session Security Best Practices**

- **Custom Session Name**: Using `braingame.sid` instead of default `connect.sid`
- **Session Regeneration**: Session ID regenerated on login to prevent fixation attacks
- **No Uninitialized Sessions**: Sessions only created when data is stored
- **Rolling Sessions**: Session expiry resets on user activity
- **Secure Secrets**: Uses environment variables for session and cookie secrets

### 3. **Authentication Middleware**

Two middleware functions for route protection:
- `requireAuth()` - Ensures user is authenticated
- `requireGuest()` - Ensures user is not authenticated (for login/register)

## Environment Variables

Required environment variables for production:

```bash
SESSION_SECRET=<minimum-32-character-random-string>
COOKIE_SECRET=<minimum-32-character-random-string>
```

## Example Usage

### Protected Route
```typescript
router.get('/api/protected', requireAuth, (req, res) => {
  res.json({ userId: req.session.userId });
});
```

### Login Implementation
```typescript
router.post('/api/auth/login', async (req, res) => {
  // Validate credentials...
  
  // Regenerate session to prevent fixation
  req.session.regenerate((err) => {
    req.session.userId = user.id;
    req.session.save(() => {
      res.json({ success: true });
    });
  });
});
```

## Production Considerations

### 1. **Session Store**
Currently using in-memory session store (development only). For production:
- Implement Redis session store
- Or use MongoDB session store
- Never use in-memory store in production (sessions lost on restart)

### 2. **HTTPS Required**
The `secure: true` cookie flag requires HTTPS in production. Ensure:
- SSL/TLS certificates are properly configured
- All traffic is redirected to HTTPS
- HSTS headers are enabled (already configured via Helmet)

### 3. **Secret Management**
- Generate strong, random secrets for production
- Store secrets in secure environment variables
- Rotate secrets periodically
- Never commit secrets to version control

## Testing Session Security

1. **Cookie Flags Test**
   ```bash
   curl -I http://localhost:8080/api/auth/login
   # Check Set-Cookie header includes: HttpOnly; Secure; SameSite=Strict
   ```

2. **Session Fixation Test**
   - Note session ID before login
   - Login with credentials
   - Verify session ID changed after login

3. **XSS Protection Test**
   - Try accessing `document.cookie` in browser console
   - Session cookie should not be visible (HttpOnly flag)

## Compliance

This implementation addresses:
- **OWASP Session Management** best practices
- **PCI DSS** requirements for secure sessions
- **GDPR** security requirements for user data protection