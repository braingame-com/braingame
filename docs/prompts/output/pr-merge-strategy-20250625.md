# PR Merge Strategy - June 25, 2025

## Current Status
- 28 open PRs
- All BugBot issues have been fixed
- Most PRs have failing CI due to various issues

## Recommended Merge Order

### Phase 1: Foundation & Infrastructure (merge first)
1. **PR #167** - Fix GitHub Actions pnpm version conflict
   - Critical: Fixes CI infrastructure
   - Status: BugBot issues fixed
   
2. **PR #160** - Fix testing infrastructure conflict by migrating to Vitest
   - Critical: Resolves testing framework conflicts
   - Status: May need rebase

### Phase 2: Build & Performance Tools
3. **PR #171** - Add Lighthouse CI for performance monitoring
   - Status: BugBot issues fixed, needs CI re-run
   
4. **PR #172** - Extend Lighthouse CI to all web applications
   - Status: BugBot issues fixed, needs CI re-run
   
5. **PR #173** - Add Reassure for React Native performance testing
   - Status: BugBot issues fixed, needs CI re-run

### Phase 3: Code Quality & Documentation
6. **PR #170** - Add branch cleanup tools and documentation
   - Status: BugBot issues fixed
   
7. **PR #158** - Add comprehensive JSDoc documentation
   - Status: Check CI status
   
8. **PR #157** - Add comprehensive VSCode snippets
   - Status: CI passing

### Phase 4: Features & Fixes
9. **PR #168** - Optimize mobile app bundle size
   - Status: BugBot issues fixed
   
10. **PR #166** - Resolve main-site build errors
    - Status: Check if still needed

## Next Steps

1. Start with PR #167 as it fixes CI infrastructure
2. Each PR needs:
   - Rebase on latest main
   - CI re-run after fixes
   - Final quality check
   - Squash merge

## Commands for each PR:
```bash
# For each PR:
gh pr checkout <number>
git pull origin main --rebase
git push --force-with-lease
# Wait for CI to pass
gh pr merge <number> --squash --delete-branch
```