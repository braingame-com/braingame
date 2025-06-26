#!/usr/bin/env node

/**
 * Fix workspace protocol for npm compatibility
 * 
 * This script converts pnpm's workspace:* protocol to npm-compatible file: protocol
 * or version references for users who need to use npm instead of pnpm.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Find all package.json files in the monorepo
function findPackageJsonFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    // Skip node_modules and hidden directories
    if (item === 'node_modules' || item.startsWith('.')) continue;
    
    if (stat.isDirectory()) {
      findPackageJsonFiles(itemPath, files);
    } else if (item === 'package.json') {
      files.push(itemPath);
    }
  }
  
  return files;
}

// Get workspace packages and their versions
function getWorkspacePackages() {
  const packages = {};
  const workspaceRoot = path.resolve(__dirname, '..');
  
  // Read root package.json to find workspaces
  const rootPkg = JSON.parse(fs.readFileSync(path.join(workspaceRoot, 'package.json'), 'utf8'));
  
  // Find all workspace packages
  const packagePaths = findPackageJsonFiles(path.join(workspaceRoot, 'packages'));
  const appPaths = findPackageJsonFiles(path.join(workspaceRoot, 'apps'));
  
  [...packagePaths, ...appPaths].forEach(pkgPath => {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (pkg.name) {
        packages[pkg.name] = {
          version: pkg.version || '1.0.0',
          path: path.relative(workspaceRoot, path.dirname(pkgPath))
        };
      }
    } catch (err) {
      log(`Warning: Could not read ${pkgPath}`, 'yellow');
    }
  });
  
  return packages;
}

// Convert workspace protocol to npm-compatible format
function convertWorkspaceProtocol(packageJsonPath, workspacePackages, useFileProtocol = false) {
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  let modified = false;
  
  const convertDeps = (deps) => {
    if (!deps) return;
    
    Object.keys(deps).forEach(depName => {
      if (deps[depName] === 'workspace:*' || deps[depName] === 'workspace:^') {
        const workspacePkg = workspacePackages[depName];
        if (workspacePkg) {
          if (useFileProtocol) {
            // Use file: protocol for local development
            const relativePath = path.relative(
              path.dirname(packageJsonPath),
              path.join(path.dirname(packageJsonPath), '..', '..', workspacePkg.path)
            );
            deps[depName] = `file:${relativePath}`;
          } else {
            // Use version for npm publish
            deps[depName] = `^${workspacePkg.version}`;
          }
          modified = true;
          log(`  ${depName}: workspace:* → ${deps[depName]}`, 'green');
        } else {
          log(`  Warning: Could not find workspace package ${depName}`, 'yellow');
        }
      }
    });
  };
  
  // Convert dependencies
  convertDeps(pkg.dependencies);
  convertDeps(pkg.devDependencies);
  convertDeps(pkg.peerDependencies);
  convertDeps(pkg.optionalDependencies);
  
  return { pkg, modified };
}

// Main function
function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'check';
  const useFileProtocol = args.includes('--file');
  
  log('🔧 Workspace Protocol Fix for npm', 'cyan');
  log('=================================', 'cyan');
  
  // Get all workspace packages
  const workspacePackages = getWorkspacePackages();
  log(`\nFound ${Object.keys(workspacePackages).length} workspace packages:`, 'blue');
  Object.entries(workspacePackages).forEach(([name, info]) => {
    log(`  ${name} v${info.version} (${info.path})`, 'blue');
  });
  
  // Find all package.json files
  const packageFiles = findPackageJsonFiles(process.cwd());
  log(`\nFound ${packageFiles.length} package.json files`, 'blue');
  
  if (command === 'check') {
    // Check mode - just report what would be changed
    log('\nChecking for workspace protocol usage...', 'yellow');
    let issuesFound = 0;
    
    packageFiles.forEach(pkgPath => {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      const hasWorkspaceProtocol = (deps) => {
        return deps && Object.values(deps).some(v => 
          typeof v === 'string' && v.startsWith('workspace:')
        );
      };
      
      if (hasWorkspaceProtocol(pkg.dependencies) ||
          hasWorkspaceProtocol(pkg.devDependencies) ||
          hasWorkspaceProtocol(pkg.peerDependencies) ||
          hasWorkspaceProtocol(pkg.optionalDependencies)) {
        log(`\n${path.relative(process.cwd(), pkgPath)}:`, 'yellow');
        const { modified } = convertWorkspaceProtocol(pkgPath, workspacePackages, useFileProtocol);
        if (modified) issuesFound++;
      }
    });
    
    if (issuesFound > 0) {
      log(`\n⚠️  Found ${issuesFound} files with workspace protocol`, 'yellow');
      log('\nTo fix these issues, run:', 'cyan');
      log('  node scripts/fix-npm-workspace-protocol.js fix', 'green');
      log('\nOptions:', 'cyan');
      log('  --file    Use file: protocol instead of versions', 'blue');
      log('  --backup  Create backup files before modifying', 'blue');
    } else {
      log('\n✅ No workspace protocol issues found!', 'green');
    }
    
  } else if (command === 'fix') {
    // Fix mode - actually modify the files
    const createBackup = args.includes('--backup');
    log('\nFixing workspace protocol usage...', 'yellow');
    let filesFixed = 0;
    
    packageFiles.forEach(pkgPath => {
      const { pkg, modified } = convertWorkspaceProtocol(pkgPath, workspacePackages, useFileProtocol);
      
      if (modified) {
        if (createBackup) {
          fs.copyFileSync(pkgPath, `${pkgPath}.backup`);
          log(`Created backup: ${pkgPath}.backup`, 'blue');
        }
        
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
        log(`✅ Fixed: ${path.relative(process.cwd(), pkgPath)}`, 'green');
        filesFixed++;
      }
    });
    
    if (filesFixed > 0) {
      log(`\n✅ Fixed ${filesFixed} files!`, 'green');
      log('\n⚠️  Remember to:', 'yellow');
      log('  1. Run npm install to update lockfile', 'yellow');
      log('  2. Test that everything still works', 'yellow');
      log('  3. Consider using pnpm for better workspace support', 'yellow');
    } else {
      log('\n✅ No files needed fixing!', 'green');
    }
    
  } else {
    log('\nUsage:', 'yellow');
    log('  node scripts/fix-npm-workspace-protocol.js [command] [options]', 'blue');
    log('\nCommands:', 'yellow');
    log('  check    Check for workspace protocol usage (default)', 'blue');
    log('  fix      Fix workspace protocol to npm-compatible format', 'blue');
    log('\nOptions:', 'yellow');
    log('  --file    Use file: protocol instead of versions', 'blue');
    log('  --backup  Create backup files before modifying', 'blue');
  }
}

// Export for testing
module.exports = {
  findPackageJsonFiles,
  getWorkspacePackages,
  convertWorkspaceProtocol
};

// Run if called directly
if (require.main === module) {
  main();
}