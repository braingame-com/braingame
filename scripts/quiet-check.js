#!/usr/bin/env node

const { spawn } = require('child_process');

const command = process.argv[2];
const validCommands = ['lint', 'typecheck', 'test', 'quality'];

if (!validCommands.includes(command)) {
  console.error(`Usage: pnpm ${validCommands.join('|')}`);
  process.exit(1);
}

console.log(`Running ${command}...`);

const turbo = spawn('pnpm', ['turbo', command, '--concurrency=10'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: true
});

let hasErrors = false;
let errorOutput = '';

// Capture both stdout and stderr
turbo.stdout.on('data', (data) => {
  const output = data.toString();
  
  // Filter out turbo noise, only show actual errors/warnings
  const lines = output.split('\n');
  for (const line of lines) {
    // Skip turbo metadata lines
    if (line.includes('cache hit') || 
        line.includes('cache miss') || 
        line.includes('Tasks:') ||
        line.includes('Cached:') ||
        line.includes('Time:') ||
        line.includes('>>> FULL TURBO') ||
        line.includes('• Packages in scope') ||
        line.includes('• Running') ||
        line.includes('• Remote caching') ||
        line.includes('turbo ') ||
        line.trim() === '' ||
        line.includes(':' + command + ':') && !line.includes('error') && !line.includes('warning')) {
      continue;
    }
    
    // Show errors and warnings
    if (line.includes('error') || line.includes('warning') || line.includes('Error:') || line.includes('Warning:')) {
      console.log(line);
      hasErrors = true;
      errorOutput += line + '\n';
    }
  }
});

turbo.stderr.on('data', (data) => {
  const output = data.toString();
  console.error(output);
  hasErrors = true;
  errorOutput += output;
});

turbo.on('close', (code) => {
  if (code === 0 && !hasErrors) {
    console.log(`✅ ${command} passed - all clean!`);
  } else if (hasErrors) {
    console.log(`\n❌ ${command} found issues`);
    process.exit(1);
  } else if (code !== 0) {
    console.log(`\n❌ ${command} failed with code ${code}`);
    process.exit(code);
  }
});