# CI/CD Workflow

GitHub Actions configuration and continuous integration processes.

## Workflow Overview

### Main CI Pipeline (.github/workflows/ci.yml)
Runs on every PR and push to main:

1. **Quality Checks**
   - `pnpm lint` - Biome linter (must pass 100%)
   - `pnpm typecheck` - TypeScript compilation
   - `pnpm test` - Vitest unit tests

2. **Build Verification**
   - `pnpm build` - Production builds for all apps
   - Bundle size analysis
   - Asset optimization checks

3. **Performance Testing**
   - Lighthouse CI (web apps)
   - Reassure (React Native performance)
   - Bundle size tracking

## Key Integrations

### BugBot
- Automated bug detection on PRs
- Comments directly on PR with issues found
- Severity levels: LOW, MEDIUM, HIGH, CRITICAL
- **Always check BugBot comments before merging**

### Lighthouse CI
- Performance monitoring for web applications
- Tracks Core Web Vitals
- Prevents performance regressions
- Configuration in `.github/lighthouse/`

### Reassure
- React Native performance testing
- Component render time tracking
- Memory usage monitoring
- Prevents mobile performance regressions

## Environment Differences

### Known CI/Local Discrepancies
- **pnpm version**: CI may use different version than local
- **Node version**: Ensure local matches CI (see .nvmrc)
- **TypeScript version**: Package versions may differ
- **Platform-specific tests**: Some tests behave differently in CI

### Troubleshooting CI Failures

#### Lint/Type Errors Only in CI
```bash
# Ensure exact environment match
nvm use
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
```

#### Test Failures
```bash
# Run with CI environment
CI=true pnpm test
```

#### Build Failures
```bash
# Clear all caches
rm -rf node_modules
pnpm install
pnpm build
```

## GitHub Actions Secrets

Required repository secrets:
- `GITHUB_TOKEN` - Auto-provided by GitHub
- `VERCEL_TOKEN` - For preview deployments
- `EXPO_TOKEN` - For EAS builds

## Deployment Pipeline

### Web Apps
1. Vercel preview on PR
2. Production deploy on main merge
3. Automatic rollback on failures

### Mobile Apps
1. EAS Build triggered manually
2. TestFlight/Play Console distribution
3. OTA updates for non-native changes

## Best Practices

### Pre-Push Checklist
```bash
# Always run before pushing
pnpm lint && pnpm typecheck && pnpm test
```

### PR Workflow
1. Check BugBot comments first
2. Fix all issues on feature branch
3. Verify locally before merge
4. Never merge with failing CI

### Emergency Procedures

#### Broken Main Branch
```bash
# Revert last commit
git revert HEAD
git push origin main

# Or reset to known good state
git reset --hard <good-commit>
git push --force-with-lease origin main
```

#### CI Pipeline Stuck
1. Cancel workflow in GitHub Actions tab
2. Re-run from failed job
3. If persistent, check for resource limits

## Performance Budgets

### Web Applications
- First Contentful Paint: < 1.8s
- Time to Interactive: < 3.9s
- Bundle size: < 200KB gzipped

### Mobile Applications
- Cold start: < 2s
- JS bundle: < 2MB
- Memory usage: < 100MB

## Monitoring

### Alerts
- CI failure notifications → Slack
- Performance regression → GitHub comment
- Deploy failures → Email to maintainers

### Dashboards
- GitHub Actions tab for CI status
- Vercel dashboard for web deploys
- EAS dashboard for mobile builds