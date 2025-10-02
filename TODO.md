# Brain Game - TODO

## 🚀 Roadmap to Revenue

### Phase 1: MVP BGUI & Landing Page
**Goal:** Get lead generation running ASAP

#### Fix BGUI Architecture Issue
- [x] Fix dual platform implementation - components should be single .tsx files using React Native Web

#### BGUI Quality Checks
- [x] Evaluate building an in-house BGUI theme engine to replace Restyle (requirements, migration plan, effort estimate). _(See `packages/bgui/docs/THEME_ENGINE_EVALUATION.md`.)_
- [x] Build an in-house BGUI theme engine to replace Restyle (and remove Restyle)
  - [x] Scaffold new in-house theme engine inside `packages/bgui` with context, hooks, and token typings
  - [x] Update `BGUIThemeProvider` to wrap the new provider while preserving public API
  - [x] Replace Restyle primitives with internal `Box`/`Text` equivalents and migrate affected components
  - [x] Port component styling to `useTheme`/token helpers and remove direct `theme` imports
  - [x] Update tests/storybook helpers to use the new provider; remove Restyle dependency _(Follow-up: see "Tech Debt → BGUI test/stories refactor" task)_
- [x] Build our own slider so we can remove @react-native-community/slider as a dependency
- [x] Remove @mui stuff as dependencies by making sure our own in-house token/design system is up to scratch
- [x] Refactor primitives and compositions to consume the active Restyle theme (e.g. via `useTheme`) so light/dark modes from `BGUIThemeProvider` render correctly.
- [x] Add automated coverage (unit or visual regression) proving components render with both light and dark tokens after the theme refactor.
- [ ] Rewrite `packages/bgui/scripts/generate-component.js` to scaffold the single-file universal component pattern and drop obsolete `.native/.web` outputs.
- [ ] Sync BGUI docs (`README.md`, `docs/JOY_UI_IMPLEMENTATION_SUMMARY.md`, `docs/GOLD_STANDARD.md`, etc.) with the current architecture and workflows.
- [ ] Introduce a maintainer checklist (living in BGUI docs) covering lint, typecheck, storybook, and theming verification before publishing.

#### Set up docs site properly
- [ ] Make sure docs site is using a header/sidebar etc. from bgui 

#### Build & Deploy Landing Page
- [ ] Simple hero section
- [ ] Email capture form
- [ ] Firebase integration (should already be partially set up)
- [ ] Deploy to Vercel/Firebase Hosting
- [ ] Set up domain

#### Start Lead Generation
- [ ] Run Google/Meta ads to landing page
- [ ] Collect emails
- [ ] Track conversion metrics

---

### Phase 2: Product App Foundation
**Goal:** Build the core product experience

#### Expand BGUI Component Library
Components needed for product app:
- [ ] Navigation components (TabBar, Drawer)
- [ ] List/ListItem
- [ ] Avatar
- [ ] Badge
- [ ] Switch/Toggle
- [ ] Select/Dropdown
- [ ] Checkbox
- [ ] Radio
- [ ] Alert/Toast
- [ ] Spinner/Loading states

#### Backend Infrastructure
- [ ] Authentication
  - [ ] Email/password auth via Firebase Auth
  - [ ] Session management
  - [ ] Password reset flow
- [ ] Database Layer
  - [ ] Firestore setup
  - [ ] CRUD operations API
  - [ ] Data models for users, content
- [ ] Subscription Infrastructure
  - [ ] Stripe/RevenueCat integration
  - [ ] Subscription tiers (free/premium)
  - [ ] Payment processing (ready but not charging yet)

---

### Phase 3: MVP Product App
**Goal:** Ship the actual product

#### Core Features (from existing TODO)
- [ ] Onboarding flow (3 screens)
- [ ] Vision & Goals module (5 life areas)
- [ ] Daily Affirmations
- [ ] Visual Inspiration Gallery
- [ ] Basic Progress Tracking
- [ ] Settings & Profile

