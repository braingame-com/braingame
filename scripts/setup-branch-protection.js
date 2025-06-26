#!/usr/bin/env node

/**
 * Script to configure GitHub branch protection rules
 * 
 * This script uses the GitHub CLI to set up branch protection
 * for the main branch with recommended settings.
 * 
 * Prerequisites:
 * - GitHub CLI (gh) installed and authenticated
 * - Repository admin permissions
 */

const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const CONFIG_PATH = path.join(__dirname, '../.github/branch-protection.json');

// Check if gh CLI is installed
try {
  execSync('gh --version', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ GitHub CLI (gh) is not installed or not in PATH');
  console.error('Please install it from: https://cli.github.com/');
  process.exit(1);
}

// Check if authenticated
try {
  execSync('gh auth status', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ Not authenticated with GitHub CLI');
  console.error('Run: gh auth login');
  process.exit(1);
}

// Read configuration
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
const mainRule = config.protection_rules.find(rule => rule.branch === 'main');

if (!mainRule) {
  console.error('❌ No configuration found for main branch');
  process.exit(1);
}

console.log('🔐 Setting up branch protection for main branch...\n');

// Build the API payload
const payload = {
  required_status_checks: mainRule.required_status_checks,
  enforce_admins: mainRule.enforce_admins,
  required_pull_request_reviews: mainRule.required_pull_request_reviews,
  restrictions: mainRule.restrictions,
  allow_force_pushes: mainRule.allow_force_pushes,
  allow_deletions: mainRule.allow_deletions,
  block_creations: mainRule.block_creations,
  required_conversation_resolution: mainRule.required_conversation_resolution,
  lock_branch: mainRule.lock_branch,
  allow_fork_syncing: mainRule.allow_fork_syncing
};

// Execute the command
try {
  const cmd = `gh api \
    --method PUT \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    /repos/{owner}/{repo}/branches/main/protection \
    --input -`;
  
  execSync(cmd, {
    input: JSON.stringify(payload),
    stdio: ['pipe', 'inherit', 'inherit']
  });
  
  console.log('\n✅ Branch protection successfully configured!');
  console.log('\nSettings applied:');
  console.log('- Required status checks:', mainRule.required_status_checks.contexts.join(', '));
  console.log('- Required PR reviews:', mainRule.required_pull_request_reviews.required_approving_review_count);
  console.log('- Dismiss stale reviews:', mainRule.required_pull_request_reviews.dismiss_stale_reviews);
  console.log('- Require conversation resolution:', mainRule.required_conversation_resolution);
  console.log('- Enforce for admins:', mainRule.enforce_admins);
  console.log('- Allow force pushes:', mainRule.allow_force_pushes);
  console.log('- Allow deletions:', mainRule.allow_deletions);
  
} catch (error) {
  console.error('\n❌ Failed to configure branch protection');
  console.error('Error:', error.message);
  console.error('\nMake sure you have admin permissions on the repository');
  process.exit(1);
}

console.log('\n📚 View current protection status:');
console.log('gh api /repos/{owner}/{repo}/branches/main/protection');