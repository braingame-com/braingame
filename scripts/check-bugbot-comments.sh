#!/bin/bash

# Script to check all PRs (open and closed) for BugBot comments
# Saves results to docs/prompts/output for later analysis

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Output directory
OUTPUT_DIR="docs/prompts/output"
mkdir -p "$OUTPUT_DIR"

# Output files
OPEN_PR_FILE="$OUTPUT_DIR/bugbot-open-prs-$(date +%Y%m%d-%H%M%S).md"
CLOSED_PR_FILE="$OUTPUT_DIR/bugbot-closed-prs-$(date +%Y%m%d-%H%M%S).md"
SUMMARY_FILE="$OUTPUT_DIR/bugbot-summary-$(date +%Y%m%d-%H%M%S).md"

echo -e "${BLUE}🤖 Checking all PRs for BugBot comments...${NC}"
echo "================================================"

# Function to extract BugBot comments from a PR
check_pr_for_bugbot() {
    local pr_number=$1
    local pr_title=$2
    local pr_state=$3
    
    echo -e "${YELLOW}Checking PR #${pr_number}: ${pr_title}${NC}"
    
    # Get all comments and filter for BugBot
    local bugbot_comments=$(gh pr view "$pr_number" --comments 2>/dev/null | awk '/author:.*bugbot-cursor/,/^author:|^$/' | grep -v "^author:" | grep -v "^$" || true)
    
    if [ -n "$bugbot_comments" ]; then
        # Check if there are actual bug reports in the comments
        local has_bugs=$(echo "$bugbot_comments" | grep -E "(Bug:|<summary>.*Bug.*</summary>)" || true)
        
        if [ -n "$has_bugs" ]; then
            echo -e "${RED}  ⚠️  Found BugBot issues${NC}"
            
            # Extract bug summaries
            local bug_count=$(echo "$bugbot_comments" | grep -c "<summary>" || echo "0")
            echo "  📊 Number of bugs reported: $bug_count"
            
            # Write to appropriate file
            if [ "$pr_state" = "OPEN" ]; then
                echo "## PR #${pr_number}: ${pr_title}" >> "$OPEN_PR_FILE"
                echo "" >> "$OPEN_PR_FILE"
                echo "$bugbot_comments" >> "$OPEN_PR_FILE"
                echo "" >> "$OPEN_PR_FILE"
                echo "---" >> "$OPEN_PR_FILE"
                echo "" >> "$OPEN_PR_FILE"
            else
                echo "## PR #${pr_number}: ${pr_title}" >> "$CLOSED_PR_FILE"
                echo "" >> "$CLOSED_PR_FILE"
                echo "$bugbot_comments" >> "$CLOSED_PR_FILE"
                echo "" >> "$CLOSED_PR_FILE"
                echo "---" >> "$CLOSED_PR_FILE"
                echo "" >> "$CLOSED_PR_FILE"
            fi
            
            return 0
        else
            echo -e "${GREEN}  ✅ No active bugs found${NC}"
            return 1
        fi
    else
        echo "  ℹ️  No BugBot comments found"
        return 1
    fi
}

# Initialize files
echo "# BugBot Comments in Open PRs" > "$OPEN_PR_FILE"
echo "Generated on: $(date)" >> "$OPEN_PR_FILE"
echo "" >> "$OPEN_PR_FILE"

echo "# BugBot Comments in Closed PRs" > "$CLOSED_PR_FILE"
echo "Generated on: $(date)" >> "$CLOSED_PR_FILE"
echo "" >> "$CLOSED_PR_FILE"

# Check open PRs
echo -e "\n${BLUE}📂 Checking OPEN PRs...${NC}"
echo "========================"

open_pr_count=0
open_pr_with_bugs=0

while IFS=$'\t' read -r number title; do
    if check_pr_for_bugbot "$number" "$title" "OPEN"; then
        ((open_pr_with_bugs++))
    fi
    ((open_pr_count++))
done < <(gh pr list --state open --limit 100 --json number,title | jq -r '.[] | [.number, .title] | @tsv')

# Check closed PRs (recent ones)
echo -e "\n${BLUE}📁 Checking CLOSED PRs (last 30 days)...${NC}"
echo "=========================================="

closed_pr_count=0
closed_pr_with_bugs=0

while IFS=$'\t' read -r number title; do
    if check_pr_for_bugbot "$number" "$title" "CLOSED"; then
        ((closed_pr_with_bugs++))
    fi
    ((closed_pr_count++))
done < <(gh pr list --state closed --limit 50 --json number,title,closedAt | jq -r --arg date "$(date -d '30 days ago' '+%Y-%m-%d' 2>/dev/null || date -v-30d '+%Y-%m-%d')" '.[] | select(.closedAt >= $date) | [.number, .title] | @tsv')

# Generate summary
echo "# BugBot Analysis Summary" > "$SUMMARY_FILE"
echo "Generated on: $(date)" >> "$SUMMARY_FILE"
echo "" >> "$SUMMARY_FILE"
echo "## Overview" >> "$SUMMARY_FILE"
echo "" >> "$SUMMARY_FILE"
echo "- **Open PRs checked**: $open_pr_count" >> "$SUMMARY_FILE"
echo "- **Open PRs with BugBot issues**: $open_pr_with_bugs" >> "$SUMMARY_FILE"
echo "- **Closed PRs checked**: $closed_pr_count" >> "$SUMMARY_FILE"
echo "- **Closed PRs with BugBot issues**: $closed_pr_with_bugs" >> "$SUMMARY_FILE"
echo "" >> "$SUMMARY_FILE"
echo "## File Locations" >> "$SUMMARY_FILE"
echo "" >> "$SUMMARY_FILE"
echo "- Open PR issues: \`$OPEN_PR_FILE\`" >> "$SUMMARY_FILE"
echo "- Closed PR issues: \`$CLOSED_PR_FILE\`" >> "$SUMMARY_FILE"
echo "" >> "$SUMMARY_FILE"

# Display summary
echo -e "\n${GREEN}✅ Analysis Complete!${NC}"
echo "===================="
echo -e "${BLUE}Summary:${NC}"
echo "- Open PRs checked: $open_pr_count"
echo "- Open PRs with BugBot issues: $open_pr_with_bugs"
echo "- Closed PRs checked: $closed_pr_count"
echo "- Closed PRs with BugBot issues: $closed_pr_with_bugs"
echo ""
echo -e "${BLUE}Results saved to:${NC}"
echo "- Summary: $SUMMARY_FILE"
echo "- Open PR issues: $OPEN_PR_FILE"
echo "- Closed PR issues: $CLOSED_PR_FILE"

# If there are open PRs with bugs, show a warning
if [ $open_pr_with_bugs -gt 0 ]; then
    echo ""
    echo -e "${RED}⚠️  WARNING: There are $open_pr_with_bugs open PRs with unresolved BugBot issues!${NC}"
    echo -e "${YELLOW}Check $OPEN_PR_FILE for details.${NC}"
fi