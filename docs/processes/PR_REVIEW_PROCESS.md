# PR Review Process

Systematic approach to reviewing and merging pull requests.

## Core Principles

- **Correctness over speed** - Better to be thorough than fast
- **Zero tolerance** - No lint warnings, no TypeScript errors
- **Preserve context** - Document all decisions
- **Human oversight** - Complex decisions require human review

## Review Checklist

### BugBot Review (Check First!)
- [ ] Check BugBot comments on PR
- [ ] Address all HIGH/CRITICAL severity issues
- [ ] Fix issues on feature branch before merging
- [ ] Add resolution comments to PR

### Code Quality
- [ ] Passes all quality checks (`pnpm lint && pnpm typecheck && pnpm test`)
- [ ] Follows established patterns
- [ ] No hardcoded values
- [ ] Proper error handling
- [ ] Performance considerations addressed

### Testing
- [ ] Unit tests for business logic
- [ ] Component tests for interactions
- [ ] E2E tests for critical flows
- [ ] Manual testing completed

### Documentation
- [ ] README updates (if needed)
- [ ] JSDoc comments added
- [ ] Architecture docs updated
- [ ] Breaking changes documented

## Conflict Resolution

### Merge Conflicts
```bash
# Fetch latest changes
git fetch origin main

# Rebase feature branch
git rebase origin/main

# Resolve conflicts
git add .
git rebase --continue
```

### Quality Failures
1. **Identify root cause** - Don't mask symptoms
2. **Fix systematically** - Address all related issues
3. **Verify comprehensively** - Run full quality suite
4. **Document solution** - Help future developers

## Decision Matrix

### Auto-Merge (No Human Review Needed)
- Documentation updates
- Minor bug fixes
- Dependency updates
- Style adjustments

### Human Review Required
- New features
- Breaking changes
- Performance modifications
- Security-related changes
- Architecture decisions

### Close Without Merge
- Quality checks failing after multiple attempts
- Conflicts with project direction
- Superseded by better solution
- Author abandonment (30+ days inactive)

## Merge Strategies

### Pre-Merge Verification (MANDATORY)
```bash
# For EVERY PR before merging:
git fetch origin
git checkout <feature-branch>
pnpm lint
pnpm typecheck
# Fix any issues found
git add -A && git commit -m "fix: lint/type errors"
git push origin <feature-branch>
# Only then proceed with merge
```

**CRITICAL:** Never assume CI passing means branch is clean. Local verification prevents error accumulation on main.

### Squash Merge (Default)
- Cleans up commit history
- Single commit per feature
- Preserves PR context

### Regular Merge
- Multiple logical commits
- Preserves detailed history
- Complex features only

## Human Collaboration Guidelines

### For AI Reviewers
1. **Flag complex decisions** for human review
2. **Document uncertainty** clearly
3. **Provide context** for recommendations
4. **Respect human override** decisions

### For Human Reviewers
1. **Review AI analysis** before manual review
2. **Override when necessary** with explanation
3. **Provide learning feedback** to improve AI
4. **Focus on strategic decisions** over tactical details

## Quality Gates

### Pre-Merge Requirements
```bash
# Must pass 100%
pnpm lint
pnpm typecheck  
pnpm test
pnpm build
```

### Post-Merge Actions
- Deploy to staging
- Monitor for regressions
- Update documentation
- Close related issues

## Common Issues

### Build Failures
1. Clear dependency cache
2. Verify environment variables
3. Check TypeScript compatibility
4. Review recent package changes

### Test Failures
1. Run tests locally
2. Check for flaky tests
3. Verify test data setup
4. Review recent changes impact

### Performance Regressions
1. Bundle analysis comparison
2. Load time measurements
3. Memory usage profiling
4. User experience testing

## Emergency Procedures

### Critical Bug Fix
- Hotfix branch from main
- Minimal change scope
- Expedited review process
- Immediate deployment

### Rollback Process
- Revert commit on main
- Deploy previous version
- Create fix in separate PR
- Document incident learnings