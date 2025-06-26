#!/bin/bash

# Script to run Lighthouse CI locally for testing

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Parse arguments
SITE="${1:-all}"

echo -e "${GREEN}🏠 Running Lighthouse CI Locally${NC}"
echo "================================="

# Check if Lighthouse CI is installed
if ! command -v lhci &> /dev/null; then
    echo -e "${YELLOW}Lighthouse CI not found. Installing...${NC}"
    npm install -g @lhci/cli@0.13.x
fi

# Function to test a site
test_site() {
    local site_name=$1
    local app_dir=$2
    local port=$3
    local config_file=$4
    local start_cmd=$5
    
    echo -e "\n${BLUE}Testing ${site_name}...${NC}"
    
    # Build the site
    echo -e "${YELLOW}Building ${site_name}...${NC}"
    cd "$app_dir"
    pnpm build
    
    # Start the server
    echo -e "${YELLOW}Starting ${site_name} server on port ${port}...${NC}"
    eval "$start_cmd" &
    local SERVER_PID=$!
    
    # Wait for server
    echo -e "${YELLOW}Waiting for server...${NC}"
    npx wait-on "http://localhost:${port}" --timeout 60000
    
    # Run Lighthouse CI
    echo -e "${GREEN}Running Lighthouse CI for ${site_name}...${NC}"
    cd ../..
    lhci autorun --config="$config_file"
    
    # Kill the server
    echo -e "${YELLOW}Stopping ${site_name} server...${NC}"
    kill $SERVER_PID 2>/dev/null || true
    sleep 2
}

# Test based on argument
case $SITE in
    "main"|"main-site")
        test_site "Main Site" "apps/main-site" "3000" "./lighthouse/main-site.config.js" "PORT=3000 npm run start"
        ;;
    "docs"|"docs-site")
        test_site "Docs Site" "apps/docs-site" "3001" "./lighthouse/docs-site.config.js" "PORT=3001 npm run start"
        ;;
    "product"|"product-web")
        test_site "Product Web" "apps/product" "8081" "./lighthouse/product-web.config.js" "npx expo start --web --port 8081"
        ;;
    "all")
        test_site "Main Site" "apps/main-site" "3000" "./lighthouse/main-site.config.js" "PORT=3000 npm run start"
        test_site "Docs Site" "apps/docs-site" "3001" "./lighthouse/docs-site.config.js" "PORT=3001 npm run start"
        test_site "Product Web" "apps/product" "8081" "./lighthouse/product-web.config.js" "npx expo start --web --port 8081"
        ;;
    *)
        echo -e "${RED}Unknown site: $SITE${NC}"
        echo "Usage: $0 [main|docs|product|all]"
        exit 1
        ;;
esac

echo -e "\n${GREEN}✅ Lighthouse CI complete!${NC}"
echo -e "Results saved in .lighthouseci/"