# Failure Analysis Report

## ⚠️ Critical Exploits
- **Unprotected API Endpoints**
  - `apps/api` exposes placeholder routes without authentication. Lack of API key enforcement and missing rate limiting invites abuse.
  - The CORS middleware allows requests with no origin which enables scripts from anywhere (e.g. malicious mobile apps) to hit the API.
- **Weak Environment Handling**
  - `.env.example` files contain insecure defaults such as `JWT_SECRET=your-super-secure-jwt-secret-here`. If a developer forgets to replace these, production could run with easily guessed secrets.
  - `packages/utils/env/validator.ts` only warns on dangerous defaults when `throwOnError` is `false`, so CI may pass even with bad secrets.
- **Client Data Exposure**
  - `apps/main-site/src/lib/emailService.ts` stores `userAgent` and optional `ipAddress` with each signup. A compromise of Firestore leaks PII that isn’t necessary for signup.
  - Error logs captured by `apps/product/src/services/ErrorService.ts` include detailed device info and are persisted locally before upload, risking leakage on a stolen device.
- **Logging of Sensitive Data**
  - API logs full request paths and method names (`apps/api/src/middleware/logger.ts`). If query params include tokens, they will appear in logs.
- **Pre‑commit Bypass**
  - `scripts/pre-commit.sh` allows commits when tests or secret scans fail, leading to broken or insecure code on main.

## 🔥 Scenarios of Doom
- **Massive Signup Spam**
  - Without rate limiting or CAPTCHA, the email signup endpoint can be spammed with thousands of requests, filling Firestore and inflating costs. Logs would show repeated `addDoc` operations and eventual Firestore quota errors.
- **Accidental Dev Secrets in Prod**
  - A developer copies `.env.example` to `.env.production` without editing. The mobile app ships with `JWT_SECRET` and analytics keys set to example values. Attackers forge tokens and impersonate users.
- **Unhandled Promise Rejection Storm**
  - In `ErrorService`, the global `onunhandledrejection` handler rethrows errors. If a 3rd‑party library starts rejecting promises rapidly, the app may enter a loop of exception capturing and log storage, consuming disk and memory.
- **Cross‑Origin API Abuse**
  - Because requests with no `Origin` header are allowed, a malicious script in a desktop app can send unlimited requests to the API, bypassing browser CORS protections and flooding the service.

## 🧨 Attack Surfaces
- Express server (`apps/api`) with minimal middleware – no rate limiter, no auth, no sanitization of query params.
- Firestore writes from the marketing site – any script running in the browser can call `submitEmail` directly.
- Local storage of error logs on mobile devices – accessible to other apps if the device is rooted or compromised.
- Husky/pre‑commit script – relies on developers running it locally; CI may not enforce the same checks.

## 🤦 Stupid-Proofing
- Developers might run `pnpm lint` and `pnpm typecheck` only to have tests fail later in CI because the pre‑commit script doesn’t block on test failures.
- Forgetting to update environment variables causes builds to succeed with placeholder secrets thanks to optional validation.
- The script `scripts/workspace-helper.js` can delete or reset worktrees if misused, potentially wiping unstaged changes.
- Lack of explicit `set -e` in shell scripts means failures may go unnoticed during complex chained commands.

## 🧰 Fix Recommendations
- Enforce API authentication and integrate rate limiting (e.g. express-rate-limit). Deny requests with missing `Origin` headers.
- Fail CI builds when environment validation warnings occur. Treat dangerous defaults as errors.
- Remove storage of `userAgent` and `ipAddress` from `EmailSignup` or hash/anonymize them before storage.
- Encrypt or obfuscate local error logs and purge them frequently.
- Update pre‑commit script to fail on any test or secret scan error and use `set -e` to stop on the first failure.
- Add automated end-to-end tests simulating API abuse scenarios to ensure protections remain effective.

