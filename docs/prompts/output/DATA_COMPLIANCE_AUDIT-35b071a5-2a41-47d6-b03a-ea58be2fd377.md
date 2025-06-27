# DATA_COMPLIANCE_AUDIT-35b071a5-2a41-47d6-b03a-ea58be2fd377.md

## Storage & Schema Design
- Firestore collection `email_signups` with sanitized fields and strict rules preventing reads, updates, and deletes from the client【F:apps/main-site/FIREBASE_SETUP.md†L76-L92】【F:apps/main-site/firestore.rules†L1-L24】
- No documented normalization or indexing strategy beyond Firestore defaults
- Delete cascades not mentioned; Google Sheets integration handled via Cloud Function

## ETL/ELT & Data Lineage
- Data submitted from the Expo app to a Firebase Cloud Function then stored in Google Sheets【F:apps/product/src/screens/Mindset/components/VisionGoals.tsx†L71-L103】
- ETL pipeline details, lineage tracking, and DAG health monitoring are not documented

## PII Encryption & Compliance
- `.env.example` includes an `ENCRYPTION_KEY` variable and config exposes it via `AUTH_CONFIG`【F:apps/product/.env.example†L22-L26】【F:apps/product/src/config/env.ts†L35-L45】
- Privacy policy outlines data rights including deletion and opt-out【F:legal/PRIVACY_POLICY.md†L60-L78】
- Legal basis for processing and CCPA rights documented but no explicit right-to-forget flow in code【F:legal/PRIVACY_POLICY.md†L104-L120】

## Analytics vs OLTP Separation
- Analytics keys configured in environment but workload isolation from OLTP is not described

## Backup & DR Strategy
- Production considerations mention automated backups for the email list but no detailed retention or disaster recovery process【F:apps/main-site/FIREBASE_SETUP.md†L105-L111】

## Compliance Gaps
- 🔐 Encryption of PII at rest and in backups is unspecified
- ⛔ No automated deletion/right-to-forget mechanism implemented
- ❓ Lacking documented data lineage and ETL monitoring
- 📉 Backup and retention policies are high level without retention timelines
- 🔄 Analytics workload may share operational resources with OLTP

## Risk Matrix & Mitigation Roadmap
| Risk | Impact | Likelihood | Mitigation |
|------|-------|------------|-----------|
| Unencrypted PII in backups | High | Medium | Implement encryption using `ENCRYPTION_KEY` for stored PII and backups |
| Incomplete right-to-forget flow | High | Medium | Add user deletion endpoints and data purge jobs across Firestore and Sheets |
| Missing data lineage tracking | Medium | Medium | Introduce logging/metadata on Cloud Functions and DAG monitoring |
| Shared analytics/OLTP resources | Medium | Low | Separate analytic workloads or use BigQuery exports |
| Weak backup & DR planning | Medium | Medium | Define retention schedule, automated backups, and periodic DR tests |

**Roadmap Priorities**
1. Encrypt PII storage and backups (Q3)
2. Implement GDPR/CCPA deletion workflows (Q3)
3. Add lineage tracking and ETL monitoring (Q4)
4. Document analytics isolation and DR strategy (Q4)
