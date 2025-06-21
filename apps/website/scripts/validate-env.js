#!/usr/bin/env node

/**
 * Environment validation script for Brain Game Website (Next.js)
 * Validates that all required environment variables are properly configured
 */

const { validateWebsiteEnv } = require('@braingame/utils/env');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(color, message) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSection(title) {
  console.log(`\n${colors.blue}${colors.bold}=== ${title} ===${colors.reset}`);
}

async function validateEnvironment() {
  logSection('Brain Game Website - Environment Validation');

  // Check if .env files exist
  const envFiles = ['.env', '.env.local', '.env.development', '.env.production'];
  const existingEnvFiles = envFiles.filter(file => fs.existsSync(path.join(process.cwd(), file)));
  
  if (existingEnvFiles.length === 0) {
    log(colors.yellow, '⚠️  No .env files found. Using .env.example as reference.');
    log(colors.blue, 'Create .env.local from .env.example for development.');
  } else {
    log(colors.green, `✅ Found environment files: ${existingEnvFiles.join(', ')}`);
  }

  // Load environment variables
  try {
    require('dotenv').config({ path: '.env.local' });
    require('dotenv').config({ path: '.env' });
  } catch (error) {
    // dotenv not installed, use process.env
  }

  // Validate current environment
  console.log('\n🔍 Validating current environment...');
  const result = validateWebsiteEnv(process.env, { logResults: false });

  if (result.success) {
    log(colors.green, '✅ Environment validation passed!');
    
    // Show warnings if any
    if (result.warnings && result.warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      result.warnings.forEach(warning => {
        log(colors.yellow, `  - ${warning}`);
      });
    }

    // Show configuration summary
    console.log('\n📋 Configuration Summary:');
    const env = result.data;
    console.log(`  App Name: ${env.NEXT_PUBLIC_APP_NAME}`);
    console.log(`  Version: ${env.NEXT_PUBLIC_APP_VERSION}`);
    console.log(`  Environment: ${env.NODE_ENV}`);
    console.log(`  API URL: ${env.NEXT_PUBLIC_API_BASE_URL}`);
    console.log(`  Analytics: ${env.NEXT_PUBLIC_ENABLE_ANALYTICS ? 'Enabled' : 'Disabled'}`);
    console.log(`  Error Reporting: ${env.NEXT_PUBLIC_ENABLE_ERROR_REPORTING ? 'Enabled' : 'Disabled'}`);
    
    // Firebase configuration check
    if (env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      console.log(`  Firebase Project: ${env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);
    }

  } else {
    log(colors.red, '❌ Environment validation failed!');
    console.log('\nErrors:');
    result.errors?.forEach(error => {
      log(colors.red, `  - ${error}`);
    });
    console.log('\n💡 Fix these issues and run validation again.');
    process.exit(1);
  }

  // Check for Next.js specific issues
  console.log('\n🔍 Checking Next.js specific configuration...');
  
  // Verify NEXT_PUBLIC_ prefix for client-side variables
  const requiredClientVars = [
    'NEXT_PUBLIC_APP_NAME',
    'NEXT_PUBLIC_API_BASE_URL',
    'NEXT_PUBLIC_FIREBASE_API_KEY'
  ];
  
  const missingClientVars = requiredClientVars.filter(varName => !process.env[varName]);
  if (missingClientVars.length > 0) {
    log(colors.yellow, '⚠️  Missing client-side variables (NEXT_PUBLIC_ prefix):');
    missingClientVars.forEach(varName => {
      log(colors.yellow, `  - ${varName}`);
    });
  } else {
    log(colors.green, '✅ All required client-side variables configured');
  }

  // Show next steps
  console.log('\n🚀 Next Steps:');
  if (process.env.NODE_ENV === 'production') {
    console.log('  • Ensure all production secrets are properly configured');
    console.log('  • Verify Firebase configuration');
    console.log('  • Test API connectivity');
    console.log('  • Run deployment checks');
  } else {
    console.log('  • Start development: npm run dev');
    console.log('  • Build app: npm run build');
    console.log('  • Test production build: npm run start');
  }

  console.log('\n✨ Environment validation complete!\n');
}

// Run validation
validateEnvironment().catch(error => {
  log(colors.red, `\n❌ Validation script failed: ${error.message}`);
  process.exit(1);
});