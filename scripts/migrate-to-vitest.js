#!/usr/bin/env node

/**
 * Migration script to clean up Jest configuration and standardize on Vitest
 * 
 * This script:
 * 1. Removes Jest configuration files
 * 2. Removes Jest dependencies from package.json
 * 3. Updates test scripts to use Vitest
 * 4. Ensures all packages use consistent testing setup
 */

const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

console.log('🔄 Starting Jest to Vitest migration...\n');

// Packages to check
const packages = [
  { name: 'bgui', path: path.join(__dirname, '../packages/bgui') },
  { name: 'utils', path: path.join(__dirname, '../packages/utils') },
  { name: 'product', path: path.join(__dirname, '../apps/product') }
];

// Jest-related dependencies to remove
const jestDependencies = [
  'jest',
  'ts-jest',
  '@types/jest',
  'babel-jest',
  '@testing-library/jest-native',
  'jest-expo',
  'jest-environment-jsdom'
];

// Files to remove
const jestFiles = [
  'jest.config.js',
  'jest.config.ts',
  'jest.config.mjs',
  'jest.config.cjs',
  'jest-setup.js',
  'jest-setup.ts',
  'setupTests.js',
  'setupTests.ts'
];

function removeJestFiles(pkgPath) {
  console.log(`📁 Checking ${pkgPath} for Jest files...`);
  
  jestFiles.forEach(file => {
    const filePath = path.join(pkgPath, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`  ✅ Removed ${file}`);
    }
  });
}

function updatePackageJson(pkgPath, pkgName) {
  const packageJsonPath = path.join(pkgPath, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.log(`  ⚠️  No package.json found in ${pkgName}`);
    return;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  let modified = false;
  
  // Update test scripts
  if (packageJson.scripts) {
    const scripts = packageJson.scripts;
    
    // Update Jest scripts to Vitest
    if (scripts.test && scripts.test.includes('jest')) {
      scripts.test = 'vitest run';
      modified = true;
    }
    
    if (scripts['test:watch'] && scripts['test:watch'].includes('jest')) {
      scripts['test:watch'] = 'vitest';
      modified = true;
    }
    
    if (scripts['test:coverage'] && scripts['test:coverage'].includes('jest')) {
      scripts['test:coverage'] = 'vitest run --coverage';
      modified = true;
    }
    
    // Remove any Jest-specific scripts
    Object.keys(scripts).forEach(key => {
      if (key.includes('jest') && !key.includes('test')) {
        delete scripts[key];
        modified = true;
      }
    });
  }
  
  // Remove Jest dependencies
  ['devDependencies', 'dependencies'].forEach(depType => {
    if (packageJson[depType]) {
      jestDependencies.forEach(dep => {
        if (packageJson[depType][dep]) {
          delete packageJson[depType][dep];
          console.log(`  ✅ Removed ${dep} from ${depType}`);
          modified = true;
        }
      });
    }
  });
  
  // Ensure Vitest is in devDependencies
  if (!packageJson.devDependencies) {
    packageJson.devDependencies = {};
  }
  
  if (!packageJson.devDependencies.vitest) {
    packageJson.devDependencies.vitest = '^3.2.4';
    packageJson.devDependencies['@vitest/ui'] = '^3.2.4';
    packageJson.devDependencies['@vitest/coverage-v8'] = '^3.2.4';
    modified = true;
    console.log('  ✅ Added Vitest dependencies');
  }
  
  if (modified) {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`  ✅ Updated package.json for ${pkgName}`);
  }
}

function createVitestConfig(pkgPath, pkgName) {
  const vitestConfigPath = path.join(pkgPath, 'vitest.config.ts');
  
  // Skip if already exists
  if (fs.existsSync(vitestConfigPath)) {
    console.log(`  ℹ️  vitest.config.ts already exists in ${pkgName}`);
    return;
  }
  
  // Different configs for different package types
  let config = '';
  
  if (pkgName === 'product') {
    // React Native app config
    config = `import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
});
`;
  } else if (pkgName === 'bgui') {
    // Component library - already has config, skip
    return;
  } else {
    // Generic package config
    config = `import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
});
`;
  }
  
  fs.writeFileSync(vitestConfigPath, config);
  console.log(`  ✅ Created vitest.config.ts for ${pkgName}`);
}

// Main migration process
async function migrate() {
  for (const pkg of packages) {
    console.log(`\n🔧 Processing ${pkg.name}...`);
    
    if (!fs.existsSync(pkg.path)) {
      console.log(`  ⚠️  Package path not found: ${pkg.path}`);
      continue;
    }
    
    // Remove Jest files
    removeJestFiles(pkg.path);
    
    // Update package.json
    updatePackageJson(pkg.path, pkg.name);
    
    // Create Vitest config if needed
    createVitestConfig(pkg.path, pkg.name);
  }
  
  console.log('\n📦 Installing dependencies...');
  try {
    execSync('pnpm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed');
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
  }
  
  console.log('\n✅ Migration complete!');
  console.log('\nNext steps:');
  console.log('1. Review and update any test files that use Jest-specific APIs');
  console.log('2. Update any CI/CD configurations to use Vitest commands');
  console.log('3. Run `pnpm test` to verify tests are working');
}

// Run migration
migrate().catch(error => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});