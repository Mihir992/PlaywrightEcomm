// utils/loginUtils.ts
import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage"; // ✅ Import your LoginPage class
import * as dotenv from 'dotenv';
dotenv.config(); // Load .env variables

export async function performLogin(page: Page) {
  const baseUrl = process.env.BASE_URL;
  const username = process.env.APP_USERNAME;
  console.log("USERNAME from env:", process.env.APP_USERNAME);
  const password = process.env.APP_PASSWORD;
  console.log("PASSWORD from env:", process.env.APP_PASSWORD);

  if (!baseUrl || !username || !password) {
    throw new Error("Missing BASE_URL, USERNAME, or PASSWORD in .env file");
  }

  // Navigate to login page
  await page.goto(baseUrl);

  const loginPage = new LoginPage(page);

  // Use LoginPage methods instead of raw selectors
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername(username);
  await loginPage.fillPassword(password);
   // Wait for navigation after login click
  await Promise.all([
  loginPage.clickLoginButton(),
  page.waitForNavigation({ waitUntil: 'load' }),  // wait for full page load after click
]);

// Now wait for inventory page element
await page.waitForSelector('.inventory_list');
}
