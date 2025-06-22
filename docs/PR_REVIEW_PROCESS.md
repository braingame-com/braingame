# PR Review Process

This document outlines our systematic approach to reviewing and merging pull requests. The guiding principle is **correctness and preserving all intended functionality**, not speed or reducing human interaction.

## 1. PR Analysis & Grouping

Start by analyzing all open PRs:

```bash
# List all PRs with their merge status and size
gh pr list --limit 50 --json number,title,mergeable,additions,deletions,author
```

Group PRs by:
1. **Mergeable** (no conflicts) vs **Conflicting**
2. Sort by size (lines changed) - start with smallest for momentum
3. Note: Author is irrelevant - we judge code quality objectively

## 2. Conflict Resolution Strategy

For branches with conflicts:

```bash
# First, try rebasing on main to reduce conflicts
gh pr checkout <number>
git fetch origin
git rebase origin/main
```

**CRITICAL**: Before resolving any conflicts, understand the intent of BOTH branches:
- What is main trying to achieve?
- What is the feature branch trying to achieve?
- Can both goals coexist?

## 3. Intelligent Conflict Resolution

**Zero tolerance policy for losing changes or breaking features.**

### Types of Conflicts and Resolution Strategies

| Conflict Type | Resolution Strategy |
|--------------|-------------------|
| **Feature additions** | Often both versions should be kept - merge functionality |
| **Bug fixes vs features** | Usually need to preserve both - apply fix to new feature |
| **Duplicate implementations** | Choose the better one, but understand why both exist |
| **Refactoring conflicts** | Ensure the refactoring intent is preserved across changes |
| **Deletion conflicts** | Understand WHY something was deleted before accepting |

### Conflict Resolution Process

1. **Examine the conflict**:
   ```bash
   # See what changed in both branches
   git log --oneline main..HEAD
   git log --oneline HEAD..main
   git diff main...HEAD
   ```

2. **Understand the context**:
   - Read commit messages
   - Check PR descriptions
   - Look at surrounding code

3. **Make intelligent decisions**:
   - Preserve features from both branches when possible
   - Don't blindly accept "ours" or "theirs"
   - Consider the combined effect

4. **When in doubt, ALWAYS ask for human input**:
   - Present clear options: "Option A preserves X, Option B preserves Y"
   - Explain the trade-offs
   - This is encouraged and rewarded!

## 4. Review Process for Each PR

### 4.1 Understanding the Change

```bash
# Check out the PR locally
gh pr checkout <number>

# Read the PR description
gh pr view <number>

# See all changed files
git diff main...HEAD --name-only

# Review the changes
git diff main...HEAD
```

### 4.2 Automated Quality Checks

Run ALL of these checks:

```bash
# Ensure code style compliance
pnpm lint

# Ensure type safety
pnpm typecheck

# Run test suite
pnpm test

# Ensure it builds
pnpm build
```

If any check fails, fix it before proceeding:

```bash
# Fix linting issues
pnpm lint --fix

# After fixing, commit and push
git add .
git commit -m "fix: resolve linting and type errors"
git push
```

### 4.3 Manual Code Review

Check for:
- ✅ No technical debt introduced
- ✅ Code follows existing patterns
- ✅ No hardcoded values that should be configurable
- ✅ Proper error handling
- ✅ Performance considerations
- ✅ Security implications
- ✅ Documentation updates if needed

## 5. Objective Quality Standards

All code is held to the same standards regardless of author:

- **Correctness**: Does it solve the intended problem without breaking anything?
- **Maintainability**: Will future developers understand this code?
- **Performance**: Are there any obvious performance issues?
- **Security**: Are there any security vulnerabilities?
- **Architecture**: Does it align with project structure and patterns?

## 6. Human Collaboration Guidelines

**Asking for help is GOOD** - correctness over autonomy.

When to ask for human input:
- Complex merge conflicts
- Architectural decisions
- Security implications
- Performance trade-offs
- Any uncertainty about the right approach

How to ask effectively:
- Present clear options with pros/cons
- Show code examples
- Explain what you understand and what you're unsure about
- Flag any suspicious patterns

Example:
```
"I'm reviewing PR #123 which refactors the auth system. There's a conflict where:
- Main added email verification
- The PR restructured the auth flow

Option A: Integrate email verification into the new flow structure
Option B: Keep email verification separate as a middleware

I lean toward Option A for consistency, but want your input on the architectural choice."
```

## 7. Merge Strategy

Once all checks pass and conflicts are resolved:

1. **Final verification**:
   ```bash
   # One more check that everything works
   pnpm lint && pnpm typecheck && pnpm test && pnpm build
   ```

2. **Prepare clear commit message**:
   - Summarize what changed
   - Mention any important decisions made during conflict resolution

3. **Get human confirmation**:
   - Show the final diff
   - Explain any conflict resolutions
   - Confirm ready to merge

4. **Merge**:
   ```bash
   # Squash and merge for clean history
   gh pr merge <number> --squash
   ```

5. **Document follow-up work** if needed

## 8. Common Scenarios

### Scenario: Outdated Dependencies
```bash
# Update dependencies if needed
pnpm install
git add pnpm-lock.yaml
git commit -m "chore: update lockfile"
```

### Scenario: Environment Variable Changes
- Check if `.env.example` needs updating
- Verify all env vars are documented
- Ensure validation schemas are updated

### Scenario: Database/API Changes
- Check for migration files
- Verify backward compatibility
- Review API documentation updates

## Remember

**The goal is correctness and preserving all intended functionality, not speed or reducing human interaction.**

- Take time to understand changes fully
- Ask questions when unsure
- Document your decisions
- Learn from each PR review

This process ensures we maintain high code quality while respecting the work and intentions of all contributors.