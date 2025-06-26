# TECHNICAL_DEBT_TIMER-b735ea00-d12a-4e9c-a3cc-f136d1733cc2.md

## Time Bombs

- **Incomplete Analytics Tracking** – `TrackableComponent.tsx` contains a TODO for implementing visibility tracking via an IntersectionObserver equivalent. Without it, engagement metrics will be inaccurate.
- **Navigation Stub** – `DrawerNavigator.tsx` stubs `createDrawerNavigator` with double-casted `View` components. This hack bypasses type safety and delays proper navigation setup.
- **Error Reporting Disabled** – `ErrorService.ts` has Sentry and Crashlytics calls commented out. Only local logs are stored, so production failures may go unseen.
- **Leftover Expo Logs** – Several `*.log` files remain under `apps/product/`, leaking developer machine paths and bloating the repo.
- **Env Validation Warnings** – `validator.ts` checks for missing `SENTRY_DSN` and `ANALYTICS_KEY`, but these remain optional, encouraging deployments without monitoring.

## Detonation Risk Matrix

| Area | Risk | Impact |
| --- | --- | --- |
| Navigation Stub | High | Shipping with placeholder navigation can break when real drawer features are needed and slows onboarding of new developers. |
| Missing Error Reporting | High | Without Sentry/Crashlytics active, critical failures will not surface until users complain. |
| Incomplete Analytics | Medium | Lack of visibility tracking leads to poor product decisions and missed growth opportunities. |
| Environment Gaps | Medium | Deploying without required monitoring keys reduces observability and makes incidents harder to diagnose. |
| Repo Log Files | Low | Extra logs waste storage and may leak local paths but do not directly affect runtime. |

---

Continuous monitoring and timely cleanup are recommended to defuse these issues before scaling increases the blast radius.
