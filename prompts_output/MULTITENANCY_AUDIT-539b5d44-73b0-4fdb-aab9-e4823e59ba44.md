# Multitenancy Audit

Enterprise SaaS architecture review focused on tenant separation and scalability.

## Overview

This audit evaluates how the current architecture manages data isolation, tenant identification, authentication flows, metering, and environment configuration per tenant. Findings are summarized in a risk matrix and architectural tier chart.

## Data Isolation

- **Shared vs Separate Databases**
  - Shared database with tenant ID column increases risk of cross-tenant data leaks.
  - Separate databases per tenant improve isolation but add operational overhead.
- **Recommendation**: For high-security customers, provide an option for dedicated databases. For standard tiers, maintain a shared DB with strict row-level security and automated backups.

## Tenant Identification & RBAC

- **Tenant ID Scoping**: Ensure every query scopes by tenant ID, ideally enforced via ORM middleware.
- **JWT Payloads**: Include `tenantId`, `roles`, and token expiration. Sign with rotating keys.
- **RBAC**: Define role hierarchies (`admin`, `member`, `viewer`) and validate on each request. Avoid hard-coded permissions in the UI.

## Authentication Flows

- **Org Switching**: Provide seamless switching via dropdown or dedicated route. Persist last active tenant in local storage.
- **Subdomain Handling**: Use `tenant.example.com` pattern with wild-card TLS. Validate subdomain against known tenant IDs to prevent spoofing.

## Usage Metering & Quotas

- Track API calls, storage, and concurrent sessions per tenant.
- Enforce plan limits with graceful warnings before hard stops.
- Provide self-service usage dashboard for transparency.

## Environment Configuration

- Support per-tenant feature flags and environment variables (e.g., theme, region settings).
- Use a config service to load tenant settings at startup and cache them with TTL.

## Tenancy Risk Matrix

| Area | Risk | Impact | Mitigation |
|------|------|--------|-----------|
| Data Isolation | Shared DB breach exposes multiple tenants | High | Offer dedicated DB option, row-level security, encryption at rest |
| Auth & RBAC | Incorrect tenant scoping leaks data | High | Centralize tenant check, automated tests for RBAC |
| Subdomain Spoofing | Fake subdomain leads to credential theft | Medium | Validate subdomain mapping, HSTS, strict CORS |
| Quota Enforcement | Overuse by one tenant degrades service | Medium | Rate limit per tenant, monitor usage spikes |
| Config Errors | Misconfigured tenant env causes downtime | Low | Automated config validation, versioned configs |

## Architectural Tier Chart

| Tier | Characteristics | Recommended Approach |
|------|----------------|---------------------|
| **Basic** | Small tenants, limited isolation needs | Shared DB, app-level RBAC |
| **Growth** | Multiple regions, moderate compliance | Shared DB with row-level security, per-tenant feature flags |
| **Enterprise** | Strict compliance (SOC2, HIPAA) | Option for dedicated DB, isolated storage, dedicated subdomain, advanced auditing |

## Conclusion

Implementing stronger RBAC enforcement, optional dedicated databases, and per-tenant configuration management will improve security and scalability across tenant tiers.

