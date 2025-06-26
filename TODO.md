# TODO

Active task tracker for Brain Game development.

## Critical Priority

### Production Deployment
- [ ] Firebase hosting configuration for all apps
- [ ] Environment variable validation
- [ ] Production build optimization
- [ ] Performance monitoring setup

### Integration Testing
- [ ] E2E test suite completion
- [ ] Cross-platform testing
- [ ] API integration tests
- [ ] User flow validation

## Medium Priority

### Developer Experience
- [ ] Storybook visual regression testing
- [ ] Environment management improvements
- [ ] API documentation generation
- [ ] Development tool enhancements
- [ ] Legal Compliance Review (in_progress)
- [ ] Hardware compatibility audit *(in_progress)*
  - [ ] Document CPU/RAM usage across devices
  - [ ] Record battery drain and thermal throttling
  - [ ] Validate sensor and peripheral integration
  - [ ] Verify cross-platform performance on M1/M2 Macs, Windows ARM, and Android variants
  - [ ] Summarize device farm results

<<<<<<< HEAD
- [x] AI Ethics Compliance Review *(completed 24-06-2025)*
=======
### Monitoring & Analytics
- [ ] Error tracking with Sentry
- [ ] Performance metrics collection
- [ ] User behavior analytics
- [ ] Bundle size monitoring
>>>>>>> origin/main

## Nice to Have

### Marketing Enhancement
- [ ] Landing page content optimization
- [ ] SEO improvements
- [ ] Brand asset organization
- [ ] Social media integration

### Advanced Features
- [ ] Advanced testing patterns
- [ ] Code generation tools
- [ ] Performance profiling
- [ ] Accessibility auditing

## Next Steps

### Firebase Integration
- [ ] Authentication setup
- [ ] Firestore configuration
- [ ] Cloud Functions deployment
- [ ] Security rules implementation

### Production Readiness
- [ ] Load testing
- [ ] Security audit
- [ ] Performance benchmarking
- [ ] Documentation review

### Completed Features
- [x] Storybook Enhancement (Completed 25-06-2025)
  - [x] Create stories for all 25 components
  - [ ] Add visual testing with Chromatic
  - [ ] Deploy to GitHub Pages

## Extension Points

Future development areas:
- **AI Integration**: Enhanced personalization
- **Analytics Platform**: Advanced user insights
- **Content Management**: Dynamic exercise creation
- **Social Features**: Community and sharing

- [ ] Setup Monitoring & Analytics <!-- in_progress -->
  - [ ] Add Mixpanel/Amplitude for analytics <!-- in_progress -->
  - [ ] Set up alerting rules

## Notes for AI Agents

When working on tasks:
1. Update this TODO when completing items
2. Create new items for discovered work
3. Reference related documentation
4. Maintain priority ordering

## 🎨 Nice to Have

- [ ] Create Marketing Website Content
  - [ ] Write compelling copy for landing page
  - [ ] Design and implement feature sections
  - [ ] Add testimonials section
  - [ ] Create pricing page

- [ ] Developer Experience Improvements
  - [ ] Improve hot reload performance
  - [ ] Create debugging guide

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
- [in_progress] Offline Mode Resilience Report (24-06-2025)

## 🔗 Quick Links
- Architecture: [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- AI Guide: [CLAUDE.md](./docs/CLAUDE.md)
- Security: [SECURITY.md](./.github/SECURITY.md)
- Worktrees: [WORKTREES.md](./docs/WORKTREES.md)
