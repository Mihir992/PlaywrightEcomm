import { test, expect } from "@playwright/test";
import { performLogin } from "../utils/loginUtils";

test("Login with reusable login utility", async ({ page }) => {
  await performLogin(page);
  
  // Example: Check login success
    await expect(page).toHaveURL(/\/inventory(\.html)?$/);// saucedemo redirects to /inventory after login
});