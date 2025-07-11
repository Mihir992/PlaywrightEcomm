// global-setup.ts
import { chromium } from '@playwright/test';
import { performLogin } from 'utils/loginUtils';

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await performLogin(page); // ✅ custom login
  await context.storageState({ path: 'storageState.json' });

  //await browser.close();
}

export default globalSetup;
