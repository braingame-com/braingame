#!/bin/bash
# Workspace verification script for Brain Game
# Prevents accidental work in wrong git worktree

echo "🔍 Workspace Pre-Flight Check"
echo "============================"
echo ""

# Check current directory
echo "📍 Current directory: $(pwd)"
echo ""

# Check git worktree
echo "🌳 Git worktrees:"
git worktree list
echo ""

# Check branch
echo "🔀 Current branch: $(git branch --show-current)"
echo ""

# Check for uncommitted changes
echo "📝 Git status:"
git status --short
echo ""

# Determine if we're in main or sandbox
if [[ $(pwd) == *"braingame-claude-sandbox"* ]]; then
    echo "⚗️  You are in the SANDBOX worktree (for experiments)"
elif [[ $(pwd) == *"braingame"* ]]; then
    echo "🏭 You are in the MAIN worktree (for production)"
else
    echo "⚠️  WARNING: Unknown worktree location!"
fi
echo ""

# Confirmation prompt
read -p "✅ Is this the correct workspace for your task? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Aborting - switch to correct workspace first!"
    echo ""
    echo "To switch workspaces:"
    echo "  Production: cd /workspace/braingame"
    echo "  Sandbox:    cd /workspace/braingame-claude-sandbox"
    exit 1
fi

echo "✅ Workspace verified - proceed with work"
echo ""
echo "Remember:"
echo "  • Experimental work → Sandbox"
echo "  • Production work → Main"
echo "  • Document your worktree in session notes"