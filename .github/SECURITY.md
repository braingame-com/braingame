# Security Policy

## Reporting Vulnerabilities

**Email:** hello@braingame.dev

**Timeline:**
- Acknowledgment: 48 hours
- Critical fixes: 7 days
- Non-critical fixes: 30 days

**Include:**
- Vulnerability type
- Affected components
- Reproduction steps
- Potential impact

## Security Tools

We use:
- **secretlint** - Prevents secret commits
- **Dependabot** - Dependency updates
- **CodeQL** - Static analysis
- **npm audit** - Package vulnerabilities

## Contributor Guidelines

1. **Never commit:**
   - API keys
   - Passwords
   - Tokens
   - Private certificates

2. **Always use:**
   - Environment variables for secrets
   - `.env.example` for documentation
   - Secure communication (HTTPS)

3. **Before submitting:**
   - Run `npm audit`
   - Check for exposed secrets
   - Validate dependencies

## Supported Versions

We provide security updates for:
- Current release
- Previous major version (12 months)