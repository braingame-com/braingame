# NPM Workspace Protocol Compatibility Guide

## Problem Overview

The Brain Game monorepo uses pnpm's `workspace:*` protocol for internal package dependencies. This protocol is not compatible with npm, causing installation failures when developers try to use `npm install`.

### Example of the Issue

```json
{
  "dependencies": {
    "@braingame/bgui": "workspace:*",    // ❌ npm doesn't understand this
    "@braingame/utils": "workspace:*"    // ❌ npm fails here
  }
}
```

### Error Message
```bash
npm ERR! Unsupported URL Type "workspace:": workspace:*
```

## Solutions

### Solution 1: Use pnpm (Recommended)

The project is designed to work with pnpm. Simply use:

```bash
# Install pnpm globally
npm install -g pnpm

# Install dependencies
pnpm install

# Run commands
pnpm dev
pnpm build
pnpm test
```

### Solution 2: Convert for npm Compatibility

If you must use npm, we provide a conversion script:

```bash
# Check which files need conversion
node scripts/fix-npm-workspace-protocol.js check

# Convert workspace protocol to file: protocol
node scripts/fix-npm-workspace-protocol.js fix --file

# Or convert to version references
node scripts/fix-npm-workspace-protocol.js fix
```

#### Conversion Options

1. **File Protocol** (`--file` flag):
   ```json
   "@braingame/bgui": "file:../../packages/bgui"
   ```
   - Good for local development
   - Maintains link to local packages
   - Changes reflect immediately

2. **Version References** (default):
   ```json
   "@braingame/bgui": "^1.0.0"
   ```
   - Good for publishing
   - Requires npm publish of packages
   - More stable but less flexible

### Solution 3: Manual Conversion

For individual packages, manually replace `workspace:*` with:

1. **For local development:**
   ```json
   {
     "dependencies": {
       "@braingame/bgui": "file:../../packages/bgui",
       "@braingame/utils": "file:../../packages/utils"
     }
   }
   ```

2. **For published packages:**
   ```json
   {
     "dependencies": {
       "@braingame/bgui": "^1.0.0",
       "@braingame/utils": "^1.0.0"
     }
   }
   ```

## Why We Use pnpm Workspace Protocol

1. **Automatic Version Management**: Always uses the latest local version
2. **Efficient Storage**: Shared dependencies across workspace
3. **Fast Installations**: Symlinks instead of copies
4. **Better Monorepo Support**: Designed for workspaces

## Prevention Strategies

### For Package Authors

When creating packages that might be used outside the monorepo:

1. **Use Specific Versions in Published Packages**:
   ```json
   {
     "publishConfig": {
       "dependencies": {
         "@braingame/utils": "^1.0.0"
       }
     }
   }
   ```

2. **Document pnpm Requirement**:
   Add to README:
   ```markdown
   ## Installation
   This project requires pnpm:
   \`\`\`bash
   npm install -g pnpm
   pnpm install
   \`\`\`
   ```

3. **Add npm Preinstall Check**:
   ```json
   {
     "scripts": {
       "preinstall": "npx only-allow pnpm"
     }
   }
   ```

### For CI/CD

Ensure CI uses pnpm:

```yaml
# GitHub Actions example
- uses: pnpm/action-setup@v2
  with:
    version: 9

# Or in scripts
- run: npm install -g pnpm
- run: pnpm install
```

## Workspace Protocol Reference

| Protocol | Example | Description | npm Support |
|----------|---------|-------------|-------------|
| `workspace:*` | `"@pkg": "workspace:*"` | Any version from workspace | ❌ No |
| `workspace:^` | `"@pkg": "workspace:^"` | Compatible version from workspace | ❌ No |
| `workspace:~` | `"@pkg": "workspace:~"` | Approximate version from workspace | ❌ No |
| `file:` | `"@pkg": "file:../pkg"` | Local file path | ✅ Yes |
| `^1.0.0` | `"@pkg": "^1.0.0"` | Semver range | ✅ Yes |

## Troubleshooting

### Issue: npm install fails with workspace protocol error
**Solution**: Run the conversion script or use pnpm

### Issue: Changes in local packages not reflecting
**Solution**: If using version references, switch to file: protocol

### Issue: CI/CD failing with npm
**Solution**: Update CI to use pnpm (see CI/CD section)

### Issue: Package publishing fails
**Solution**: Ensure published packages don't contain workspace: protocol

## Best Practices

1. **Commit Original Files**: Don't commit converted package.json files
2. **Use pnpm for Development**: It's the intended package manager
3. **Document Requirements**: Clear README instructions
4. **Test Both**: If supporting npm, test with both pnpm and npm
5. **Automate Conversion**: Use the script in CI if needed

## Script Usage Reference

```bash
# Check for issues
node scripts/fix-npm-workspace-protocol.js check

# Fix with file protocol (for development)
node scripts/fix-npm-workspace-protocol.js fix --file

# Fix with versions (for publishing)
node scripts/fix-npm-workspace-protocol.js fix

# Create backups before fixing
node scripts/fix-npm-workspace-protocol.js fix --backup

# After conversion
npm install  # Now works!
```

## Summary

While the Brain Game monorepo is optimized for pnpm, we provide tools and guidance for npm compatibility when needed. The recommended approach is to use pnpm for the best development experience.