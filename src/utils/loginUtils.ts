<<<<<<< HEAD
// utils/login.ts
import { chromium, BrowserContext } from '@playwright/test';
=======
// loginUtils.ts
import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
>>>>>>> 97cadf8514680eb362ed45e166f930154e7653fd
import * as dotenv from 'dotenv';
dotenv.config();

<<<<<<< HEAD
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
=======
export async function performLogin(page: Page) {
  const baseUrl = process.env.BASE_URL;
  const username = process.env.APP_USERNAME;
  const password = process.env.APP_PASSWORD;

  if (!baseUrl || !username || !password) {
    throw new Error("Missing BASE_URL, USERNAME, or PASSWORD in .env file");
  }

  await page.goto(baseUrl);
  const loginPage = new LoginPage(page);
  await loginPage.fillUsername(username);
  await loginPage.fillPassword(password);
  const inventoryPage = await loginPage.clickLoginButton();

  const popup = page.locator('text=Change your password >> visible=true');
  if (await popup.isVisible()) {
    await page.getByRole('button', { name: 'OK' }).click();
  }

  await page.waitForSelector('.inventory_list');
>>>>>>> 97cadf8514680eb362ed45e166f930154e7653fd
}
