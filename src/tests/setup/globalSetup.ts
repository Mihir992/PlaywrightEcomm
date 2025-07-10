// File: tests/setup/globalSetup.ts
import { chromium } from "@playwright/test";
import { performLogin } from "utils/loginUtils";// ✅ CORRECT path
import * as dotenv from 'dotenv';

dotenv.config();

export default async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await performLogin(page, context);

  //await browser.close(); // ✅ Don't forget to close browser
}
