#!/bin/bash

# Automated version of cleanup script for CI/CD or scheduled runs
# Only deletes branches that are:
# 1. Merged into main
# 2. Don't have open PRs
# 3. Older than specified days (default: 30)

set -e

# Configuration
DAYS_OLD=${1:-30}
DRY_RUN=${2:-false}

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🧹 Automated Branch Cleanup${NC}"
echo -e "Settings: Delete branches merged >$DAYS_OLD days ago"
echo -e "Dry run: $DRY_RUN"
echo "========================="

# Get all open PR branches
gh pr list --state open --limit 200 --json headRefName -q '.[].headRefName' > /tmp/open_pr_branches.txt

# Get all merged branches
merged_branches=$(git branch -r --merged main | grep -v HEAD | grep -v main | sed 's/origin\///' | sort)

# Find old merged branches
old_branches=""
while IFS= read -r branch; do
  if [ -z "$branch" ]; then
    continue
  fi
  
  # Skip if has open PR
  if grep -q "^${branch}$" /tmp/open_pr_branches.txt 2>/dev/null; then
    continue
  fi
  
  # Check age of last commit
  last_commit_date=$(git log -1 --format=%ci origin/"$branch" 2>/dev/null || echo "")
  if [ -n "$last_commit_date" ]; then
    # Use portable date calculation that works on both GNU and BSD date
    if date --version >/dev/null 2>&1; then
      # GNU date
      commit_timestamp=$(date -d "$last_commit_date" +%s)
    else
      # BSD date (macOS)
      commit_timestamp=$(date -j -f "%Y-%m-%d %H:%M:%S" "${last_commit_date%% *}" +%s 2>/dev/null || date -j -f "%Y-%m-%d" "${last_commit_date%% *}" +%s)
    fi
    current_timestamp=$(date +%s)
    days_old=$(( (current_timestamp - commit_timestamp) / 86400 ))
    if [ $days_old -gt $DAYS_OLD ]; then
      old_branches="$old_branches$branch:$days_old\n"
    fi
  fi
done <<< "$merged_branches"

# Process deletions
if [ -z "$old_branches" ]; then
  echo -e "${GREEN}✅ No old branches to clean up!${NC}"
  exit 0
fi

echo -e "\n${YELLOW}Found old branches to delete:${NC}"
echo -e "$old_branches" | while IFS=: read -r branch days; do
  [ -z "$branch" ] && continue
  echo -e "  - $branch (${days} days old)"
done

deleted=0
if [ "$DRY_RUN" = "false" ]; then
  echo -e "\n${YELLOW}Deleting branches...${NC}"
  while IFS=: read -r branch days; do
    [ -z "$branch" ] && continue
    if git push origin --delete "$branch" 2>/dev/null; then
      echo -e "${GREEN}✓ Deleted: $branch${NC}"
      deleted=$((deleted + 1))
    fi
  done <<< "$old_branches"
  
  # Prune local tracking
  git remote prune origin
else
  echo -e "\n${YELLOW}DRY RUN - No branches deleted${NC}"
fi

echo -e "\n${GREEN}Complete! Deleted $deleted branches.${NC}"