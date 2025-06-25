# Git Worktrees

Critical workspace isolation to prevent contamination.

## Context

On 20-01-2025, we had workspace contamination that mixed experimental code with production. Never again.

## Workspace Structure

```
/workspace/
├── braingame/                  # PRODUCTION (main branch)
└── braingame-claude-sandbox/   # EXPERIMENTS (any branch)
```

## Pre-Flight Checklist

**MANDATORY**: Run before any work:

```bash
pwd                    # Verify location
git branch --show-current    # Verify branch
git status             # Check for uncommitted changes
```

## AI Agent Rules

1. **Always verify workspace** before any action
2. **Experimental work** → sandbox only
3. **Production changes** → main workspace only
4. **Never mix** experimental and production code

## Workflows

### Experimental Work
```bash
# Create sandbox (if not exists)
git worktree add ../braingame-claude-sandbox

# Switch to sandbox
cd ../braingame-claude-sandbox

# Create experimental branch
git checkout -b experiment/feature-test

# Work freely without risk
```

### Production Work
```bash
# Always work in main workspace
cd /workspace/braingame

# Create proper feature branch
git checkout -b feature/user-auth

# Follow normal development process
```

## Worktree Management

### List Worktrees
```bash
git worktree list
```

### Remove Worktree
```bash
# Remove directory first
rm -rf ../braingame-claude-sandbox

# Prune from Git
git worktree prune
```

### Add New Worktree
```bash
git worktree add ../path-to-new-worktree branch-name
```

## Common Mistakes

| Mistake | Prevention | Fix |
|---------|------------|-----|
| Wrong workspace | Check `pwd` first | Move to correct location |
| Mixed branches | Verify branch before work | Stash and checkout correct |
| Uncommitted changes | Run `git status` | Commit or stash |
| Missing worktree | Check `git worktree list` | Add missing worktree |

## Quick Reference

```bash
# Verify current state
pwd && git branch --show-current && git status

# Create experimental worktree
git worktree add ../braingame-claude-sandbox

# Clean up worktree
rm -rf ../braingame-claude-sandbox && git worktree prune
```

## Emergency Recovery

If contamination occurs:
1. **STOP** all work immediately
2. **Document** current state
3. **Stash** uncommitted changes
4. **Reset** to last known good state
5. **Review** all recent commits