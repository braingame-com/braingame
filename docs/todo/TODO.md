# Brain Game - TODO

## 🚀 Roadmap to Revenue

### Phase 1: MVP BGUI & Landing Page
**Goal:** Get lead generation running ASAP

#### Fix BGUI Architecture Issue
- [ ] Fix dual platform implementation - components should be single .tsx files using React Native Web
- [ ] Current broken components that need fixing:
  - [ ] Button (has .native.tsx and .web.tsx - merge to single file)
  - [ ] Card (same issue)
  - [ ] Modal (same issue)
  - [ ] Input/TextInput (same issue)
  - [ ] All other split components

#### Build MVP BGUI Components
Just enough to build a landing page:
- [ ] Button (fixed single implementation)
- [ ] Card
- [ ] Text/Typography
- [ ] Input (email capture)
- [ ] Modal (GDPR/cookie consent)
- [ ] Container/Box
- [ ] Stack (layout)

#### Add Components to Docs Site
- [ ] Create component showcase pages
- [ ] Add interactive examples
- [ ] Verify they work on web

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
- [ ] Fix Expo dev server issues (or switch to different approach)
- [ ] Clean up git history/branches
- [ ] Remove unused dependencies

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
- [Architecture](../ARCHITECTURE.md)
- [Development Setup](../development/README.md)
- [BGUI Components](../../packages/bgui/README.md)

---

**Last Updated:** 2025-08-23
**Goal:** Get to revenue within 30 days