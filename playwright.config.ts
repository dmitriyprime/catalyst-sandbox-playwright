import { defineConfig, devices } from '@playwright/test';
//import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  fullyParallel: true,
  globalSetup: './globalSetup.ts',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://store-ho0ptusdjg-1826081.catalyst-sandbox-vercel.store/',
    storageState: './storageState.json',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium-e2e',
      use: { ...devices['Desktop Chrome'] },
      testDir: './tests/e2e',
    },
    {
      name: 'api',
      testDir: './tests/api',
    },
  ],
});
