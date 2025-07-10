import { Page, BrowserContext } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import * as dotenv from 'dotenv';

dotenv.config();

export async function performLogin(page: Page, context: BrowserContext) {
  const baseUrl = process.env.BASE_URL;
  const username = process.env.APP_USERNAME;
  const password = process.env.APP_PASSWORD;

  if (!baseUrl || !username || !password) {
    throw new Error("Missing BASE_URL, APP_USERNAME, or APP_PASSWORD in .env");
  }

  const loginPage = new LoginPage(page);
  await loginPage.goto(baseUrl);
  await loginPage.fillUsername(username);
  await loginPage.fillPassword(password);
  await loginPage.clickLoginButton();

  // Ensure login was successful
  await page.waitForSelector('.inventory_list');

  // Save storage state
  await context.storageState({ path: 'tests/storage/storageState.json' });
}
