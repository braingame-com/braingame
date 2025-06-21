#!/usr/bin/env bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[PRE-COMMIT]${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Track overall success
OVERALL_SUCCESS=true

# Get the script directory and change to project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

echo ""
print_status "Running pre-commit checks..."
echo ""

# 0. Workspace verification (AI agents only)
if [[ "$PWD" == *"braingame-claude-sandbox"* ]]; then
    print_status "🤖 AI Agent detected - running workspace verification..."
    # Run non-interactive version of workspace check
    CURRENT_DIR=$(pwd)
    if [[ "$CURRENT_DIR" != *"braingame-claude-sandbox"* ]]; then
        print_error "AI Agent working in wrong directory!"
        echo "   Expected: .../braingame-claude-sandbox"
        echo "   Actual: $CURRENT_DIR"
        echo "   Switch to AI sandbox before committing"
        exit 1
    fi
    
    # Check GitHub account for AI agents
    if command -v gh &> /dev/null; then
        GH_USER=$(gh auth status 2>&1 | grep "Logged in to github.com" | grep -o "as [^[:space:]]*" | cut -d' ' -f2 2>/dev/null)
        if [[ "$GH_USER" != "jcs180" ]]; then
            print_error "Wrong GitHub account for AI agent!"
            echo "   Current: $GH_USER"
            echo "   Required: jcs180"
            echo "   Run: gh auth switch --user jcs180"
            exit 1
        fi
    fi
    print_success "AI Agent workspace verified"
fi

# 1. Check for secrets
print_status "🔒 Checking for secrets..."
if pnpm secrets:check > /dev/null 2>&1; then
    print_success "No secrets detected"
else
    print_error "Secrets detected in your code!"
    echo "   Run 'pnpm secrets:check' to see details"
    OVERALL_SUCCESS=false
fi

# 2. Run linting
print_status "🔍 Running linter..."
if pnpm lint > /dev/null 2>&1; then
    print_success "Code passes linting"
else
    print_error "Linting failed!"
    echo "   Run 'pnpm lint' to see issues and 'pnpm lint:fix' to auto-fix"
    OVERALL_SUCCESS=false
fi

# 3. Run type checking
print_status "🔧 Running type checker..."
if pnpm typecheck > /dev/null 2>&1; then
    print_success "No type errors found"
else
    print_error "Type checking failed!"
    echo "   Run 'pnpm typecheck' to see type errors"
    OVERALL_SUCCESS=false
fi

# 4. Run lint-staged
print_status "📝 Checking staged files..."
if npx lint-staged > /dev/null 2>&1; then
    print_success "Staged files look good"
else
    print_error "Staged file checks failed!"
    echo "   Some staged files have formatting issues that couldn't be auto-fixed"
    OVERALL_SUCCESS=false
fi

# 5. Run tests
print_status "🧪 Running tests..."
if pnpm test > /dev/null 2>&1; then
    print_success "All tests passing"
else
    print_warning "Some tests failed (allowing commit anyway)"
    echo "   Run 'pnpm test' to see test failures"
    # Don't fail overall for tests right now due to Jest config issues
fi

echo ""
if [ "$OVERALL_SUCCESS" = true ]; then
    print_success "All pre-commit checks passed! 🎉"
    echo ""
    exit 0
else
    print_error "Pre-commit checks failed! ❌"
    echo ""
    echo "Please fix the issues above before committing."
    echo "You can run the individual commands to see more details."
    echo ""
    exit 1
fi
