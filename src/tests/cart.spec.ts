import { test, expect, chromium } from "@playwright/test";
import { performLogin } from "../utils/loginUtils";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

let page;
let context;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  context = await browser.newContext({ storageState: 'storageState.json' });
  page = await context.newPage();

  const inventoryPage = new InventoryPage(page);
  await inventoryPage.clickProductByName("Sauce Labs Backpack");
  await inventoryPage.clickOnAddToCartButton();
  await inventoryPage.clickCartButton();
});

// test.afterAll(async () => {
//   await context.close(); // Close browser context after tests
// });

test("Verify cart item test", async () => {
 const cartPage = new CartPage(page);
  const actualDetails = await cartPage.fetchCartDetails();
  console.log("Fetched Cart Details:", actualDetails);
  expect(actualDetails.name).toBe("Sauce Labs Backpack");
});

test("Proceed to checkout page", async () => {
  const cartPage = new CartPage(page);
  const checkoutPage: CheckoutPage = await cartPage.clickOnCheckoutButton();
  expect(await page.url()).toContain("checkout-step-one");
});
