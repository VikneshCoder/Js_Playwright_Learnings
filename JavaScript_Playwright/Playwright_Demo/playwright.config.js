import { defineConfig, devices } from '@playwright/test';

/**
 * Full Playwright configuration file
 * For more info: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 100000,
  expect: {
    timeout: 100000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    trace: 'on-first-retry',  //ON, OFF
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['chrome'],
        headless: false,
        viewport: null,
        launchOptions: {
          args: [
            '--start-maximized',
            '--window-size=1366,768',
            '--force-device-scale-factor=0.75',  // Adjust the scale factor to 0.75 for 75% zoom
            '--high-dpi-support=1'
          ],
        },
      },
    },

    // Uncomment if needed
    // {
    //   name: 'firefox',
    //   use: { browserName: 'firefox' },
    // },

    // {
    //   name: 'webkit',
    //   use: { browserName: 'webkit' },
    // },
  ],

  // Optional: run your local dev server before the tests
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
