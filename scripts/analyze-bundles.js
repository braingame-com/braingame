#!/usr/bin/env node

/**
 * Bundle Size Analysis Script
 * Analyzes bundle sizes across all apps in the monorepo
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const APPS_DIR = path.join(__dirname, '..', 'apps');
const OUTPUT_FILE = path.join(__dirname, '..', 'bundle-analysis.json');

function getBundleSize(dirPath) {
  try {
    const stats = execSync(`du -sb ${dirPath}`, { encoding: 'utf8' });
    return parseInt(stats.split('\t')[0]);
  } catch (error) {
    return 0;
  }
}

function getHumanReadableSize(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

function analyzeApp(appName) {
  const appDir = path.join(APPS_DIR, appName);
  const packageJsonPath = path.join(appDir, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    return null;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const analysis = {
    name: appName,
    framework: detectFramework(packageJson),
    dependencies: Object.keys(packageJson.dependencies || {}).length,
    devDependencies: Object.keys(packageJson.devDependencies || {}).length,
    buildOutput: null,
    buildSuccess: false
  };

  // Try to build and analyze output
  try {
    console.log(`Building ${appName}...`);
    process.chdir(appDir);
    
    if (packageJson.scripts && packageJson.scripts.build) {
      execSync('npm run build', { stdio: 'pipe' });
      analysis.buildSuccess = true;
      
      // Analyze build output
      const buildOutputs = detectBuildOutput(appDir, analysis.framework);
      analysis.buildOutput = buildOutputs.map(outputPath => ({
        path: outputPath,
        size: getBundleSize(outputPath),
        humanSize: getHumanReadableSize(getBundleSize(outputPath))
      }));
    }
  } catch (error) {
    analysis.buildError = error.message.split('\n').slice(0, 5).join('\n');
  }

  return analysis;
}

function detectFramework(packageJson) {
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  if (deps.next) return 'next';
  if (deps.expo) return 'expo';
  if (deps.vite) return 'vite';
  if (deps.webpack) return 'webpack';
  if (deps.express || deps.fastify) return 'node';
  
  return 'unknown';
}

function detectBuildOutput(appDir, framework) {
  const possibleOutputs = [
    'dist',
    'build',
    'out',
    '.next',
    'web-build'
  ];
  
  return possibleOutputs
    .map(dir => path.join(appDir, dir))
    .filter(dir => fs.existsSync(dir));
}

function main() {
  console.log('🔍 Analyzing bundle sizes across all apps...\n');
  
  const originalCwd = process.cwd();
  const apps = fs.readdirSync(APPS_DIR).filter(item => {
    const itemPath = path.join(APPS_DIR, item);
    return fs.statSync(itemPath).isDirectory();
  });

  const results = {
    timestamp: new Date().toISOString(),
    summary: {
      totalApps: apps.length,
      successfulBuilds: 0,
      failedBuilds: 0
    },
    apps: []
  };

  for (const app of apps) {
    console.log(`📦 Analyzing ${app}...`);
    const analysis = analyzeApp(app);
    
    if (analysis) {
      results.apps.push(analysis);
      if (analysis.buildSuccess) {
        results.summary.successfulBuilds++;
        console.log(`✅ ${app}: Build successful`);
        if (analysis.buildOutput) {
          analysis.buildOutput.forEach(output => {
            console.log(`   📁 ${path.basename(output.path)}: ${output.humanSize}`);
          });
        }
      } else {
        results.summary.failedBuilds++;
        console.log(`❌ ${app}: Build failed`);
      }
    }
    
    process.chdir(originalCwd);
    console.log('');
  }

  // Write results to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
  
  // Summary
  console.log('📊 Bundle Analysis Summary:');
  console.log(`   Total apps: ${results.summary.totalApps}`);
  console.log(`   Successful builds: ${results.summary.successfulBuilds}`);
  console.log(`   Failed builds: ${results.summary.failedBuilds}`);
  console.log(`\n📄 Detailed report saved to: ${OUTPUT_FILE}`);

  // Recommendations
  console.log('\n💡 Performance Recommendations:');
  results.apps.forEach(app => {
    if (app.buildSuccess && app.buildOutput) {
      const totalSize = app.buildOutput.reduce((sum, output) => sum + output.size, 0);
      if (totalSize > 5 * 1024 * 1024) { // > 5MB
        console.log(`⚠️  ${app.name}: Large bundle size (${getHumanReadableSize(totalSize)}) - consider code splitting`);
      }
      if (app.dependencies > 50) {
        console.log(`⚠️  ${app.name}: High dependency count (${app.dependencies}) - audit for unused dependencies`);
      }
    }
  });
}

if (require.main === module) {
  main();
}

module.exports = { analyzeApp, detectFramework };