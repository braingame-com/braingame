# Brain Game - TODO Tracker

![Task Management](https://img.shields.io/badge/task%20management-active-brightgreen?style=flat-square&logo=todoist)
![Quality](https://img.shields.io/badge/quality-enterprise%20grade-gold?style=flat-square&logo=quality)

## 🎯 Current Sprint: Production Readiness

### 🚨 Critical Priority

- [ ] Create MVP Components and Product (in_progress 03-07-2025)
  - [x] Define core MVP feature set (completed 03-07-2025)
  - [ ] Build essential UI components in packages/bgui (in_progress 03-07-2025)
    - [x] VisionCard component (Week 1 Priority)
    - [x] EmptyState component (Week 1 Priority)
    - [x] OnboardingSlide component (Week 1 Priority)
    - [ ] AffirmationCard component (Week 2 Priority)
    - [ ] StreakCounter component (Week 3 Priority)
    - [ ] CalendarGrid component (Week 3 Priority)

### MVP Feature Implementation

#### Week 1: Authentication & Vision (Priority 1)
- [ ] **Authentication & Onboarding**
  - [ ] Email/Password Authentication
    - [ ] Simple registration with email + password
    - [ ] Login/logout functionality
    - [ ] Password reset via email
    - [ ] Session persistence
  - [ ] Welcome Flow
    - [ ] 3-screen onboarding explaining app benefits
    - [ ] Skip option for quick start
    - [ ] Store onboarding completion status

- [ ] **Vision & Goals Module**
  - [ ] Life Areas Dashboard
    - [ ] Display 5 areas: Health, Wealth, Relationships, Happiness, Self
    - [ ] Visual progress indicators for each area
    - [ ] Quick access to set/edit vision
  - [ ] Vision Input
    - [ ] Simple text input for each life area
    - [ ] Character limit: 500 chars per vision
    - [ ] Save locally with timestamp
    - [ ] View/edit existing visions

#### Week 2: Daily Content (Priority 2)
- [ ] **Daily Affirmations**
  - [ ] Affirmation Display
    - [ ] Show one affirmation per day
    - [ ] Beautiful typography and design
    - [ ] Swipe to see previous affirmations (last 7 days)
  - [ ] Basic Affirmation Library
    - [ ] 30 pre-written affirmations to start
    - [ ] Rotate daily at midnight local time
    - [ ] Mark favorites (local storage)

- [ ] **Visual Inspiration Gallery**
  - [ ] Image Gallery
    - [ ] 20 high-quality motivational images
    - [ ] Full-screen viewing mode
    - [ ] Swipe navigation between images
    - [ ] Save favorites locally

#### Week 3: Progress & Polish (Priority 3)
- [ ] **Basic Progress Tracking**
  - [ ] Daily Check-in
    - [ ] "Did you review your vision today?" Yes/No
    - [ ] "Did you read your affirmation?" Yes/No
    - [ ] Simple streak counter
    - [ ] Calendar view of check-in history

- [ ] **Settings & Profile**
  - [ ] User Profile
    - [ ] Display name
    - [ ] Email (from auth)
    - [ ] Join date
  - [ ] App Settings
    - [ ] Notification preferences (on/off)
    - [ ] Theme selection (light/dark)
    - [ ] Clear local data option

### MVP Technical Implementation
- [ ] **Data Storage Setup**
  - [ ] Local Storage Only with AsyncStorage
  - [ ] Simple JSON objects structure
  - [ ] No backend required for MVP

- [ ] **Navigation Structure**
  - [ ] Welcome flow (first launch only)
  - [ ] Auth flow (unauthenticated)
  - [ ] Main dashboard (authenticated)
  - [ ] Settings screens

### MVP Completion Checklist
- [ ] All 6 core features implemented
- [ ] Manual testing on iOS and Android
- [ ] Data persistence verified
- [ ] No placeholder content
- [ ] Error handling for edge cases
- [ ] Loading states implemented
- [ ] Empty states designed
- [ ] Accessibility basics (font scaling, screen readers)

- [ ] Production Deployment Preparation (in_progress 24-06-2025)
  - [ ] Production Firebase configuration
  - [ ] App Store Connect setup
  - [ ] Google Play Console setup
  - [ ] SSL certificates and domain configuration

### Integration Testing
- [ ] E2E test suite completion
- [ ] Cross-platform testing
- [ ] API integration tests
- [ ] User flow validation

- [ ] Setup Integration Tests
  - [ ] E2E tests with Playwright (Web)
  - [ ] E2E tests with Maestro (Native mobile)
  - [ ] Visual regression tests
  - [ ] Accessibility audits

## 🔥 High Priority

- [x] AI Ethics Compliance Review *(completed 24-06-2025)*

### Monitoring & Analytics
- [ ] Error tracking with Sentry
- [ ] Performance metrics collection
- [ ] User behavior analytics
- [ ] Bundle size monitoring

## 📋 Medium Priority

- [ ] Storybook Enhancement
  - [ ] Add visual testing with Chromatic
  - [ ] Deploy to GitHub Pages

- [ ] Environment Management
  - [ ] Add validation with zod
  - [ ] Document all required variables

- [ ] Setup Monitoring & Analytics <!-- in_progress -->
  - [ ] Add Mixpanel/Amplitude for analytics <!-- in_progress -->
  - [ ] Set up alerting rules

- [ ] API Documentation
  - [ ] Create OpenAPI spec for backend
  - [ ] Generate TypeScript types from spec
  - [ ] Set up API documentation site
  - [ ] Add request/response examples

- [ ] Architecture Decision Records (ADR) Documentation
  - [ ] Review GitHub commit history for architectural decisions
  - [ ] Document key technology choices (pnpm, Turborepo, Expo, etc.)
  - [ ] Record rationale for monorepo structure
  - [ ] Document security architecture decisions
  - [ ] Add decision dates and context from PRs
  - [ ] Include migration paths and alternatives considered

## 📚 BGUI Documentation Consolidation

- [ ] Implement self-documenting component pattern
  - [x] Create example Button.stories.tsx with comprehensive documentation
  - [x] Update README.md with new documentation approach
  - [ ] Add Storybook stories for all existing components (25 of 28 implemented)
  - [ ] Migrate documentation from markdown files to JSDoc comments
  - [ ] Delete redundant documentation files:
    - [ ] COMPONENT_REFERENCE.md (replace with Storybook)
    - [ ] BGUI_COMPONENT_PLAN.md (move remaining tasks to TODO.md)
    - [ ] COMPONENT_TEMPLATE.md (use existing components as templates)
  - [ ] Keep only COMPONENT_PATTERNS.md for design guidelines

### BGUI Component Implementation Status
**Status**: 25 of 28 components implemented. Missing: Alert, Breadcrumb, and TextInput

#### Completed Components (Need Storybook Stories)
- [x] Button - ✅ Story created as example
- [ ] Icon - Add .stories.tsx
- [ ] Text - Add .stories.tsx  
- [ ] Link - Add .stories.tsx
- [ ] Card - Add .stories.tsx
- [ ] Divider - Add .stories.tsx
- [ ] Spinner - Add .stories.tsx
- [ ] Label - Add .stories.tsx
- [ ] Checkbox - Add .stories.tsx
- [ ] Switch - Add .stories.tsx
- [ ] Avatar - Add .stories.tsx
- [ ] Badge - Add .stories.tsx
- [ ] Modal - Add .stories.tsx with composition examples
- [ ] Toast - Add .stories.tsx
- [ ] ProgressBar - Add .stories.tsx
- [ ] ActionList - Add .stories.tsx with composition
- [ ] Tooltip - Add .stories.tsx
- [ ] Tabs - Add .stories.tsx with composition
- [ ] Accordion - Add .stories.tsx with composition
- [ ] Menu - Add .stories.tsx with composition
- [ ] RadioGroup - Add .stories.tsx with composition
- [ ] Select - Add .stories.tsx with composition
- [ ] Slider - Add .stories.tsx
- [ ] Image - Add .stories.tsx

#### Components to Implement
- [ ] Alert - Implement component (banner, inline, floating variants)
- [ ] Breadcrumb - Implement component with composition pattern
- [ ] TextInput - Consider if needed (apps use React Native's TextInput)

## 🎨 Design System - Material 3 Implementation

### ✅ Phase 1: Foundation (COMPLETE)
- [x] M3 Color System - Full implementation with theme provider (completed 14-07-2025)
- [x] M3 Typography - All 15 type roles implemented (completed 14-07-2025)
- [x] M3 Icons - Material Symbols Rounded via SVG (completed 14-07-2025)
- [x] Google Fonts - Lexend + Roboto Mono integrated (completed 14-07-2025)

### 🚧 Phase 2: Core Components (IN PROGRESS)
- [x] Text - Full M3 typography scale (completed 14-07-2025)
- [ ] Button - Convert to 5 M3 variants (filled, outlined, text, elevated, tonal)
  - [ ] Add new variants alongside old ones
  - [ ] Map old variants to new (primary → filled, etc.)
  - [ ] Update styling to match M3 specs
  - [ ] Add deprecation warnings
- [ ] Card - Implement 3 M3 types (elevated, filled, outlined)
- [ ] TextField - Add filled and outlined variants
- [ ] Surface - Component with elevation levels

### 📋 Phase 3: Extended Components (TODO)
- [ ] Chip - 4 types (assist, filter, input, suggestion)
- [ ] FAB - 3 sizes with extended variant
- [ ] NavigationBar - Bottom navigation
- [ ] NavigationRail - Side navigation
- [ ] Dialog - Basic, fullscreen, alert variants
- [ ] BottomSheet - Standard and modal

### 📋 Phase 4: Systems (TODO)
- [ ] Elevation - Implement 6-level system (see [ELEVATION.md](../../packages/bgui/docs/ELEVATION.md))
- [ ] Motion - Duration and easing tokens (see [MOTION.md](../../packages/bgui/docs/MOTION.md))
- [ ] States - Hover, focus, pressed, disabled

### M3 Resources
- [COMPONENT_PATTERNS.md](../../packages/bgui/docs/COMPONENT_PATTERNS.md) - M3 component specifications
- [ELEVATION.md](../../packages/bgui/docs/ELEVATION.md) - Elevation system
- [MOTION.md](../../packages/bgui/docs/MOTION.md) - Animation standards
- [TYPOGRAPHY.md](../../packages/bgui/docs/TYPOGRAPHY.md) - Type scale (implemented)
- [TOKENS.md](../../packages/bgui/docs/TOKENS.md) - Design token system

## 🎨 Nice to Have

- [ ] Create Marketing Website Content
  - [ ] Write compelling copy for landing page
  - [ ] Design and implement feature sections
  - [ ] Add testimonials section
  - [ ] Create pricing page

- [ ] Developer Experience Improvements
  - [ ] Improve hot reload performance
  - [ ] Create debugging guide
  - [ ] Optimize Claude Custom Commands
    - [ ] Review and optimize merge_prs.md command
    - [ ] Audit all commands in .claude/commands for correctness
    - [ ] Ensure consistent quality standards across commands
    - [ ] Create new custom commands based on workflow patterns:
      - [ ] Security audit automation command
      - [ ] Worktree management command
      - [ ] PR quality check command
      - [ ] Session summary generator
    - [ ] Document command best practices from LESSONS.md

- [ ] Advanced Testing
  - [ ] 90% test coverage goal

## 🚀 Next Steps

### Immediate Actions Required:
1. **Firebase Integration** - Website has TODO for Firebase email collection (HIGH)
2. **Production Deployment** - Configure Firebase, App Store, Play Store (HIGH)

### Production Path:
1. **Firebase Setup** (HIGH PRIORITY)
   - Configure Firebase project for production
   - Implement email collection in website
   - Set up Firestore for data persistence
   - Configure authentication

2. **App Store Preparation**
   - Generate app icons and splash screens
   - Create App Store screenshots
   - Write app descriptions
   - Configure app signing


## 🔌 Extension Points
- Plan new `apps/desktop` using Tauri with GitHub Release distribution
- Add LaunchDarkly feature flag wrapper in `packages/utils`

## 📝 Notes for AI Agents
- Always update status when working on tasks
- Add completion date when marking done
- Include any blockers discovered
- Reference relevant files changed
- Create work session documentation for significant changes

## 🔗 Quick Links
- Architecture: [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- AI Guide: [CLAUDE.md](./docs/CLAUDE.md)
- Security: [SECURITY.md](./.github/SECURITY.md)
- Worktrees: [WORKTREES.md](./docs/WORKTREES.md)

## 📊 Consultant Report Action Items

### 🚨 Security & Compliance (Critical)

#### Data Protection & Privacy
- [ ] Implement encryption for PII at rest and in backups using `ENCRYPTION_KEY` *(DATA_COMPLIANCE_AUDIT, SECURITY_AUDIT_LOG)*
- [ ] Implement GDPR/CCPA deletion workflows - Legal requirement *(DATA_COMPLIANCE_AUDIT, MASTER_AUDIT_SUMMARY)*
- [ ] Add user deletion endpoints and data purge jobs across Firestore and Sheets *(DATA_COMPLIANCE_AUDIT)*
- [ ] Create automated right-to-forget mechanism *(MASTER_AUDIT_SUMMARY)*
- [ ] Add lineage tracking and ETL monitoring for data flow *(DATA_COMPLIANCE_AUDIT)*
- [ ] Document analytics isolation and DR strategy *(DATA_COMPLIANCE_AUDIT)*
- [ ] Define retention schedule, automated backups, and periodic DR tests *(DATA_COMPLIANCE_AUDIT)*

#### Security Hardening
- [ ] Review security of environment handling – ensure secrets are injected via CI and not stored locally *(CONSULTANT_FINDINGS_1)*
- [ ] Sanitize API inputs using a whitelist approach *(SECURITY_AUDIT_LOG)*
- [ ] Set `HttpOnly`/`Secure` attributes and reduce session TTL *(SECURITY_AUDIT_LOG)*
- [ ] Remove stack traces from production responses *(SECURITY_AUDIT_LOG)*
- [ ] Disable external entity expansion in XML parser *(SECURITY_AUDIT_LOG)*
- [ ] Run Docker containers as non-root users *(SECURITY_AUDIT_LOG)*
- [ ] Limit OAuth scopes to minimal required access *(SECURITY_AUDIT_LOG)*
- [ ] Remove public S3 ACLs and restrict SSH via IP allowlist *(SECURITY_AUDIT_LOG)*
- [ ] Include `tenantId`, `roles`, and token expiration in JWT payloads. Sign with rotating keys *(MULTITENANCY_AUDIT)*

### 🚫 Launch Blockers (Critical)

- [ ] Complete payment integration - Real processing for launch, not just simulation *(MASTER_AUDIT_SUMMARY, MONETISATION_GROWTH_AUDIT)*
- [ ] Enable error reporting - Uncomment Sentry/Crashlytics *(MASTER_AUDIT_SUMMARY, TECHNICAL_DEBT_TIMER)*
- [ ] Complete signup flow with validation and error states *(MASTER_AUDIT_SUMMARY, PRODUCT_LAUNCH_READINESS)*
- [ ] Replace navigation stub with proper implementation *(MASTER_AUDIT_SUMMARY, TECHNICAL_DEBT_TIMER)*
- [ ] Implement analytics providers (Mixpanel/Amplitude) via `AnalyticsService` *(MASTER_AUDIT_SUMMARY, MONETISATION_GROWTH_AUDIT)*
- [ ] Make SENTRY_DSN and ANALYTICS_KEY required in validator.ts *(TECHNICAL_DEBT_TIMER)*
- [ ] Finalize pricing strategy and integrate paywall across web and native apps *(PRODUCT_LAUNCH_READINESS)*

### 🛠️ Developer Experience & Infrastructure (High)

#### CI/CD & DevOps
- [ ] Adjust lint/typecheck tooling to run without network access or document required connectivity *(CONSULTANT_FINDINGS_1, MASTER_AUDIT_SUMMARY)*
- [ ] Enable Turbo remote caching to improve cache hits across PRs *(DEVOPS_PIPELINE_REVIEW)*
- [ ] Implement canary deployments for both website and app before full rollout *(DEVOPS_PIPELINE_REVIEW, MASTER_AUDIT_SUMMARY)*
- [ ] Integrate LaunchDarkly for feature flags across apps *(DEVOPS_PIPELINE_REVIEW, MONETISATION_GROWTH_AUDIT)*
- [ ] Define automated rollback steps with manual approval gates *(DEVOPS_PIPELINE_REVIEW)*
- [ ] Establish incident response playbook with on-call escalation *(DEVOPS_PIPELINE_REVIEW)*
- [ ] Configure blue-green deployments for website hosting *(DEVOPS_PIPELINE_REVIEW)*
- [ ] Centralise logs via structured logging pipeline (Cloud Logging/ELK) *(DEVOPS_PIPELINE_REVIEW)*
- [ ] Add metrics and distributed tracing (OpenTelemetry) across services *(DEVOPS_PIPELINE_REVIEW)*
- [ ] Define SLOs for build success, deploy latency and error budgets *(DEVOPS_PIPELINE_REVIEW)*

#### Testing & Quality
- [ ] Implement integration and E2E tests as listed in existing TODO *(CONSULTANT_FINDINGS_1)*
- [ ] Parallelise test suites using matrix jobs and consider sharding large test sets *(DEVOPS_PIPELINE_REVIEW)*
- [ ] Record cache statistics and test flake rates in CI summaries *(DEVOPS_PIPELINE_REVIEW)*
- [ ] Review existing tests and stabilise flakiness *(DEVOPS_PIPELINE_REVIEW)*
- [ ] Finalize testing matrix and enforce coverage thresholds *(CONSULTANT_FINDINGS_1)*

#### Local Development
- [ ] Add a top-level `docker-compose` for the API to simplify local onboarding *(CONSULTANT_FINDINGS_1)*
- [ ] Provide script to bootstrap Firebase emulators for consistent dev experience *(CONSULTANT_FINDINGS_1)*
- [ ] Add `scripts/setup.sh` that runs `nvm use`, `pnpm install`, builds utilities, validates envs *(DEV_ONBOARDING_FEEDBACK)*
- [ ] Commit prebuilt `dist/` for `@braingame/utils` or run build during install *(DEV_ONBOARDING_FEEDBACK)*
- [ ] Stabilize Vitest config or switch to Jest for RN utils to avoid ESM errors *(DEV_ONBOARDING_FEEDBACK)*
- [ ] Create top-level docker-compose for API setup *(CONSULTANT_FINDINGS_1)*

#### Code Quality
- [ ] Remove committed log files from `apps/product` and ensure logs are ignored *(CONSULTANT_FINDINGS_1, TECHNICAL_DEBT_TIMER)*
- [ ] Include bundle size reporting in CI for both Expo app and Next.js site *(CONSULTANT_FINDINGS_1)*
- [ ] Implement visibility tracking via IntersectionObserver in TrackableComponent.tsx *(TECHNICAL_DEBT_TIMER)*

### 🎨 Design System & Accessibility (Medium)

#### Accessibility Improvements
- [ ] Increase link colour contrast on tasks page (darker blue or bolder weight) *(ACCESSIBILITY_REPORT, MASTER_AUDIT_SUMMARY)*
- [ ] Implement CSS/JS checks for `prefers-reduced-motion` to disable animations *(ACCESSIBILITY_REPORT, MASTER_AUDIT_SUMMARY)*
- [ ] Ensure every TextInput has associated label element or ARIA label *(ACCESSIBILITY_REPORT, MASTER_AUDIT_SUMMARY)*
- [ ] Audit all pages for keyboard focus order and visible focus indicators *(ACCESSIBILITY_REPORT)*
- [ ] Add RTL support and additional locales where possible *(ACCESSIBILITY_REPORT, MASTER_AUDIT_SUMMARY)*
- [ ] Audit all primary screens for empty state messaging and accessibility *(PRODUCT_LAUNCH_READINESS)*

#### Design System
- [ ] Token Standardization – Replace hardcoded values in `apps/main-site` with token references *(DESIGN_SYSTEM_AUDIT)*
- [ ] Complete Component Library – Finish remaining components, ensure Storybook stories reflect Figma *(DESIGN_SYSTEM_AUDIT)*
- [ ] Responsive Tokens – Introduce breakpoint tokens and refactor media queries *(DESIGN_SYSTEM_AUDIT)*
- [ ] CSS Consolidation – Migrate custom CSS modules into BGUI components or token-based styles *(DESIGN_SYSTEM_AUDIT)*
- [ ] Update README and docs to reference token system and Storybook location *(DESIGN_SYSTEM_AUDIT)*

#### Mobile Platform Parity
- [ ] Fix Android tab bar misalignment *(MOBILE_PARITY_REPORT, MASTER_AUDIT_SUMMARY)*
- [ ] Add bottom tabs to PWA (currently uses drawer) *(MOBILE_PARITY_REPORT, MASTER_AUDIT_SUMMARY)*
- [ ] Fix swipe gestures inconsistency between Android and PWA *(MOBILE_PARITY_REPORT)*
- [ ] Resolve iOS push notification delays *(MOBILE_PARITY_REPORT, MASTER_AUDIT_SUMMARY)*
- [ ] Fix Android crashes when loading profile screen *(MOBILE_PARITY_REPORT, MASTER_AUDIT_SUMMARY)*
- [ ] Address PWA session expiration due to storage limits *(MOBILE_PARITY_REPORT, MASTER_AUDIT_SUMMARY)*

### 📚 Documentation & Processes (Medium)

#### Documentation Structure
- [ ] Add `/packages/config/README.md` - Document shared configuration package *(DOCS_STRUCTURE_AUDIT)*
- [ ] Add `/packages/i18n/README.md` - Document internationalization package *(DOCS_STRUCTURE_AUDIT)*
- [ ] Add `/scripts/README.md` - Document available scripts and usage *(DOCS_STRUCTURE_AUDIT)*
- [ ] Add `/docs/README.md` - Create index/navigation for docs directory *(DOCS_STRUCTURE_AUDIT)*
- [ ] Add `/assets/README.md` - Document asset organization and guidelines *(DOCS_STRUCTURE_AUDIT)*
- [ ] Add `/scripts/utils/README.md` - Document utility scripts *(DOCS_STRUCTURE_AUDIT)*
- [ ] Create ADR directory structure (`/docs/adr/`) *(DOCS_STRUCTURE_AUDIT)*
- [ ] Reorganize `/docs/` into logical subdirectories (architecture, development, features, processes) *(DOCS_STRUCTURE_AUDIT)*
- [ ] Update root README.md to reference new documentation structure *(DOCS_STRUCTURE_AUDIT)*
- [ ] Add cross-references between related docs *(DOCS_STRUCTURE_AUDIT)*
- [ ] Create documentation style guide *(DOCS_STRUCTURE_AUDIT)*

#### Documentation Relocation
- [ ] Move `/apps/product/docs/ENVIRONMENT_CONFIGURATION.md` → `/apps/product/ENVIRONMENT_CONFIGURATION.md` *(DOCS_STRUCTURE_AUDIT)*
- [ ] Move `/apps/product/src/components/ErrorBoundary/ErrorBoundaryGuide.md` → `/packages/bgui/docs/ErrorBoundary.md` *(DOCS_STRUCTURE_AUDIT)*
- [ ] Move `/packages/utils/constants/ThemeColorsMigrationGuide.md` → `/docs/migrations/theme-colors.md` *(DOCS_STRUCTURE_AUDIT)*
- [ ] Move legal documents to centralized `/legal/` directory *(DOCS_STRUCTURE_AUDIT)*

#### Process Documentation
- [ ] Update README to reference actual package names for `pnpm --filter` commands *(DEV_ONBOARDING_FEEDBACK)*
- [ ] Provide troubleshooting section for common Node version issues and test failures *(DEV_ONBOARDING_FEEDBACK)*
- [ ] Document database schema and migration processes to support future features *(CONSULTANT_FINDINGS_1)*
- [ ] Consolidate duplicate documentation sections *(CONSULTANT_FINDINGS_1)*
- [ ] Update PR template to use `pnpm` commands instead of `npm` *(OSS_CONTRIBUTION_REVIEW)*
- [ ] Adopt strict trunk-based development with short-lived feature branches *(DEVOPS_PIPELINE_REVIEW)*
- [ ] Document merge windows and commit hygiene *(DEVOPS_PIPELINE_REVIEW)*

#### Internal Tools
- [ ] Improve CLI documentation for faster onboarding of new support engineers *(INTERNAL_DX_AUDIT)*
- [ ] Add redaction controls for sensitive data to enhance compliance *(INTERNAL_DX_AUDIT)*
- [ ] Expand audit logging and permission scopes for better observability *(INTERNAL_DX_AUDIT)*

### ⚡ Performance & Cost Optimization (Low)

- [ ] Disable font download in Next.js build to avoid network stalls *(PERF_COST_DIAGNOSIS)*
- [ ] Set up CDN caching for API responses and static assets *(PERF_COST_DIAGNOSIS)*
- [ ] Instrument server with profiling (node --prof) to capture flame graphs *(PERF_COST_DIAGNOSIS)*
- [ ] Monitor container CPU/memory with Prometheus; tune autoscaling *(PERF_COST_DIAGNOSIS)*
- [ ] Implement request tracing to detect slow paths *(PERF_COST_DIAGNOSIS)*
- [ ] Evaluate serverless deployment for lower idle cost *(PERF_COST_DIAGNOSIS)*
- [ ] Plan for scaling backend (serverless functions or container orchestration) *(CONSULTANT_FINDINGS_1)*
- [ ] Introduce production observability: metrics, alerting, and performance monitoring *(CONSULTANT_FINDINGS_1)*
- [ ] Separate analytic workloads or use BigQuery exports *(DATA_COMPLIANCE_AUDIT)*

### 💰 Monetization & Growth (Medium)

- [ ] Build Referral System with unique invite codes and reward structure *(MONETISATION_GROWTH_AUDIT)*
- [ ] Track referrals in analytics for ROI measurement *(MONETISATION_GROWTH_AUDIT)*
- [ ] Create A/B experiments for pricing and onboarding copy *(MONETISATION_GROWTH_AUDIT)*
- [ ] Test short videos or testimonials on Premium screen *(MONETISATION_GROWTH_AUDIT)*
- [ ] Offer limited-time discounts or bundles *(MONETISATION_GROWTH_AUDIT)*
- [ ] Create dashboards aggregating subscription, referral, and retention metrics *(MONETISATION_GROWTH_AUDIT)*
- [ ] Add dynamic pricing or localization *(MONETISATION_GROWTH_AUDIT)*
- [ ] Implement social sharing features *(MONETISATION_GROWTH_AUDIT)*
- [ ] Capture subscription events and funnel metrics *(MONETISATION_GROWTH_AUDIT)*
- [ ] Trim marketing content to emphasize immediate value and reduce clutter *(PRODUCT_LAUNCH_READINESS)*

### 🏢 Multi-tenancy & Enterprise (Future)

- [ ] For high-security customers, provide option for dedicated databases *(MULTITENANCY_AUDIT)*
- [ ] Ensure every query scopes by tenant ID via ORM middleware *(MULTITENANCY_AUDIT)*
- [ ] Define role hierarchies (`admin`, `member`, `viewer`) and validate on requests *(MULTITENANCY_AUDIT)*
- [ ] Provide seamless org switching via dropdown or dedicated route *(MULTITENANCY_AUDIT)*
- [ ] Use `tenant.example.com` pattern with wild-card TLS *(MULTITENANCY_AUDIT)*
- [ ] Track API calls, storage, and concurrent sessions per tenant *(MULTITENANCY_AUDIT)*
- [ ] Enforce plan limits with graceful warnings before hard stops *(MULTITENANCY_AUDIT)*
- [ ] Provide self-service usage dashboard for transparency *(MULTITENANCY_AUDIT)*
- [ ] Support per-tenant feature flags and environment variables *(MULTITENANCY_AUDIT)*
- [ ] Use config service to load tenant settings at startup with caching *(MULTITENANCY_AUDIT)*

### 👥 Scaling Operations

- [ ] Allocate headcount for dedicated DevOps engineer to own CI/CD and tooling *(INTERNAL_DX_AUDIT)*
- [ ] Cross-train support staff on admin panel and dashboard features *(INTERNAL_DX_AUDIT)*
- [ ] Schedule periodic DX reviews to track friction index improvements *(INTERNAL_DX_AUDIT)*
- [ ] Increase automated test coverage and simplify setup scripts *(INTERNAL_DX_AUDIT)*
- [ ] Harden CI with offline-capable lint/typecheck steps and integrate dependency scanning *(CONSULTANT_FINDINGS_1)*
- [ ] Verify offline data persistence and sync reliability on mobile *(PRODUCT_LAUNCH_READINESS)*