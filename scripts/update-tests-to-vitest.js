#!/usr/bin/env node

/**
 * Updates test files from Jest to Vitest APIs
 */

const fs = require('node:fs');
const path = require('node:path');
const glob = require('glob');

console.log('📝 Updating test files to use Vitest APIs...\n');

// Find all test files
const testFiles = glob.sync('**/*.{test,spec}.{ts,tsx,js,jsx}', {
  ignore: ['node_modules/**', 'dist/**', 'build/**', '.next/**']
});

console.log(`Found ${testFiles.length} test files to check\n`);

let updatedFiles = 0;

testFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  let updated = content;
  let hasChanges = false;
  
  // Replace jest.fn() with vi.fn()
  if (updated.includes('jest.fn()')) {
    updated = updated.replace(/jest\.fn\(\)/g, 'vi.fn()');
    hasChanges = true;
  }
  
  // Replace jest.mock with vi.mock
  if (updated.includes('jest.mock')) {
    updated = updated.replace(/jest\.mock/g, 'vi.mock');
    hasChanges = true;
  }
  
  // Replace jest.spyOn with vi.spyOn
  if (updated.includes('jest.spyOn')) {
    updated = updated.replace(/jest\.spyOn/g, 'vi.spyOn');
    hasChanges = true;
  }
  
  // Replace jest.clearAllMocks with vi.clearAllMocks
  if (updated.includes('jest.clearAllMocks')) {
    updated = updated.replace(/jest\.clearAllMocks/g, 'vi.clearAllMocks');
    hasChanges = true;
  }
  
  // Replace jest.resetAllMocks with vi.resetAllMocks
  if (updated.includes('jest.resetAllMocks')) {
    updated = updated.replace(/jest\.resetAllMocks/g, 'vi.resetAllMocks');
    hasChanges = true;
  }
  
  // Add import for vi if needed
  if (hasChanges && !updated.includes('import { vi }') && !updated.includes('from "vitest"')) {
    // Check if there's already a vitest import
    const vitestImportMatch = updated.match(/import\s+{([^}]+)}\s+from\s+["']vitest["']/);
    
    if (vitestImportMatch) {
      // Add vi to existing import
      const imports = vitestImportMatch[1];
      if (!imports.includes('vi')) {
        updated = updated.replace(
          vitestImportMatch[0],
          `import { ${imports.trim()}, vi } from "vitest"`
        );
      }
    } else {
      // Add new import at the top of the file
      const firstImportIndex = updated.indexOf('import');
      if (firstImportIndex !== -1) {
        updated = updated.slice(0, firstImportIndex) + 
                  'import { vi } from "vitest";\n' + 
                  updated.slice(firstImportIndex);
      } else {
        updated = 'import { vi } from "vitest";\n' + updated;
      }
    }
  }
  
  if (hasChanges) {
    fs.writeFileSync(file, updated);
    console.log(`✅ Updated ${file}`);
    updatedFiles++;
  }
});

console.log(`\n✅ Updated ${updatedFiles} test files`);
console.log('\nNext steps:');
console.log('1. Run tests to ensure everything works: pnpm test');
console.log('2. Look for any remaining Jest-specific APIs that need manual updates');