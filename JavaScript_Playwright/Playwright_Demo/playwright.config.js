import { defineConfig } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 100000,
  expect: {
    timeout: 100000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: false,
        viewport: null, // Use full available screen (prevents resizing issue)
        timeout: 60000,
        launchOptions: {
          args: [
            '--start-maximized',                // Maximizes the browser window
            '--force-device-scale-factor=1',    // Forces 100% zoom (no scaling)
            '--window-size=1920,1080'           // Ensures the right screen size
          ],
        },
      },
    },

    // {
    //   name: 'firefox',
    //   use: { browserName: 'firefox' },
    // },

    // {
    //   name: 'webkit',
    //   use: { browserName: 'webkit' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
