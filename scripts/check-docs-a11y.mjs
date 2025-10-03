import { chromium } from 'playwright';
import { injectAxe, checkA11y } from 'axe-playwright';
import { spawn } from 'child_process';
import http from 'http';
import path from 'path';

const waitForServer = (url, maxAttempts = 60) =>
  new Promise((resolve, reject) => {
    let attempts = 0;
    const poll = () => {
      attempts += 1;
      const req = http.get(url, (res) => {
        res.resume();
        resolve();
      });
      req.on('error', (err) => {
        if (attempts >= maxAttempts) {
          reject(err);
          return;
        }
        setTimeout(poll, 500);
      });
    };
    poll();
  });

const run = async () => {
  const docsDir = path.resolve('apps/docs-site');
  const server = spawn(
    'pnpm',
    ['exec', 'next', 'dev', '-p', '3010', '--hostname', 'localhost'],
    {
      cwd: docsDir,
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'development' },
    },
  );

  try {
    await waitForServer('http://localhost:3010');
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const pages = [
      { path: '/', name: 'Home' },
      { path: '/components/primitives/button', name: 'Button docs' },
      { path: '/design/colors', name: 'Design colors' },
    ];

    let violationCount = 0;

    for (const { path: route, name } of pages) {
      const page = await context.newPage();
      await page.goto(`http://localhost:3010${route}`);
      await injectAxe(page);
      const results = await checkA11y(page, undefined, {
        detailedReport: true,
        detailedReportOptions: { html: false },
        axeOptions: {
          runOnly: ['wcag2a', 'wcag2aa'],
        },
        reportOnly: true,
      });
      const count = Array.isArray(results) ? results.length : 0;
      console.log(`AXE sweep for ${name}: ${count} violation${count === 1 ? '' : 's'}`);
      violationCount += count;
      await page.close();
    }

    await context.close();
    await browser.close();

    if (violationCount > 0) {
      throw new Error(`Accessibility sweep detected ${violationCount} violation(s).`);
    }
  } finally {
    server.kill('SIGINT');
  }
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
