import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  workers: 1,
  reporter: "html",
  timeout: 120000,

  use: {
    trace: "on-first-retry"
  },

  projects: [
    {
      name: 'api',
      testMatch: /.*\.api\.spec\.ts$/,
      use: {
        baseURL: process.env.API_BASE_URL,
      },
    },
    {
      name: 'web',
      testMatch: /.*\.ui\.spec\.ts$/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL,
        headless: false,
        screenshot: "only-on-failure",
        video: "on",
      },
    },
  ],
});
