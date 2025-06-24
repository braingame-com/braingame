# Brain Game - TODO Tracker

![Task Management](https://img.shields.io/badge/task%20management-active-brightgreen?style=flat-square&logo=todoist)
![Quality](https://img.shields.io/badge/quality-enterprise%20grade-gold?style=flat-square&logo=quality)

## 🐛 CRITICAL BUG FIXES REQUIRED

### Quick Win Fixes
- [ ] Replace hardcoded app version in `ErrorService.ts`

## 🎯 Current Sprint: Production Readiness

### 🚨 Critical Priority

- [ ] Production Deployment Preparation
  - [ ] Production Firebase configuration
  - [ ] App Store Connect setup
  - [ ] Google Play Console setup
  - [ ] SSL certificates and domain configuration

- [ ] Resolve Testing Infrastructure Conflict 🔥 CRITICAL
  - [ ] Remove conflicting test configurations (both Jest and Vitest configs exist in bgui)
  - [ ] Choose single testing framework (Jest currently working, Vitest planned)
  - [ ] Remove all Jest dependencies if pivoting to Vitest
  - [ ] Configure chosen framework consistently across monorepo
  - [ ] Add unit tests for all `packages/utils` functions
  - [ ] Configure and enforce >80% coverage reporting
  - [ ] Setup integration tests for apps

## 🔥 High Priority

- [ ] Performance Monitoring & Optimization
  - [ ] Implement code splitting for web apps
  - [ ] Optimize bundle sizes for mobile apps
  - [ ] Add lighthouse CI checks

- [ ] Complete Component Documentation
  - [ ] Apply template to remaining 23 BGUI components
  - [ ] Generate component playground/examples
  - [ ] Document props for each BGUI component

- [ ] Configure GitHub Branch Protection
  - [ ] Enable branch protection for main branch
  - [ ] Require PR reviews (minimum 1)
  - [ ] Require status checks (CI/CD pipeline)
  - [ ] Require up-to-date branches
  - [ ] Restrict force pushes
  - [ ] Delete head branches automatically

## 📋 Medium Priority

- [ ] Storybook Enhancement
  - [ ] Create stories for all 25 components
  - [ ] Add visual testing with Chromatic
  - [ ] Deploy to GitHub Pages

- [ ] Environment Management
  - [ ] Create `.env.example` files for all apps
  - [ ] Add validation with zod
  - [ ] Document all required variables
  - [ ] Add environment check script

- [ ] Setup Monitoring & Analytics
  - [ ] Add Mixpanel/Amplitude for analytics
  - [ ] Set up alerting rules

- [ ] API Documentation
  - [ ] Create OpenAPI spec for backend
  - [ ] Generate TypeScript types from spec
  - [ ] Set up API documentation site
  - [ ] Add request/response examples

## 🎨 Nice to Have

- [ ] Create Marketing Website Content
  - [ ] Write compelling copy for landing page
  - [ ] Design and implement feature sections
  - [ ] Add testimonials section
  - [ ] Create pricing page

- [ ] Developer Experience Improvements
  - [ ] Create VSCode snippets for BGUI components
  - [ ] Add component scaffolding script
  - [ ] Improve hot reload performance
  - [ ] Create debugging guide

- [ ] Advanced Testing
  - [ ] E2E tests with Playwright (Web)
  - [ ] E2E tests with Maestro (Native mobile)
  - [ ] Visual regression tests
  - [ ] Performance benchmarks
  - [ ] Accessibility audits
  - [ ] 90% test coverage goal

## 🚀 Next Steps

### Immediate Actions Required:
1. **Resolve Testing Conflicts** - Both Jest and Vitest configs exist in bgui package (HIGH)
2. **Firebase Integration** - Website has TODO for Firebase email collection (HIGH)
3. **Replace hardcoded app version** - ErrorService.ts still has hardcoded version (LOW)

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

3. **Performance Optimization**
   - Implement code splitting
   - Optimize bundle sizes
   - Add performance monitoring

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