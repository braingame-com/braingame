# Turbo Remote Caching Setup Guide

This guide helps you enable Turbo remote caching to speed up builds across team members and CI/CD pipelines.

## 🚀 Benefits

- **Faster CI builds** - Reuse build outputs across pull requests
- **Team collaboration** - Share cache between developers
- **Reduced build times** - Skip rebuilding unchanged packages
- **Cost savings** - Less CI compute time

## 📋 Prerequisites

1. Vercel account (free tier works)
2. Repository admin access (to add secrets)
3. Turborepo CLI installed locally

## 🔧 Setup Instructions

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com) and sign up
2. Create a new team or use your personal account

### Step 2: Generate Access Token

1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Name it "braingame-turbo-cache"
4. Select appropriate scope (usually your team)
5. Copy the generated token

### Step 3: Configure Local Development

Add to your shell profile (`.bashrc`, `.zshrc`, etc.):

```bash
# Turbo Remote Cache
export TURBO_TOKEN="your-token-here"
export TURBO_TEAM="your-team-slug"  # Found in Vercel team settings
```

Or create a `.env.local` file in the project root:

```bash
TURBO_TOKEN=your-token-here
TURBO_TEAM=your-team-slug
```

### Step 4: Configure GitHub Actions

Add these secrets to your GitHub repository:

1. Go to Settings → Secrets and variables → Actions
2. Add new repository secrets:
   - `TURBO_TOKEN` - Your Vercel access token
   - `TURBO_TEAM` - Your team slug

### Step 5: Enable in CI Workflows

The workflows are already configured to use these secrets when available:

```yaml
# .github/workflows/ci.yml
env:
  TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
  TURBO_TEAM: ${{ secrets.TURBO_TEAM }}
```

## 🎯 Usage

### Local Development

Once configured, Turbo will automatically:
- Upload cache artifacts after successful builds
- Download existing cache before building
- Skip rebuilding unchanged packages

```bash
# Normal commands now use remote cache
pnpm build
pnpm lint
pnpm test
```

### Monitoring Cache Usage

```bash
# View cache statistics
turbo run build --dry-run

# Force cache miss (rebuild everything)
turbo run build --force

# See what would be cached
turbo run build --dry-run=json
```

### Team Onboarding

New team members should:
1. Get added to the Vercel team
2. Generate their own access token
3. Configure their local environment
4. Run `pnpm build` to test cache access

## 🔒 Security Best Practices

1. **Token Rotation** - Rotate tokens every 90 days
2. **Minimal Scope** - Use team-specific tokens, not personal
3. **No Commits** - Never commit tokens to version control
4. **CI Only** - Consider read-only tokens for CI

## 🚨 Troubleshooting

### "Unauthorized" Error
- Verify token is valid and not expired
- Check team slug is correct
- Ensure you're a member of the team

### Cache Misses
- Check if `turbo.json` was modified
- Verify package.json dependencies match
- Look for environment-specific code

### Slow Uploads
- Large build outputs can slow caching
- Consider excluding unnecessary files
- Check network connection

### CI Not Using Cache
- Verify GitHub secrets are set
- Check workflow has env variables
- Look at Turbo logs for errors

## 📊 Measuring Impact

Track improvements with:

```bash
# Before remote cache
time pnpm build

# After remote cache (second run)
time pnpm build
```

Typical improvements:
- CI builds: 50-70% faster
- Local builds: 30-50% faster
- Monorepo operations: 60-80% faster

## 🔗 Resources

- [Turbo Remote Caching Docs](https://turbo.build/docs/core-concepts/remote-caching)
- [Vercel Remote Cache](https://vercel.com/docs/monorepos/remote-caching)
- [Security Best Practices](https://turbo.build/docs/core-concepts/remote-caching#security-considerations)

## 📝 Configuration Reference

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `TURBO_TOKEN` | Vercel access token | Yes |
| `TURBO_TEAM` | Team slug from Vercel | Yes |
| `TURBO_API` | Custom cache API URL | No |
| `TURBO_REMOTE_CACHE_TIMEOUT` | Timeout in seconds | No |

### turbo.json Options

```json
{
  "remoteCache": {
    "signature": true  // Verify cache artifacts
  }
}
```