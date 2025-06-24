#!/bin/bash

# Script to run Lighthouse CI locally for testing

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}🏠 Running Lighthouse CI Locally${NC}"
echo "================================="

# Check if Lighthouse CI is installed
if ! command -v lhci &> /dev/null; then
    echo -e "${YELLOW}Lighthouse CI not found. Installing...${NC}"
    npm install -g @lhci/cli@0.13.x
fi

# Build the main site
echo -e "\n${YELLOW}Building main site...${NC}"
cd apps/main-site
pnpm build

# Start the server in the background
echo -e "\n${YELLOW}Starting Next.js server...${NC}"
npm run start &
SERVER_PID=$!

# Wait for server to be ready
echo -e "${YELLOW}Waiting for server to start...${NC}"
npx wait-on http://localhost:3000 --timeout 30000

# Run Lighthouse CI
echo -e "\n${GREEN}Running Lighthouse CI...${NC}"
cd ../..
lhci autorun --config=./lighthouserc.js

# Kill the server
echo -e "\n${YELLOW}Stopping server...${NC}"
kill $SERVER_PID 2>/dev/null || true

echo -e "\n${GREEN}✅ Lighthouse CI complete!${NC}"
echo -e "Results saved in .lighthouseci/"