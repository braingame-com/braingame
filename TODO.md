# Brain Game - TODO

## 🚀 Roadmap to Revenue

### Phase 1: MVP BGUI & Landing Page
**Goal:** Get lead generation running ASAP

#### Set up docs site
- [ ] Get full docs site ready to ship
  - [x] Polish homepage hero + showcase visuals so the site feels production-ready.
  - [x] Run an accessibility sweep (axe/keyboard) and capture any follow-up issues.
  - [x] Complete all components documentation and examples
  - [x] Document color usage and spacing tokens on the Design pages
  - [x] Publish a principles section so teams understand our design philosophy
  - [x] Make sure components have tests and files are refactor beautifully
- [ ] Actually get docs-site live
  - [ ] Set up docs.website.com subdomain
  - [ ] Deploy app to Firebase
  - [ ] Point subdomain to Firebase
  - [ ] Set up any automated tooling needed for publishing and deploying, e.g. Github actions

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
- [ ] Fix Expo dev server issues (or switch to different approach)
- [ ] **Tech Debt:** Finish migrating BGUI tests/stories to the new theme provider and clean up temporary shims
- [ ] **Tech Debt:** Add light/dark regression coverage for BGUI components now that the theme engine is in-house
- [ ] **Tech Debt:** Reinstate failing pre-commit on test failures once Jest warnings are resolved

### Before Production
- [ ] Environment variables properly configured
- [ ] Security audit (API keys, secrets)
- [ ] Performance optimization
- [ ] Accessibility basics

---

## 🧩 Complexity Simplification
**Goal:** Boil the repo complexity down while keeping signal high and enterprise standards intact

<!-- - [ ] HIGH: Rebuild the documentation pipeline so `apps/docs-site` consumes a single `handbook/` source of truth (MDX + frontmatter), eliminating parallel navigation/config files -->
- [ ] HIGH: Replace scattered Node scripts with a typed `@braingame/cli` package that exposes subcommands (docs, workspace, components), deprecating ad-hoc JS entrypoints
- [ ] HIGH: Stand up an asset build system that generates all favicons, app icons, and illustrations from one manifest, wiring every app/package to consume outputs from `assets/dist`

  ---

**Last Updated:** 2025-10-01
**Goal:** Get to revenue within 30 days
