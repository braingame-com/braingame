#!/bin/bash

# Script to run Reassure performance tests locally

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${GREEN}📱 Running React Native Performance Tests${NC}"
echo "========================================="

# Check if we're in the root directory
if [ ! -f "package.json" ] || [ ! -d "apps/product" ]; then
    echo -e "${RED}Error: Please run this script from the project root${NC}"
    exit 1
fi

# Parse arguments
MODE="${1:-compare}"

case $MODE in
    "baseline")
        echo -e "\n${BLUE}Generating baseline measurements...${NC}"
        cd apps/product
        pnpm reassure:baseline
        echo -e "\n${GREEN}✅ Baseline generated successfully!${NC}"
        echo -e "Baseline saved in apps/product/.reassure/"
        ;;
    
    "compare")
        echo -e "\n${BLUE}Running performance comparison...${NC}"
        cd apps/product
        
        # Check if baseline exists
        if [ ! -f ".reassure/baseline.json" ]; then
            echo -e "${YELLOW}No baseline found. Generating baseline first...${NC}"
            pnpm reassure:baseline
        fi
        
        # Run comparison
        pnpm reassure
        
        # Check if output exists
        if [ -f ".reassure/output.md" ]; then
            echo -e "\n${GREEN}✅ Performance test complete!${NC}"
            echo -e "\n${BLUE}Results:${NC}"
            cat .reassure/output.md
        else
            echo -e "\n${YELLOW}No performance changes detected${NC}"
        fi
        ;;
    
    "test")
        echo -e "\n${BLUE}Running performance test suite...${NC}"
        cd apps/product
        pnpm test:perf
        echo -e "\n${GREEN}✅ Performance tests passed!${NC}"
        ;;
    
    *)
        echo -e "${RED}Unknown mode: $MODE${NC}"
        echo "Usage: $0 [baseline|compare|test]"
        echo "  baseline - Generate baseline measurements"
        echo "  compare  - Compare current branch against baseline (default)"
        echo "  test     - Run performance test suite only"
        exit 1
        ;;
esac