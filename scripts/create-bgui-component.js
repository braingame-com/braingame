#!/usr/bin/env node

const path = require('node:path');
const { spawnSync } = require('node:child_process');

const componentName = process.argv[2];

if (!componentName) {
  console.error('Usage: node scripts/create-bgui-component.js <ComponentName>');
  console.error("Tip: pnpm --filter @braingame/bgui generate:component <ComponentName>");
  process.exit(1);
}

const generator = path.join(__dirname, '..', 'packages', 'bgui', 'scripts', 'generate-component.js');
const result = spawnSync('node', [generator, componentName], { stdio: 'inherit' });

process.exit(result.status ?? 0);
