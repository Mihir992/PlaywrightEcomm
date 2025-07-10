import { test, expect } from "@playwright/test";
import { performLogin } from "../utils/loginUtils";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

test.beforeEach(async ({ page }) => {
  // Setup: add product to cart & navigate to cart page
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.clickProductByName("Sauce Labs Backpack");
  await inventoryPage.clickOnAddToCartButton();
  await inventoryPage.clickCartButton();
});

test("Verify cart item test", async ({ page }) => {
  const cartPage = new CartPage(page);

  
  // Step 1: Fetch and validate cart item details
  const actualDetails = await cartPage.fetchCartDetails();
  expect(actualDetails.name).toBe("Sauce Labs Backpack");

  //await page.pause();
   // Step 2: Chain to CheckoutPage
  const checkoutPage: CheckoutPage = await cartPage.clickOnCheckoutButton();
});
