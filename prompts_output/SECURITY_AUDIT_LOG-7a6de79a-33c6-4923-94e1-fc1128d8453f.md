# SECURITY_AUDIT_LOG-7a6de79a-33c6-4923-94e1-fc1128d8453f

## Attack Surface Mapping
- **Web**: Express.js API at `/api`, React frontend at `/`.
- **Mobile**: React Native client interacts with same API endpoints.
- **CI/CD**: GitHub Actions workflow with Docker image builds and deployments.
- **Supply Chain**: Uses several open source NPM packages and Docker base images.

## OWASP Top‑10 Probe Results
1. **Injection** – API input fields vulnerable to NoSQL injection via unsanitized `$` operators (CVSS 7.5).
   - **PoC**: `POST /api/user {"$where":"sleep(100)"}`
2. **Broken Authentication** – Session cookie lacks `HttpOnly` and `Secure` flags (CVSS 6.8).
3. **Sensitive Data Exposure** – Server returns stack traces in errors (CVSS 5.3).
4. **XML External Entities (XXE)** – XML parser allows external entities (CVSS 7.1).
5. **Security Misconfiguration** – Docker images run as root (CVSS 4.9).

## Authentication Flow Analysis
- OAuth tokens scoped broadly across user data.
- Session expiry set to 30 days with sliding refresh—long exposure window.

## Infrastructure-as-Code Review
- Terraform scripts created S3 buckets with `public-read` ACLs.
- Security groups allow SSH from 0.0.0.0/0.

## Remediation Plan
- Sanitize API inputs using a whitelist approach.
- Set `HttpOnly`/`Secure` attributes and reduce session TTL.
- Remove stack traces from production responses.
- Disable external entity expansion in XML parser.
- Run Docker containers as non-root users.
- Limit OAuth scopes to minimal required access.
- Remove public S3 ACLs and restrict SSH via IP allowlist.

