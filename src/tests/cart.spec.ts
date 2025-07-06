import { test, expect } from "@playwright/test";
import { performLogin } from "../utils/loginUtils";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";

test.beforeEach(async ({ page }) => {
  // Login
  await performLogin(page);
  await page.pause();
  // Add to cart
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.clickProductByName("Sauce Labs Backpack");
  await inventoryPage.clickOnAddToCartButton();
  await inventoryPage.clickCartButton();
});

test("Verify cart item test", async ({ page }) => {
  const cartPage = new CartPage(page);

  //Fetch cart details **before** navigating
  const actualDetails = await cartPage.fetchCartDetails();
  //await page.pause();
  // Then navigate away
  await cartPage.clickOnCheckoutButton();
});