#### Platform Deployment
- [ ] iOS build & TestFlight
- [ ] Android build & Play Store beta
- [ ] Web PWA deployment
- [ ] Basic analytics setup (Mixpanel/Amplitude)

#### Testing
- [ ] Manual testing on all platforms
- [ ] Basic E2E tests for critical paths
- [ ] Error tracking (Sentry)

---

### Phase 4: Marketing Site & Growth
**Goal:** Scale user acquisition

#### Convert Landing Page to Full Marketing Site
- [ ] Multiple pages (features, pricing, about)
- [ ] Blog/content section
- [ ] Social proof (testimonials)
- [ ] Pricing page with checkout flow
- [ ] SEO optimization

#### Growth Initiatives
- [ ] Content marketing strategy
- [ ] Referral system
- [ ] Email marketing campaigns
- [ ] Social media presence
- [ ] App Store optimization

---

## 🔧 Technical Debt to Address

### Immediate Issues
- [x] Enforce lint/typecheck cleanliness across every workspace
- [ ] Fix Expo dev server issues (or switch to different approach)
- [ ] Clean up git history/branches
- [ ] Remove unused dependencies
- [ ] **Tech Debt:** Finish migrating BGUI tests/stories to the new theme provider and clean up temporary shims
- [ ] **Tech Debt:** Add light/dark regression coverage for BGUI components now that the theme engine is in-house
- [ ] **Tech Debt:** Reinstate failing pre-commit on test failures once Jest warnings are resolved

### Before Production
- [ ] Environment variables properly configured
- [ ] Security audit (API keys, secrets)
- [ ] Performance optimization
- [ ] Accessibility basics

---

## 📝 Notes

### What We're NOT Doing Yet
- Enterprise features
- Complex analytics
- Multi-tenancy
- Advanced testing suites
- Extensive documentation
- Perfect code coverage
- Microservices architecture
- All the "consultant report" stuff

### Key Decisions
- Using React Native Web for universal components (no more dual implementations)
- Firebase for backend (simple, works, scalable enough)
- Focus on shipping fast, not perfect architecture
- Revenue first, optimization later

### Quick Links
- [Architecture](docs/handbook/architecture/ARCHITECTURE.md)
- [Development Setup](docs/handbook/development/DEVELOPMENT.md)
- [BGUI Components](packages/bgui/README.md)

---

## 🧩 Complexity Simplification
**Goal:** Boil the repo complexity down while keeping signal high and enterprise standards intact
- [x] QUICK: Correct doc references (e.g., `.github/CONTRIBUTING.md`) to point at the actual `docs/handbook/development` resources
- [x] QUICK: Publish a `docs/handbook/development/WORKSPACE_MAP.md` that charts apps, packages, and owner responsibilities at a glance
- [x] MEDIUM: Centralize shared branding assets (favicons/logos) under `assets/` and wire apps to consume them via workspace imports
- [x] MEDIUM: Consolidate dev helper scripts into a single `scripts/workspace-helper` entry point with curated subcommands, retiring duplicates
- [x] MEDIUM: Merge `docs/todo/BGUI_TODO.md` into the primary `docs/todo/TODO.md` roadmap and archive the duplicate tracker
- [x] MEDIUM: Collapse redundant README files by moving their content into `docs/README.md` (or inlining into package docs) and pruning leftovers
- [x] MEDIUM: Restructure the `docs/` directory into fewer top-level groups (e.g., development, operations, reference) and archive low-signal prompt/adr scaffolding
- [ ] HIGH: Rebuild the documentation pipeline so `apps/docs-site` consumes a single `handbook/` source of truth (MDX + frontmatter), eliminating parallel navigation/config files
- [ ] HIGH: Replace scattered Node scripts with a typed `@braingame/cli` package that exposes subcommands (docs, workspace, components), deprecating ad-hoc JS entrypoints
- [ ] HIGH: Stand up an asset build system that generates all favicons, app icons, and illustrations from one manifest, wiring every app/package to consume outputs from `assets/dist`

  ---

**Last Updated:** 2025-10-01
**Goal:** Get to revenue within 30 days
