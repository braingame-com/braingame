#!/bin/bash

# check-workspace.sh - Pre-flight workspace verification for AI agents
# Prevents workspace contamination incidents by ensuring correct environment setup

echo "🤖 AI Agent Workspace Pre-Flight Check"
echo "======================================"
echo

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Error flag
ERRORS=0

# Check 1: Current directory
echo -e "${BLUE}📍 Checking current directory...${NC}"
CURRENT_DIR=$(pwd)
echo "   Current: $CURRENT_DIR"

if [[ "$CURRENT_DIR" == *"braingame-claude-sandbox"* ]]; then
    echo -e "   ${GREEN}✅ Correct: AI agent sandbox${NC}"
elif [[ "$CURRENT_DIR" == *"braingame"* ]] && [[ "$CURRENT_DIR" != *"braingame-claude-sandbox"* ]]; then
    echo -e "   ${RED}❌ WRONG: Main production directory!${NC}"
    echo -e "   ${YELLOW}   Switch to: /Users/jordancrow-stewart/Desktop/code/braingame-claude-sandbox${NC}"
    ERRORS=1
else
    echo -e "   ${RED}❌ UNKNOWN: Unrecognized directory${NC}"
    ERRORS=1
fi
echo

# Check 2: Git worktree status
echo -e "${BLUE}🌳 Checking git worktrees...${NC}"
if command -v git &> /dev/null; then
    if git rev-parse --git-dir > /dev/null 2>&1; then
        git worktree list | while read -r line; do
            echo "   $line"
        done
        echo -e "   ${GREEN}✅ Git worktrees available${NC}"
    else
        echo -e "   ${RED}❌ Not in a git repository${NC}"
        ERRORS=1
    fi
else
    echo -e "   ${RED}❌ Git not available${NC}"
    ERRORS=1
fi
echo

# Check 3: Current branch
echo -e "${BLUE}🔀 Checking current branch...${NC}"
if git rev-parse --git-dir > /dev/null 2>&1; then
    CURRENT_BRANCH=$(git branch --show-current)
    echo "   Branch: $CURRENT_BRANCH"
    if [[ "$CURRENT_BRANCH" == "main" ]]; then
        echo -e "   ${YELLOW}⚠️  On main branch - create feature branch for work${NC}"
    else
        echo -e "   ${GREEN}✅ On feature branch${NC}"
    fi
else
    echo -e "   ${RED}❌ Cannot determine branch${NC}"
    ERRORS=1
fi
echo

# Check 4: GitHub authentication
echo -e "${BLUE}🔑 Checking GitHub authentication...${NC}"
if command -v gh &> /dev/null; then
    GH_USER=$(gh auth status 2>&1 | grep "Logged in to github.com" | grep -o "as [^[:space:]]*" | cut -d' ' -f2 2>/dev/null)
    if [[ -n "$GH_USER" ]]; then
        echo "   GitHub user: $GH_USER"
        if [[ "$GH_USER" == "jcs180" ]]; then
            echo -e "   ${GREEN}✅ Correct GitHub account${NC}"
        else
            echo -e "   ${RED}❌ WRONG GitHub account! Must be jcs180${NC}"
            echo -e "   ${YELLOW}   Run: gh auth switch --user jcs180${NC}"
            ERRORS=1
        fi
    else
        echo -e "   ${RED}❌ Not logged into GitHub${NC}"
        echo -e "   ${YELLOW}   Run: gh auth login${NC}"
        ERRORS=1
    fi
else
    echo -e "   ${RED}❌ GitHub CLI not available${NC}"
    ERRORS=1
fi
echo

# Check 5: Git status
echo -e "${BLUE}📝 Checking git status...${NC}"
if git rev-parse --git-dir > /dev/null 2>&1; then
    GIT_STATUS=$(git status --porcelain)
    if [[ -z "$GIT_STATUS" ]]; then
        echo -e "   ${GREEN}✅ Working directory clean${NC}"
    else
        echo -e "   ${YELLOW}⚠️  Uncommitted changes:${NC}"
        git status --short | while read -r line; do
            echo "      $line"
        done
    fi
else
    echo -e "   ${RED}❌ Cannot check git status${NC}"
    ERRORS=1
fi
echo

# Check 6: Required tools
echo -e "${BLUE}🛠️  Checking required tools...${NC}"
TOOLS=("node" "pnpm" "git" "gh")
for tool in "${TOOLS[@]}"; do
    if command -v "$tool" &> /dev/null; then
        VERSION=$($tool --version 2>/dev/null | head -n1)
        echo -e "   ${GREEN}✅ $tool${NC} - $VERSION"
    else
        echo -e "   ${RED}❌ $tool not found${NC}"
        ERRORS=1
    fi
done
echo

# Final result
echo "======================================"
if [[ $ERRORS -eq 0 ]]; then
    echo -e "${GREEN}🎉 ALL CHECKS PASSED!${NC}"
    echo -e "${GREEN}✅ Safe to proceed with AI agent work${NC}"
    echo
    echo -e "${BLUE}📋 Quick reminder:${NC}"
    echo "   • Work in feature branches, not main"
    echo "   • Commit frequently with clear messages"
    echo "   • Push to origin when ready for review"
    echo "   • Document your work in session notes"
    exit 0
else
    echo -e "${RED}❌ ISSUES DETECTED!${NC}"
    echo -e "${RED}🚫 DO NOT PROCEED until all issues are resolved${NC}"
    echo
    echo -e "${YELLOW}📋 Action items:${NC}"
    echo "   1. Fix all red ❌ issues above"
    echo "   2. Re-run this script"
    echo "   3. Only proceed when all checks pass"
    exit 1
fi