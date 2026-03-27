// @ts-check
import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({

  testDir: './tests',
  
  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  projects: [
    // {
    //   name: 'setup',
    //   testMatch: /.*\.setup\.ts/,
    //   use: {
    //     baseURL: 'https://automationintesting.online/admin/',
    //   }
    // },

    {
      name: 'e2e-ui',
      testMatch: /.*\.ui\.spec\.ts/,
     
      use: {
        ...devices['Desktop Chrome'],
        trace: 'on-first-retry',
        baseURL: 'https://automationintesting.online/',
        viewport: { width: 1600, height: 900 },
      },
    },

    {
      name: 'api',
      // dependencies: ['setup'],
      testMatch: /.*\.api\.spec\.ts/,
      use: {
        baseURL: 'https://automationintesting.online',
    
      }
    }
  ],
});

