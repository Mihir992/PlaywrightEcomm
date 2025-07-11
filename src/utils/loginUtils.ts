// loginUtils.ts
import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import * as dotenv from 'dotenv';
dotenv.config();

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
}
