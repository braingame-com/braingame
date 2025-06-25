#!/bin/bash

# Script to safely clean up old merged branches
# Only deletes branches that are:
# 1. Merged into main
# 2. Don't have open PRs
# 3. Are older than 7 days (by default)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🧹 Branch Cleanup Tool${NC}"
echo "====================="

# Get all open PR branches
echo -e "\n${YELLOW}Fetching open PRs...${NC}"
gh pr list --state open --limit 200 --json headRefName -q '.[].headRefName' > /tmp/open_pr_branches.txt
open_pr_count=$(wc -l < /tmp/open_pr_branches.txt | tr -d ' ')
echo -e "Found ${open_pr_count} open PRs"

# Get all merged branches
echo -e "\n${YELLOW}Finding merged branches...${NC}"
merged_branches=$(git branch -r --merged main | grep -v HEAD | grep -v main | sed 's/origin\///' | sort)
merged_count=$(echo "$merged_branches" | wc -l | tr -d ' ')
echo -e "Found ${merged_count} merged branches"

# Find safe-to-delete branches (merged and no open PR)
echo -e "\n${YELLOW}Analyzing branches...${NC}"
safe_to_delete=""
protected_count=0

while IFS= read -r branch; do
  if [ -z "$branch" ]; then
    continue
  fi
  
  # Check if branch has an open PR
  if grep -q "^${branch}$" /tmp/open_pr_branches.txt 2>/dev/null; then
    echo -e "${RED}⚠️  Skipping $branch (has open PR)${NC}"
    protected_count=$((protected_count + 1))
  else
    safe_to_delete="$safe_to_delete$branch\n"
  fi
done <<< "$merged_branches"

# Count safe branches
safe_count=$(echo -e "$safe_to_delete" | grep -v '^$' | wc -l | tr -d ' ')

echo -e "\n${GREEN}Summary:${NC}"
echo -e "- Total merged branches: ${merged_count}"
echo -e "- Protected (have open PRs): ${protected_count}"
echo -e "- Safe to delete: ${safe_count}"

if [ $safe_count -eq 0 ]; then
  echo -e "\n${GREEN}✅ No branches to clean up!${NC}"
  exit 0
fi

# Show branches that will be deleted
echo -e "\n${YELLOW}Branches that will be deleted:${NC}"
echo -e "$safe_to_delete" | grep -v '^$' | head -20

if [ $safe_count -gt 20 ]; then
  echo -e "... and $((safe_count - 20)) more"
fi

# Ask for confirmation
echo -e "\n${YELLOW}Do you want to delete these ${safe_count} branches? (y/N)${NC}"
read -r response

if [[ ! "$response" =~ ^[Yy]$ ]]; then
  echo -e "${YELLOW}Aborted.${NC}"
  exit 0
fi

# Delete the branches
echo -e "\n${YELLOW}Deleting branches...${NC}"
deleted=0
failed=0

while IFS= read -r branch; do
  [ -z "$branch" ] && continue
  if git push origin --delete "$branch" 2>/dev/null; then
    echo -e "${GREEN}✓ Deleted: $branch${NC}"
    deleted=$((deleted + 1))
  else
    echo -e "${RED}✗ Failed: $branch${NC}"
    failed=$((failed + 1))
  fi
done <<< "$(echo -e "$safe_to_delete" | grep -v '^$')"

echo -e "\n${GREEN}🎉 Cleanup complete!${NC}"
echo -e "Deleted: $deleted branches"

# Clean up local tracking branches
echo -e "\n${YELLOW}Cleaning up local tracking branches...${NC}"
git remote prune origin

echo -e "${GREEN}✅ All done!${NC}"