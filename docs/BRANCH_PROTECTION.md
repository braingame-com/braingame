# GitHub Branch Protection Guide

## Overview

This guide covers the branch protection rules configured for the braingame repository to ensure code quality and prevent accidental changes to the main branch.

## Protection Rules

### Main Branch Protection

The following rules are enforced on the `main` branch:

#### 1. Pull Request Requirements
- **Required Reviews**: At least 1 approving review required
- **Dismiss Stale Reviews**: Reviews are dismissed when new commits are pushed
- **Conversation Resolution**: All PR conversations must be resolved before merging

#### 2. Status Checks
All of the following checks must pass before merging:
- `build` - Ensures the project builds successfully
- `lint` - Code style and quality checks
- `typecheck` - TypeScript type checking
- `test` - Unit and integration tests
- `security` - Security vulnerability scanning

#### 3. Branch Policies
- **Up-to-date requirement**: Branches must be up to date with main before merging
- **Force pushes**: Not allowed
- **Branch deletion**: Protected from deletion
- **Admin enforcement**: Admins can bypass (for emergency fixes only)

## Setup Instructions

### Automated Setup

Run the setup script to configure branch protection:

```bash
node scripts/setup-branch-protection.js
```

### Manual Setup

1. Go to Settings → Branches in your GitHub repository
2. Click "Add rule" or edit existing rule for `main`
3. Configure the following settings:

   **Branch name pattern**: `main`
   
   **Protect matching branches**:
   - ✅ Require a pull request before merging
     - ✅ Require approvals (1)
     - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require status checks to pass before merging
     - ✅ Require branches to be up to date before merging
     - Select these status checks:
       - build
       - lint
       - typecheck
       - test
       - security
   - ✅ Require conversation resolution before merging
   - ✅ Do not allow bypassing the above settings (uncheck for admin bypass)
   
   **Rules applied to everyone including administrators**: Optional

### Viewing Current Protection

Check current branch protection status:

```bash
gh api /repos/{owner}/{repo}/branches/main/protection
```

## Working with Protected Branches

### Creating Pull Requests

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

3. Push to GitHub:
   ```bash
   git push -u origin feature/your-feature-name
   ```

4. Create a pull request via GitHub UI or CLI:
   ```bash
   gh pr create
   ```

### Handling Failed Checks

If status checks fail:

1. **Build failures**: Fix compilation errors
2. **Lint failures**: Run `pnpm lint` locally
3. **Type failures**: Run `pnpm typecheck` locally
4. **Test failures**: Run `pnpm test` and fix failing tests
5. **Security failures**: Review and fix vulnerabilities

### Emergency Procedures

For critical hotfixes when normal procedures can't be followed:

1. Admin can temporarily disable protection
2. Apply the fix
3. Re-enable protection immediately
4. Create a post-mortem document

## Configuration File

The branch protection configuration is stored in `.github/branch-protection.json` for version control and consistency.

## Best Practices

1. **Always create feature branches** for new work
2. **Keep PRs small and focused** for easier review
3. **Write descriptive PR titles and descriptions**
4. **Address review feedback promptly**
5. **Keep your branch up to date** with main
6. **Run checks locally** before pushing:
   ```bash
   pnpm lint && pnpm typecheck && pnpm test
   ```

## Troubleshooting

### "Branch is out-of-date"
```bash
git checkout main
git pull origin main
git checkout your-branch
git merge main
# or
git rebase main
```

### "Required status checks haven't passed"
- Check the PR page for failing checks
- Click on failing checks for details
- Fix issues locally and push updates

### "Review required"
- Request review from team members
- Ensure PR description is clear
- Address any feedback comments

## Benefits

1. **Code Quality**: Ensures all code meets standards
2. **Stability**: Prevents breaking changes
3. **Collaboration**: Encourages code review
4. **Auditability**: Clear history of changes
5. **Security**: Prevents unauthorized changes