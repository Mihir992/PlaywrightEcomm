import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './src/tests',
  workers: 1,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',

  /* Shared settings for all tests (can be overridden per project) */
  use: {
    headless: true,
    screenshot: 'on',
    // baseURL: process.env.BASE_URL, // Optional: Uncomment if needed
    // trace: 'on-first-retry',
  },

  /* Configure browser projects */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
       // baseURL: process.env.BASE_URL, // <- add this
        //storageState: 'tests/storage/storageState.json', // ✅ correct placement
      },
    },

    // You can uncomment these to run in other browsers
    /*
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'tests/storage/storageState.json',
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: 'tests/storage/storageState.json',
      },
    },
    */
  ],

  // Optional: Run a dev server before tests
  /*
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
  */
});
