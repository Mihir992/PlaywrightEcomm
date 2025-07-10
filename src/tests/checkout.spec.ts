import { test, expect } from "@playwright/test";
import { performLogin } from "../utils/loginUtils";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import checkoutData from "../data/checkoutdetails.json";


test("Verify total is correctly calculated", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login
  await performLogin(page);

  // Add item to cart
  await inventoryPage.clickProductByName("Sauce Labs Backpack");
  await inventoryPage.clickOnAddToCartButton();
  await inventoryPage.clickCartButton();

  // Go to checkout
  await cartPage.clickOnCheckoutButton();

  // Fill in the checkout form
  await checkoutPage.fillCheckoutInfo(checkoutData);

  // Verify the total calculation
  await checkoutPage.verifyCalculatedTotalMatchesDisplayedTotal();
});
