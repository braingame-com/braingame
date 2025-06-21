# Git Worktrees Guide

> **CRITICAL: This guide prevents workspace contamination and ensures clean development practices.**

![Status](https://img.shields.io/badge/status-critical-red?style=flat-square)
![Updated](https://img.shields.io/badge/updated-20--01--2025-blue?style=flat-square)

## 🚨 Why This Matters

On 20-01-2025, we experienced a **workspace contamination incident** where experimental AI work accidentally polluted the main production codebase. This guide ensures that never happens again.

---

## 📍 Workspace Verification (MANDATORY)

**Before ANY work begins, ALL agents and developers MUST:**

```bash
# 1. Verify current worktree location
git worktree list

# 2. Confirm you're in the correct directory
pwd

# 3. Check git status to ensure clean state
git status
```

---

## 🗂️ Worktree Structure

| Worktree | Path | Purpose | Who Uses |
|----------|------|---------|----------|
| **main** | `/Users/jordancrow-stewart/Desktop/code/braingame/` | Production code, releases | Humans, production deployments |
| **claude-sandbox** | `/Users/jordancrow-stewart/Desktop/code/braingame-claude-sandbox/` | AI experiments, prototypes | AI agents, experimental work |

---

## 🛠️ Setting Up Worktrees

### Initial Setup (One-time)
```bash
# From the main repository
cd /Users/jordancrow-stewart/Desktop/code/braingame

# Create the sandbox worktree (ALREADY DONE)
git worktree add ../braingame-claude-sandbox main

# Verify setup
git worktree list
```

### Switching Between Worktrees
```bash
# To main worktree (production)
cd /Users/jordancrow-stewart/Desktop/code/braingame

# To sandbox (experiments)
cd /Users/jordancrow-stewart/Desktop/code/braingame-claude-sandbox
```

---

## 📋 Pre-Flight Checklist

**Copy this checklist and run through it EVERY time before starting work:**

```bash
#!/bin/bash
# Save as check-workspace.sh

echo "🔍 Workspace Pre-Flight Check"
echo "============================"

# Check current directory
echo "📍 Current directory: $(pwd)"

# Check git worktree
echo "🌳 Git worktrees:"
git worktree list

# Check branch
echo "🔀 Current branch: $(git branch --show-current)"

# Check for uncommitted changes
echo "📝 Git status:"
git status --short

# Confirmation prompt
read -p "✅ Is this the correct workspace for your task? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Aborting - switch to correct workspace first!"
    exit 1
fi

echo "✅ Workspace verified - proceed with work"
```

---

## 🤖 AI Agent Rules

1. **ALWAYS run workspace verification** before generating any code
2. **ALWAYS verify GitHub account** with `gh auth status` (must be jcs180)
3. **Switch accounts if needed** with `gh auth switch --user jcs180`
4. **Experimental work goes in sandbox** - no exceptions
5. **Production commits only from main worktree**
6. **Document worktree used** in all work session notes
7. **Never mix worktree commits** - keep them isolated

---

## 🔄 Worktree Workflow

### For Experimental AI Work
```bash
# 1. Switch to sandbox
cd /Users/jordancrow-stewart/Desktop/code/braingame-claude-sandbox

# 2. Verify GitHub account
gh auth status  # Must show jcs180
gh auth switch --user jcs180  # If needed

# 3. Create feature branch
git checkout -b experiment/ai-feature

# 4. Do experimental work
# ... make changes ...

# 5. Commit to sandbox
git add .
git commit -m "experiment: testing new AI approach"

# 6. If successful, cherry-pick to main
cd /Users/jordancrow-stewart/Desktop/code/braingame
git cherry-pick <commit-hash>
```

### For Production Work
```bash
# 1. Ensure you're in main worktree
cd /Users/jordancrow-stewart/Desktop/code/braingame

# 2. Verify GitHub account
gh auth status  # Must show jcs180
gh auth switch --user jcs180  # If needed

# 3. Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/production-feature

# 4. Make production-ready changes
# ... make changes ...

# 5. Commit and push
git add .
git commit -m "feat: production-ready feature"
git push origin feature/production-feature
```

---

## 🧹 Cleanup & Maintenance

### Remove Unused Worktrees
```bash
# List all worktrees
git worktree list

# Remove a worktree
git worktree remove /path/to/worktree

# Prune stale worktree information
git worktree prune
```

### Sync Worktrees
```bash
# In main worktree
cd /Users/jordancrow-stewart/Desktop/code/braingame
git pull origin main

# In sandbox
cd /Users/jordancrow-stewart/Desktop/code/braingame-claude-sandbox
git pull origin main  # Both use same main branch
```

---

## ⚠️ Common Pitfalls

| Mistake | Consequence | Prevention |
|---------|-------------|------------|
| Working in wrong worktree | Production contamination | Run pre-flight check |
| Mixing experimental/production | Unstable codebase | Keep strict separation |
| Not documenting worktree | Lost context | Add to work session notes |
| Committing to wrong branch | Git history pollution | Check branch before commit |

---

## 🚀 Quick Reference

```bash
# Where am I?
pwd && git worktree list

# Switch to production
cd /Users/jordancrow-stewart/Desktop/code/braingame

# Switch to sandbox  
cd /Users/jordancrow-stewart/Desktop/code/braingame-claude-sandbox

# What branch?
git branch --show-current

# Clean state?
git status
```

---

## 📞 Help & Support

If you're unsure about worktrees:
1. **Stop and verify** - better safe than sorry
2. **Check this guide** - it has all the answers
3. **Ask in Slack/Discord** - `#dev-help` channel
4. **Email**: `hello@braingame.dev`

---

*Remember: A clean workspace is a productive workspace. When in doubt, check it out!*