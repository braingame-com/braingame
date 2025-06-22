#!/bin/bash
cd /Users/jordancrow-stewart/Desktop/code/braingame-claude-sandbox-1/apps/product
echo "Starting Expo dev server with pnpm..."
pnpm run dev --clear 2>&1 | tee expo-output.log