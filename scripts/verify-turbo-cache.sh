#!/bin/bash
# Script to verify Turbo remote cache configuration

echo "🔍 Turbo Remote Cache Verification"
echo "=================================="
echo ""

# Function to print colored output
print_success() {
    echo -e "\033[1;32m✅ $1\033[0m"
}

print_error() {
    echo -e "\033[1;31m❌ $1\033[0m"
}

print_warning() {
    echo -e "\033[1;33m⚠️  $1\033[0m"
}

print_info() {
    echo -e "\033[1;34mℹ️  $1\033[0m"
}

# Check if environment variables are set
echo "1️⃣  Checking environment variables..."
if [ -n "$TURBO_TOKEN" ]; then
    print_success "TURBO_TOKEN is set (hidden for security)"
else
    print_error "TURBO_TOKEN is not set"
    echo "   Set it in your shell profile or .env.local file"
fi

if [ -n "$TURBO_TEAM" ]; then
    print_success "TURBO_TEAM is set: $TURBO_TEAM"
else
    print_warning "TURBO_TEAM is not set (optional for personal use)"
fi

echo ""

# Check Turbo version
echo "2️⃣  Checking Turbo installation..."
# Check both global and local installations
TURBO_CMD=""
if command -v turbo &> /dev/null; then
    TURBO_CMD="turbo"
    TURBO_VERSION=$(turbo --version 2>/dev/null | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+' || echo "unknown")
    print_success "Turbo is installed globally: v$TURBO_VERSION"
elif [ -x "./node_modules/.bin/turbo" ]; then
    TURBO_CMD="./node_modules/.bin/turbo"
    TURBO_VERSION=$(./node_modules/.bin/turbo --version 2>/dev/null | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+' || echo "unknown")
    print_success "Turbo is installed locally: v$TURBO_VERSION"
else
    print_error "Turbo is not installed"
    echo "   Run: pnpm install"
    exit 1
fi

echo ""

# Test cache connection
echo "3️⃣  Testing remote cache connection..."
if [ -n "$TURBO_TOKEN" ]; then
    # Create a temporary test task
    echo "   Running a test build with --dry-run..."
    if pnpm $TURBO_CMD run build --dry-run --filter=@braingame/config 2>&1 | grep -q "Remote caching"; then
        print_success "Remote cache is accessible"
    else
        print_warning "Could not verify remote cache access"
        echo "   This might be normal if you haven't run any builds yet"
    fi
else
    print_warning "Skipping connection test (no token set)"
fi

echo ""

# Show cache statistics
echo "4️⃣  Cache statistics..."
if [ -d ".turbo" ]; then
    LOCAL_CACHE_SIZE=$(du -sh .turbo 2>/dev/null | cut -f1)
    print_info "Local cache size: $LOCAL_CACHE_SIZE"
    
    # Count cache entries
    CACHE_ENTRIES=$(find .turbo -name "*.json" 2>/dev/null | wc -l | tr -d ' ')
    print_info "Local cache entries: $CACHE_ENTRIES"
else
    print_info "No local cache found (run a build first)"
fi

echo ""

# Provide next steps
echo "📝 Next Steps:"
if [ -z "$TURBO_TOKEN" ]; then
    echo "1. Get your Vercel access token from: https://vercel.com/account/tokens"
    echo "2. Add to your shell profile:"
    echo "   export TURBO_TOKEN=\"your-token-here\""
    echo "   export TURBO_TEAM=\"your-team-slug\""
    echo "3. Run: source ~/.zshrc (or ~/.bashrc)"
    echo "4. Run this script again to verify"
else
    echo "1. Run a build to test caching: pnpm build"
    echo "2. Run again to use cache: pnpm build"
    echo "3. Check speed improvement!"
fi

echo ""
echo "📚 Documentation: docs/development/TURBO_REMOTE_CACHING.md"