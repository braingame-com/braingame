#!/bin/bash
# One-command setup script for Brain Game monorepo
# This script ensures a smooth developer onboarding experience

set -e  # Exit on error

echo "🚀 Brain Game Setup Script"
echo "========================="
echo ""

# Function to print colored output
print_status() {
    echo -e "\033[1;34m$1\033[0m"
}

print_success() {
    echo -e "\033[1;32m✅ $1\033[0m"
}

print_error() {
    echo -e "\033[1;31m❌ $1\033[0m"
}

# Check if running from repo root
if [ ! -f "package.json" ] || [ ! -d "apps" ] || [ ! -d "packages" ]; then
    print_error "Please run this script from the repository root"
    exit 1
fi

# Step 1: Check Node version
print_status "1️⃣  Checking Node.js version..."
if command -v nvm &> /dev/null; then
    nvm use
    print_success "Node.js version set via nvm"
else
    # Check if .nvmrc exists and compare versions
    if [ -f ".nvmrc" ]; then
        REQUIRED_NODE=$(cat .nvmrc | tr -d '\n')
        CURRENT_NODE_VERSION=$(node -v | cut -d'v' -f2)
        CURRENT_NODE_MAJOR=$(echo $CURRENT_NODE_VERSION | cut -d'.' -f1)
        
        # Check if major version matches
        if [[ "$CURRENT_NODE_MAJOR" != "$REQUIRED_NODE" ]]; then
            print_error "Node.js version mismatch!"
            echo "Required: v$REQUIRED_NODE.x"
            echo "Current: v$CURRENT_NODE_VERSION"
            echo "Please install nvm and run 'nvm use'"
            echo ""
            echo "To install nvm:"
            echo "  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
            exit 1
        fi
    fi
    print_success "Node.js version OK"
fi

# Step 2: Install pnpm if not present
print_status "2️⃣  Checking pnpm installation..."
if ! command -v pnpm &> /dev/null; then
    print_status "Installing pnpm via corepack..."
    corepack enable
    corepack prepare pnpm@latest --activate
fi
print_success "pnpm is installed"

# Step 3: Install dependencies
print_status "3️⃣  Installing dependencies..."
pnpm install
print_success "Dependencies installed"

# Step 4: Build utility packages first
print_status "4️⃣  Building utility packages..."
pnpm --filter @braingame/config build 2>/dev/null || true
pnpm --filter @braingame/utils build 2>/dev/null || true
pnpm --filter @braingame/bgui build 2>/dev/null || true
print_success "Utility packages built"

# Step 5: Validate environment setup
print_status "5️⃣  Setting up environment files..."
ENV_SETUP_NEEDED=false

# Check for .env files in apps
if [ ! -f "apps/product/.env.local" ] && [ -f "apps/product/.env.example" ]; then
    cp apps/product/.env.example apps/product/.env.local
    ENV_SETUP_NEEDED=true
    print_status "Created apps/product/.env.local from example"
fi

if [ ! -f "apps/main-site/.env.local" ] && [ -f "apps/main-site/.env.example" ]; then
    cp apps/main-site/.env.example apps/main-site/.env.local
    ENV_SETUP_NEEDED=true
    print_status "Created apps/main-site/.env.local from example"
fi

if [ ! -f "apps/docs-site/.env.local" ] && [ -f "apps/docs-site/.env.example" ]; then
    cp apps/docs-site/.env.example apps/docs-site/.env.local
    ENV_SETUP_NEEDED=true
    print_status "Created apps/docs-site/.env.local from example"
fi

if [ "$ENV_SETUP_NEEDED" = true ]; then
    echo ""
    echo "⚠️  Environment files created from examples."
    echo "   Please edit the .env.local files with your actual values:"
    echo "   - apps/product/.env.local"
    echo "   - apps/main-site/.env.local"
    echo "   - apps/docs-site/.env.local"
else
    print_success "Environment files already configured"
fi

# Step 6: Run validation
print_status "6️⃣  Running validation checks..."
if pnpm validate:env 2>/dev/null; then
    print_success "Environment validation passed"
else
    echo "⚠️  Environment validation failed - please check your .env files"
fi

# Step 7: Verify setup
print_status "7️⃣  Verifying setup..."
if pnpm lint --silent; then
    print_success "Linting check passed"
else
    print_error "Linting failed - run 'pnpm lint' to see details"
fi

# Step 8: Git hooks setup
print_status "8️⃣  Setting up git hooks..."
if [ -f ".husky/pre-commit" ]; then
    print_success "Git hooks already configured"
else
    # Simple git hooks setup if husky is not configured
    if [ -d ".git/hooks" ]; then
        if [ -f "scripts/pre-commit.sh" ]; then
            cp scripts/pre-commit.sh .git/hooks/pre-commit
            chmod +x .git/hooks/pre-commit
            print_success "Git pre-commit hook installed"
        fi
    fi
fi

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "Next steps:"
echo "1. Review and update .env.local files if needed"
echo "2. Run 'pnpm dev' to start all applications"
echo "3. Run 'pnpm dev --filter @braingame/product' for specific app"
echo "4. Check out the docs at ./docs/README.md"
echo ""
echo "Useful commands:"
echo "  pnpm dev          - Start all apps"
echo "  pnpm lint         - Lint and format code"
echo "  pnpm test         - Run tests"
echo "  pnpm storybook    - View component library"
echo ""
echo "Happy coding! 🚀"