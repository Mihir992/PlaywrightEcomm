import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import checkoutData from "../data/checkoutdetails.json";

dotenv.config();

test('E2E Test: Login → Add to Cart → Checkout → Verify Total', async ({ page }) => {
  const BASE_URL = process.env.BASE_URL!;
  const UNAME = process.env.APP_USERNAME!;
  const PWORD = process.env.APP_PASSWORD!;
  const PRODUCT_NAME = "Sauce Labs Backpack";

  // Step 1: Login
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage(BASE_URL);
  await loginPage.fillUsername(UNAME);
  await loginPage.fillPassword(PWORD);
  await loginPage.clickLoginButton();
  const inventoryPage = new InventoryPage(page);

  // Step 2: Navigate to inventory page
  //await inventoryPage.navigateToPage();

  // Step 3: Interact with product
  await inventoryPage.getAllProducts();
  await inventoryPage.clickProductByName(PRODUCT_NAME);
  await inventoryPage.clickOnAddToCartButton();
  await inventoryPage.clickCartButton();

  // Step 4: Go to cart
  const cartPage = new CartPage(page);

  // Step 5: Validate product in cart
  const actualDetails = await cartPage.fetchCartDetails();
  expect(actualDetails.name).toBe(PRODUCT_NAME);
  await cartPage.clickOnCheckoutButton();

  // Step 6: Proceed to checkout
  const checkoutPage = new CheckoutPage(page);

  // Step 7: Fill checkout form
  await checkoutPage.fillCheckoutInfo(checkoutData);

  // Step 8: Validate total
  await checkoutPage.verifyCalculatedTotalMatchesDisplayedTotal();
});
