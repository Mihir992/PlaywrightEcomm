// utils/login.ts
import { chromium, BrowserContext } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export async function login(): Promise<BrowserContext> {
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const context = await browser.newContext();

  const page = await context.newPage();
  console.log('Navigating to:', process.env.BASE_URL);
 
  await page.goto(`${process.env.BASE_URL}`);
  //await page.pause();
  await page.fill('input[name="user-name"]', process.env.APP_USERNAME || '');
  await page.fill('input[name="password"]', process.env.APP_PASSWORD || '');
  await page.locator('input[name="login-button"]').click();

  // Wait for successful login - adjust as needed
  await page.waitForSelector('.inventory_list', { timeout: 15000 });

  return context;
}
